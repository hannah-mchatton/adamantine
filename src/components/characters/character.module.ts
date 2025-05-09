import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterBuilderModule } from './builder/character-builder.module';
import { CharacterSheetModule } from './sheet/character-sheet.module';
import { CharactersComponent } from './characters/characters.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [CharactersComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    CharacterBuilderModule,
    CharacterSheetModule,
    NzButtonModule,
    NzModalModule,
  ],
})
export class CharacterModule {}

