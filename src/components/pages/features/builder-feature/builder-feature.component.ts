import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Character } from 'src/data/models/character';

interface GenericDictionary {
  [value: string]: string;
}

@Component({
  selector: 'app-builder-feature',
  templateUrl: './builder-feature.component.html',
  styleUrls: ['./builder-feature.component.scss'],
})
export class BuilderFeatureComponent implements OnInit {
  @Input() character: Character;
  @Input() feature: any;
  @Input() sourceId: string;
  @Input() sourceValue: string;

  @Input() subFeature = false;
  @Input() choiceFeature = false;

  @Input() level = 0;
  @Input() classLevel = 0;

  @Input() showPrereqLevel: boolean = true;
  @Input() displayHeader: boolean = true;

  @Output() emitChange: EventEmitter<void> = new EventEmitter<void>();

  public alwaysAvailable;
  public description;

  constructor(private sanitizer: DomSanitizer) {}

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

    this.description = this.sanitizer.bypassSecurityTrustHtml(
      this.feature.description
    );
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
