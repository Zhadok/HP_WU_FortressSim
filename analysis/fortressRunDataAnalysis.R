setwd(dirname(rstudioapi::getSourceEditorContext()$path))
source("fortressRunDataLoad.R")


groupedByRun



ggplot(groupedByRun[runestoneLevels==1], aes(x=roomLevel, y=difficulty)) + geom_point() + geom_line() # Raw difficulty
ggplot(groupedByRun[runestoneLevels==1], aes(x=roomLevel, y=difficultyBeforePlayerMultiplier)) + 
  geom_point() + geom_line() # # Difficulty before player multiplier

# Difficulty before player multiplier is x^2! 
ggplot(groupedByRun[runestoneLevels==1], aes(x=roomLevel, y=difficultyBeforePlayerMultiplier)) + geom_point() + geom_line() + scale_y_sqrt()

# How is difficulty budget divided among enemies?
ggplot(groupedByRun, aes(x=roomLevel, y=difficulty/sumProposedMultiplication)) + geom_point() + geom_line()
ggplot(groupedByRun, aes(x=factor(roomLevel, levels=1:20, labels=1:20), y=difficulty/sumProposedMultiplication)) + geom_boxplot() + ylim(c(0, NA)) + scale_x_discrete()


# Number of enemies per room level
ggplot(groupedByRun[runestoneLevels==1], aes(x=as.factor(roomLevel), y=nEnemies)) + geom_boxplot() + xlab("Room level") + ylab("Number of enemies (elites count double)")
ggplot(groupedByRun[runestoneLevels==1], aes(x=as.factor(roomLevel), y=nEnemies+nElite)) + geom_boxplot()
ggplot(groupedByRun, aes(x=roomLevel, y=nEnemies+nElite)) + geom_point() + xlab("Room level") + 
  ylab("Number of enemies (elites count double)") + ggtitle(paste0("Number of enemies observed in ", NROW(groupedByRun), " solo runs")) + theme_bw()


# Does number of enemies have influence on stuff
ggplot(groupedByRun[roomLevel==10], aes(x=nEnemies+nElite, y=averageEnemyDifficulty, color=runestoneLevels)) +geom_point() + 
  geom_jitter(width=0.05,height=0)
ggplot(groupedByRun[roomLevel==10], aes(x=nEnemies+nElite, y=averageEnemyLevel, color=runestoneLevels)) +geom_point() + 
  geom_jitter(width=0.05,height=0)
ggplot(groupedByRun[roomLevel==10], aes(x=nEnemies+nElite, y=, color=runestoneLevels)) +geom_point() + 
  geom_jitter(width=0.05,height=0)


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
ggplot(groupedByRoomLevel, aes(x=difficultyBeforePlayerMultiplier, y=averageEnemyLevel)) + geom_point(aes(y=minAverageEnemyLevel), color="red") + geom_point(aes(y=maxAverageEnemyLevel), color="red") + 
  geom_point() 


# Average enemy difficulty: Maybe linear? Large variance
ggplot(groupedByRoomLevel[runestoneLevels==1], aes(x=roomLevel, y=averageEnemyDifficulty)) + geom_point(aes(y=minAverageEnemyDifficulty), color="red") + geom_point(aes(y=maxAverageEnemyDifficulty), color="red") + 
  geom_point() 
ggplot(groupedByRoomLevel, aes(x=difficulty, y=averageEnemyDifficulty)) + geom_point(aes(y=minAverageEnemyDifficulty), color="red") + geom_point(aes(y=maxAverageEnemyDifficulty), color="red") + 
  geom_point() + ylim(c(1,5))


# Average elites per room level
ggplot(groupedByRoomLevel, aes(x=difficulty, y=meanNElite / meanNEnemies)) + geom_point()



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
ggplot(groupedByRoomLevel, aes(x=as.factor(roomLevel), y=averageProficiency)) + geom_boxplot()
ggplot(groupedByRoomLevel[runestoneLevels==1], aes(x=roomLevel, y=averageProficiency)) + geom_point() + theme_bw() +
  ylab("Average proficiency") + xlab("Room level") + ylim(c(0, 1)) + geom_smooth(method="lm") + 
  geom_text(aes(x=roomLevel, y=averageProficiency, label=paste0(nRuns, " run", ifelse(nRuns > 1, "s", ""))), nudge_y=-0.02) +
  geom_text(aes(x=roomLevel, y=averageProficiency, label=paste0(sumNEnemies, " foes")), nudge_y=-0.05) + 
  ggtitle(paste0("Observed average proficiency in ", groupedByRoomLevel[runestoneLevels==1, sum(nRuns)], " solo runs with runestone level 1"))

ggplot(groupedByRun, aes(x=roomLevel, y=averageProficiency)) + geom_point() 


ggplot(groupedByRoomLevel, aes(x=difficulty, y=averageProficiency)) + geom_point()






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







