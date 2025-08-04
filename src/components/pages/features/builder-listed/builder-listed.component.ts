import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Update } from '../builder.actions';
import { selectUpdate } from '../builder.selectors';
import { Store } from '@ngrx/store';
import { CharacterBuilderService } from 'src/services/character-builder.service';
import { CharacterSheetService } from 'src/services/character-sheet.service';
import { max } from 'rxjs';

@Component({
  selector: 'app-builder-listed',
  templateUrl: './builder-listed.component.html',
  styleUrls: ['./builder-listed.component.scss'],
})
export class BuilderListedComponent implements OnInit {
  @Input() characterObj: any;

  @Input() listed: any;
  @Input() sourceId: string = '';
  @Input() sourceValue: string = '';

  @Input() level = 0;
  @Input() characterLevel = 21;

  @Input() characterId: string;
  @Input() classLevel = 0;

  public options: any[] = [];
  public displayOptions: any[] = [];
  public selectedOptions: any[] = [];
  public maximum: number = 0;
  public noMaximum = false;

  public modalOption: any;
  public modalVisible = false;

  public search: string = '';

  constructor(
    private characterBuilderService: CharacterBuilderService,
    private characterSheetService: CharacterSheetService,
    private dataService: DataService,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.select(selectUpdate).subscribe(async (update) => {
      if (update) {
        this.getListOptions();
        await this.getMaximum();

        this.searchOptions();
      }
    });
  }

  public stringify(value: any) {
    return JSON.stringify(value);
  }

  private async getMaximum() {
    if (this.listed.maximums) {
      if (this.characterLevel === 21) {
        this.maximum = this.listed.maximums[this.listed.maximums.length - 1];
      } else {
        this.maximum = this.listed.maximums[this.characterLevel - 1];
      }
    } else {
      this.noMaximum = true;
    }

    if (this.listed.addToMaximum) {
      if (this.listed.addToMaximum.includes('-')) {
        const choiceEntry = this.characterObj.choices.find(
          (ch: any) => ch.id === this.listed.addToMaximum
        );
        if (choiceEntry) {
          let maximum;
          await this.characterBuilderService
            .getModifier(this.characterId, choiceEntry.value)
            .then((val) => (maximum = val));
          this.maximum += maximum;
        }
      } else {
        let maximum;
        await this.characterBuilderService
          .getModifier(this.characterId, this.listed.addToMaximum)
          .then((val) => (maximum = val));
        this.maximum += maximum;
      }
    }

    if (this.maximum < 0) {
      this.maximum = 0;
    }
  }

