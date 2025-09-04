import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/data/models/character';
import { CharacterBuilderService } from 'src/services/character-builder.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'character-builder-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit {
  @Input() character: Character;
  @Output() emitChange: EventEmitter<void> = new EventEmitter<void>();

  public races = [];
  public raceModalVisible: boolean = false;

  public raceData;
  public subraceData;

  constructor(private dataService: DataService) {
    this.races = this.dataService.getRaces();
  }

  public ngOnInit(): void {
    if (this.character.race.raceKey) {
      this.raceData = this.dataService.getRace(this.character.race.raceKey);
    }
    if (this.character.race.subraceKey) {
      this.raceData = this.dataService.getSubrace(this.character.race.raceKey, this.character.race.subraceKey);
    }
  }

  public setRace(raceIndex: string): void {
    this.raceModalVisible = false;

    if (this.character.race.raceKey !== raceIndex) {
      this.character.race.raceKey = raceIndex;
      this.character.race.subraceKey = undefined;
      this.emitChange.emit();

      this.raceData = this.dataService.getRace(raceIndex);
      this.subraceData = undefined;
    }
  }

  public setSubrace(): void {
    if (this.character.race.subraceKey !== this.subraceData.name) {
      this.character.race.subraceKey = this.subraceData.name;
      this.emitChange.emit();
    }
  }
}
