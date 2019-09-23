library(data.table)
library(ggplot2)
library(stringr)
library(zoo)
library(dplyr)
library(jsonlite)

dirToRScript <- dirname(rstudioapi::getSourceEditorContext()$path)

######################
## Load my own data ##
######################
runestoneData <- fromJSON(paste0(dirToRScript, "/../src/data/fortressDifficulties.json"))
dataFortressesRaw <- data.table(read.csv(paste0(dirToRScript, "/fortressRunData.csv"), stringsAsFactors=F))

dataFortresses1 <- copy(dataFortressesRaw)
dataFortresses1[, isElite:=ifelse(is.na(isElite), 0, 1)]
#dataFortresses[, classes:=NULL]
dataFortresses1[, source:=NULL]
dataFortresses1[, expectedStamina:=NULL]


dataFortresses1 <- dataFortresses1[order(roomLevel, runestoneLevels)]
dataFortresses1
str(dataFortresses1)

##############################
## Load data from Bliznitch ##
##############################
dataFortresses2Raw <- data.table(read.csv(paste0(dirToRScript, "/soloProfessorAfter2019_07_15_Bliznitch.csv"), stringsAsFactors=F))
dataFortresses2Raw[, Chamber.Level:=ifelse(Chamber.Level=="", NA, Chamber.Level)]
dataFortresses2Raw[, runID:=-1]
runIDCounter <- 10000
for (i in 1:NROW(dataFortresses2Raw)) {
  if (is.na(dataFortresses2Raw[i]$Chamber.Level) == FALSE) {
    runIDCounter <- runIDCounter+1
  }
  dataFortresses2Raw[i, runID:=runIDCounter]
}
dataFortresses2Raw[Enemy.Level=="", Enemy.Level:="49"]
dataFortresses2Raw[Enemy.Level=="?", Enemy.Level:="88"]
dataFortresses2Raw[, Enemy.Level:=as.numeric(Enemy.Level)]

dataFortresses2Raw <- dataFortresses2Raw %>% do(na.locf(.))
dataFortresses2Raw[, Difficulty:=as.numeric(Difficulty)]
dataFortresses2Raw[, Rune.Level:=as.numeric(Rune.Level)]
dataFortresses2Raw[, Enemy.Level:=as.numeric(Enemy.Level)]
str(dataFortresses2Raw)

chamberLevelToRoomLevel <- function(chamberLevel) {
  allParts <- str_split(chamberLevel, " ") # list: one item per entry in vector of chamberLevel
  sapply(allParts, function(vectorOfParts) {
    add <- 0
    if (vectorOfParts[1] == "Ruins") add <- 0
    if (vectorOfParts[1] == "Tower") add <- 5
    if (vectorOfParts[1] == "Forest") add <- 10
    if (vectorOfParts[1] == "Dark") add <- 15
    
    # Room level is given by roman number of last part
    return (add + as.numeric(as.roman(last(vectorOfParts))))
  })
}

cleanEnemyName <- function(enemyNameRaw) {
  # mapping
  map <- c(
    "Dark Wizard" = "darkWizard", 
    "Death Eater" = "deathEater", 
    "Acromantula" = "acromantula",
    "Erkling" = "erkling",
    "Werewolf" = "werewolf", 
    "Pixie" = "pixie",
    "Pxie" = "pixie")
  return (as.character(map[enemyNameRaw]))
}

cleanEnemyDifficulty <- function(enemyModifier) {
  map <- c(
    "Common" = 1,
    "Formidable" = 2,
    "Imposing" = 3,
    "Dangerous" = 4,
    "Fierce" = 5)
  return (as.numeric(map[enemyModifier]))
}

dataFortresses2 <- data.table(
  runID=dataFortresses2Raw$runID,
  roomLevel=chamberLevelToRoomLevel(dataFortresses2Raw$Chamber.Level),
  runestoneLevels=dataFortresses2Raw$Rune.Level,
  difficulty=dataFortresses2Raw$Difficulty,
  enemyName=cleanEnemyName(dataFortresses2Raw$Enemy.Type),
  isElite=ifelse(dataFortresses2Raw$Elite. == "Yes", 1, 0),
  enemyDifficulty=cleanEnemyDifficulty(dataFortresses2Raw$Enemy.Modifier),
  enemyLevel=dataFortresses2Raw$Enemy.Level,
  focusReward=NA_real_,
  classes="professor"
)
dataFortresses2[is.na(enemyName)]




