import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { get } from 'http';
import { Update } from 'src/components/pages/features/builder.actions';
import { selectUpdate } from 'src/components/pages/features/builder.selectors';
import { CharacterSheetService } from 'src/services/character-sheet.service';
import { DataService } from 'src/services/data.service';
import { GeneralStoreService } from 'src/services/general-store.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DBService } from 'src/services/db.service';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
})
@HostListener('unloaded')
export class CharacterSheetComponent implements OnInit {
  @Input()
  set guid(id: string) {
    this.characterId = id;
  }
  public characterId;
  public character: any;
  private dbCharacter: any;
  public loaded = false;

  public gritFeature: any = {
    name: 'Grit',
    description:
      'If you drop to 0 hit points, but are not killed outright, you can choose to declare Grit at any point before your next turn. Grit represents your character using up the last of their strength for a final effort.</p><p>Grit lasts for 1 minute, during which no healing magic will work on you, and no effect can cause you to become unconscious, dead, or prevent you from using your turn, such as the stunned or paralyzed conditions. After the minute elapses, you die.',
  };

  public scores: any[] = [
    {
      name: 'Strength',
      abbreviation: 'str',
    },
    {
      name: 'Dexterity',
      abbreviation: 'dex',
    },
    {
      name: 'Constitution',
      abbreviation: 'con',
    },
    {
      name: 'Intelligence',
      abbreviation: 'int',
    },
    {
      name: 'Wisdom',
      abbreviation: 'wis',
    },
    {
      name: 'Charisma',
      abbreviation: 'cha',
    },
    {
      name: 'Honor',
      abbreviation: 'hon',
    },
    {
      name: 'Sanity',
      abbreviation: 'san',
    },
  ];

  public settingsModal: boolean = false;

  public hp: number;

  public skills: any[] = [];
  public skillProfs: any[] = [];
  public skillOverrides: any[] = [];
  public passiveBonuses: any = {};

  public tools: any[] = [];
  public toolProfs: any[] = [];
  public toolOverrides: any[] = [];

  public saveProfs: any;

  public senses: any;
  public senseString: string = '';

  public backgroundFeature: any;
  public backgroundFeat: any;
  public backgroundFeat4: any;

  public characterSpells: any[] = [];
  public spellAbilities: string[] = [];
  public characterExploits: any[] = [];
  public exploitAbilities: string[] = [];

  public profs: any = {};
  public defenses: any = {};

  public weaponAttacks: any[] = [];

  public notes: string = '';
  public hpModal = false;
  public acModal = false;
  public speedModal = false;

  public currHp;
  public tempHp = 0;
  public hpMod = 0;

  public initBonus = 0;
  public saveBonus;

  public speeds;
  public jumping;

  public telepathy = 0;

  public creatureType = '';

  // TODO: remove this and replace with automatic calculation
  public ac = 0;

  public skillModalVisible = false;
  public skillModalItem;

  constructor(
    private characterSheetService: CharacterSheetService,
    private dataService: DataService,
    private generalStoreService: GeneralStoreService,
    private store: Store,
    private notification: NzNotificationService,
    private dbService: DBService
  ) {}

  async ngOnInit() {
    await this.setup();

    this.store.select(selectUpdate).subscribe(async (update) => {
      if (update) {
        if (this.character && this.loaded) {
          const data = {
            ...this.dbCharacter,
            ...this.character,
          };

          this.dbService.setCharacterNoUser(this.characterId, data);

          this.dbCharacter = data;

          this.calculateHp();
          this.tempHp = this.character.tempHp ?? 0;
          this.generateWeaponAttacks();
        }
      }
    });
  }

