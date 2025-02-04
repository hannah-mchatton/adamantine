import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-sheet-choice',
  templateUrl: './sheet-choice.component.html',
  styleUrls: ['./sheet-choice.component.scss'],
})
export class SheetChoiceComponent implements OnInit {
  @Input() characterObj: any;

  @Input() choice: any;

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
      (c: any) => c.id === this.choice.id
    );
    if (choiceEntry) {
      if (this.choice.type === 'trait') {
        const option = this.choice.options.find(
          (o: any) => o.name === choiceEntry.value
        );
        return option?.traits ?? [];
      } else if (this.genericKeys.includes(this.choice.type)) {
        return this.dataService.getGenericListItem(
          this.choice.type,
          choiceEntry.value
        );
      } else {
        return {
          name: '',
          description: choiceEntry.value,
        };
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
