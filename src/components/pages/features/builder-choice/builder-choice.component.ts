import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Store } from '@ngrx/store';
import { Update } from '../builder.actions';
import { selectUpdate } from '../builder.selectors';
import { CharacterBuilderService } from 'src/services/character-builder.service';
import { CharacterSheetService } from 'src/services/character-sheet.service';

interface IPrereq {
  race?: string[];
  subrace?: string[];
  spellcasting?: boolean;
  light?: boolean;
  medium?: boolean;
  heavy?: boolean;
  martial?: boolean;

  str?: number;
  dex?: number;
  con?: number;
  int?: number;
  wis?: number;
  cha?: number;
}

@Component({
  selector: 'app-builder-choice',
  templateUrl: './builder-choice.component.html',
  styleUrls: ['./builder-choice.component.scss'],
})
export class BuilderChoiceComponent implements OnInit {
  @Input() characterObj: any;

  @Input() sourceId: string = '';
  @Input() sourceValue: string = '';
  @Input() choice: any;
  @Input() subChoice = false;

  @Input() level = 0;
  @Input() characterLevel = 21;

  @Input() characterId: string;
  @Input() classLevel = 0;

  public genericListKeys: string[] = [];
  public choiceOptions: any[] = [];

  public choiceValue: any = null;
  public choiceOption: any;

  public dataService: DataService;

  constructor(
    dataService: DataService,
    private characterBuilderService: CharacterBuilderService,
    private store: Store,
    private changeRef: ChangeDetectorRef
  ) {
    this.dataService = dataService;
  }

  public async ngOnInit() {
    await this.characterBuilderService.getCharacterFromDb(this.characterId);

    this.genericListKeys = this.dataService.getGenericListKeys();

    const choiceEntry = this.characterObj?.choices.find(
      (ch: any) => ch.id === this.choice.id
    );
    if (choiceEntry) {
      this.choiceValue = choiceEntry.value;
    }

    this.store.select(selectUpdate).subscribe((update) => {
      if (update) {
        setTimeout(async () => {
          if (!this.characterBuilderService.character) {
            await this.characterBuilderService.getCharacterFromDb(
              this.characterId
            );
          } else if (
            Object.keys(this.characterBuilderService.character).length === 0
          ) {
            await this.characterBuilderService.getCharacterFromDb(
              this.characterId
            );
          }

          this.setup();
          this.changeRef.detectChanges();
        }, 100);
      }
    });
  }

  private setup() {
    this.choiceOptions = this.getChoiceOptions(this.choice);

    if (this.choiceOptions[0]?.options) {
      if (
        this.choiceOptions?.length &&
        !this.choiceOptions.find((ol: any) => {
          return ol?.options?.find(
            (o: any) => o.name === this.choiceValue || o === this.choiceValue
          );
        }) &&
        !(this.choiceValue === null)
      ) {
        this.choiceValue = null;
        this.onChange();
      }
    } else {
      if (
        this.choiceOptions?.length &&
        !this.choiceOptions.find(
          (o: any) => o.name === this.choiceValue || o === this.choiceValue
        ) &&
        !(this.choiceValue === null)
      ) {
        this.choiceValue = null;
        this.onChange();
      }
    }

    if (this.choiceValue !== null) {
      if (this.choice.type === 'trait') {
        this.choiceOption = this.choice.options.find(
          (o: any) => o.name === this.choiceValue
        );
      } else if (this.choice.type === 'spell') {
        this.choiceOption = this.dataService.getSpell(this.choiceValue);
      } else if (this.choice.type === 'exploit') {
        this.choiceOption = this.dataService.getExploit(this.choiceValue);
      } else if (this.choice.type === 'feat') {
        this.choiceOption = this.dataService.getFeat(this.choiceValue);
      } else if (this.genericListKeys.includes(this.choice.type)) {
        this.choiceOption = this.dataService.getGenericListItem(
          this.choice.type,
          this.choiceValue
        );
      }
    }
  }

  public choiceTypes(value: any): boolean {
    return value[0]?.options !== undefined;
  }