#############################################
## Regression results for enemy generation ##
#############################################
# For now, base everything on difficulty
# steps: Determine number of enemies (sqrt of difficulty)
# For each enemy: 
#   determine isElite
#   determine level
#   determine difficulty

dataTrain <- groupedByRoomLevel[roomLevel>0]
dataToPredict <- data.table(roomLevel=1:20, difficulty=playerMultiplier * getSoloDifficultyForRoomLevel(1:20), difficultyBeforePlayerMultiplier=getSoloDifficultyForRoomLevel(1:20))

# Number of enemies
modelNEnemies <- lm(meanNEnemies ~ I(sqrt(difficulty)), dataTrain)
summary(modelNEnemies)
(title <- paste0("let nEnemies = ", modelNEnemies$coefficients[[1]], " + ", modelNEnemies$coefficients[[2]],  " * Math.sqrt(difficulty);"))
ggplot(dataTrain, aes(x=difficulty, y=meanNEnemies)) + geom_point() + geom_line(data=data.table(x=dataTrain$difficulty, 
                                                                                                         y=predict(modelNEnemies, dataTrain)), 
                                                                                         aes(x=x, y=y)) + ggtitle(title) +
  geom_point(data=dataTrain, aes(y=dataTrain$minNEnemies), color="red") + geom_point(data=dataTrain, aes(y=dataTrain$maxNEnemies), color="red")
cat(title)

# Is Elite: Lowest level seen is in roomLevel 4. Assume static factor
isEliteProbability <- dataFortresses[roomLevel>=4, (sum(isElite)/.N)]
print(paste0("Elite probability: ", isEliteProbability))




# Determine level
modelAverageEnemyLevel <- lm(averageEnemyLevel ~ I(sqrt(difficulty)), dataTrain) #
title <- paste0("const averageEnemyLevel = ", modelAverageEnemyLevel$coefficients[[1]], " + ", modelAverageEnemyLevel$coefficients[[2]],  " * sqrt(difficulty)")
modelAverageEnemyLevel <- lm(averageEnemyLevel ~ runestoneLevels + roomLevel, dataTrain) #
(title <- paste0("const averageEnemyLevel = ", modelAverageEnemyLevel$coefficients[[1]], 
                " + ", modelAverageEnemyLevel$coefficients[[2]], " * runestoneLevels", 
                " + ", modelAverageEnemyLevel$coefficients[[3]], " * roomLevel"))
ggplot(dataTrain, aes(x=difficulty, y=averageEnemyLevel)) + geom_point() + geom_line(data=data.table(x=dataTrain$difficulty, 
                                                                                                         y=predict(modelAverageEnemyLevel, dataTrain))+2, 
                                                                                         aes(x=x, y=y)) + ggtitle(title)

predict(modelAverageEnemyLevel, data.table(roomLevel=1, difficulty=39, difficultyBeforePlayerMultiplier=39, runestoneLevels=1))[[1]]
predict(modelAverageEnemyLevel, data.table(roomLevel=10, difficulty=2441, difficultyBeforePlayerMultiplier=1877.692, runestoneLevels=1))[[1]]

predict(modelAverageEnemyLevel, data.table(roomLevel=20, difficulty=17000))[[1]]




# Determine difficulty. Hmm, dependent on nEnemies that were actually used (see data for roomLevel==10)


# Determine proficiency
modelAverageProficiency <- lm(averageProficiency ~ roomLevel, dataTrain)
summary(modelAverageProficiency)
(title <- paste0("const averageProficiency = ", modelAverageProficiency$coefficients[[1]], 
                 " ", modelAverageProficiency$coefficients[[2]], " * roomLevel"))
ggplot(groupedByRoomLevel, aes(x=roomLevel, y=averageProficiency)) + geom_point() + geom_line(data=data.table(x=dataTrain$roomLevel, 
                                                                                                     y=predict(modelAverageProficiency, dataTrain)), 
                                                                                     aes(x=x, y=y))



##########################################################
## Regression approach 2: Difficulty "budget" per enemy ##
##########################################################


(modelDifficultyBudgetMultiplier <- lm(averageDifficultyBudgetMultiplier ~ exp(-roomLevel), groupedByRoomLevel))
(title <- paste0("const difficultyBudgetPerEnemyMultiplier = ", modelDifficultyBudgetMultiplier$coefficients[[1]], 
                 " + ", modelDifficultyBudgetMultiplier$coefficients[[2]], " * Math.exp(-roomLevel);"))
ggplot(groupedByRoomLevel, aes(x=roomLevel, y=averageDifficultyBudgetMultiplier)) + geom_point() +
  geom_line(data=data.table(x=1:20, y=predict(modelDifficultyBudgetMultiplier, data.table(roomLevel=1:20))), 
            aes(x=x, y=y))
cat(title)







