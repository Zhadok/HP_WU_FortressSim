## Harry Potter - Wizards Unite Fortress Simulator




## FAQ
### How does this simulation work?
This software is a "discrete event" simulation. That means each event is a single discrete event. Example events are attacks or strategic spell casts. The full list of event types and their durations are found in [events.json](https://github.com/Zhadok/HP_WU_FortressSim/blob/master/src/data/events.json). The durations for each event were derived from annotating gameplay videos with [anvil](http://anvil-software.org/download/index.html#). 

The simulation runs completely in the browser. There is no backend server involved! 


### How are enemies generated?
Data from over 100 fortress runs was collected and analyzed. Enemies are generated using a mix of regression models and random numbers. The full analysis can be found [here](https://zhadok.github.io/HP_WU_FortressSim/analysis/fortressRunDataAnalysis_v2.html). 

The implementation of enemy generation can be found [here](https://github.com/Zhadok/HP_WU_FortressSim/blob/master/src/model/env/enemies/EnemyGenerator.ts#L104). 

More data is definitely required to accurately generate realistic fortress rooms! Currently, there is a lot of guesswork involved. 


### How are fortress runs reproducible? 
Many components of this simulation require a random number generator (RNG). However, an RNG is usually initialized with a "seed". This seed ensures that the RNG will always produce the same sequence of results. This ensures that each fortress run will be exactly the same given the same seed. 


### How do wizards decide which action to take?
The game is comparatively complex and allows players to choose from many actions such as potions, stragic spells or simply attacking. This simulation uses a rules engine to decide which action each wizard should take. A sample action would be to cast a strategic spell: 

```
If professor is not in combat AND has enough focus:
    cast defence charm
```

The implementation can be found [here](https://github.com/Zhadok/HP_WU_FortressSim/blob/master/src/rules/RulesEngine.ts#L48). The rules that a professor player will follow, for example, can be found [here](https://github.com/Zhadok/HP_WU_FortressSim/blob/master/src/rules/store/professorRules.json). 


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



## Rules
- Allowed logical operators: [link](https://github.com/CacheControl/json-rules-engine/blob/f1d2f052d7738ca2ff55ef66f16b5cc2d2927f9d/docs/rules.md#operators)



## License
[Apache-2.0](https://github.com/Zhadok/HP_WU_FortressSim/blob/master/LICENSE)
