import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule, MatTooltipModule } from "@angular/material/";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms'
import { MatCheckboxModule } from "@angular/material";
import { MatTableModule } from "@angular/material";
import { MatProgressBarModule } from "@angular/material";
import { MatSortModule } from "@angular/material";
import { MatPaginatorModule } from "@angular/material";
import { MatIconModule } from "@angular/material";
import { RuleDetailComponentComponent } from './rule-detail-component/rule-detail-component.component';
import { MatCardModule } from "@angular/material";
import { ManualActionSelectionSimulationComponent } from './manual-action-selection-simulation/manual-action-selection-simulation.component';
import { EnemyPortraitComponent } from './enemy-portrait/enemy-portrait.component'; 
import { MatRadioModule} from "@angular/material";
import { MatSnackBarModule } from "@angular/material"; 

@NgModule({
        declarations: [
            AppComponent,
            RuleDetailComponentComponent,
            ManualActionSelectionSimulationComponent,
            EnemyPortraitComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            AppRoutingModule,
            MatTabsModule,
            MatSliderModule,
            MatInputModule,
            MatSelectModule,
            MatButtonModule,
            MatListModule,
            MatTooltipModule,
            MatExpansionModule,
            BrowserAnimationsModule,
            MatCheckboxModule,
            MatTableModule,
            MatProgressBarModule,
            MatSortModule,
            MatPaginatorModule,
            MatIconModule,
            MatCardModule,
            MatRadioModule,
            MatSnackBarModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
export class AppModule { }