####################
## Merge datasets ##
####################

dataFortresses <- rbind(dataFortresses1, dataFortresses2)
dataFortresses[, classes:=trimws(classes, which="both")]
dataFortresses[, nPlayers:= str_count(classes, pattern = ";")+1]
print(paste0(NROW(unique(dataFortresses$runID)), " unique runs"))
str(dataFortresses)

dataFortresses <- dataFortresses[nPlayers==1]
dataFortresses[, runestoneLevels:=as.numeric(runestoneLevels)]
mapProficiency <- function(class, enemyName) {
  mapAuror <- c("werewolf"=0,
                "pixie"=0,
                "erkling"=0,
                "acromantula"=0,
                "darkWizard"=1,
                "deathEater"=1)
  mapMagizoologist <- c("werewolf"=0,
                        "pixie"=0,
                        "erkling"=1,
                        "acromantula"=1,
                        "darkWizard"=0,
                        "deathEater"=0)
  mapProfessor <- c("werewolf"=1,
                    "pixie"=1,
                    "erkling"=0,
                    "acromantula"=0,
                    "darkWizard"=0,
                    "deathEater"=0)
  return (ifelse(class=="auror", mapAuror[enemyName], 
          ifelse(class=="magizoologist", mapMagizoologist[enemyName],
          ifelse(class=="professor", mapProfessor[enemyName], NA))))
  #if (class=="auror") return (mapAuror[enemyName])
  #if (class=="magizoologist") return (mapMagizoologist[enemyName])
  #if (class=="professor") return (mapProfessor[enemyName])
}

dataFortresses[, isWizardProficient:=mapProficiency(classes, enemyName)]
dataFortresses[, .N, by=.(classes, enemyName, isWizardProficient)][order(classes, enemyName)]
dataFortresses[is.na(isWizardProficient)]
str(dataFortresses)


print(paste0(NROW(unique(dataFortresses$runID)), " unique runs"))



playerMultiplier <- c(1, 1, 1, 1, 1, 1, 1.09, 1.16, 1.23, 1.30, 1.37, 1.44, 1.51, 1.58, 1.65, 1.72, 1.79, 1.86, 1.93, 2.00)

##################
## Analyze runs ##
##################
groupedByRun <- dataFortresses[, list(nEnemies=.N
                                     , nElite=sum(isElite)
                                 , averageEnemyDifficulty=mean(enemyDifficulty)
                                 ,  averageEnemyLevel=mean(enemyLevel)
                                , sumProposedMultiplication=  sum(enemyDifficulty*enemyLevel*(1+isElite))
                                 , proposedComputedDifficulty= 2* sum(enemyDifficulty*enemyLevel*(1+isElite))
                                 , averageProficiency=mean(isWizardProficient)
                                 ),
                          by=.(runID, roomLevel, runestoneLevels, difficulty)]
groupedByRun[, difficultyBeforePlayerMultiplier:=difficulty / playerMultiplier[roomLevel]]
groupedByRun




ggplot(groupedByRun[runestoneLevels==1], aes(x=roomLevel, y=difficulty)) + geom_point() + geom_line() # Raw difficulty
ggplot(groupedByRun[runestoneLevels==1], aes(x=roomLevel, y=difficultyBeforePlayerMultiplier)) + 
  geom_point() + geom_line() # # Difficulty before player multiplier

# Difficulty before player multiplier is x^2! 
ggplot(groupedByRun[runestoneLevels==1], aes(x=roomLevel, y=difficultyBeforePlayerMultiplier)) + geom_point() + geom_line() + scale_y_sqrt()

# How is difficulty budget divided among enemies?
ggplot(groupedByRun[runestoneLevels==1], aes(x=roomLevel, y=difficulty/sumProposedMultiplication)) + geom_point() + geom_line()
ggplot(groupedByRun[runestoneLevels==1], aes(x=as.factor(roomLevel), y=difficulty/sumProposedMultiplication)) + geom_boxplot() + ylim(c(0, NA))


