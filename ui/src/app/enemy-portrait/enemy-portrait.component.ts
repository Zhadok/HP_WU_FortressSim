import { Component, OnInit, Input } from '@angular/core';
import { Enemy } from '../../../src/model/env/enemies/Enemy';
import { Wizard } from '../../../src/model/player/Wizard';

@Component({
    selector: 'app-enemy-portrait',
    templateUrl: './enemy-portrait.component.html',
    styleUrls: ['./enemy-portrait.component.css']
})
export class EnemyPortraitComponent implements OnInit {

    @Input() enemy: Enemy; 
    @Input() wizard: Wizard

    constructor() { }

    ngOnInit() {
    }

}
