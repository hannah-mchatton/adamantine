import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';
import { StatsComponent } from './character-builder/stats/stats.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RaceComponent } from './character-builder/race/race.component';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  declarations: [
    CharactersComponent,

    CharacterBuilderComponent,
    StatsComponent,
    RaceComponent,

    CharacterSheetComponent,
  ],
  imports: [
    CommonModule,
    PagesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTableModule,
    NzTabsModule,
    NzCollapseModule,
    NzSelectModule,
    NzModalModule,
    NzButtonModule,
    NzCheckboxModule,
    NzSwitchModule,
    NzRadioModule,
    DragDropModule
  ],
})
export class CharactersModule {}
