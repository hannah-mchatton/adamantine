import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-builder-feature',
  templateUrl: './builder-feature.component.html',
  styleUrls: ['./builder-feature.component.scss'],
})
export class BuilderFeatureComponent implements OnInit {
  @Input() characterObj: any;

  @Input() feature: any;

  @Input() subFeature = false;
  @Input() choiceFeature = false;
  @Input() sourceId: string = '';
  @Input() sourceValue: string = '';

  @Input() level = 0;

  @Input() characterLevel = 21;

  @Input() characterId: string;

  @Input() classLevel = 0;
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

  public isArray(array: any): boolean {
    return Array.isArray(array);
  }
}
