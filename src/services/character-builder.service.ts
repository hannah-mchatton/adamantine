import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { DBService } from './db.service';
import { Store } from '@ngrx/store';
import { selectUpdate } from 'src/components/pages/features/builder.selectors';

interface SkillProf {
  id: string;
  value: string;
  level: number;
  instrument?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CharacterBuilderService {
  public skillData = [
    {
      name: 'Acrobatics',
      score: 'dex',
      description:
        "Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you're trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship's deck.  The DM might also call for a Dexterity (Acrobatics) check to see if you can perform acrobatic stunts, including dives, rolls, somersaults, and flips.",
    },
    {
      name: 'Animal Handling',
      score: 'wis',
      description:
        "When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal's intentions, the DM might call for a Wisdom (Animal Handling) check. You also make a Wisdom (Animal Handling) check to control your mount when you attempt a risky maneuver.",
    },
    {
      name: 'Arcana',
      score: 'int',
      description:
        'Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.',
    },
    {
      name: 'Athletics',
      score: 'str',
      description:
        'Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming.',
    },
    {
      name: 'Brawn',
      score: 'str',
      skill: 'Intimidation',
      description:
        'Your Strength (Intimidation) check - referred to as a Strength (Brawn) check - covers influencing a creature purely through threats of physical violence, or through sheer might.',
    },
    {
      name: 'Endurance',
      score: 'con',
      description:
        'Your Constitution (Endurance) check covers attempts to resist the weaknesses of the mortal form.  You make an Endurance check when traveling long distances or attempting to go without food, water, or air.',
    },
    {
      name: 'Etiquette',
      score: 'cha',
      skill: 'Society',
      description:
        'Your Charisma (Society) check - referred to as your Charisma (Etiquette) check - measures your ability to interact with others in the manners of local high society, including the etiquette of your actions.  You may need to make this check to seem as though you belong in a party of nobles or a meeting of crime lords.',
    },
    {
      name: 'Deception',
      score: 'cha',
      description:
        'Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies.',
    },
    {
      name: 'History',
      score: 'int',
      description:
        'Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.',
    },
    {
      name: 'Initiative',
      score: 'dex',
    },
    {
      name: 'Insight',
      score: 'wis',
      description:
        "Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone's next move. Doing so involves gleaning clues from body language, speech habits, and changes in mannerisms.",
    },
    {
      name: 'Intimidation',
      score: 'cha',
      description:
        'When you attempt to influence someone through overt threats, hostile actions, and physical violence, the DM might ask you to make a Charisma (Intimidation) check.',
    },
    {
      name: 'Investigation',
      score: 'int',
      description:
        'When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check. Poring through ancient scrolls in search of a hidden fragment of knowledge might also call for an Intelligence (Investigation) check.',
    },
    {
      name: 'Medicine',
      score: 'wis',
      description:
        'A Wisdom (Medicine) check lets you try to stabilize a dying companion, diagnose an illness, or determine how a creature died.',
    },
    {
      name: 'Nature',
      score: 'int',
      description:
        'Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.',
    },
    {
      name: 'Perception',
      score: 'wis',
      description:
        'Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses.',
    },
    {
      name: 'Performance',
      score: 'cha',
      description:
        'Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment.',
    },
    {
      name: 'Persuasion',
      score: 'cha',
      description:
        'When you attempt to influence someone or a group of people with tact, social graces, or good nature, the DM might ask you to make a Charisma (Persuasion) check. Typically, you use persuasion when acting in good faith, to foster friendships, make cordial requests, or exhibit proper etiquette.',
    },
    {
      name: 'Prayer',
      score: 'cha',
      skill: 'Religion',
      description:
        "Your Charisma (Religion) check - referred to as your Charisma (Prayer) check - determines your ability to communicate and parley with deities or other powerful otherworldly beings, such as a warlock's patron.",
    },
    {
      name: 'Religion',
      score: 'int',
      description:
        'Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults.',
    },
    {
      name: 'Self-Reflection',
      score: 'cha',
      skill: 'Insight',
      description:
        'Your Charisma (Insight) check - referred to as your Charisma (Self-Reflection) check - determines your ability to investigate your own thoughts, feelings, and beliefs. The DM may call for a Self-Reflection check when your character is conflicted or trying to determine what they actually want.',
    },
    {
      name: 'Sleight of Hand',
      score: 'dex',
      description:
        "Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Dexterity (Sleight of Hand) check. The DM might also call for a Dexterity (Sleight of Hand) check to determine whether you can lift a coin purse off another person or slip something out of another person's pocket.",
    },
    {
      name: 'Society',
      score: 'int',
      description:
        'Your Intelligence (Society) check measures your ability to recall information about local customs, languages, and powerful figures such as nobles or criminal empires.',
    },
    {
      name: 'Stealth',
      score: 'dex',
      description:
        'Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.',
    },
    {
      name: 'Survival',
      score: 'wis',
      description:
        'The DM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards.',
    },
    {
      name: 'Technology',
      score: 'int',
      description:
        'Your Intelligence (Technology) check measures your ability to understand complicated technology of science or artifice, as well as your ability to understand constructs.',
    },
  ];
  public toolData = [
    {
      name: 'Air Vehicles',
      score: 'int',
    },
    {
      name: "Alchemist's Supplies",
      score: 'int',
    },
    {
      name: "Angler's Tools",
      score: 'wis',
    },
    {
      name: 'Astral Vehicles',
      score: 'int',
    },
    {
      name: "Blacksmith's Tools",
      score: 'str',
    },
    {
      name: "Brewer's Supplies",
      score: 'wis',
    },
    {
      name: "Calligrapher's Supplies",
      score: 'dex',
    },
    {
      name: "Carpenter's Tools",
      score: 'dex',
    },
    {
      name: "Cartographer's Tools",
      score: 'int',
    },
    {
      name: "Chandler's Tools",
      score: 'int',
    },
    {
      name: "Cobbler's Tools",
      score: 'dex',
    },
    {
      name: "Cook's Utensils",
      score: 'wis',
    },
    {
      name: 'Disguise Kit',
      score: 'cha',
    },
    {
      name: 'Forgery Kit',
      score: 'dex',
    },
    {
      name: "Gardener's Tools",
      score: 'wis',
    },
    {
      name: "Glassblower's Tools",
      score: 'dex',
    },
    {
      name: "Healer's Kit",
      score: 'wis',
    },
    {
      name: 'Herbalism Kit',
      score: 'wis',
    },
    {
      name: "Jeweler's Tools",
      score: 'dex',
    },
    {
      name: 'Land Vehicles',
      score: 'dex',
    },
    {
      name: "Leatherworker's Tools",
      score: 'dex',
    },
    {
      name: "Mason's Tools",
      score: 'str',
    },
    {
      name: "Navigator's Tools",
      score: 'wis',
    },
    {
      name: "Painter's Supplies",
      score: 'cha',
    },
    {
      name: "Poisoner's Kit",
      score: 'int',
    },
    {
      name: "Potter's Tools",
      score: 'cha',
    },
    {
      name: 'Surgery Kit',
      score: 'int',
    },
    {
      name: "Tailor's Tools",
      score: 'dex',
    },
    {
      name: "Thieves' Tools",
      score: 'dex',
    },
    {
      name: "Tinker's Tools",
      score: 'int',
    },
    {
      name: 'Water Vehicles',
      score: 'wis',
    },
    {
      name: "Weaver's Tools",
      score: 'dex',
    },
    {
      name: "Whitesmith's Tools",
      score: 'dex',
    },
    {
      name: "Woodcarver's Tools",
      score: 'dex',
    },
    {
      name: 'Bowling',
      score: 'dex',
    },
    {
      name: 'Darts',
      score: 'dex',
    },
    {
      name: 'Dice',
      score: 'wis',
    },
    {
      name: 'Dominoes',
      score: 'wis',
    },
    {
      name: 'Dragonchess',
      score: 'int',
    },
    {
      name: 'Playing Cards',
      score: 'wis',
    },
    { name: 'Bagpipes', score: 'cha', instrument: true },
    { name: 'Birdpipes', score: 'cha', instrument: true },
    { name: 'Drum', score: 'cha', instrument: true },
    { name: 'Dulcimer', score: 'cha', instrument: true },
    { name: 'Flute', score: 'cha', instrument: true },
    { name: 'Glaur', score: 'cha', instrument: true },
    { name: 'Hand Drum', score: 'cha', instrument: true },
    { name: 'Horn', score: 'cha', instrument: true },
    { name: 'Longhorn', score: 'cha', instrument: true },
    { name: 'Lute', score: 'cha', instrument: true },
    { name: 'Lyre', score: 'cha', instrument: true },
    { name: 'Pan Flute', score: 'cha', instrument: true },
    { name: 'Shawm', score: 'cha', instrument: true },
    { name: 'Songhorn', score: 'cha', instrument: true },
    { name: 'Tantan', score: 'cha', instrument: true },
    { name: 'Thelarr', score: 'cha', instrument: true },
    { name: 'Tocken', score: 'cha', instrument: true },
    { name: 'Viol', score: 'cha', instrument: true },
    { name: 'Wargong', score: 'cha', instrument: true },
    { name: 'Whistle-Stick', score: 'cha', instrument: true },
    { name: 'Yarting', score: 'cha', instrument: true },
    { name: 'Zulkoon', score: 'cha', instrument: true },
  ];

  constructor(
    private dataService: DataService,
    private dbService: DBService,
    private store: Store
  ) {
    this.store.select(selectUpdate).subscribe(() => {
      this.character = undefined;
    });
  }

  private getChoiceItems(
    choice: any,
    choices: any[],
    featureFunc: (feature: any, choices: any) => any[]
  ) {
    let skillList = [];

    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        skillList = [...skillList, ...featureFunc(trait, choices)];
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        skillList = [...skillList, ...featureFunc(feat, choices)];
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        skillList = [...skillList, ...featureFunc(data, choices)];
      }
    }

