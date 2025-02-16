import { Component } from '@angular/core';
import { BaseComponent } from 'src/components/meta/base/base.component';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-racial-feat-tab',
  templateUrl: './racial-feat-tab.component.html',
  styleUrls: ['./racial-feat-tab.component.scss'],
})
export class RacialFeatTabComponent extends BaseComponent {
  public dataService: DataService;

  public override pageTitle: string = 'Racial Feats';
  public localhost: boolean = false;

  constructor(dataService: DataService) {
    super();
    this.dataService = dataService;
  }
  public feats: any[] = [];
  public races: any[] = [];

  public override ngOnInit(): void {
    this.feats = this.dataService.getFeatsUnsplit();
    this.races = this.dataService.getRaces();

    if (window.location.href.includes('localhost')) {
      this.localhost = true;
    }

    super.ngOnInit();
  }

  public getRacialFeats(race: string): any[] {
    return this.feats.filter((f) => {
      if ((f?.prereq ?? [])[0]?.race?.includes(race.toLowerCase())) {
        return true;
      }
      return false;
    });
  }
}