  private async setup() {
    await this.dbService.getCharacter(this.characterId).then((val) => {
      this.character = val;
      this.dbCharacter = JSON.parse(JSON.stringify(this.character));
    });

    await this.characterSheetService.getCharacterFromDb(this.characterId);

    this.skills = this.characterSheetService.skillData;
    await this.characterSheetService
      .getCharacterSkillProficiencies(this.characterId)
      .then((val) => (this.skillProfs = val));

    this.tools = this.characterSheetService.toolData;
    await this.characterSheetService
      .getCharacterToolProficiencies(this.characterId)
      .then((val) => (this.toolProfs = val));

    await this.characterSheetService
      .getSaveProfs(this.characterId)
      .then((val) => (this.saveProfs = val));
    await this.characterSheetService
      .getSenses(this.characterId)
      .then((val) => (this.senses = val));
    for (let [sense, range] of Object.entries(this.senses)) {
      this.senseString += `
        <div class="sense">
          <strong>${this.capitalize(sense)}:</strong> ${range} ft.
        </div>
      `;
    }
    await this.characterSheetService
      .getCharacterSkillOverrides(this.characterId)
      .then((val) => (this.skillOverrides = val));
    await this.characterSheetService
      .getCharacterToolOverrides(this.characterId)
      .then((val) => (this.toolOverrides = val));

    await this.characterSheetService
      .getCharacterPassives(this.characterId)
      .then((val) => (this.passiveBonuses = val));

    await this.characterSheetService
      .getCharacterSpells(this.characterId)
      .then((val) => (this.characterSpells = val));
    this.spellAbilities = [
      ...new Set(
        this.characterSpells
          .map((level: any) => {
            return level.spells.map((s: any) => s.ability);
          })
          .flat()
          .sort((a: string, b: string) => {
            const aIndex =
              this.scores.findIndex((s: any) => s.abbreviation === a) ?? 0;
            const bIndex =
              this.scores.findIndex((s: any) => s.abbreviation === b) ?? 0;
            return aIndex - bIndex;
          })
      ),
    ];

    await this.characterSheetService
      .getCharacterExploits(this.characterId)
      .then((val) => (this.characterExploits = val));
    this.exploitAbilities = [
      ...new Set(
        this.characterExploits
          .map((degree: any) => {
            return degree.exploits.map((s: any) => s.ability);
          })
          .flat()
          .sort((a: string, b: string) => {
            const aIndex =
              this.scores.findIndex((s: any) => s.abbreviation === a) ?? 0;
            const bIndex =
              this.scores.findIndex((s: any) => s.abbreviation === b) ?? 0;
            return aIndex - bIndex;
          })
      ),
    ];

    if (this.character.background) {
      const featureChoice = this.character.background.choices.find(
        (c: any) => c.id === 'bg-feature'
      );
      if (featureChoice) {
        this.backgroundFeature = this.dataService.getGenericListItem(
          'bg-feature',
          featureChoice.value
        );
      }
      const featChoice = this.character.background.choices.find(
        (c: any) => c.id === 'bg-feat'
      );
      if (featChoice) {
        this.backgroundFeat = this.dataService.getFeat(featChoice.value);
      }
      const featChoice4 = this.character.background.choices.find(
        (c: any) => c.id === 'bg-feat-4'
      );
      if (featChoice4) {
        this.backgroundFeat4 = this.dataService.getFeat(featChoice4.value);
      }
    }
    this.notes = this.character.notes ?? '';

    await this.characterSheetService
      .getCharacterProficiencies(this.characterId)
      .then((val) => (this.profs = val));

    await this.characterSheetService
      .getCharacterDefenses(this.characterId)
      .then((val) => (this.defenses = val));

    await this.characterSheetService
      .getInitBonus(this.characterId)
      .then((val) => (this.initBonus = val));
    await this.characterSheetService
      .getSaveBonus(this.characterId)
      .then((val) => (this.saveBonus = val));

    this.ac = this.character.ac ?? 0;

    await this.characterSheetService
      .getSpeeds(this.characterId)
      .then((val) => (this.speeds = val));
    await this.characterSheetService
      .getJumping(this.characterId)
      .then((val) => (this.jumping = val));
    await this.characterSheetService
      .getTelepathy(this.characterId)
      .then((val) => {
        this.telepathy = val;
      });

    await this.characterSheetService
      .getCreatureType(this.characterId)
      .then((val) => (this.creatureType = val));

    this.loaded = true;

    this.calculateHp();
    this.tempHp = this.character.tempHp ?? 0;
    this.generateWeaponAttacks();
  }

