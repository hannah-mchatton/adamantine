import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { Character } from 'src/data/models/character';
import { CharacterChoice } from 'src/data/models/character-choice';
import { CharacterBuilderService } from 'src/services/character-builder.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-builder-choice',
  templateUrl: './builder-choice.component.html',
  styleUrls: ['./builder-choice.component.scss']
})
export class BuilderChoiceComponent implements OnInit {
  @Input() character: Character;
  @Input() choice: any;
  @Input() subChoice = false;
  @Input() sourceId: string;
  @Input() sourceValue: string;

  @Input() level = 0;
  @Input() classLevel = 0;

  @Output() emitChange: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(NzSelectComponent) choiceDropdown: NzSelectComponent;

  public characterChoice: CharacterChoice;
  public choiceList: any[] = [];

  constructor(
    private dataService: DataService,
    private builderService: CharacterBuilderService,
  ) {}

  public ngOnInit(): void {
    if (this.choice) {
      this.choiceList = this.builderService.getChoiceOptions(this.choice, this.character);

      this.characterChoice = this.character.choices.find(
        (c) => c.id === this.choice.id
      );

      if (!this.characterChoice) {
        this.characterChoice = new CharacterChoice(
          this.choice.id,
          this.sourceId,
          this.sourceValue
        );
        this.character.choices.push(this.characterChoice);
      }
    }
  }

  public getChoiceTraits(choiceValue: string): any[] {
    if (choiceValue) {
      if (this.choiceList.find(o => o.name === choiceValue)) {
        const value = this.choice.options.find((o) => o.name === choiceValue);
        return value.traits;
      }
      else {
        this.characterChoice.invalidChoice = true;
      }
    }

    return [];
  }
}
