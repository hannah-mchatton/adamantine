import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sheet-feature',
  templateUrl: './sheet-feature.component.html',
  styleUrls: ['./sheet-feature.component.scss'],
})
export class SheetFeatureComponent implements OnInit {
  @Input() characterObj: any;

  @Input() feature: any;

  @Input() level = 0;

  @Input() characterLevel = 21;
  @Input() characterId;

  @Input() classLevel = 0;
  public alwaysAvailable;

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

  public featureUses;

  public ngOnInit(): void {
    if (this.feature?.uses && Array.isArray(this.feature?.uses)) {
      this.featureUses = this.feature.uses.filter((value, index) => {
        const id = value.id;
        return (
          index ===
          this.feature.uses.findIndex((obj) => {
            return obj.id === id;
          })
        );
      });
    }

    if (this.feature?.subclassSpellsFeature) {
      if (this.feature.preparedCaster) {
        this.alwaysAvailable =
          "These spells are always prepared and don't count against your number of prepared spells.";
      } else {
        this.alwaysAvailable =
          "These spells don't count against your number of spells known.";
      }
    }
  }

  public nameUrlEncode(name: string): string {
    return name?.replace(/[ '"\(\)!\/:,]/g, '-')?.toLowerCase() ?? '';
  }

  public isArray(array: any): boolean {
    return Array.isArray(array);
  }
}
