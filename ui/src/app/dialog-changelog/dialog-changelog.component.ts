import { Component, OnInit, Inject } from '@angular/core';
//import changelogRaw from '../../../CHANGELOG.md';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { simAdvancedSettingsType } from '../../types';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-dialog-changelog',
    templateUrl: './dialog-changelog.component.html',
    styleUrls: ['./dialog-changelog.component.css']
})
export class DialogChangelogComponent implements OnInit {

    changelogRaw: string; 
    changelogData: Array<{
        version: string, 
        changes: Array<string>
    }> = []; 
    
    constructor(public dialogRef: MatDialogRef<DialogChangelogComponent>,
        @Inject(MAT_DIALOG_DATA) public advancedSimSettings: simAdvancedSettingsType,
        public http: HttpClient) {

        this.http.get('assets/CHANGELOG.md', { responseType: 'text' })
            .subscribe(data => this.onLoadChangelog(data));

    }

    onLoadChangelog(changelogRaw: string) {
        this.changelogRaw = changelogRaw; 
        this.changelogData = [];
        let changelog = (changelogRaw as string).split("\n");
        let currentVersionArray: Array<string>;
        for (let i = 0; i < changelog.length; i++) {
            let line = changelog[i];
            //console.log(line); 
            if (line.startsWith("-")) { // Top level of array are semver versions
                let currentVersion = line.substr(2).trim(); // Example: 0.12.3
                currentVersionArray = [];
                this.changelogData.push({
                    version: currentVersion, 
                    changes: currentVersionArray
                })
            }
            else {
                let change = line.substr(line.indexOf("-") + 2);
                currentVersionArray.push(change);
            }
        }
        console.log("Loaded changelog: "); 
        console.log(this.changelogData); 
        //window.changelogData = this.changelogData; 
    }

    ngOnInit() {

    }

    onClickClose(): void {
        this.dialogRef.close();
    }

    log(input) {
        console.log(input); 
        return input; 
    }

}
