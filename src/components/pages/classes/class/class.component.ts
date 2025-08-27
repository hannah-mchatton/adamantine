import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  @Input()
  set name(className: string) {
    this.class = this.dataService.getClass(className);
  }
  public class;

  public dataService: DataService;

  public tabName: string = 'class';

  constructor(
    dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataService = dataService;
  }

  public ngOnInit(): void {
    this.tabName = this.route.firstChild?.snapshot?.url[0]?.path ?? 'class';
  }

  public ceiling(value: number): number {
    if (value < 1) {
      return 0;
    } else {
      return Math.ceil(value);
    }
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