  private async calculateHp() {
    this.hp = 0;
    if (this.character.classes) {
      for (let c of this.character.classes) {
        this.hp += c.hp.reduce((partialSum, a) => partialSum + a, 0);
      }
    }

    this.hp += this.modifierNumber('con') * this.characterLevel();
    await this.characterSheetService
      .getHpBonus(this.characterId)
      .then((val) => (this.hp += val * this.characterLevel()));

    if (this.hp < 1) {
      this.hp = 1;
    }

    if (this.character.hp !== this.hp) {
      this.character.hp = this.hp;
      this.store.dispatch(new Update());
    }

    if (this.character.currHp === undefined) {
      this.currHp = 0;
    } else {
      this.currHp = this.character.currHp;
    }
  }
  public heal() {
    this.currHp -= this.hpMod;
    if (this.currHp < 0) {
      this.currHp = 0;
    }

    this.hpMod = 0;
    this.character.currHp = this.currHp;
    this.updateTempHp();
  }
  public damage() {
    this.tempHp = this.parseInt(this.tempHp);
    if (this.tempHp > 0) {
      this.tempHp -= this.hpMod;
      if (this.tempHp < 0) {
        this.currHp -= this.tempHp;
        this.tempHp = 0;
      }
    } else {
      this.currHp += this.hpMod;
    }
    if (this.currHp > this.hp) {
      this.currHp = this.hp;
    }

    this.hpMod = 0;
    this.character.currHp = this.currHp;
    this.updateTempHp();
  }
  public updateTempHp() {
    this.tempHp = this.parseInt(this.tempHp);
    this.character.tempHp = this.tempHp;

    this.store.dispatch(new Update());
  }
  public updateAc() {
    this.ac = this.parseInt(this.ac);
    this.character.ac = this.ac;

    this.store.dispatch(new Update());
  }
  public parseInt(number) {
    return parseInt(number);
  }

  public getSpeeds() {
    const speedArray = [];
    for (let k of Object.keys(this.speeds)) {
      speedArray.push({
        name: this.capitalize(k),
        value: this.speeds[k],
      });
    }

    return speedArray;
  }

  public shortRest(template) {
    this.notification.template(template);

    let values: any[] = Object.values(this.character);
    for (let object of values) {
      if (object?.uses) {
        for (let use of object.uses) {
          if (use.reset === 1) {
            use.currUses = use.maxUses;
          }
        }
      } else if (Array.isArray(object)) {
        for (let o of object) {
          if (o?.uses) {
            for (let use of o.uses) {
              if (use.reset === 1) {
                use.currUses = use.maxUses;
              }
            }
          }
        }
      }
    }

    for (let use of this.character.uses ?? []) {
      if (use.reset === 1) {
        use.currUses = use.maxUses;
      }
    }
    this.store.dispatch(new Update());
  }
  public longRest(template) {
    this.character.currHp = 0;
    this.character.tempHp = 0;

    this.store.dispatch(new Update());

    this.notification.template(template);

    let values: any[] = Object.values(this.character);
    for (let object of values) {
      if (object?.uses) {
        for (let use of object.uses) {
          if (use.reset) {
            use.currUses = use.maxUses;
          }
        }
      } else if (Array.isArray(object)) {
        for (let o of object) {
          if (o?.uses) {
            for (let use of o.uses) {
              if (use.reset) {
                use.currUses = use.maxUses;
              }
            }
          }
        }
      }
    }

    for (let use of this.character.uses ?? []) {
      if (use.reset) {
        use.currUses = use.maxUses;
      }
    }
    this.store.dispatch(new Update());
  }