  private getListOptions(): void {
    if (this.listed.type === 'spell') {
      if (this.listed.id === 'wizard-prepared-spells') {
        const spellbook = this.characterObj.choices.find(
          (c: any) => c.id === 'wizard-spellbook'
        );
        if (spellbook?.list) {
          this.options = this.dataService
            .getSpellsByListUnsplit(this.listed.list)
            .filter((s: any) => {
              return spellbook.list.includes(s.name);
            })
            .sort((a, b) => {
              if (a.level < b.level) {
                return -1;
              } else if (a.level === b.level) {
                return a.name.localeCompare(b.name);
              } else {
                return 1;
              }
            });
        }
      } else if (this.listed.id === 'pale-master-prepared-spells') {
        const spellbook = this.characterObj.choices.find(
          (c: any) => c.id === 'pale-master-grimoire'
        );
        if (spellbook?.list) {
          this.options = this.dataService
            .getSpellsByListUnsplit(this.listed.list)
            .filter((s: any) => {
              return spellbook.list.includes(s.name);
            })
            .sort((a, b) => {
              if (a.level < b.level) {
                return -1;
              } else if (a.level === b.level) {
                return a.name.localeCompare(b.name);
              } else {
                return 1;
              }
            });
        }
      } else if (this.listed.id === 'magus-prepared-spells') {
        const spellbook = this.characterObj.choices.find(
          (c: any) => c.id === 'magus-spellbook'
        );
        if (spellbook?.list) {
          this.options = this.dataService
            .getSpellsByListUnsplit(this.listed.list)
            .filter((s: any) => {
              return spellbook.list.includes(s.name);
            })
            .sort((a, b) => {
              if (a.level < b.level) {
                return -1;
              } else if (a.level === b.level) {
                return a.name.localeCompare(b.name);
              } else {
                return 1;
              }
            });
        }
      } else if (this.listed.id === 'magus-known-spells') {
        if (this.characterObj.subclass === 'Order of Arcanists') {
          this.options = [];
        } else {
          const maxSpellLevel = Math.max(
            Math.ceil(this.characterLevel / (this.listed.spellcasterType * 2)),
            this.listed.maxLevel ?? -1
          );

          this.options = this.dataService
            .getSpellsByListUnsplit(this.listed.list)
            .filter((s: any) => {
              if (this.listed.ritualsOnly) {
                return s.ritual ?? false;
              }
              if (s.level === 0) {
                return this.listed.allowCantrips ?? false;
              }
              return s.level <= maxSpellLevel;
            })
            .sort((a, b) => {
              if (a.level < b.level) {
                return -1;
              } else if (a.level === b.level) {
                return a.name.localeCompare(b.name);
              } else {
                return 1;
              }
            });
        }
      } else if (this.listed.id === 'sorcerer-spells') {
        const maxSpellLevel = Math.max(
          Math.ceil(this.characterLevel / (this.listed.spellcasterType * 2)),
          this.listed.maxLevel ?? -1
        );

        this.options = [
          ...this.dataService.getSpellsByListUnsplit(this.listed.list),
          ...(this.characterObj.subclass === 'Divine Soul'
            ? this.dataService.getSpellsByListUnsplit('divine')
            : []),
          ...(this.characterObj.subclass === 'Verdant Soul'
            ? this.dataService.getSpellsByListUnsplit('primal')
            : []),
          ...(this.characterObj.subclass === 'Clockwork Soul'
            ? this.dataService.getSpellsByListUnsplit('invention')
            : []),
          ...(this.characterObj.subclass === 'Eldritch Soul'
            ? this.dataService.getSpellsByListUnsplit('occult')
            : []),
          ...(this.characterObj.subclass === 'Aberrant Soul'
            ? this.dataService.getSpellsByListUnsplit('psionic')
            : []),
          ...(this.characterObj.subclass === 'Musical Soul'
            ? this.dataService.getSpellsByListUnsplit('melodic')
            : []),
        ]
          .filter((s: any) => {
            if (this.listed.ritualsOnly) {
              return s.ritual ?? false;
            }
            if (s.level === 0) {
              return this.listed.allowCantrips ?? false;
            }
            return s.level <= maxSpellLevel;
          })
          .sort((a, b) => {
            if (a.level < b.level) {
              return -1;
            } else if (a.level === b.level) {
              return a.name.localeCompare(b.name);
            } else {
              return 1;
            }
          });

        this.options = this.options.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.name === value.name)
        );
      } else if (this.listed.id === 'vessel-magic') {
        const maxSpellLevel = Math.max(
          Math.ceil(this.characterLevel / (this.listed.spellcasterType * 2)),
          this.listed.maxLevel ?? -1
        );

        this.options = [
          ...this.dataService.getSpellsByListUnsplit(this.listed.list),
          ...(this.characterObj.subclass === 'Ascended'
            ? this.dataService.getSpellsByListUnsplit('arcane')
            : []),
          ...(this.characterObj.subclass === 'Conduit'
            ? this.dataService.getSpellsByListUnsplit('divine')
            : []),
        ]
          .filter((s: any) => {
            if (this.listed.ritualsOnly) {
              return s.ritual ?? false;
            }
            if (s.level === 0) {
              return this.listed.allowCantrips ?? false;
            }
            return s.level <= maxSpellLevel;
          })
          .sort((a, b) => {
            if (a.level < b.level) {
              return -1;
            } else if (a.level === b.level) {
              return a.name.localeCompare(b.name);
            } else {
              return 1;
            }
          });

        this.options = this.options.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.name === value.name)
        );
      } else {
        const maxSpellLevel = Math.max(
          Math.ceil(this.characterLevel / (this.listed.spellcasterType * 2)),
          this.listed.maxLevel ?? -1
        );

        this.options = this.dataService
          .getSpellsByListUnsplit(this.listed.list)
          .filter((s: any) => {
            if (this.listed.ritualsOnly) {
              return s.ritual ?? false;
            }
            if (s.level === 0) {
              return this.listed.allowCantrips ?? false;
            }
            return s.level <= maxSpellLevel;
          })
          .sort((a, b) => {
            if (a.level < b.level) {
              return -1;
            } else if (a.level === b.level) {
              return a.name.localeCompare(b.name);
            } else {
              return 1;
            }
          });
      }
    } else if (this.listed.type === 'cantrip') {
      if (this.listed.id === 'sorcerer-cantrips') {
        this.options = [
          ...this.dataService.getSpellsByListUnsplit(this.listed.list),
          ...(this.characterObj.subclass === 'Divine Soul'
            ? this.dataService.getSpellsByListUnsplit('divine')
            : []),
          ...(this.characterObj.subclass === 'Verdant Soul'
            ? this.dataService.getSpellsByListUnsplit('primal')
            : []),
          ...(this.characterObj.subclass === 'Clockwork Soul'
            ? this.dataService.getSpellsByListUnsplit('invention')
            : []),
          ...(this.characterObj.subclass === 'Eldritch Soul'
            ? this.dataService.getSpellsByListUnsplit('occult')
            : []),
          ...(this.characterObj.subclass === 'Aberrant Soul'
            ? this.dataService.getSpellsByListUnsplit('psionic')
            : []),
          ...(this.characterObj.subclass === 'Musical Soul'
            ? this.dataService.getSpellsByListUnsplit('melodic')
            : []),
        ]
          .filter((s: any) => {
            return s.level === 0;
          })
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          });

        this.options = this.options.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.name === value.name)
        );
      } else {
        this.options = this.dataService
          .getSpellsByListUnsplit(this.listed.list)
          .filter((s: any) => {
            return s.level === 0;
          })
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
      }
    } else if (this.listed.type === 'exploit') {
      let maxExploitDegree = Math.max(
        Math.ceil(this.characterLevel / (this.listed.exploitType * 4)),
        this.listed.maxDegree ?? -1
      );
      // Negative exploit types are used to represent mastered exploits
      if (this.listed.exploitType < 0) {
        maxExploitDegree = Math.max(Math.abs(Math.ceil(maxExploitDegree / 2)), 1);
      }

      this.options = this.dataService
        .getExploitsByListUnsplit(this.listed.list)
        .filter((e: any) => {
          return e.degree <= maxExploitDegree;
        })
        .sort((a, b) => {
          if (a.degree < b.degree) {
            return -1;
          } else if (a.degree === b.degree) {
            return a.name.localeCompare(b.name);
          } else {
            return 1;
          }
        });
    } else if (this.listed.type === 'language') {
      this.options = this.dataService.getGeneric('language');
    } else if (
      this.dataService.getGenericListKeys().includes(this.listed.type)
    ) {
      this.options = this.dataService
        .getExtraTabDataUnsplit(this.listed.type)
        .filter((e: any) => {
          if ((e.prereqLevel ?? 0) > this.characterLevel) {
            return false;
          }

          if (e.prereq) {
            if (e.prereq.type === 'choice') {
              const prereqEntry = this.characterObj.choices.find(
                (c: any) => c.id === e.prereq.id
              );
              if (prereqEntry?.value !== e.prereq.value) {
                return false;
              }
            } else if (e.prereq.type === 'subclass') {
              if (this.characterObj?.subclass !== e.prereq.value) {
                return false;
              }
            } else if (e.prereq.type === 'list') {
              const prereqEntry = this.characterObj.choices.find(
                (c: any) => c.id === e.prereq.id
              );
              return prereqEntry?.list?.includes(e.prereq.value);
            }
          }
          return (e.prereqLevel ?? 0) <= this.characterLevel;
        })
        .sort((a: any, b: any) => {
          if (a.prereqLevel < b.prereqLevel) {
            return -1;
          } else if (a.prereqLevel === b.prereqLevel) {
            return a.name.localeCompare(b.name);
          } else {
            return 1;
          }
        });
    }

    if (this.selectedOptions?.length) {
      const temp = this.selectedOptions.filter((so: any) =>
        this.options.find((o: any) => o.name === so)
      );

      if (temp.length !== this.selectedOptions?.length) {
        const listEntry = this.characterObj.choices.find(
          (c: any) => c.id === this.listed.id
        );
        listEntry.list = temp;
        this.selectedOptions = temp;

        this.store.dispatch(new Update());
      }
    }

    const listEntry = this.characterObj.choices.find(
      (c: any) => c.id === this.listed.id
    );
    this.selectedOptions = listEntry?.list;
  }
  public getOption(itemName: string): any {
    return this.dataService.getGenericListItem(this.listed.type, itemName);
  }

  public hasItem(itemName: string): boolean {
    return (
      this.characterObj.choices
        .find((c: any) => c.id === this.listed.id)
        ?.list?.includes(itemName) ?? false
    );
  }
  public addItem(itemName: string): void {
    const listEntry = this.characterObj.choices.find(
      (c: any) => c.id === this.listed.id
    );
    if (listEntry) {
      listEntry.list.push(itemName);
      this.selectedOptions = listEntry.list;
    } else {
      this.characterObj.choices.push({
        id: this.listed.id,
        sourceId: this.sourceId,
        sourceValue: this.sourceValue,
        list: [itemName],
      });
      this.selectedOptions = [itemName];
    }

    this.store.dispatch(new Update());
  }
  public removeItem(itemName: string): void {
    this.characterObj.choices.find((c: any) => c.id === this.listed.id).list =
      this.characterObj.choices
        .find((c: any) => c.id === this.listed.id)
        .list.filter((i: any) => i !== itemName);

    this.selectedOptions = this.characterObj.choices.find(
      (c: any) => c.id === this.listed.id
    ).list;

    this.store.dispatch(new Update());
  }

  public searchOptions(): void {
    this.displayOptions = this.options.filter(
      (o: any) =>
        o.name.toLowerCase().includes(this.search.toLowerCase()) ||
        o.school?.toLowerCase()?.includes(this.search.toLowerCase()) ||
        (o.level !== 0 && this.search.toLowerCase() == o.level) ||
        this.search.toLowerCase() == o.degree ||
        ('cantrip'.includes(this.search.toLowerCase()) && o.level === 0)
    );
  }

  public openModal(option: any): void {
    this.modalOption = option;
    this.modalVisible = true;
  }

  public spellSubtitle(option: any): string {
    switch (option?.level) {
      case 0:
        return `${option.school} cantrip`;
      case 1:
        return `1st-level ${option.school.toLowerCase()} spell`;
      case 2:
        return `2nd-level ${option.school.toLowerCase()} spell`;
      case 3:
        return `3rd-level ${option.school.toLowerCase()} spell`;
      default:
        return `${
          option?.level
        }th-level ${option?.school?.toLowerCase()} spell`;
    }
  }
  public exploitSubtitle(option: any): string {
    switch (option?.degree) {
      case 1:
        return `1st-degree exploit`;
      case 2:
        return `2nd-degree exploit`;
      case 3:
        return `3rd-degree exploit`;
      default:
        return `${option?.degree}th-degree exploit`;
    }
  }
}
