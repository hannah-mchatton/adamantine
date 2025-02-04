import { Component, Input, OnInit } from '@angular/core';

interface GenericDictionary {
  [value: string]: string;
}

@Component({
  selector: 'app-display-feature',
  templateUrl: './display-feature.component.html',
  styleUrls: ['./display-feature.component.scss'],
})
export class DisplayFeatureComponent implements OnInit {
  @Input() feature: any;

  @Input() subFeature = false;
  @Input() choiceFeature = false;

  @Input() level = 0;
  @Input() classLevel = 0;

  @Input() showPrereqLevel: boolean = true;
  @Input() displayHeader: boolean = true;

  public alwaysAvailable;

  public ngOnInit(): void {
    if (this.feature.subclassSpellsFeature) {
      if (this.feature.preparedCaster) {
        this.alwaysAvailable =
          "These spells are always prepared and don't count against your number of prepared spells.";
      } else {
        this.alwaysAvailable =
          "These spells don't count against your number of spells known.";
      }
    }
  }

  public isArray(array: any): boolean {
    return Array.isArray(array);
  }

  private scores: GenericDictionary = {
    str: 'Strength',
    dex: 'Dexterity',
    con: 'Constitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    cha: 'Charisma',
  };

  public getFeatAbilityPrereq(prereq: any): string {
    let prereqString = '';
    for (let score of Object.keys(prereq[0])) {
      prereqString += `${this.scores[score]} ${prereq[0][score]}`;
    }

    return prereqString;
  }
  public getFeatRacialPrereq(prereq: any): string {
    let prereqString = '';

    for (let i = 0; i < prereq.race.length; i++) {
      if (i && prereq.race.length !== 2) {
        prereqString += ', ';
      }
      if (i === prereq.race.length - 1 && i !== 0) {
        prereqString += ' or ';
      }

      let racePrereq = prereq.race[i];
      if (prereq.subrace?.length) {
        if (prereq.subrace[i]?.length) {
          switch (typeof prereq.subrace[i]) {
            case 'string':
              racePrereq += ` (${prereq.subrace[i]})`;
              break;
            case 'object':
              racePrereq += ` (${prereq.subrace[i].join(', ')})`;
          }
        }
      }
      prereqString += racePrereq;
    }

    return prereqString;
  }

  public numberThConverter(num: string) {
    switch (num) {
      case '1':
        return '1st';
      case '2':
        return '2nd';
      case '3':
        return '3rd';
      default:
        return num + 'th';
    }
  }

  public nameUrlEncode(name: string): string {
    return name?.replace(/[ '"\(\)!\/:,]/g, '-')?.toLowerCase() ?? '';
  }
}