  private generateWeaponAttacks() {
    this.weaponAttacks = [];

    for (let e of this.character.equipment?.items?.sort((a, b) =>
      a.item.localeCompare(b.item)
    ) ?? []) {
      let weaponData;
      if (this.generalStoreService.isWeapon(e.item)) {
        weaponData = this.generalStoreService.weaponData(
          this.generalStoreService.getItem(e.item)
        );
      }

      if (weaponData) {
        let ability = 'str';
        if (weaponData.ranged) {
          ability = 'dex';
        } else if (weaponData.finesse) {
          if (this.getScore('str') < this.getScore('dex')) {
            ability = 'dex';
          }
        }

        let proficient = false;
        if (
          this.profs.weapons?.findIndex(
            (w: string) => w.toLowerCase() === e.item.toLowerCase()
          ) !== -1
        ) {
          proficient = true;
        } else {
          const ref = ['simple', 'martial', 'exotic'];
          proficient = this.profs.weapons?.find(
            (w: string) => w.toLowerCase() === ref[weaponData.profLevel]
          );
        }

        this.weaponAttacks.push({
          name: e.item,
          damage: weaponData.damage,
          ability,
          proficient,
          properties: weaponData.properties,
        });
      }
    }
  }

  public getSubheader() {
    let subheader = '';

    if (this.character.race) {
      subheader += `${this.character.subrace ?? ''} ${
        this.character.race.name
      }`;
    }
    if (this.character.classes) {
      this.character.classes.forEach((c, index) => {
        if (index) {
          subheader += ` /`;
        }

        subheader += ` ${c.name} ${c.level}`;
        if (c.subclass) {
          subheader += ` (${c.subclass})`;
        }
      });
    }

    return subheader;
  }

  public getSetting(setting: string) {
    return (this.character.settings ?? {})[setting] ?? 0;
  }
  public updateSetting(setting: string, value: number) {
    if (!this.character.settings) {
      this.character.settings = {};
    }
    this.character.settings[setting] = value;

    this.store.dispatch(new Update());
  }

  public getRaceFeatures(): any[] {
    return this.dataService.getRace(this.character.race.name)?.traits;
  }
  public getSubraceFeatures(): any[] {
    return this.dataService.getSubrace(
      this.character.race.name,
      this.character.race.subrace
    )?.traits;
  }

  public getClassFeatures(c: any): any[] {
    const featureObj = this.dataService.getClass(c.name).features;
    const features = [];

    for (let level = 1; level <= c.level; level++) {
      if (featureObj[level]) {
        features.push(...featureObj[level]);
      }
    }

    return features;
  }
  public getSubclassFeatures(c: any): any[] {
    const featureObj = this.dataService.getSubclass(
      c.name,
      c.subclass
    ).features;
    const features = [];

    for (let level = 1; level <= c.level; level++) {
      if (featureObj[level]) {
        features.push(...featureObj[level]);
      }
    }

    return features;
  }

  public capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  public saveIsProficient(score: string): boolean {
    if (!this.saveProfs) {
      return false;
    }
    return this.saveProfs[score];
  }
  public getSaveMod(score: string): number {
    if (score === 'death') {
      return (
        this.proficiencyBonus() * (this.saveIsProficient(score) ? 1 : 0) +
        (this.saveBonus[score] ?? 0)
      );
    }
    return (
      this.modifierNumber(score) +
      this.proficiencyBonus() * (this.saveIsProficient(score) ? 1 : 0) +
      (this.saveBonus[score] ?? 0)
    );
  }
  public saveMod(score): string {
    return this.formatModifier(this.getSaveMod(score));
  }

