import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DataService } from 'src/services/data.service';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClassExtraTabComponent } from './classes/class-extra-tab/class-extra-tab.component';
import { ClassTableComponent } from './classes/class-table/class-table.component';
import { ClassComponent } from './classes/class/class.component';
import { SubclassComponent } from './classes/subclass/subclass.component';
import { ExploitComponent } from './exploits/exploit/exploit.component';
import { ExploitsComponent } from './exploits/exploits/exploits.component';
import { FeatComponent } from './feat/feat.component';
import { RaceComponent } from './races/race/race.component';
import { SubraceComponent } from './races/subrace/subrace.component';
import { SpellComponent } from './spells/spell/spell.component';
import { SpellsComponent } from './spells/spells/spells.component';
import { TfLevelComponent } from './transformations/tf-level/tf-level.component';
import { TransformationComponent } from './transformations/transformation/transformation.component';
import { DisplayChoiceComponent } from './features/display-choice/display-choice.component';
import { DisplayFeatureComponent } from './features/display-feature/display-feature.component';
import { MonsterTraitComponent } from './monster/monster-trait/monster-trait.component';
import { MonsterComponent } from './monster/monster/monster.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ClassSubclassesComponent } from './classes/class-subclasses/class-subclasses.component';
import { ClassDataComponent } from './classes/class-data/class-data.component';
import { SubclassDataComponent } from './classes/subclass-data/subclass-data.component';
import { RaceDataComponent } from './races/race-data/race-data.component';
import { SubracesComponent } from './races/subraces/subraces.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { BuilderFeatureComponent } from './features/builder-feature/builder-feature.component';
import { BuilderChoiceComponent } from './features/builder-choice/builder-choice.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    DisplayChoiceComponent,
    DisplayFeatureComponent,

    BuilderFeatureComponent,
    BuilderChoiceComponent,

    SpellsComponent,
    SpellComponent,
    ExploitsComponent,
    ExploitComponent,
    RaceComponent,
    SubraceComponent,
    ClassComponent,
    ClassTableComponent,
    SubclassComponent,
    ClassExtraTabComponent,
    FeatComponent,
    TransformationComponent,
    TfLevelComponent,
    MonsterComponent,
    MonsterTraitComponent,
    ClassSubclassesComponent,
    ClassDataComponent,
    SubclassDataComponent,
    RaceDataComponent,
    SubracesComponent,
  ],
  imports: [
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
    NzRadioModule
  ],
  providers: [DataService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [
    SpellsComponent,
    SpellComponent,
    ExploitsComponent,
    ExploitComponent,
    RaceComponent,
    SubraceComponent,
    ClassComponent,
    ClassTableComponent,
    SubclassComponent,
    ClassExtraTabComponent,
    FeatComponent,
    TransformationComponent,
    TfLevelComponent,
  ],
  exports: [
    SpellsComponent,
    SpellComponent,
    ExploitsComponent,
    ExploitComponent,
    RaceComponent,
    SubraceComponent,
    ClassComponent,
    ClassTableComponent,
    SubclassComponent,
    ClassExtraTabComponent,
    FeatComponent,
    TransformationComponent,
    TfLevelComponent,

    BuilderFeatureComponent,
    BuilderChoiceComponent
  ],
})
export class PagesModule {}
