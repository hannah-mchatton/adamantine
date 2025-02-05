import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/components/meta/base/base.component';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent extends BaseComponent {
  @Input()
  set list(spellList: string) {
    this.spells = this.dataService.getSpellsByList(spellList);
    this.elemental = spellList === 'elemental';
    this.showUnique = spellList === 'all';

    this.pageTitle = `${this.capitalize(spellList)} Spells`;
  }
  @Input() maxLevel: number = 10;
  @Input() cantrips: boolean = true;
  public elemental = false;
  public showUnique = false;
  public spells: any[] = [];

  public tabIndex = 0;

  public dataService: DataService;

  constructor(dataService: DataService) {
    super();
    this.dataService = dataService;
  }

  public spellLists(spell: any) {
    if (spell?.lists?.length) {
      return spell.lists
        .sort()
        .map((l) => {
          if (l === 'Elemental') {
            return `Elemental<sup>${spell.element ?? ''}</sup>`;
          } else {
            return l;
          }
        })
        .join(', ');
    } else {
      return '';
    }
  }
}
