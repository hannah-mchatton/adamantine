import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.scss'],
})
export class ClassTableComponent {
  @Input() class: any;
  @Input() subclass: boolean = false;
  @Input() startLevel: number = 0;

  @Input() currentLevel: number = -1;

  public levels: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  private spells: number[][] = [
    [2],
    [3],
    [4, 2],
    [4, 2],
    [4, 3, 2],
    [4, 3, 3],
    [4, 3, 3, 1],
    [4, 3, 3, 2],
    [4, 3, 3, 3, 1],
    [4, 3, 3, 3, 2],
    [4, 3, 3, 3, 2, 1],
    [4, 3, 3, 3, 2, 1],
    [4, 3, 3, 3, 2, 1, 1],
    [4, 3, 3, 3, 2, 1, 1],
    [4, 3, 3, 3, 2, 1, 1, 1],
    [4, 3, 3, 3, 2, 1, 1, 1],
    [4, 3, 3, 3, 2, 1, 1, 1, 1],
    [4, 3, 3, 3, 3, 1, 1, 1, 1],
    [4, 3, 3, 3, 3, 2, 1, 1, 1],
    [4, 3, 3, 3, 3, 2, 2, 1, 1],
  ];
  private sorcery: number[] = [
    4, 6, 14, 17, 17, 27, 32, 38, 44, 57, 64, 66, 66, 68, 68, 70, 70, 72, 72,
    75,
  ];
  private pact: number[] = [
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4,
  ];
  private exploit: number[] = [
    2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6,
  ];
  private exploitDie: number[] = [
    4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 8, 8, 8, 8, 8, 8, 10, 10, 10, 10,
  ];
  private exploitLimit: number[] = [
    1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5,
  ];

  public ceiling(value: number): number {
    return Math.ceil(value);
  }

  public getSpellSlots(classLevel: number, slotLevel: number): number | string {
    if (this.class.spellcastingLevel === 2 && classLevel === 1) {
      return '-';
    }
    return (
      this.spells[Math.floor((classLevel - 1) / this.class.spellcastingLevel)][
        slotLevel - 1
      ] ?? '-'
    );
  }
  public getSorceryPoints(classLevel: number): number | string {
    if (this.class.spellcastingLevel === 2 && classLevel === 1) {
      return '-';
    }
    return this.sorcery[
      Math.floor((classLevel - 1) / this.class.spellcastingLevel)
    ];
  }
  public getPactSlots(classLevel: number): number | string {
    if (this.class.spellcastingLevel === 2 && classLevel === 1) {
      return '-';
    }
    return this.pact[
      Math.floor((classLevel - 1) / this.class.spellcastingLevel)
    ];
  }
  public getSpellLimit(classLevel: number): number | string {
    if (this.class.spellcastingLevel === 2 && classLevel === 1) {
      return '-';
    }
    return this.levelFormatter(
      Math.min(
        this.spells[Math.floor((classLevel - 1) / this.class.spellcastingLevel)]
          .length,
        5
      )
    );
  }

  private getExploitDiceNumber(classLevel: number): number {
    return this.exploit[Math.floor((classLevel - 1) / this.class.exploitLevel)];
  }
  private getExploitDieSize(classLevel: number): number {
    if (this.class.name === 'Warlord') {
      return (
        this.exploitDie[
          Math.floor((classLevel - 1) / this.class.exploitLevel)
        ] + 2
      );
    } else {
      return this.exploitDie[
        Math.floor((classLevel - 1) / this.class.exploitLevel)
      ];
    }
  }
  public getExploitDice(classLevel: number): string {
    if (
      classLevel === 1 &&
      this.class.exploitLevel === 1 &&
      this.class.name !== 'Warlord'
    ) {
      return '-';
    }
    return `
    ${this.getExploitDiceNumber(classLevel)}d${this.getExploitDieSize(
      classLevel
    )}`;
  }
  public getExploitLimit(classLevel: number): string {
    if (
      classLevel === 1 &&
      this.class.exploitLevel === 1 &&
      this.class.name !== 'Warlord'
    ) {
      return '-';
    }
    let baseLimit = this.levelFormatter(
      this.exploitLimit[Math.floor((classLevel - 1) / this.class.exploitLevel)]
    );

    if (this.class.exploitLevel === 1) {
      return `${baseLimit} (${this.levelFormatter(
        Math.ceil(
          this.exploitLimit[
            Math.floor((classLevel - 1) / this.class.exploitLevel)
          ] / 2
        )
      )})`;
    }
    return baseLimit;
  }

  public getFeatureString(level: number): string {
    let features = [
      ...(this.class.features[level]
        ?.filter((f: any) => f.table !== false)
        .map((f: any) => f.name) ?? []),
    ];
    if (this.class.fakeFeatures) {
      features = [...features, ...(this.class.fakeFeatures[level] ?? [])];
    }
    let featureString = features.join(', ');
    if (this.class.subclasses[1].features[level]) {
      if (featureString != '') {
        featureString = `${this.class.subclassName}${
          level === this.class.subclassLevel ? '' : ' feature'
        }, ${featureString}`;
      } else {
        featureString = `${this.class.subclassName}${
          level === this.class.subclassLevel ? '' : ' feature'
        }`;
      }
    }

    if (!featureString) {
      featureString = '-';
    }

    return featureString;
  }

  public getColValue(column: any, level: number): any {
    let feature = this.class.features[column.level].find(
      (f: any) => f.name === column.feature
    );
    if (column.subFeature) {
      feature = feature.subFeatures.find(
        (f: any) => f.name === column.subFeature
      );
    }

    let value: string | number = 0;
    if (column.type === 'listed') {
      value = feature.listed.maximums[level - 1];
    } else if (column.type === 'uses') {
      if (!Array.isArray(feature.uses)) {
        value = feature.uses.amount[level - 1];
      } else {
        const uses = feature.uses.find((u) => u.id === column.useId);
        value = uses.amount[level - 1];
      }
    }

    if (value === 0) {
      value = '-';
    } else if (value === -1) {
      value = '∞';
    }

    return value;
  }

  private levelFormatter(level: number): string {
    switch (level) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return `${level}th`;
    }
  }
}
