import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbilityScore, AbilityScores } from 'src/data/models/ability-scores';
import { Character } from 'src/data/models/character';
import { CharacterBuilderService } from 'src/services/character-builder.service';

@Component({
  selector: 'character-builder-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() character: Character;
  @Output() emitChange: EventEmitter<void> = new EventEmitter<void>();
  
  public stats = [];
  public scores = {str: [], dex: [], con: [], int: [], wis: [], cha: []};

  constructor(private builderService: CharacterBuilderService) {}

  public ngOnInit(): void {
    // If the stats have already been rolled
    if (this.character.scores.canRoll === false) {
      // Get them from the data
      this.stats = this.character.scores.rolls;

      // If the scores have already been assigned
      if (this.character.scores.scores) {
        // Get those too
        for (let score of this.character.scores.scores) {
          this.scores[score.name] = score.baseValue;
        }
      }
    }
  }

  public rollStats(): void {
    this.stats = this.builderService.rollStats();

    this.character.scores.canRoll = false;
    this.character.scores.rolls = [...this.stats];
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer !== event.container) {
      if (
        event.container.id.includes('0') ||
        event.container.data.length === 0
      ) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          1
        );
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          0,
          event.previousIndex
        );
      }
    }

    this.updateCharacterStats();
  }

  private updateCharacterStats(): void {
    if (!this.character.scores.scores) {
      this.character.scores.scores = [];
    }

    // Loop through the local scores
    for (let key of Object.keys(this.scores)) {
      const existingScore = this.character.scores.scores.find(s => s.name === key);
      // If the character object already has that score
      if (existingScore) {
        // Update it
        existingScore.baseValue = this.scores[key][0];
      }
      // If it doesn't
      else {
        // Make a new one
        this.character.scores.scores.push(new AbilityScore(key, this.scores[key][0]))
      }
    }

    this.emitChange.emit();
  }
}
