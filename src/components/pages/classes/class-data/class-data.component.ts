import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/components/meta/base/base.component';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-class-data',
  templateUrl: './class-data.component.html',
  styleUrls: ['./class-data.component.scss'],
})
export class ClassDataComponent extends BaseComponent implements OnInit {
  public classData: any;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    super();
  }

  public override ngOnInit(): void {
    const className = this.route.parent.snapshot.params['name'];
    this.classData = this.dataService.getClass(className);

    this.pageTitle = this.classData.name;
    super.ngOnInit();
  }

  public levelKeys(object: any): string[] {
    return Object.keys(object)
      .map((l) => parseInt(l))
      .sort((a, b) => a - b)
      .map((l) => l.toString());
  }

  public numbers(i: number): string {
    switch (i) {
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
    }
  }
}
