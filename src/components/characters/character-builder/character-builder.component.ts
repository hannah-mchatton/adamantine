import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { BaseComponent } from 'src/components/meta/base/base.component';
import { AbilityScores } from 'src/data/models/ability-scores';
import { Character } from 'src/data/models/character';
import { CharacterBackground } from 'src/data/models/character-background';
import { CharacterCurrency, CharacterEquipment } from 'src/data/models/character-equipment';
import { CharacterRace } from 'src/data/models/character-race';
import { CharacterUses } from 'src/data/models/character-uses';
import { CharacterBuilderService } from 'src/services/character-builder.service';
import { DBService } from 'src/services/db.service';

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.scss']
})
export class CharacterBuilderComponent extends BaseComponent implements OnInit {
  @Input()
  set guid(guid: string) {
    this.characterId = guid;
  }

  characterId: string;
  character: Character;

  hasChange = false;

  private saveSubject = new Subject<void>();

  constructor(private dbService: DBService, private builderService: CharacterBuilderService) {
    super();

    // Only autosave after a minute of unsaved changes without any new changes
    this.saveSubject.pipe(debounceTime(60000)).subscribe(() => {
      if (this.hasChange) {
        this.saveCharacter();
      }
    })
  }

  override async ngOnInit(): Promise<void> {
    // await this.dbService.getCharacter(this.characterId).then((character) => {
    //   this.character = character;
    // });

    this.character = new Character();
    this.character.classes = [];
    this.character.currency = new CharacterCurrency();
    this.character.equipment = [];
    this.character.race = new CharacterRace();
    this.character.race.raceKey = 'dragonborn';
    this.character.scores = new AbilityScores();
    this.character.choices = [];
    this.character.uses = [];

    super.ngOnInit();
  }

  public saveCharacter() {
    console.info('saving');
    this.hasChange = false;
  }

  public characterChanged() {
    this.hasChange = true;
    this.cleanup();
    this.saveSubject.next();
  }

  private cleanup() {
    this.character.choices = this.character.choices.filter(ch => {
      return !ch.invalidChoice;
    })

    // Clean up the choices so we don't have a bunch of extra stuff clogging up the system
    this.character.choices = this.character.choices.filter(ch => {
      switch (ch.sourceId) {
        case 'race':
          return this.character.race?.raceKey === ch.sourceValue;
        case 'subrace':
          return this.character.race?.subraceKey === ch.sourceValue;
        case 'class':
          return !!this.character.classes?.find(c => c.classKey === ch.sourceValue);
        case 'subclass':
          return !!this.character.classes?.find(c => c.subclassKey === ch.sourceValue);
        default:
          return !!this.character.choices.find(c => c.value?.includes(ch.sourceValue));
      }
    })
  }
}
