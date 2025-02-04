import { Component, Input } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-display-choice',
  templateUrl: './display-choice.component.html',
  styleUrls: ['./display-choice.component.scss'],
})
export class DisplayChoiceComponent {
  @Input() choice: any;
  @Input() subChoice = false;

  @Input() level = 0;
  @Input() classLevel = 0;

  constructor(private dataService: DataService) {}

  public getFightingStyle(style: string): any {
    return this.dataService.getGenericListItem('fighting-style', style);
  }
}
