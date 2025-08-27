import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/components/meta/base/base.component';
import { DBService } from 'src/services/db.service';

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.scss']
})
export class CharacterBuilderComponent extends BaseComponent implements OnInit {
  @Input()
  set guid(guid: string) {
    this.characterId = guid;
  }

  characterId: string;
  character: CharacterData;

  constructor(private dbService: DBService) {super();}

  override async ngOnInit(): Promise<void> {
    await this.dbService.getCharacter(this.characterId).then((character) => {
      this.character = character;
    });

    super.ngOnInit();
  }
}