  public onChange(): void {
    const choiceEntry = this.characterObj.choices.find(
      (ch: any) => ch.id === this.choice.id
    );
    if (choiceEntry) {
      choiceEntry.value = this.choiceValue;
    } else {
      this.characterObj.choices.push({
        id: this.choice.id,
        sourceId: this.sourceId,
        sourceValue: this.sourceValue,
        value: this.choiceValue,
        level: this.choice.level,
      });
    }

    if (this.choiceValue !== null) {
      if (this.choice.type === 'trait') {
        this.choiceOption = this.choice.options.find(
          (o: any) => o.name === this.choiceValue
        );
      } else if (this.choice.type === 'spell') {
        this.choiceOption = this.dataService.getSpell(this.choiceValue);
      } else if (this.choice.type === 'exploit') {
        this.choiceOption = this.dataService.getExploit(this.choiceValue);
      } else if (this.choice.type === 'feat') {
        this.choiceOption = this.dataService.getFeat(this.choiceValue);
      } else if (this.genericListKeys.includes(this.choice.type)) {
        this.choiceOption = this.dataService.getGenericListItem(
          this.choice.type,
          this.choiceValue
        );
      }
    }

    this.store.dispatch(new Update());
  }

  private getChoiceOptions(choice) {
    let choiceOptions = [];
    if (Array.isArray(choice.type)) {
      for (let type of choice.type) {
        const temp = JSON.parse(JSON.stringify(choice));
        temp.type = type;

        let options = this.getChoiceOptions(temp);
        choiceOptions.push({
          name: type,
          options: options,
        });
      }
    } else {
      if (choice?.type !== 'trait') {
        if (this.dataService.getGenericKeys().includes(choice?.type)) {
          choiceOptions = this.dataService.getGeneric(choice.type);
          if (choice.limits) {
            choiceOptions = choiceOptions.filter((o: any) =>
              choice.limits.includes(o)
            );
          }
        } else if (choice?.type === 'spell') {
          if (choice.id.includes('sorcerer')) {
            choiceOptions = this.dataService
              .getSpellsByListUnsplit('all')
              .filter(
                (s: any) =>
                  s.level === (choice.level ?? 10) &&
                  (s.lists.includes('Arcane') ||
                    (this.characterObj.subclass === 'Divine Soul' &&
                      s.lists.includes('Divine')) ||
                    (this.characterObj.subclass === 'Verdant Soul' &&
                      s.lists.includes('Primal')) ||
                    (this.characterObj.subclass === 'Eldritch Soul' &&
                      s.lists.includes('Occult')) ||
                    (this.characterObj.subclass === 'Aberrant Soul' &&
                      s.lists.includes('Psionic')) ||
                    (this.characterObj.subclass === 'Clockwork Soul' &&
                      s.lists.includes('Invention')) ||
                    (this.characterObj.subclass === 'Musical Soul' &&
                      s.lists.includes('Melodic')))
              );

            choiceOptions = choiceOptions.filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.name === value.name)
            );
          } else if (choice.id.includes('vessel')) {
            choiceOptions = this.dataService
              .getSpellsByListUnsplit('all')
              .filter(
                (s: any) =>
                  s.level === (choice.level ?? 10) &&
                  (s.lists.includes('Occult') ||
                    (this.characterObj.subclass === 'Ascended' &&
                      s.lists.includes('Arcane')) ||
                    (this.characterObj.subclass === 'Conduit' &&
                      s.lists.includes('Divine')))
              );

            choiceOptions = choiceOptions.filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.name === value.name)
            );
          } else if (choice.id === 'signature-cantrip') {
            choiceOptions = this.dataService
              .getSpellsByListUnsplit('all')
              .filter(
                (s: any) =>
                  s.level === (choice.level ?? 10) && s.lists.includes('Occult')
              );

            choiceOptions = choiceOptions.filter((spell) => {
              return (
                spell.castingTime === '1 action' &&
                spell.damage &&
                !spell.duration.includes('Concentration') &&
                !spell.multi
              );
            });

            choiceOptions = choiceOptions.filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.name === value.name)
            );
          } else {
            choiceOptions = this.dataService
              .getSpellsByListUnsplit('all')
              .filter(
                (s: any) =>
                  (s.level === (choice.level ?? 10) &&
                    (choice.list?.includes(s.school) ||
                      choice.list === s.school ||
                      s.lists.find((l: string) =>
                        choice.list?.includes(
                          l.toLowerCase() || choice.list === l.toLowerCase()
                        )
                      ))) ||
                  choice.limits?.includes(s.name)
              );
          }
          choiceOptions = choiceOptions.filter((s) => !s.unique);
        } else if (choice?.type === 'exploit') {
          choiceOptions = this.dataService
            .getExploitsByListUnsplit('all')
            .filter(
              (e: any) =>
                (e.degree <= (choice.degree ?? 6) &&
                  e.lists.find(
                    (l: string) =>
                      choice?.list.includes(l.toLowerCase()) ||
                      choice?.list === l.toLowerCase()
                  )) ||
                choice.limits?.includes(e.name)
            );
        } else if (this.genericListKeys?.includes(choice?.type)) {
          choiceOptions = this.dataService
            .getExtraTabDataUnsplit(choice.type)
            .filter((i: any) => !i.prereq && !i.prereqLevel);

          if (choice.options) {
            choiceOptions = choiceOptions.filter((i: any) =>
              choice.options.includes(i.name)
            );
          }

          if (choice.type === 'fighting-style') {
            for (let o of choiceOptions) {
              if (
                [
                  'Arcane Warrior',
                  'Blessed Warrior',
                  'Druidic Warrior',
                  'Esoteric Warrior',
                ].includes(o.name)
              ) {
                for (let c of o.choices) {
                  c.ability = choice.ability;
                }
              }
            }
          }
        } else if (choice?.type === 'asi') {
          choiceOptions = choice.options.filter(async (o: any) => {
            if (o === this.choiceOption) {
              return true;
            }

            let score = this.characterBuilderService.getScoreSync(o);
            return score < 20;
          });
        } else if (choice?.type === 'text') {
          choiceOptions = choice.options;
        } else if (choice?.type === 'feat') {
          choiceOptions = this.dataService
            .getFeatsUnsplit()
            .filter((f: any) => {
              if (!f.prereq) {
                return true;
              }
              for (let p of f.prereq) {
                const prereq: IPrereq = p;

                if (prereq.race) {
                  for (let i = 0; i < prereq.race.length; i++) {
                    const race = prereq.race[i];

                    let isRace =
                      this.characterBuilderService.characterIsRace(race);
                    if (isRace) {
                      if (prereq.subrace?.length) {
                        if (prereq.subrace[i]?.length) {
                          switch (typeof prereq.subrace[i]) {
                            case 'string':
                              return this.characterBuilderService.characterIsSubace(
                                prereq.subrace[i]
                              );
                            case 'object':
                              for (let subrace of prereq.subrace[i]) {
                                if (
                                  this.characterBuilderService.characterIsSubace(
                                    subrace
                                  )
                                ) {
                                  return true;
                                }
                                return false;
                              }
                          }
                        }
                      }
                      return true;
                    }
                  }
                } else if (prereq.spellcasting) {
                  return true;
                } else if (prereq.light) {
                  return true;
                } else if (prereq.medium) {
                  return true;
                } else if (prereq.heavy) {
                  return true;
                } else if (prereq.martial) {
                  return true;
                } else {
                  let score = this.characterBuilderService.getScoreSync(
                    Object.keys(prereq)[0]
                  );
                  if (score) {
                    const prereqScore: number = Object.values(prereq)[0];
                    return score >= prereqScore;
                  }
                }
              }
              return false;
            });
        }
      } else {
        choiceOptions = choice.options;
        if (choice.id === 'draconic-legacy') {
          choiceOptions = choiceOptions.filter((o: any) => {
            if (o.name.includes('Pureblood')) {
              if (o.name.includes('Chromatic')) {
                return [
                  'Black',
                  'Blue',
                  'Green',
                  'Purple',
                  'Red',
                  'White',
                ].includes(this.characterObj.subrace);
              }
              if (o.name.includes('Gem')) {
                return [
                  'Amethyst',
                  'Crystal',
                  'Emerald',
                  'Moonstone',
                  'Obsidian',
                  'Ruby',
                  'Sapphire',
                  'Topaz',
                ].includes(this.characterObj.subrace);
              }
              if (o.name.includes('Metallic')) {
                return [
                  'Brass',
                  'Bronze',
                  'Copper',
                  'Gold',
                  'Platinum',
                  'Silver',
                  'Steel',
                  'Tungsten',
                ].includes(this.characterObj.subrace);
              }
              if (o.name.includes('Planar')) {
                return [
                  'Adamantine',
                  'Arboreal',
                  'Astral',
                  'Battle',
                  'Beast',
                  'Blight',
                  'Chaos',
                  'Chole',
                  'Concordant',
                  'Edict',
                  'Elysian',
                  'Gloom',
                  'Hellfire',
                  'Howling',
                  'Mirage',
                  'Paradise',
                  'Pyroclastic',
                  'Radiant',
                  'Rust',
                  'Tarterian',
                ].includes(this.characterObj.subrace);
              }
            } else {
              return true;
            }
          });
        } else if (choice.id === 'metallic-breath') {
          choiceOptions = choiceOptions.filter((o: any) =>
            o.name.includes(this.characterObj.subrace)
          );
        } else if (choice.id === 'planar-breath') {
          choiceOptions = choiceOptions.filter((o: any) =>
            o.name.includes(this.characterObj.subrace)
          );
        }
      }
    }

    return choiceOptions;
  }
}
