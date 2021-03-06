## Table of contents
- [About](#about)
- [Features](#features)
- [FAQ](#faq)
  * [How does this simulation work?](#how-does-this-simulation-work)
  * [How are enemies generated?](#how-are-enemies-generated)
  * [What is a "seed" and why are fortress runs reproducible?](#what-is-a-seed-and-why-are-fortress-runs-reproducible)
  * [How are RNG "seeds" used when comparing multiple simulations?](#how-are-rng-seeds-used-when-comparing-multiple-simulations)
  * [How does the player AI work? How do wizards decide which action to take?](#how-does-the-player-ai-work-how-do-wizards-decide-which-action-to-take)
  * [What happens to my data?](#what-happens-to-my-data)
  * [I have an idea! How can I reach you?](#i-have-an-idea-how-can-i-reach-you)
- [Sources for equations and data](#sources-for-equations-and-data)
- [Changelog](#changelog)
- [Rules](#rules)
- [License](#license)

## About
Welcome to the source code repository for the Harry Potter - Wizards Unite simulator! 

A running version of the simulator can be found [here](https://zhadok.github.io/HP_WU_FortressSim/).

## Features

- **Skill tree**: Easily try out different builds and check stats
- **Player AI** vs **manually decide actions**: The simulation contains a rule-based AI which automatically decides on the best next action. Advanced users can also edit the rules to create a custom AI. Alternatively, you can manually decide which action each player should take next
- **Detailed simulation output**: Simulate a single run and see who cast what spell, drank what potion and did how much damage to which enemy
- **Compare room levels**: Find out which room level is best for you based on your build
- **Compare your next skill tree lesson**: Find out which lesson in your skill tree you should pick next. Filter by lessons with only scrolls, red books or green books
- **Data storage**: All changes made on the websites are stored immediately and automatically on your device. You can also export and import your data via files or URL.


## FAQ
### How does this simulation work?
This software is a "discrete event" simulation. That means each event is a single discrete event. Example events are attacks or strategic spell casts. The full list of event types and their durations are found in [events.json](https://github.com/Zhadok/HP_WU_FortressSim/blob/master/src/data/events.json). The durations for each event were derived from annotating gameplay videos with [anvil](http://anvil-software.org/download/index.html#). 

The simulation runs completely in the browser. There is no backend server involved! 


### How are enemies generated?
Data from over 100 fortress runs was collected and analyzed. Enemies are generated using a mix of regression models and random numbers. The full analysis can be found [here](https://zhadok.github.io/HP_WU_FortressSim/analysis/fortressRunDataAnalysis_v2.html). 

The implementation of enemy generation can be found [here](https://github.com/Zhadok/HP_WU_FortressSim/blob/master/src/model/env/enemies/EnemyGenerator.ts#L104). 

More data is definitely required to accurately generate realistic fortress rooms! Currently, there is a lot of guesswork involved. 


### What is a "seed" and why are fortress runs reproducible? 
Many components of this simulation require a random number generator (RNG). An RNG is usually initialized with a "seed". This seed ensures that the RNG will always produce the same sequence of results. This ensures that each fortress run will be exactly the same given the same seed and parameters. 

For example, an RNG initialized with seed `0` might produce a sequence of random numbers: 
```
58 -> 9 -> 30 -> 50
```
The same RNG initialized with seed `1` would produce a completely different sequence of random numbers: 
```
92 -> 44 -> 32 -> 21
```
Importantly, the RNG will **always** produce the exact same sequence of random numbers given the same initial seed. 

[Further reading](https://www.statisticshowto.datasciencecentral.com/random-seed-definition/)


### How are RNG "seeds" used when comparing multiple simulations?
One of the questions addressed by this simulator is: Which room level is optimal for me?
As such we want to run a simulation for each chamber level. 

However, what we actually want to do is run *multiple* simulations per chamber level. This lets us say "On average, the success rate for chamber level X is Y%." 
This means we need to use different seeds for the simulations of chamber level X. If we used the same seed `0` multiple times for the same chamber level X we would get exactly the same results! 

As such the seed is incremented by 1 for each simulation. This means chamber level X is run with seed `0`, seed `1`, seed `2` and so on. 

The code for this process can be found [here](https://github.com/Zhadok/HP_WU_FortressSim/blob/master/src/sim/parallel/CombatSimulationComparison.ts#L44). 





### How does the player AI work? How do wizards decide which action to take?
The game is comparatively complex and allows players to choose from many actions such as potions, stragic spells or simply attacking. This simulation uses a rules engine to decide which action each wizard should take. A sample action would be to cast a strategic spell: 

```
If professor is not in combat AND has enough focus:
    cast defence charm
```

The implementation can be found [here](https://github.com/Zhadok/HP_WU_FortressSim/blob/master/src/rules/RulesEngine.ts#L48). The rules that a professor player will follow, for example, can be found [here](https://github.com/Zhadok/HP_WU_FortressSim/blob/master/src/rules/store/professorRules.json). 

You also have the option of manually clicking through a simulation, step by step. The action the AI would take is also shown. To activate this feature, see the selection box "Player action selection" under advanced simulation settings. 

### What happens to my data?
Simulation data is stored only locally, on your device. 


### I have an idea! How can I reach you?
First, please check the list of [issues](https://github.com/Zhadok/HP_WU_FortressSim/issues) to see whether this idea has already been proposed! If not, feel free to DM me (`Zhadok#3311`) on Discord. 

## Sources for equations and data
This simulation would not be possible without the following prior work. 

Data on enemies:
- Base stats for enemies values: [link](https://jibsentertainment.com/2019/07/24/a-complete-and-comprehensive-guide-to-fortresses-and-wizarding-challenges/)
- Combat damage formula: [link](https://wizardsunite.gamepress.gg/guide/combat-damage-formula)
- Values for dodge, defence, etc: [link](https://i.redd.it/gpwf5k6f4ea31.png)
- Values for growth adjust (enemy base stats per level): [link](https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0gijz3i&sh=acd204fd)
  
Data on fortresses:
- Focus data scales with room level: [link](https://www.reddit.com/r/harrypotterwu/comments/ci9mux/each_fortress_floor_awards_a_different_amount_of/?st=k06fkamr&sh=1eba4c0f)
- Challenge xp rewards: [link](https://i.redd.it/wz2vwfh5u4k31.jpg)
- Overall difficulty: [link](https://docs.google.com/spreadsheets/d/1jtBjdncxspRt51K048islZdEPTZ06yBKuZX7_MBzprI/edit#gid=0) and [link](https://docs.google.com/spreadsheets/d/1jtBjdncxspRt51K048islZdEPTZ06yBKuZX7_MBzprI/edit#gid=0)
- Overall difficulty may be the sum of levels and difficulty of enemies: [link](https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0gijz3i&sh=acd204fd)



## Changelog
See [CHANGELOG.md](ui/src/assets/CHANGELOG.md) 




## Rules
- Allowed logical operators: [link](https://github.com/CacheControl/json-rules-engine/blob/f1d2f052d7738ca2ff55ef66f16b5cc2d2927f9d/docs/rules.md#operators)



## License
[Apache-2.0](https://github.com/Zhadok/HP_WU_FortressSim/blob/master/LICENSE)