  public getSkillProfLevel(skill): number {
    return (
      this.skillProfs.find((p: any) => {
        if (skill.skill) {
          return p.value === skill.skill;
        }
        return p.value === skill.name;
      })?.level ?? 0
    );
  }
  public getSkillMod(skill): number {
    let scoreMod: number = this.modifierNumber(skill.score);
    let proficiencyBonus = this.proficiencyBonus();
    let profLevel = this.getSkillProfLevel(skill);

    const override = this.skillOverrides.find(
      (o: any) => o.skill === skill.name
    );
    if (override) {
      for (let ability of override.abilities) {
        const abilityMod = this.modifierNumber(ability);
        if (abilityMod > scoreMod) {
          scoreMod = abilityMod;
        }
      }
    }

    return scoreMod + Math.floor(proficiencyBonus * profLevel);
  }
  public skillMod(skill): string {
    return this.formatModifier(this.getSkillMod(skill));
  }
  public initiativeMod(): string {
    return this.formatModifier(
      this.getSkillMod({
        name: 'Initiative',
        score: 'dex',
      }) + this.initBonus
    );
  }
  public getPassiveMod(skill): number {
    if (Object.keys(this.passiveBonuses).includes(skill.name)) {
      return 10 + this.getSkillMod(skill) + this.passiveBonuses[skill.name];
    } else {
      return 10 + this.getSkillMod(skill);
    }
  }
  public getSkillScore(skill): number {
    let score = skill.score;
    let scoreMod: number = this.modifierNumber(skill.score);

    const override = this.skillOverrides.find(
      (o: any) => o.skill === skill.name
    );
    if (override) {
      for (let ability of override.abilities) {
        const abilityMod = this.modifierNumber(ability);
        if (abilityMod > scoreMod) {
          scoreMod = abilityMod;
          score = ability;
        }
      }
    }

    return score;
  }

  public getToolProfLevel(tool): number {
    return (
      this.toolProfs.find((p: any) => {
        return p.value === tool.name;
      })?.level ?? 0
    );
  }
  public getToolMod(tool): number {
    let scoreMod: number = this.modifierNumber(tool.score);
    let proficiencyBonus = this.proficiencyBonus();
    let profLevel = this.getToolProfLevel(tool);

    const override = this.toolOverrides.find((o: any) => o.tool === tool.name);
    if (override) {
      for (let ability of override.abilities) {
        const abilityMod = this.modifierNumber(ability);
        if (abilityMod > scoreMod) {
          scoreMod = abilityMod;
        }
      }
    }

    return scoreMod + Math.floor(proficiencyBonus * profLevel);
  }
  public toolMod(tool): string {
    return this.formatModifier(this.getToolMod(tool));
  }
  public getToolScore(tool): number {
    let score = tool.score;
    let scoreMod: number = this.modifierNumber(tool.score);

    const override = this.toolOverrides.find((o: any) => o.tool === tool.name);
    if (override) {
      for (let ability of override.abilities) {
        const abilityMod = this.modifierNumber(ability);
        if (abilityMod > scoreMod) {
          scoreMod = abilityMod;
          score = ability;
        }
      }
    }

    return score;
  }

  public characterLevel() {
    if (this.character?.classes) {
      return this.character.classes.reduce(
        (partialSum, a) => partialSum + a.level,
        0
      );
    }
    return 0;
  }
  public proficiencyBonus() {
    return Math.floor(2 + (this.characterLevel() - 1) / 4);
  }

  public getScore(score: string): number {
    return (this.character.scores?.actual ?? {})[score] ?? 1;
  }
  public getModifier(score: string): number | string {
    return this.modifier(this.getScore(score));
  }
  public modifierNumber(score: string): number {
    return parseInt(this.modifier(this.getScore(score)).toString());
  }

  public modifier(score: number, format: boolean = false): number | string {
    let mod = -5;
    if (score) {
      mod = Math.floor((score - 10) / 2);
    }

    if (format) {
      return this.formatModifier(mod);
    }
    return mod;
  }

