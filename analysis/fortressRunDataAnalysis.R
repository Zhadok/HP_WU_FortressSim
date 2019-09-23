source("fortressRunDataLoad.R")


groupedByRun




ggplot(groupedByRun[runestoneLevels==1], aes(x=roomLevel, y=difficulty)) + geom_point() + geom_line() # Raw difficulty
ggplot(groupedByRun[runestoneLevels==1], aes(x=roomLevel, y=difficultyBeforePlayerMultiplier)) + 
  geom_point() + geom_line() # # Difficulty before player multiplier

# Difficulty before player multiplier is x^2! 
ggplot(groupedByRun[runestoneLevels==1], aes(x=roomLevel, y=difficultyBeforePlayerMultiplier)) + geom_point() + geom_line() + scale_y_sqrt()

# How is difficulty budget divided among enemies?
ggplot(groupedByRun[runestoneLevels==1], aes(x=roomLevel, y=difficulty/sumProposedMultiplication)) + geom_point() + geom_line()
ggplot(groupedByRun, aes(x=as.factor(roomLevel), y=difficulty/sumProposedMultiplication)) + geom_boxplot() + ylim(c(0, NA))


# Number of enemies per room level
ggplot(groupedByRun[runestoneLevels==1], aes(x=as.factor(roomLevel), y=nEnemies)) + geom_boxplot()
ggplot(groupedByRun[runestoneLevels==1], aes(x=as.factor(roomLevel), y=nEnemies+nElite)) + geom_boxplot()
ggplot(groupedByRun, aes(x=roomLevel, y=nEnemies+nElite)) + geom_point()


# Proficiency


###########################
## Grouped by room level ##
###########################

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
ggplot(groupedByRoomLevel, aes(x=as.factor(roomLevel), y=averageProficiency)) 
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