# Number of enemies per room level
ggplot(groupedByRun[runestoneLevels==1], aes(x=as.factor(roomLevel), y=nEnemies)) + geom_boxplot()
ggplot(groupedByRun[runestoneLevels==1], aes(x=as.factor(roomLevel), y=nEnemies+nElite)) + geom_boxplot()
ggplot(groupedByRun, aes(x=roomLevel, y=nEnemies+nElite)) + geom_point()


# Proficiency


###########################
## Grouped by room level ##
###########################
groupedByRoomLevel <- groupedByRun[, list(nRuns=.N
                                          , minNEnemies=min(nEnemies+nElite)
                                          , meanNEnemies=mean(nEnemies+nElite)
                                          , maxNEnemies=max(nEnemies+nElite)
                                         
                                         , minAverageEnemyLevel=min(averageEnemyLevel)
                                         , averageEnemyLevel=weighted.mean(averageEnemyLevel, nEnemies+nElite)
                                         , maxAverageEnemyLevel=max(averageEnemyLevel)
                                         
                                         , minAverageEnemyDifficulty=min(averageEnemyDifficulty)
                                         , averageEnemyDifficulty=weighted.mean(averageEnemyDifficulty, nEnemies+nElite)
                                         , maxAverageEnemyDifficulty=max(averageEnemyDifficulty)
                                         
                                         , min=min(difficulty/sumProposedMultiplication)
                                        , meanFraction=mean(difficulty/sumProposedMultiplication)
                                        , max=max(difficulty/sumProposedMultiplication)
                                        
                                        , averageProficiency=weighted.mean(averageProficiency, nEnemies+nElite)
                                        )
                                   , by=.(roomLevel, difficulty, difficultyBeforePlayerMultiplier, runestoneLevels)]
groupedByRoomLevel
# How big is the dataset?
ggplot(groupedByRoomLevel, aes(x=roomLevel, y=nRuns)) + geom_bar(stat="identity")

ggplot(groupedByRoomLevel[runestoneLevels==1], aes(x=roomLevel, y=meanFraction)) + geom_boxplot()
ggplot(groupedByRoomLevel[runestoneLevels==1], aes(x=roomLevel, y=meanFraction)) + geom_point()
# Proposal: sumProposedMultiplication has a multiplier itself which depends on room level

# Number of enemies per room level (seems 2,2, 3,3,3 and then follows quadratic function). Seems independent of runestone level
ggplot(groupedByRoomLevel, aes(x=roomLevel, y=meanNEnemies)) + geom_point(aes(y=minNEnemies), color="red") + geom_point(aes(y=maxNEnemies), color="red") + 
  geom_point() + facet_wrap(~ runestoneLevels, nrow=5)
ggplot(groupedByRoomLevel, aes(x=roomLevel, y=meanNEnemies)) + geom_point(aes(y=minNEnemies), color="red") + geom_point(aes(y=maxNEnemies), color="red") + 
  geom_point() + scale_y_sqrt()+ facet_wrap(~ runestoneLevels, nrow=5)

# Is n enemies to do with runestone levels? Yes :( 
ggplot(groupedByRoomLevel[roomLevel==10], aes(x=as.factor(runestoneLevels), y=meanNEnemies)) + geom_point(aes(y=minNEnemies), color="red") + geom_point(aes(y=maxNEnemies), color="red") + 
  geom_point()

# Is n enemies difficulty dependent?
ggplot(groupedByRoomLevel, aes(x=difficulty, y=meanNEnemies))  + geom_point(aes(y=minNEnemies), color="red") + geom_point(aes(y=maxNEnemies), color="red") + 
  geom_point()


# Average enemy level: Strongly linear, ruins I is exception (as often)
ggplot(groupedByRoomLevel[runestoneLevels==1], aes(x=roomLevel, y=averageEnemyLevel)) + geom_point(aes(y=minAverageEnemyLevel), color="red") + geom_point(aes(y=maxAverageEnemyLevel), color="red") + 
  geom_point() 
ggplot(groupedByRoomLevel, aes(x=difficulty, y=averageEnemyLevel)) + geom_point(aes(y=minAverageEnemyLevel), color="red") + geom_point(aes(y=maxAverageEnemyLevel), color="red") + 
  geom_point() 


