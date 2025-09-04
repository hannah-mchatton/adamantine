import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
})
export class RaceComponent implements OnInit {
  @Input()
  set name(raceName: string) {
    this.race = this.dataService.getRace(raceName);
  }
  public race: any;
  public asiString = '';
  public languageString = '';

  public dataService: DataService;

  public tabName: string = 'race';

  constructor(
    dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataService = dataService;
  }

  ngOnInit(): void {
    this.tabName = this.route.firstChild?.snapshot?.url[0]?.path ?? 'race';
  }

  public nameUrlEncode(name: string): string {
    return name?.replace(/[ '"\(\)!\/:,]/g, '-')?.toLowerCase() ?? '';
  }

  public changeRoute(route: string) {
    this.tabName = route;
    this.router.navigate([route], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }
}
