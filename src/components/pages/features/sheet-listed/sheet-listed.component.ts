import { Component, Input } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-sheet-listed',
  templateUrl: './sheet-listed.component.html',
  styleUrls: ['./sheet-listed.component.scss'],
})
export class SheetListedComponent {
  @Input() characterObj: any;

  @Input() listed: any;

  @Input() level = 0;

  @Input() characterLevel = 21;
  @Input() characterId;
  @Input() classLevel = 0;

  public genericKeys: string[] = [];
  public choiceValue: any;

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.genericKeys = this.dataService.getGenericListKeys();
    this.choiceValue = this.getChoiceValue();
  }

  private getChoiceValue() {
    const choiceEntry = this.characterObj.choices.find(
      (c: any) => c.id === this.listed.id
    );
    if (choiceEntry) {
      if (this.genericKeys.includes(this.listed.type)) {
        if (this.listed.type === 'ki-technique') {
          const subclassItems = [];
          if (this.characterObj.subclass) {
            const subclassData = this.dataService.getSubclass(
              this.characterObj.name,
              this.characterObj.subclass
            );
            if (subclassData) {
              let feature;
              if (this.listed.type === 'ki-technique') {
                feature = subclassData.features['3'][0];
              }

              for (let item of feature.granted[0].options) {
                const itemData = this.dataService.getGenericListItem(
                  this.listed.type,
                  item
                );
                if (
                  !itemData.prereqLevel ||
                  itemData.prereqLevel <= this.characterLevel
                ) {
                  subclassItems.push(itemData);
                }
              }
            }
          }

          return [
            ...choiceEntry.list.map((l: string) =>
              this.dataService.getGenericListItem(this.listed.type, l)
            ),
            ...subclassItems,
          ];
        } else {
          return choiceEntry.list.map((l: string) =>
            this.dataService.getGenericListItem(this.listed.type, l)
          );
        }
      } else if (
        ['spell', 'exploit', 'cantrip', 'language'].includes(this.listed.type)
      ) {
        return;
      }
    }
    return {
      name: '',
      description: 'No Choices Made',
    };
  }

  public isArray(array: any): boolean {
    return Array.isArray(array);
  }
}
