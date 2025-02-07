import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  @Input() noTitle;

  public pageTitle = '';

  public ngOnInit(): void {
    if (!this.noTitle) {
      if (this.pageTitle !== '') {
        document.title = `Adamantine - ${this.pageTitle}`;
      } else {
        document.title = 'Adamantine';
      }
    }
  }

  public capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
  public titleCase(str: string): string {
    return str
      .split(' ')
      .map((substring) => this.capitalize(substring))
      .join(' ');
  }
}
