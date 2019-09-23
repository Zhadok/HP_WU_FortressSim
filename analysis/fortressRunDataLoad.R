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
playerMultiplier <- runestoneData$playerCountMultipliers[, 1]
dataFortressesRaw <- data.table(read.csv(paste0(dirToRScript, "/fortressRunData.csv"), stringsAsFactors=F))

dataFortresses1 <- copy(dataFortressesRaw)
dataFortresses1[, isElite:=ifelse(is.na(isElite), 0, 1)]
#dataFortresses[, classes:=NULL]
dataFortresses1[, source:=NULL]
dataFortresses1[, expectedStamina:=NULL]


dataFortresses1 <- dataFortresses1[order(roomLevel, runestoneLevels)]
dataFortresses1
#str(dataFortresses1)

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
#str(dataFortresses2Raw)

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
print(paste0("Loaded ", NROW(unique(dataFortresses$runID)), " overall unique runs"))
#str(dataFortresses)

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
#str(dataFortresses)


print(paste0("Loaded ", NROW(unique(dataFortresses$runID)), " unique runs with 1 player"))



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



