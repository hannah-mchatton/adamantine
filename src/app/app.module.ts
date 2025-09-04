import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { DatabaseModule } from 'src/components/database/database.module';
import { PagesModule } from 'src/components/pages/pages.module';
import { BestiaryModule } from 'src/components/bestiary/bestiary.module';
import { GeneralStoreModule } from 'src/components/general-store/general-store.module';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DBService } from 'src/services/db.service';
import { DmToolsModule } from 'src/components/dm-tools/dm-tools.module';
import { CraftingModule } from 'src/components/crafting/crafting.module';
import { LoreModule } from 'src/components/lore/lore.module';
import { RulesModule } from 'src/components/rules/rules.module';
import { CharactersModule } from 'src/components/characters/characters.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
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
    MatIconModule,

    PagesModule,
    DatabaseModule,
    BestiaryModule,
    CharactersModule,
    GeneralStoreModule,
    DmToolsModule,
    CraftingModule,
    RulesModule,
    LoreModule,
  ],
  providers: [DataService, DBService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}
