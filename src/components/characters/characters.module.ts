import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';



@NgModule({
  declarations: [
    CharacterBuilderComponent,
    CharactersComponent,
    CharacterSheetComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CharactersModule { }