  public formatModifier(modifier: number): string {
    if (modifier !== undefined) {
      if (modifier > 0) {
        return `+${modifier}`;
      } else {
        return modifier.toString();
      }
    }
    return '';
  }
  public formatModifierSplit(modifier: number): string {
    if (modifier !== undefined) {
      if (modifier > 0) {
        return `+ ${modifier}`;
      } else if (modifier < 0) {
        return `- ${Math.abs(modifier)}`;
      }
    }
    return '';
  }

  public updateNotes(): void {
    if (!this.character.notes) {
      this.character.notes = '';
    }

    this.character.notes = this.notes;
    this.store.dispatch(new Update());
  }

  public getClassName(encoded: string): string {
    const classData = this.dataService.getClass(encoded);
    return classData?.name ?? encoded;
  }

  public getDamageString(damageData: any[], ability: string) {
    return damageData
      .map((d: any, index) => {
        if (index === 0) {
          return `${d.dice}d${d.die} ${this.formatModifierSplit(
            this.modifierNumber(ability)
          )} ${this.formatDamageTypes(d.types)}`;
        } else {
          return `${d.dice}d${d.die} ${this.formatDamageTypes(d.types)}`;
        }
      })
      .join(' + ');
  }
  public formatDamageTypes(types: string[]) {
    return types
      .map((t: string) => {
        return `<span class="mdi mdi-${this.characterSheetService.damageIcons[t]}" title="${t}"></span>`;
      })
      .join(',');
  }

  public getDamageIcon(damageType: string) {
    return this.characterSheetService.damageIcons[damageType];
  }
  public getConditionIcon(condition: string) {
    return this.characterSheetService.conditionIcons[
      condition.toLowerCase().replace(' ', '')
    ];
  }
  public hasResistance() {
    return !!this.defenses.damage.find((d) => d.level === 1);
  }
  public hasDamageImmunity() {
    return !!this.defenses.damage.find((d) => d.level === 2);
  }
  public hasConditionAdvantage() {
    return !!this.defenses.condition.find((d) => d.level === 1);
  }
  public hasConditionImmunity() {
    return !!this.defenses.condition.find((d) => d.level === 2);
  }

  public getLongJump() {
    const thief =
      this.character.classes?.find((c) => c.name === 'rogue')?.subclass ===
      'Thief';
    let jumpScore = 'str';
    if (thief && this.getScore('str') < this.getScore('dex')) {
      jumpScore = 'dex';
    }

    if (this.jumping.standing) {
      return (
        (this.getScore(jumpScore) + this.jumping.modifier) *
        Math.max(this.jumping.multiplier, 1)
      );
    }

    return [
      (Math.floor(this.getScore(jumpScore) / 2) + this.jumping.modifier) *
        Math.max(this.jumping.multiplier, 1),
      (this.getScore(jumpScore) + this.jumping.modifier) *
        Math.max(this.jumping.multiplier, 1),
    ];
  }
  public getHighJump() {
    const thief =
      this.character.classes?.find((c) => c.name === 'rogue')?.subclass ===
      'Thief';
    let jumpScore = 'str';
    if (thief && this.getScore('str') < this.getScore('dex')) {
      jumpScore = 'dex';
    }

    if (this.jumping.standing) {
      return (
        (this.modifierNumber(jumpScore) + this.jumping.modifier) *
        Math.max(this.jumping.multiplier, 1)
      );
    }

    return [
      (Math.floor(this.modifierNumber(jumpScore) / 2) + this.jumping.modifier) *
        Math.max(this.jumping.multiplier, 1),
      (this.modifierNumber(jumpScore) + this.jumping.modifier) *
        Math.max(this.jumping.multiplier, 1),
    ];
  }

  public getBiggestSpeed() {
    let speedIndex = 'walk';
    let speedAmount = this.speeds.walk;

    for (let k of Object.keys(this.speeds)) {
      if (this.speeds[k] > speedAmount) {
        speedIndex = k;
        speedAmount = this.speeds[k];
      }
    }

    return speedIndex;
  }
}
