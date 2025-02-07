import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/components/meta/base/base.component';
import { DataService } from 'src/services/data.service';

interface GenericDictionary {
  [value: string]: string;
}

@Component({
  selector: 'app-multiclassing-tab',
  templateUrl: './multiclassing-tab.component.html',
  styleUrls: ['./multiclassing-tab.component.scss'],
})
export class MulticlassingTabComponent extends BaseComponent implements OnInit {
  public override pageTitle: string = 'Multiclassing';
  public multiclassingData: any[];

  public scoreReference: GenericDictionary = {
    str: 'Strength',
    dex: 'Dexterity',
    con: 'Constitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    cha: 'Charisma',
  };

  constructor(private dataService: DataService) {
    super();
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.multiclassingData = this.dataService.getMulticlassingData();
  }

  public getWeaponString(weapons: string[]): string {
    return weapons.map((w) => this.titleCase(w)).join(', ');
  }

  public getToolString(tools: string[]): string {
    return tools
      .map((t) => {
        switch (t) {
          case 'tool':
            return 'One tool';
          case 'instrument':
            return 'One instrument';
          case 'game':
            return 'One gaming set';
          default:
            return this.titleCase(t);
        }
      })
      .join(', ');
  }

  public getRequirementsString(scores: any[], special: string): string {
    var requirements = '';
    for (let i = 0; i < scores.length; i++) {
      if (i) {
        requirements += '<div><strong>AND</strong></div>';
      }

      const score = scores[i];
      if (score.length > 1) {
        const scoreFormatted = score.map(
          (s) => `${this.scoreReference[s]} ≥ 13`
        );
        requirements += `<div>${scoreFormatted.join(
          ' <strong>OR</strong> '
        )}</div>`;
      } else {
        requirements += `<div>${this.scoreReference[score[0]]} ≥ 13</div>`;
      }
    }

    if (special) {
      requirements += `<hr><div>${special}</div>`;
    }

    return requirements;
  }
}