# Average enemy difficulty: Maybe linear? Large variance
ggplot(groupedByRoomLevel[runestoneLevels==1], aes(x=roomLevel, y=averageEnemyDifficulty)) + geom_point(aes(y=minAverageEnemyDifficulty), color="red") + geom_point(aes(y=maxAverageEnemyDifficulty), color="red") + 
  geom_point() 
ggplot(groupedByRoomLevel, aes(x=difficulty, y=averageEnemyDifficulty)) + geom_point(aes(y=minAverageEnemyDifficulty), color="red") + geom_point(aes(y=maxAverageEnemyDifficulty), color="red") + 
  geom_point() + ylim(c(1,5))


ggplot(groupedByRoomLevel, aes(x=roomLevel, y=difficultyBeforePlayerMultiplier/meanNEnemies)) + geom_point() # this seems weird
ggplot(groupedByRoomLevel, aes(x=roomLevel, y=difficulty/meanNEnemies)) + geom_point() + scale_y_sqrt()
ggplot(groupedByRoomLevel, aes(x=roomLevel, y=difficulty/meanNEnemies)) + geom_point() + geom_smooth(method="lm", formula=y ~ I(x^2))
  
  #stat_smooth(data=groupedByRoomLevel, aes(x=roomLevel, y=difficulty/meanNEnemies), method="lm", y ~ I(x))


modelForDifficultyBudgetPerSingleEnemy <- lm(difficulty/meanNEnemies ~ I(roomLevel^2), groupedByRoomLevel)
summary(modelForDifficultyBudgetPerSingleEnemy)
difficultyBudgetsPerSingleEnemy <- predict(modelForDifficultyBudgetPerSingleEnemy, data.table(roomLevel=1:20))
ggplot(data.table(), aes(x=1:20, y=difficultyBudgetsPerSingleEnemy)) + geom_point()

ggplot(groupedByRoomLevel, aes(x=roomLevel, y=difficulty/meanNEnemies)) + geom_point() + geom_point(data=data.table(x=1:20, y=difficultyBudgetsPerSingleEnemy), aes(x=x, y=y), color="red")


# What about average enemy level / average enemy difficulty difficulty per room leve?
ggplot(groupedByRoomLevel, aes(x=roomLevel, y=averageEnemyLevel)) + geom_point() 
ggplot(groupedByRoomLevel, aes(x=roomLevel, y=averageEnemyDifficulty)) + geom_point() 


# Proficiency percentage, analysis below should be per room level
ggplot(groupedByRoomLevel, aes(x=roomLevel, y=averageProficiency)) + geom_point() + geom_line()

dataFortresses[, difficultyBudgetThisEnemy:=predict(modelForDifficultyBudgetPerSingleEnemy, data.table(roomLevel=roomLevel))]
dataFortresses[, enemyMultiplication:=2*enemyDifficulty*enemyLevel*(1+isElite)]





###### Error metrics ###########
groupedByRun[, ae:=abs(difficulty - proposedComputedDifficulty)]
groupedByRun[, ape:=abs((difficulty - proposedComputedDifficulty)) / difficulty]


groupedByRun

computeDifficulty1 <- function(groupedByRunRow) {
  #  2 * sum(groupedByRunRow$)
}

groupedByRun[, computedDifficulty1:=apply(groupedByRun, 1, computeDifficulty1)]





########################################################################################
## Is there a multiplier for runestone level difficulty growth? (growth seems linear) ##
########################################################################################
runestoneDifficulties <- runestoneData$runestoneDifficulties

multipliers <- c()
for (roomLevel in 1:20) {
  temp <- data.table(target=runestoneDifficulties[roomLevel, ], runestoneLevel=1:10)
  lm1 <- lm(target ~ runestoneLevel, temp)
  print(paste0("Multiplier for roomLevel=", roomLevel, ": ", lm1$coefficients[2]))
  multipliers[roomLevel] <- lm1$coefficients[2]
}
multipliers
ggplot(data.table(), aes(x=1:20, y=multipliers)) + geom_point() + geom_line()

# Assumptions: 
# nEnemies is function of roomLevel
# elites count as two enemies
# 