    return skillList;
  }
  private getListedItems(
    listed: any,
    choices: any[],
    featureFunc: (feature: any, choices: any) => any[]
  ) {
    let skillList = [];

    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          skillList = [...skillList, ...featureFunc(data, choices)];
        }
      }
    } else if (this.dataService.getGenericKeys().includes(listed?.type)) {
      skillList.push(...(choiceEntry?.list ?? []));
    }

    return skillList;
  }
  private adjustLevels(skillProfs: SkillProf[]): SkillProf[] {
    skillProfs = skillProfs.sort((a, b) => {
      if (a.value.localeCompare(b.value) < 0) {
        return -1;
      } else if (a.value.localeCompare(b.value) === 0) {
        return b.level - a.level;
      } else {
        return 1;
      }
    });

    skillProfs = skillProfs.map((prof: SkillProf) => {
      if (prof.level === 1.5) {
        if (
          skillProfs.find(
            (p: SkillProf) => p.value === prof.value && p.level >= 1
          )
        ) {
          prof.level = 2;
        } else {
          prof.level = 1;
        }
      }

      return prof;
    });

    skillProfs = skillProfs.filter((prof: SkillProf) => {
      if (
        skillProfs.find(
          (p: SkillProf) => p.value === prof.value && p.level > prof.level
        )
      ) {
        return false;
      }
      return true;
    });

    return skillProfs;
  }

  public character;
  public async getCharacterFromDb(characterId: string) {
    await this.dbService
      .getCharacter(characterId)
      .then((c) => (this.character = c));
  }

  public async getTotalLevel(characterId: string) {
    if (!this.character && !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    return (
      this.character?.classes?.reduce(
        (partialSum, a) => partialSum + a.level,
        0
      ) ?? 0
    );
  }

  public getScoreSync(score: string) {
    return (this.character?.scores?.actual ?? {})[score] || 1;
  }
  public getModifierSync(score: string) {
    return Math.floor((this.getScoreSync(score) - 10) / 2);
  }
  public async getScore(characterId: string, score: string) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    return (this.character?.scores?.actual ?? {})[score] || 1;
  }
  public async getModifier(characterId: string, score: string) {
    let mod;
    await this.getScore(characterId, score).then((score) => {
      mod = Math.floor((score - 10) / 2);
    });

    return mod;
  }

  public getCharacterSkillProficiencies() {
    let skillProfs: any[] = [];

    const skillList = this.dataService.getGeneric('skill');

    this.character?.race?.choices?.forEach((choice) => {
      if (skillList.includes(choice.value)) {
        skillProfs.push({
          id: choice.id,
          value: choice.value,
          level: choice.level,
        });
      }
    });
    const raceData = this.dataService.getRace(this.character?.race?.name);
    let subraceData;
    if (this.character?.race?.subrace) {
      subraceData = this.dataService.getSubrace(
        this.character?.race.name,
        this.character?.race.subrace
      );
    }

    if (raceData) {
      for (let trait of raceData.traits) {
        skillProfs.push(
          ...this.getFeatureSkillProfs(trait, this.character?.race.choices)
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        skillProfs.push(
          ...this.getFeatureSkillProfs(trait, this.character?.race.choices)
        );
      }
    }

    this.character?.classes?.forEach((c) => {
      c.choices.forEach((choice) => {
        if (skillList.includes(choice.value)) {
          skillProfs.push({
            id: choice.id,
            value: choice.value,
            level: choice.level,
          });
        }
      });

      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            skillProfs.push(...this.getFeatureSkillProfs(feature, c.choices));
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            skillProfs.push(...this.getFeatureSkillProfs(feature, c.choices));
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (skillList.includes(choice.value)) {
        skillProfs.push({
          id: choice.id,
          value: choice.value,
          level: choice.level,
        });
      }

      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          skillProfs.push(
            ...this.getFeatureSkillProfs(
              featData,
              this.character?.background.choices
            )
          );
        }
      }
    });
    this.character?.genius?.choices.forEach((choice) => {
      if (skillList.includes(choice.value)) {
        skillProfs.push({
          id: choice.id,
          value: choice.value,
          level: choice.level,
        });
      }
    });
    this.character?.override?.choices.forEach((choice) => {
      if (skillList.includes(choice.value)) {
        skillProfs.push({
          id: choice.id,
          value: choice.value,
          level: choice.level,
        });
      }
    });

    skillProfs = this.adjustLevels(skillProfs);
    return skillProfs;
  }
  private getFeatureSkillProfs(feature: any, choices: any[]) {
    let skillList = [];

    feature.granted?.forEach((g) => {
      if (g.type === 'skill' && g.options && Array.isArray(g.options)) {
        skillList.push(
          ...g.options.map((o: any) => {
            return {
              id: '',
              value: o,
              level: g.level,
            };
          })
        );
      } else if (g.type === 'skill' && g.options === 'all') {
        for (let skill of this.skillData) {
          if (
            !skillList.find(
              (s) =>
                s.value === (skill.skill ?? skill.name) && s.level >= g.level
            )
          ) {
            skillList.push({
              id: '',
              value: skill.skill ?? skill.name,
              level: g.level,
            });
          }
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      skillList.push(...this.getFeatureSkillProfs(s, choices));
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        skillList = [
          ...skillList,
          ...this.getChoiceItems(
            choice,
            choices,
            this.getFeatureSkillProfs.bind(this)
          ),
        ];
      }
    } else {
      skillList = [
        ...skillList,
        ...this.getChoiceItems(
          feature.choices,
          choices,
          this.getFeatureSkillProfs.bind(this)
        ),
      ];
    }

    if (feature.listed) {
      skillList = [
        ...skillList,
        ...this.getListedItems(
          feature.listed,
          choices,
          this.getFeatureSkillProfs.bind(this)
        ),
      ];
    }

    return skillList;
  }

  public getCharacterToolProficiencies() {
    let skillProfs: SkillProf[] = [];

    const instruments = [...this.dataService.getGeneric('instrument')];
    const skillList = [
      ...this.dataService.getGeneric('game'),
      ...instruments,
      ...this.dataService.getGeneric('tool'),
    ];

    this.character?.race?.choices?.forEach((choice) => {
      if (skillList.includes(choice.value)) {
        skillProfs.push({
          id: choice.id,
          value: choice.value,
          level: choice.level,
          instrument: instruments.includes(choice.value),
        });
      }
    });
    const raceData = this.dataService.getRace(this.character?.race?.name);
    let subraceData;
    if (this.character?.race?.subrace) {
      subraceData = this.dataService.getSubrace(
        this.character?.race.name,
        this.character?.race.subrace
      );
    }

    if (raceData) {
      for (let trait of raceData.traits) {
        skillProfs.push(
          ...this.getFeatureToolProfs(trait, this.character?.race.choices)
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        skillProfs.push(
          ...this.getFeatureToolProfs(trait, this.character?.race.choices)
        );
      }
    }

    this.character?.classes?.forEach((c) => {
      c.choices.forEach((choice) => {
        if (skillList.includes(choice.value)) {
          skillProfs.push({
            id: choice.id,
            value: choice.value,
            level: choice.level,
            instrument: instruments.includes(choice.value),
          });
        }
      });

      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            skillProfs.push(...this.getFeatureToolProfs(feature, c.choices));
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            skillProfs.push(...this.getFeatureToolProfs(feature, c.choices));
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (skillList.includes(choice.value)) {
        skillProfs.push({
          id: choice.id,
          value: choice.value,
          level: choice.level,
          instrument: instruments.includes(choice.value),
        });
      }

      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          skillProfs.push(
            ...this.getFeatureToolProfs(
              featData,
              this.character?.background.choices
            )
          );
        }
      }
    });
    this.character?.genius?.choices.forEach((choice) => {
      if (skillList.includes(choice.value)) {
        skillProfs.push({
          id: choice.id,
          value: choice.value,
          level: choice.level,
          instrument: instruments.includes(choice.value),
        });
      }
    });
    this.character?.override?.choices.forEach((choice) => {
      if (skillList.includes(choice.value)) {
        skillProfs.push({
          id: choice.id,
          value: choice.value,
          level: choice.level,
          instrument: instruments.includes(choice.value),
        });
      }
    });

    skillProfs = this.adjustLevels(skillProfs);
    return skillProfs;
  }
  private getFeatureToolProfs(feature: any, choices: any[]) {
    let skillList = [];
    const instruments = [...this.dataService.getGeneric('instrument')];

    feature.granted?.forEach((g) => {
      if (
        ['game', 'instrument', 'tool'].includes(g.type) &&
        g.options &&
        Array.isArray(g.options)
      ) {
        skillList.push(
          ...g.options.map((o: any) => {
            return {
              id: '',
              value: o,
              level: g.level,
              instrument: instruments.includes(o),
            };
          })
        );
      } else if (
        ['game', 'instrument', 'tool'].includes(g.type) &&
        g.options === 'all'
      ) {
        for (let skill of this.toolData) {
          if (
            !skillList.find((s) => s.value === skill.name && s.level >= g.level)
          ) {
            skillList.push({
              id: '',
              value: skill.name,
              level: g.level,
            });
          }
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      skillList.push(...this.getFeatureToolProfs(s, choices));
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        skillList = [
          ...skillList,
          ...this.getChoiceItems(
            choice,
            choices,
            this.getFeatureToolProfs.bind(this)
          ),
        ];
      }
    } else {
      skillList = [
        ...skillList,
        ...this.getChoiceItems(
          feature.choices,
          choices,
          this.getFeatureToolProfs.bind(this)
        ),
      ];
    }

    if (feature.listed) {
      skillList = [
        ...skillList,
        ...this.getListedItems(
          feature.listed,
          choices,
          this.getFeatureToolProfs.bind(this)
        ),
      ];
    }

    return skillList;
  }

  public characterIsRace(race: string) {
    return this.character?.race?.name?.toLowerCase() === race.toLowerCase();
  }
  public characterIsSubace(subrace: string) {
    return this.character?.race?.subrace
      ?.toLowerCase()
      .includes(subrace.toLowerCase());
  }
}
