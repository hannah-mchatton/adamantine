import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { GeneralStoreService } from './general-store.service';
import { features } from 'process';
import { DBService } from './db.service';

interface SkillProf {
  id: string;
  value: string;
  level: number;
  instrument?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CharacterSheetService {
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
        'Your Strength (Athletics) check covers feats of physical strength, including climbing, swimming, and jumping.  It is also used when you attempt to grapple, shove, or trip a creature.',
    },
    {
      name: 'Brawn',
      score: 'str',
      skill: 'Intimidation',
      description:
        'Your Strength (Intimidation) check - referred to as a Strength (Brawn) check - covers influencing a creature purely through imposing stature, threats of physical violence, or inducing pain.',
    },
    {
      name: 'Deception',
      score: 'cha',
      description:
        'Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies, though bending the truth is often easier than fabricating a falsehood.',
    },
    {
      name: 'Endurance',
      score: 'con',
      description:
        'Your Constitution (Endurance) check covers attempts to resist the weaknesses of the mortal form, and push beyond your physical limits.  You make an Endurance check when traveling long distances or attempting to go without food, water, air, or sleep.',
    },
    {
      name: 'Etiquette',
      score: 'cha',
      skill: 'Society',
      description:
        'Your Charisma (Society) check - referred to as a Charisma (Etiquette) check - measures your ability to interact with others in the manners of local high society, including the etiquette of your actions.  You may need to make this check to seem as though you belong in a party of nobles or a meeting of crime bosses.',
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
      description:
        'Your Dexterity (Initiative) check measures how quickly you react to danger.  It is most often called for at the start of combat to determine the turn order.',
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
        "Your Charisma (Religion) check - referred to as a Charisma (Prayer) check - determines your ability to communicate and parley with deities or other powerful otherworldly beings, such as a warlock's patron.",
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
    { name: 'Accordion', score: 'cha', instrument: true },
    { name: 'Bagpipes', score: 'cha', instrument: true },
    { name: 'Bass', score: 'cha', instrument: true },
    { name: 'Cello', score: 'cha', instrument: true },
    { name: 'Clarinet', score: 'cha', instrument: true },
    { name: 'Cymbals', score: 'cha', instrument: true },
    { name: 'Drum', score: 'cha', instrument: true },
    { name: 'Flute', score: 'cha', instrument: true },
    { name: 'Gong', score: 'cha', instrument: true },
    { name: 'Guitar, acoustic', score: 'cha', instrument: true },
    { name: 'Guitar, banjo', score: 'cha', instrument: true },
    { name: 'Guitar, bass', score: 'cha', instrument: true },
    { name: 'Guitar, electric', score: 'cha', instrument: true },
    { name: 'Guitar, ukelele', score: 'cha', instrument: true },
    { name: 'Horn', score: 'cha', instrument: true },
    { name: 'Kazoo', score: 'cha', instrument: true },
    { name: 'Lute', score: 'cha', instrument: true },
    { name: 'Lyre', score: 'cha', instrument: true },
    { name: 'Maracas', score: 'cha', instrument: true },
    { name: 'Pan Flute', score: 'cha', instrument: true },
    { name: 'Saxophone', score: 'cha', instrument: true },
    { name: 'Trombone', score: 'cha', instrument: true },
    { name: 'Tambourine', score: 'cha', instrument: true },
    { name: 'Trumpet', score: 'cha', instrument: true },
    { name: 'Tuba', score: 'cha', instrument: true },
    { name: 'Viola', score: 'cha', instrument: true },
    { name: 'Violin', score: 'cha', instrument: true },
    { name: 'Vocals', score: 'cha', instrument: true },
  ];

  public damageIcons = {
    acid: 'water',
    bludgeoning: 'hammer',
    cold: 'snowflake',
    fire: 'fire',
    force: 'magic-staff',
    lightning: 'lightning-bolt',
    necrotic: 'skull-crossbones',
    piercing: 'arrow-projectile',
    poison: 'bottle-tonic-skull',
    psychic: 'head-flash',
    radiant: 'brightness-7',
    slashing: 'sword',
    thunder: 'waveform',
  };
  public conditionIcons = {
    attached: 'bug',
    bleeding: 'diabetes',
    blinded: 'eye-off',
    broken: 'shield-remove',
    burning: 'fire',
    charmed: 'heart',
    choking: 'smog',
    criticalhits: 'dice-d20',
    cursed: 'pentagram',
    deafened: 'ear-hearing-off',
    disease: 'virus',
    dominated: 'controller-classic',
    exhaustion: 'sleep',
    frightened: 'emoticon-frown',
    grappled: 'link-variant',
    hobbled: 'tortoise',
    incapacitated: 'account-off',
    invisible: 'circle-opacity',
    paralyzed: 'shimmer',
    petrified: 'diamond',
    poisoned: 'bottle-tonic-skull',
    possessed: 'ghost',
    prone: 'run',
    restrained: 'handcuffs',
    stunned: 'head-snowflake',
    swallowed: 'stomach',
    turned: 'cross-celtic',
    unconscious: 'bed',
  };
  public aoeIcons = {
    line: 'ray-start',
    cone: 'cone',
    cube: 'cube-outline',
    cylinder: 'cylinder',
    radius: 'radius-outline',
    sphere: 'sphere',
  };

  public scoreReverser = {
    strength: 'str',
    dexterity: 'dex',
    constitution: 'con',
    intelligence: 'int',
    wisdom: 'wis',
    charisma: 'cha',
    honor: 'hon',
    sanity: 'san',
  };

  public spellSlots = [
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
  public pactSlots = [
    [1],
    [2],
    [0, 2],
    [0, 2],
    [0, 0, 2],
    [0, 0, 2],
    [0, 0, 0, 2],
    [0, 0, 0, 2],
    [0, 0, 0, 0, 2],
    [0, 0, 0, 0, 2],
    [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 4],
    [0, 0, 0, 0, 4],
    [0, 0, 0, 0, 4],
    [0, 0, 0, 0, 4],
  ];
  public sorceryPoints = [
    4, 6, 14, 17, 17, 27, 32, 38, 44, 57, 64, 66, 66, 68, 68, 70, 70, 72, 72,
    75,
  ];
  public exploitDice = [
    2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6,
  ];
  public exploitDieSize = [
    4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 8, 8, 8, 8, 8, 8, 10, 10, 10, 10,
  ];

  constructor(
    private dataService: DataService,
    private dbService: DBService,
    private generalStoreService: GeneralStoreService
  ) {}

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

  public character;
  public async getCharacterFromDb(characterId: string) {
    await this.dbService.getCharacter(characterId).then((val) => {
      this.character = val;
    });
  }

  private getTotalLevel() {
    if (this.character?.classes) {
      let level = 0;
      for (let c of this.character?.classes) {
        level += c.level;
      }

      return level;
    }
    return 1;
  }
  private getScore(score: string) {
    return (this.character?.scores?.actual ?? {})[score] ?? 1;
  }
  private getModifier(score: string) {
    return Math.floor((this.getScore(score) - 10) / 2);
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

    skillProfs = skillProfs.map((prof: SkillProf, index: number) => {
      if (prof.level === 1.5) {
        const otherIndex = skillProfs.findIndex(
          (p: SkillProf) => p.value === prof.value && p.level >= 1
        );

        if (otherIndex !== -1 && otherIndex !== index) {
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

  public async getCharacterSkillProficiencies(
    characterId
  ): Promise<SkillProf[]> {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let skillProfs: SkillProf[] = [];

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

    this.character?.overrides?.forEach((feature) => {
      skillProfs.push(...this.getFeatureSkillProfs(feature, []));
    });

    skillProfs = this.adjustLevels(skillProfs);
    return skillProfs;
  }
  private getFeatureSkillProfs(feature: any, choices: any[]) {
    let skillList = [];

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          skillList.push(...this.getFeatureSkillProfs(infusionRecord, choices));
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          skillList.push(
            ...this.getFeatureSkillProfs(techniqueRecord, choices)
          );
        }
      }

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

  public async getCharacterToolProficiencies(
    characterId
  ): Promise<SkillProf[]> {
    let skillProfs: SkillProf[] = [];
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }

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

    let toolExp = false;
    this.character?.classes?.forEach((c, i) => {
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
        if (i === 0) {
          if (classData.proficiencies?.tools?.length) {
            classData.proficiencies.tools.forEach((t, i) => {
              if (
                !(
                  t.constructor === Array ||
                  ['game', 'instrument', 'tool'].includes(t)
                )
              ) {
                skillProfs.push({
                  id: `${c.name}-tool-${i + 1}`,
                  value: t,
                  level: 1,
                  instrument: instruments.includes(t),
                });
              }
            });
          }
        } else {
          if (classData.proficiencies?.multiclassTools?.length) {
            classData.proficiencies.multiclassTools.forEach((t, i) => {
              if (
                !(
                  t.constructor === Array ||
                  ['game', 'instrument', 'tool'].includes(t)
                )
              ) {
                skillProfs.push({
                  id: `${c.name}-tool-${i + 1}`,
                  value: t,
                  level: 1,
                  instrument: instruments.includes(t),
                });
              }
            });
          }
        }

        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            skillProfs.push(...this.getFeatureToolProfs(feature, c.choices));
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            skillProfs.push(...this.getFeatureToolProfs(feature, c.choices));
          });
        }

        if ((c.name === 'artificer' || c.name === 'inventor') && c.level >= 6) {
          toolExp = true;
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

    this.character?.overrides?.forEach((feature) => {
      skillProfs.push(...this.getFeatureToolProfs(feature, []));
    });

    skillProfs = this.adjustLevels(skillProfs);

    if (toolExp) {
      skillProfs.map((s) => {
        if (s.level >= 1) {
          s.level = 2;
        }
        return s;
      });
    }

    return skillProfs;
  }
  private getFeatureToolProfs(feature: any, choices: any[]) {
    let skillList = [];
    const instruments = [...this.dataService.getGeneric('instrument')];

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          skillList.push(...this.getFeatureToolProfs(infusionRecord, choices));
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          skillList.push(...this.getFeatureToolProfs(techniqueRecord, choices));
        }
      }

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

  public async getSaveProfs(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let profs = {
      str: false,
      dex: false,
      con: false,
      int: false,
      wis: false,
      cha: false,
      death: false,
    };

    this.character?.classes?.forEach((c: any, index: number) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = this.dataService.getSubclass(c.name, c.subclass);
      if (classData) {
        if (index === 0) {
          for (let save of classData.proficiencies.savingThrows) {
            profs[save] = true;
          }
        }

        for (let i = 1; i <= c.level; i++) {
          for (let feature of classData.features[i] ?? []) {
            profs = {
              ...profs,
              ...this.getSaveProfsFromFeature(feature, c.choices),
            };
          }
          if (subclassData) {
            for (let feature of subclassData.features[i] ?? []) {
              profs = {
                ...profs,
                ...this.getSaveProfsFromFeature(feature, c.choices),
              };
            }
          }
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          profs = {
            ...profs,
            ...this.getSaveProfsFromFeature(
              featData,
              this.character?.background.choices
            ),
          };
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      profs = {
        ...profs,
        ...this.getSaveProfsFromFeature(feature, []),
      };
    });

    return profs;
  }
  public getSaveProfsFromFeature(feature: any, choices: any[]): any {
    let profs = {};

    if (feature.granted) {
      for (let g of feature.granted) {
        if (g.type === 'save-proficiency') {
          for (let o of g.options) {
            profs[o] = true;
          }
        }
      }
    }
    if (feature.subFeatures) {
      for (let f of feature.subFeatures) {
        profs = { ...profs, ...this.getSaveProfsFromFeature(f, choices) };
      }
    }

    if (feature.choices) {
      if (Array.isArray(feature.choices)) {
        for (let c of feature.choices) {
          if (c.type === 'text' && c.grants === 'save-proficiency') {
            const choiceEntry = choices.find((ch: any) => ch.id === c.id);
            if (choiceEntry) {
              profs[choiceEntry.value] = true;
            }
          }
        }
      } else {
        if (
          feature.choices.type === 'text' &&
          feature.choices.grants === 'save-proficiency'
        ) {
          const choiceEntry = choices.find(
            (c: any) => c.id === feature.choices.id
          );
          if (choiceEntry) {
            profs[choiceEntry.value] = true;
          }
        }
      }
    }

    return profs;
  }

  public async getSenses(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let senses = {};

    if (this.character?.race) {
      const raceData = this.dataService.getRace(this.character?.race?.name);
      const subraceData = this.dataService.getSubrace(
        this.character?.race.name,
        this.character?.race.subrace
      );
      if (raceData) {
        if (raceData.darkvision) {
          senses['darkvision'] = raceData.darkvision;
        }
        for (let feature of raceData.traits) {
          senses = this.getSensesFromFeature(
            feature,
            senses,
            this.character.race.choices
          );
        }
        if (subraceData) {
          for (let feature of subraceData.traits) {
            senses = this.getSensesFromFeature(
              feature,
              senses,
              this.character.race.choices
            );
          }
        }
      }
    }
    this.character?.classes?.forEach((c: any, index: number) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = this.dataService.getSubclass(c.name, c.subclass);
      if (classData) {
        for (let i = 1; i <= c.level; i++) {
          for (let feature of classData.features[i] ?? []) {
            senses = this.getSensesFromFeature(feature, senses, c.choices);
          }
          if (subclassData) {
            for (let feature of subclassData.features[i] ?? []) {
              senses = this.getSensesFromFeature(feature, senses, c.choices);
            }
          }
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          senses = this.getSensesFromFeature(
            featData,
            senses,
            this.character.background.choices
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      senses = this.getSensesFromFeature(feature, senses, []);
    });

    return senses;
  }
  public getSensesFromFeature(feature: any, senses: any, choices: any[]): any {
    if (feature.granted) {
      for (let g of feature.granted) {
        if (g.range && !g.amount) {
          g.amount = g.range;
        }

        if (g.type === 'darkvision') {
          if (
            ((senses['darkvision'] ?? 0) < g.amount &&
              senses['darkvision'] !== -1) ||
            g.amount === -1
          ) {
            senses['darkvision'] = g.amount;
          }
        } else if (g.type === 'blindsight') {
          if (
            ((senses['blindsight'] ?? 0) < g.amount &&
              senses['blindsight'] !== -1) ||
            g.amount === -1
          ) {
            senses['blindsight'] = g.amount;
          }
        } else if (g.type === 'tremorsense') {
          if (
            ((senses['tremorsense'] ?? 0) < g.amount &&
              senses['tremorsense'] !== -1) ||
            g.amount === -1
          ) {
            senses['tremorsense'] = g.amount;
          }
        } else if (g.type === 'truesight') {
          if (
            ((senses['truesight'] ?? 0) < g.amount &&
              senses['truesight'] !== -1) ||
            g.amount === -1
          ) {
            senses['truesight'] = g.amount;
          }
        }
      }
    }
    if (feature.subFeatures) {
      for (let f of feature.subFeatures) {
        senses = this.getSensesFromFeature(f, senses, choices);
      }
    }

    if (feature.choices) {
      if (Array.isArray(feature.choices)) {
        for (let choice of feature.choices) {
          senses = this.getChoiceSenses(choice, senses, choices);
        }
      } else {
        let choice = feature.choices;
        senses = this.getChoiceSenses(choice, senses, choices);
      }
    }

    return senses;
  }
  private getChoiceSenses(choice: any, senses: any, choices: any[]) {
    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        senses = this.getSensesFromFeature(trait, senses, choices);
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        senses = this.getSensesFromFeature(feat, senses, choices);
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        senses = this.getSensesFromFeature(data, senses, choices);
      }
    }

    return senses;
  }

  public async getCharacterSkillOverrides(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let skillProfs: any[] = [];

    const skillList = this.dataService.getGeneric('skill');

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
          ...this.getFeatureSkillOverrides(trait, this.character?.race.choices)
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        skillProfs.push(
          ...this.getFeatureSkillOverrides(trait, this.character?.race.choices)
        );
      }
    }

    this.character?.classes?.forEach((c) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            skillProfs.push(
              ...this.getFeatureSkillOverrides(feature, c.choices)
            );
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            skillProfs.push(
              ...this.getFeatureSkillOverrides(feature, c.choices)
            );
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          skillProfs.push(
            ...this.getFeatureSkillOverrides(
              featData,
              this.character?.background.choices
            )
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      skillProfs.push(...this.getFeatureSkillOverrides(feature, []));
    });

    skillProfs = this.cleanupSkillOverrides(skillProfs);
    return skillProfs;
  }
  private getFeatureSkillOverrides(feature: any, choices: any[]) {
    let skillList = [];

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          skillList.push(
            ...this.getFeatureSkillOverrides(infusionRecord, choices)
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          skillList.push(
            ...this.getFeatureSkillOverrides(techniqueRecord, choices)
          );
        }
      }

      if (g.type === 'skill-ability') {
        skillList.push(g);
      }
    });
    feature.subFeatures?.forEach((s) => {
      skillList.push(...this.getFeatureSkillOverrides(s, choices));
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        skillList = [
          ...skillList,
          ...this.getChoiceItems(
            choice,
            choices,
            this.getFeatureSkillOverrides.bind(this)
          ),
        ];
      }
    } else {
      skillList = [
        ...skillList,
        ...this.getChoiceItems(
          feature.choices,
          choices,
          this.getFeatureSkillOverrides.bind(this)
        ),
      ];
    }

    if (feature.listed) {
      skillList = [
        ...skillList,
        ...this.getListedItems(
          feature.listed,
          choices,
          this.getFeatureSkillOverrides.bind(this)
        ),
      ];
    }

    return skillList;
  }
  private cleanupSkillOverrides(skills: any[]): any[] {
    const newSkills = [];
    for (let skill of skills) {
      const id = newSkills.findIndex((s) => s.skill === skill.skill);
      if (id !== -1) {
        newSkills[id].abilities = [
          ...new Set([...newSkills[id].abilities, skill.ability]),
        ];
      } else {
        newSkills.push({
          skill: skill.skill,
          abilities: [skill.ability],
        });
      }
    }

    return newSkills;
  }

  public async getCharacterToolOverrides(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let skillProfs: any[] = [];

    const skillList = this.dataService.getGeneric('skill');

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
          ...this.getFeatureToolOverrides(trait, this.character?.race.choices)
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        skillProfs.push(
          ...this.getFeatureToolOverrides(trait, this.character?.race.choices)
        );
      }
    }

    this.character?.classes?.forEach((c) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            skillProfs.push(
              ...this.getFeatureToolOverrides(feature, c.choices)
            );
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            skillProfs.push(
              ...this.getFeatureToolOverrides(feature, c.choices)
            );
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          skillProfs.push(
            ...this.getFeatureToolOverrides(
              featData,
              this.character?.background.choices
            )
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      skillProfs.push(...this.getFeatureToolOverrides(feature, []));
    });

    skillProfs = this.cleanupToolOverrides(skillProfs);
    return skillProfs;
  }
  private getFeatureToolOverrides(feature: any, choices: any[]) {
    let skillList = [];

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          skillList.push(
            ...this.getFeatureToolOverrides(infusionRecord, choices)
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          skillList.push(
            ...this.getFeatureToolOverrides(techniqueRecord, choices)
          );
        }
      }

      if (g.type === 'tool-ability') {
        skillList.push(g);
      }
    });
    feature.subFeatures?.forEach((s) => {
      skillList.push(...this.getFeatureToolOverrides(s, choices));
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        skillList = [
          ...skillList,
          ...this.getChoiceItems(
            choice,
            choices,
            this.getFeatureToolOverrides.bind(this)
          ),
        ];
      }
    } else {
      skillList = [
        ...skillList,
        ...this.getChoiceItems(
          feature.choices,
          choices,
          this.getFeatureToolOverrides.bind(this)
        ),
      ];
    }

    if (feature.listed) {
      skillList = [
        ...skillList,
        ...this.getListedItems(
          feature.listed,
          choices,
          this.getFeatureToolOverrides.bind(this)
        ),
      ];
    }

    return skillList;
  }
  private cleanupToolOverrides(skills: any[]): any[] {
    const newSkills = [];
    for (let skill of skills) {
      const id = newSkills.findIndex((s) => s.tool === skill.tool);
      if (id !== -1) {
        newSkills[id].abilities = [
          ...new Set([...newSkills[id].abilities, skill.ability]),
        ];
      } else {
        newSkills.push({
          tool: skill.tool,
          abilities: [skill.ability],
        });
      }
    }

    return newSkills;
  }

  public async getCharacterSpells(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let spellList: any[] = [];

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
        spellList.push(
          ...this.getFeatureSpells(
            trait,
            this.character?.race.choices,
            this.getTotalLevel(),
            0,
            [raceData.name]
          )
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        spellList.push(
          ...this.getFeatureSpells(
            trait,
            this.character?.race.choices,
            this.getTotalLevel(),
            0,
            [raceData.name, subraceData.name]
          )
        );
      }
    }

    this.character?.classes?.forEach((c) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            spellList.push(
              ...this.getFeatureSpells(
                feature,
                c.choices,
                c.level,
                classData.spellcastingLevel,
                [classData.name]
              )
            );
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            spellList.push(
              ...this.getFeatureSpells(
                feature,
                c.choices,
                c.level,
                classData.spellcastingLevel,
                [classData.name, subclassData.name]
              )
            );
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          spellList.push(
            ...this.getFeatureSpells(
              featData,
              this.character?.background.choices,
              this.getTotalLevel(),
              0,
              ['Background', featData.name]
            )
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      spellList.push(
        ...this.getFeatureSpells(feature, [], this.getTotalLevel(), 0, [
          feature.name,
        ])
      );
    });

    const splitSpells: any[] = [];
    for (let i = 0; i < 10; i++) {
      if (
        spellList.find((s: any) => {
          const spellData = this.dataService.getSpell(s.spell);
          return spellData?.level === i;
        })
      ) {
        let name = '';
        if (i === 0) {
          name = 'Cantrips';
        } else {
          switch (i) {
            case 1:
              name = '1st';
              break;
            case 2:
              name = '2nd';
              break;
            case 3:
              name = '3rd';
              break;
            default:
              name = `${i}th`;
              break;
          }
          name += '-level';
        }

        splitSpells.push({
          name: name,
          spells: spellList
            .map((s: any) => {
              const spellData = this.dataService.getSpell(s.spell);
              return {
                spell: spellData,
                ability: s.ability,
                source: s.source,
                ritualOnly: s.ritualOnly,
                atWill: s.atWill,
              };
            })
            .filter((s: any) => {
              return s.spell?.level === i;
            })
            .sort((a, b) => {
              const nameSort = a.spell.name.localeCompare(b.spell.name);
              if (nameSort < 0) {
                return -1;
              } else if (nameSort === 0) {
                return (
                  a.source?.join('')?.localeCompare(b.source?.join('')) ?? 0
                );
              } else {
                return 1;
              }
            }),
        });
      }
    }

    return splitSpells;
  }
  private getFeatureSpells(
    feature: any,
    choices: any[],
    characterLevel: number,
    spellcasterType: number = 0,
    source: string[]
  ) {
    let spellList = [];

    let maxSpellLevel = 0;
    if (spellcasterType === 0) {
      maxSpellLevel = 10;
    } else {
      maxSpellLevel = Math.ceil(characterLevel / (spellcasterType * 2));
    }

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          spellList.push(
            ...this.getFeatureSpells(
              infusionRecord,
              choices,
              characterLevel,
              spellcasterType,
              source
            )
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          spellList.push(
            ...this.getFeatureSpells(
              techniqueRecord,
              choices,
              characterLevel,
              spellcasterType,
              source
            )
          );
        }
      }

      if (g.type === 'spell') {
        let ability = g.ability;
        if (ability?.includes('-')) {
          const choiceEntry = choices.find((c: any) => c.id === ability);
          ability = choiceEntry?.value ?? '';
        }

        for (let spell of g.options) {
          const spellData = this.dataService.getSpell(spell);
          if (spellData.level <= maxSpellLevel || g.ignoreMaxLevel) {
            spellList.push({
              spell,
              ability,
              source,
              ritualOnly: g.ritualsOnly,
              atWill: g.atWill,
            });
          }
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      spellList.push(
        ...this.getFeatureSpells(
          s,
          choices,
          characterLevel,
          spellcasterType,
          source
        )
      );
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        spellList = [
          ...spellList,
          ...this.getChoiceSpells(
            choice,
            choices,
            characterLevel,
            spellcasterType,
            source
          ),
        ];
      }
    } else {
      spellList = [
        ...spellList,
        ...this.getChoiceSpells(
          feature.choices,
          choices,
          characterLevel,
          spellcasterType,
          source
        ),
      ];
    }

    if (feature.listed) {
      spellList = [
        ...spellList,
        ...this.getListedSpells(
          feature.listed,
          choices,
          characterLevel,
          spellcasterType,
          source
        ),
      ];
    }

    return spellList;
  }
  private getChoiceSpells(
    choice: any,
    choices: any[],
    characterLevel: number,
    spellcasterType: number = 0,
    source: string[]
  ) {
    let spellList = [];

    let maxSpellLevel = 0;
    if (spellcasterType === 0) {
      maxSpellLevel = 10;
    } else {
      maxSpellLevel = Math.ceil(characterLevel / (spellcasterType * 2));
    }

    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        spellList = [
          ...spellList,
          ...this.getFeatureSpells(
            trait,
            choices,
            characterLevel,
            spellcasterType,
            [...source, trait.name]
          ),
        ];
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        spellList = [
          ...spellList,
          ...this.getFeatureSpells(
            feat,
            choices,
            characterLevel,
            spellcasterType,
            [...source, feat.name]
          ),
        ];
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        spellList = [
          ...spellList,
          ...this.getFeatureSpells(
            data,
            choices,
            characterLevel,
            spellcasterType,
            [...source, data.name]
          ),
        ];
      }
    } else if (choice?.type === 'spell') {
      let ability = choice.ability;
      if (ability.includes('-')) {
        const choiceEntry = choices.find((c: any) => c.id === ability);
        ability = choiceEntry?.value ?? '';
      }

      const choiceEntry = choices.find((c: any) => c.id === choice.id);
      const spellData = this.dataService.getSpell(choiceEntry?.value);
      if (spellData) {
        if (spellData.level <= maxSpellLevel || choice.ignoreMaxLevel) {
          if (choice.id === 'signature-cantrip') {
            source = [...source, 'Signature Cantrip'];
          }
          spellList.push({
            spell: choiceEntry.value,
            ability,
            source,
            ritualOnly: choice.ritualsOnly,
            atWill: choice.atWill,
          });
        }
      }
    }

    return spellList;
  }
  private getListedSpells(
    listed: any,
    choices: any[],
    characterLevel: number,
    spellcasterType: number = 0,
    source: string[]
  ) {
    let spellList = [];

    let maxSpellLevel = 0;
    if (spellcasterType === 0) {
      maxSpellLevel = 10;
    } else {
      maxSpellLevel = Math.ceil(characterLevel / (spellcasterType * 2));
    }

    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      const choiceEntry = choices.find((c: any) => c.id === listed?.id);

      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          spellList = [
            ...spellList,
            ...this.getFeatureSpells(
              data,
              choices,
              characterLevel,
              spellcasterType,
              [...source, data.name]
            ),
          ];
        }
      }
    } else if (listed.type === 'cantrip' || listed.type === 'spell') {
      let ability = listed.ability;
      if (ability.includes('-')) {
        const choiceEntry = choices.find((c: any) => c.id === ability);
        ability = choiceEntry?.value ?? '';
      }

      const choiceEntry = choices.find((c: any) => c.id === listed.id);
      for (let l of choiceEntry?.list ?? []) {
        const spellData = this.dataService.getSpell(l);
        if (spellData.level <= maxSpellLevel || listed.ignoreMaxLevel) {
          const spellbookIds = [
            'magus-spellbook',
            'pale-master-grimoire',
            'wizard-spellbook',
          ];
          if (
            (listed.id === 'magus-spellbook' && characterLevel >= 7) ||
            listed.id !== 'magus-spellbook'
          ) {
            if (!spellbookIds.includes(listed.id) || !!spellData.ritual) {
              spellList.push({
                spell: l,
                ability,
                source,
                ritualOnly:
                  listed.ritualsOnly ||
                  listed.id === 'pale-master-grimoire' ||
                  listed.id === 'wizard-spellbook',
                atWill: listed.atWill,
              });
            }
          }
        }
      }
    }

    return spellList;
  }

  public async getCharacterExploits(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let exploitList: any[] = [];

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
        exploitList.push(
          ...this.getFeatureExploits(
            trait,
            this.character?.race.choices,
            this.getTotalLevel(),
            0,
            [raceData.name]
          )
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        exploitList.push(
          ...this.getFeatureExploits(
            trait,
            this.character?.race.choices,
            this.getTotalLevel(),
            0,
            [raceData.name, subraceData.name]
          )
        );
      }
    }

    this.character?.classes?.forEach((c) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            exploitList.push(
              ...this.getFeatureExploits(
                feature,
                c.choices,
                c.level,
                classData.exploitLevel,
                [classData.name]
              )
            );
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            exploitList.push(
              ...this.getFeatureExploits(
                feature,
                c.choices,
                c.level,
                classData.exploitLevel,
                [classData.name, subclassData.name]
              )
            );
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          exploitList.push(
            ...this.getFeatureExploits(
              featData,
              this.character?.background.choices,
              this.getTotalLevel(),
              0,
              ['Background', featData.name]
            )
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      exploitList.push(
        ...this.getFeatureExploits(feature, [], this.getTotalLevel(), 0, [
          feature.name,
        ])
      );
    });

    const splitExploits: any[] = [];
    for (let i = 0; i < 5; i++) {
      if (
        exploitList.find((e: any) => {
          const exploitData = this.dataService.getExploitData(e.exploit);
          return exploitData?.degree === i;
        })
      ) {
        let name = '';
        switch (i) {
          case 1:
            name = '1st';
            break;
          case 2:
            name = '2nd';
            break;
          case 3:
            name = '3rd';
            break;
          default:
            name = `${i}th`;
            break;
        }
        name += '-Degree';

        splitExploits.push({
          name: name,
          exploits: exploitList
            .map((e: any) => {
              const exploitData = this.dataService.getExploitData(e.exploit);

              if (exploitData?.save?.length > 3) {
                exploitData.save =
                  this.scoreReverser[exploitData.save.toLowerCase()];
              }
              return {
                exploit: exploitData,
                ability: e.ability,
                source: e.source,
              };
            })
            .filter((e: any) => {
              return e.exploit?.degree === i;
            })
            .sort((a, b) => {
              const nameSort = a.exploit.name.localeCompare(b.exploit.name);
              if (nameSort < 0) {
                return -1;
              } else if (nameSort === 0) {
                return (
                  a.source?.join('')?.localeCompare(b.source?.join('')) ?? 0
                );
              } else {
                return 1;
              }
            }),
        });
      }
    }

    return splitExploits;
  }
  private getFeatureExploits(
    feature: any,
    choices: any[],
    characterLevel: number,
    exploitType: number = 0,
    source: string[]
  ) {
    let exploitList = [];

    let maxExploitDegree = 0;
    if (exploitType === 0) {
      maxExploitDegree = 6;
    } else {
      maxExploitDegree = Math.ceil(characterLevel / (exploitType * 4));
    }

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          exploitList.push(
            ...this.getFeatureExploits(
              infusionRecord,
              choices,
              characterLevel,
              exploitType,
              source
            )
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          exploitList.push(
            ...this.getFeatureExploits(
              techniqueRecord,
              choices,
              characterLevel,
              exploitType,
              source
            )
          );
        }
      }

      if (g.type === 'exploit') {
        if (!g.prereqLevel || characterLevel >= g.prereqLevel) {
          let ability = g.ability;
          if (ability.includes('-')) {
            const choiceEntry = choices.find((c: any) => c.id === ability);
            ability = choiceEntry?.value ?? '';
          }

          for (let exploit of g.options) {
            const exploitData = this.dataService.getExploit(exploit);
            if (exploitData.degree <= maxExploitDegree || g.ignoreMaxLevel) {
              exploitList.push({
                exploit,
                ability,
                source,
              });
            }
          }
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      exploitList.push(
        ...this.getFeatureExploits(
          s,
          choices,
          characterLevel,
          exploitType,
          source
        )
      );
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        exploitList = [
          ...exploitList,
          ...this.getChoiceExploits(
            choice,
            choices,
            characterLevel,
            exploitType,
            source
          ),
        ];
      }
    } else {
      exploitList = [
        ...exploitList,
        ...this.getChoiceExploits(
          feature.choices,
          choices,
          characterLevel,
          exploitType,
          source
        ),
      ];
    }

    if (feature.listed) {
      exploitList = [
        ...exploitList,
        ...this.getListedExploits(
          feature.listed,
          choices,
          characterLevel,
          exploitType,
          source
        ),
      ];
    }

    return exploitList;
  }
  private getChoiceExploits(
    choice: any,
    choices: any[],
    characterLevel: number,
    exploitType: number = 0,
    source: string[]
  ) {
    let exploitList = [];

    let maxExploitDegree = 0;
    if (exploitType === 0) {
      maxExploitDegree = 6;
    } else {
      maxExploitDegree = Math.ceil(characterLevel / (exploitType * 4));
    }

    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        exploitList = [
          ...exploitList,
          ...this.getFeatureSpells(
            trait,
            choices,
            characterLevel,
            exploitType,
            [...source, trait.name]
          ),
        ];
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        exploitList = [
          ...exploitList,
          ...this.getFeatureSpells(feat, choices, characterLevel, exploitType, [
            ...source,
            feat.name,
          ]),
        ];
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        exploitList = [
          ...exploitList,
          ...this.getFeatureSpells(data, choices, characterLevel, exploitType, [
            ...source,
            data.name,
          ]),
        ];
      }
    } else if (choice?.type === 'exploit') {
      let ability = choice.ability;
      if (ability.includes('-')) {
        const choiceEntry = choices.find((c: any) => c.id === ability);
        ability = choiceEntry?.value ?? '';
      }

      const choiceEntry = choices.find((c: any) => c.id === choice.id);

      const exploitData = this.dataService.getExploit(choiceEntry?.value);
      if (exploitData) {
        if (exploitData.degree <= maxExploitDegree || choice.ignoreMaxLevel) {
          exploitList.push({
            exploit: choiceEntry?.value,
            ability,
            source,
          });
        }
      }
    }

    return exploitList;
  }
  private getListedExploits(
    listed: any,
    choices: any[],
    characterLevel: number,
    exploitType: number = 0,
    source: string[]
  ) {
    let exploitList = [];

    let maxExploitDegree = 0;
    if (exploitType === 0) {
      maxExploitDegree = 6;
    } else {
      maxExploitDegree = Math.ceil(characterLevel / (exploitType * 4));
    }

    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      const choiceEntry = choices.find((c: any) => c.id === listed?.id);

      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          exploitList = [
            ...exploitList,
            ...this.getFeatureSpells(
              data,
              choices,
              characterLevel,
              exploitType,
              [...source, data.name]
            ),
          ];
        }
      }
    } else if (listed.type === 'exploit') {
      let ability = listed.ability;
      if (ability.includes('-')) {
        const choiceEntry = choices.find((c: any) => c.id === ability);
        ability = choiceEntry?.value ?? '';
      }

      const choiceEntry = choices.find((c: any) => c.id === listed.id);
      for (let l of choiceEntry?.list ?? []) {
        const exploitData = this.dataService.getExploit(l);
        if (exploitData.degree <= maxExploitDegree || listed.ignoreMaxLevel) {
          exploitList.push({
            exploit: l,
            ability,
            source,
          });
        }
      }
    }

    return exploitList;
  }

  public async getCharacterProficiencies(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    return {
      armor: this.getCharacterArmorProfs(characterId),
      languages: this.getCharacterLanguageProfs(characterId),
      weapons: this.getCharacterWeaponProfs(characterId),
    };
  }
  private getCharacterArmorProfs(characterId) {
    let profs: any[] = [];

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
        profs = [
          ...profs,
          ...this.getFeatureArmorProfs(trait, this.character?.race.choices),
        ];
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        profs = [
          ...profs,
          ...this.getFeatureArmorProfs(trait, this.character?.race.choices),
        ];
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            profs = [
              ...profs,
              ...this.getFeatureArmorProfs(feature, c.choices),
            ];
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            profs = [
              ...profs,
              ...this.getFeatureArmorProfs(feature, c.choices),
            ];
          });
        }

        if (index === 0) {
          for (let armor of classData.proficiencies.armor) {
            profs.push(armor);
          }
        } else {
          for (let armor of classData.proficiencies.multiclassArmor) {
            profs.push(armor);
          }
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          profs = [
            ...profs,
            ...this.getFeatureArmorProfs(
              featData,
              this.character?.background.choices
            ),
          ];
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      profs = [...profs, ...this.getFeatureArmorProfs(feature, [])];
    });

    profs = [...new Set(profs)];
    profs = profs.sort();

    return profs;
  }
  private getFeatureArmorProfs(feature: any, choices: any[]): any {
    let profs = [];

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          profs.push(...this.getFeatureArmorProfs(infusionRecord, choices));
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          profs.push(...this.getFeatureArmorProfs(techniqueRecord, choices));
        }
      }

      if (g.type === 'armor') {
        profs = [...profs, ...g.options];
      }
    });
    feature.subFeatures?.forEach((s) => {
      profs.push(...this.getFeatureArmorProfs(s, choices));
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        profs = [
          ...profs,
          ...this.getChoiceItems(
            choice,
            choices,
            this.getFeatureArmorProfs.bind(this)
          ),
        ];
      }
    } else {
      profs = [
        ...profs,
        ...this.getChoiceItems(
          feature.choices,
          choices,
          this.getFeatureArmorProfs.bind(this)
        ),
      ];
    }

    if (feature.listed) {
      profs = [
        ...profs,
        ...this.getListedItems(
          feature.listed,
          choices,
          this.getFeatureArmorProfs.bind(this)
        ),
      ];
    }

    return profs;
  }

  private getCharacterLanguageProfs(characterId): any[] {
    let profs: any[] = [];

    const languageList = this.dataService.getGeneric('language');

    this.character?.race?.choices?.forEach((choice) => {
      if (languageList.includes(choice.value)) {
        profs.push(choice.value);
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
        profs = [
          ...profs,
          ...this.getFeatureLanguageProfs(trait, this.character?.race.choices),
        ];
      }

      for (let language of raceData.languages) {
        if (!language['id']) {
          profs.push(language);
        }
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        profs = [
          ...profs,
          ...this.getFeatureLanguageProfs(trait, this.character?.race.choices),
        ];
      }
    }

    this.character?.classes?.forEach((c) => {
      c.choices.forEach((choice) => {
        if (languageList.includes(choice.value)) {
          profs.push(choice.value);
        }
      });

      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            profs = [
              ...profs,
              ...this.getFeatureLanguageProfs(feature, c.choices),
            ];
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            profs = [
              ...profs,
              ...this.getFeatureLanguageProfs(feature, c.choices),
            ];
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (languageList.includes(choice.value)) {
        profs.push(choice.value);
      }
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          profs = [
            ...profs,
            ...this.getFeatureLanguageProfs(
              featData,
              this.character?.background.choices
            ),
          ];
        }
      }
    });
    this.character?.genius?.choices?.forEach((choice) => {
      if (languageList.includes(choice.value)) {
        profs.push(choice.value);
      }
    });

    this.character?.overrides?.forEach((feature) => {
      profs = [...profs, ...this.getFeatureLanguageProfs(feature, [])];
    });

    profs = [...new Set(profs)];
    profs = profs.sort();

    return profs;
  }
  private getFeatureLanguageProfs(feature: any, choices: any[]): any {
    let profs = [];

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          profs.push(...this.getFeatureLanguageProfs(infusionRecord, choices));
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          profs.push(...this.getFeatureLanguageProfs(techniqueRecord, choices));
        }
      }

      if (g.type === 'language') {
        profs = [...profs, ...g.options];
      }
    });
    feature.subFeatures?.forEach((s) => {
      profs.push(...this.getFeatureLanguageProfs(s, choices));
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        profs = [
          ...profs,
          ...this.getChoiceItems(
            choice,
            choices,
            this.getFeatureLanguageProfs.bind(this)
          ),
        ];
      }
    } else {
      profs = [
        ...profs,
        ...this.getChoiceItems(
          feature.choices,
          choices,
          this.getFeatureLanguageProfs.bind(this)
        ),
      ];
    }

    if (feature.listed) {
      profs = [
        ...profs,
        ...this.getListedItems(
          feature.listed,
          choices,
          this.getFeatureLanguageProfs.bind(this)
        ),
      ];
    }

    profs = [...new Set(profs)];

    const filterOut = [];
    for (let weapon of profs) {
      const weaponData = this.generalStoreService.getItem(weapon);
      if (weaponData) {
        switch (weaponData.type) {
          case 0:
            if (
              profs.findIndex((p: any) => p.toLowerCase() === 'simple') !== -1
            ) {
              filterOut.push(weapon);
            }
            break;
          case 1:
            if (
              profs.findIndex((p: any) => p.toLowerCase() === 'martial') !== -1
            ) {
              filterOut.push(weapon);
            }
            break;
          case 2:
            if (
              profs.findIndex((p: any) => p.toLowerCase() === 'exotic') !== -1
            ) {
              filterOut.push(weapon);
            }
            break;
        }
      }
    }
    profs = profs.filter((p: any) => !filterOut.includes(p));
    profs = profs.sort();

    return profs;
  }

  private getCharacterWeaponProfs(characterId): any[] {
    let profs: any[] = [];

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
        profs = [
          ...profs,
          ...this.getFeatureWeaponProfs(trait, this.character?.race.choices),
        ];
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        profs = [
          ...profs,
          ...this.getFeatureWeaponProfs(trait, this.character?.race.choices),
        ];
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            profs = [
              ...profs,
              ...this.getFeatureWeaponProfs(feature, c.choices),
            ];
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            profs = [
              ...profs,
              ...this.getFeatureWeaponProfs(feature, c.choices),
            ];
          });
        }

        if (index === 0) {
          for (let weapon of classData.proficiencies.weapons) {
            profs.push(weapon);
          }
        } else {
          for (let weapon of classData.proficiencies.multiclassWeapons) {
            profs.push(weapon);
          }
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          profs = [
            ...profs,
            ...this.getFeatureWeaponProfs(
              featData,
              this.character?.background.choices
            ),
          ];
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      profs = [...profs, ...this.getFeatureWeaponProfs(feature, [])];
    });

    return profs;
  }
  private getFeatureWeaponProfs(feature: any, choices: any[]): any {
    let profs = [];

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          profs.push(...this.getFeatureWeaponProfs(infusionRecord, choices));
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          profs.push(...this.getFeatureWeaponProfs(techniqueRecord, choices));
        }
      }

      if (g.type === 'weapon') {
        profs = [...profs, ...g.options];
      }
    });
    feature.subFeatures?.forEach((s) => {
      profs.push(...this.getFeatureToolProfs(s, choices));
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        profs = [
          ...profs,
          ...this.getChoiceItems(
            choice,
            choices,
            this.getFeatureWeaponProfs.bind(this)
          ),
        ];
      }
    } else {
      profs = [
        ...profs,
        ...this.getChoiceItems(
          feature.choices,
          choices,
          this.getFeatureWeaponProfs.bind(this)
        ),
      ];
    }

    if (feature.listed) {
      profs = [
        ...profs,
        ...this.getListedItems(
          feature.listed,
          choices,
          this.getFeatureWeaponProfs.bind(this)
        ),
      ];
    }

    return profs;
  }

  public async getCharacterDefenses(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    return {
      damage: this.getCharacterDamageDefenses(characterId),
      condition: this.getCharacterConditionDefenses(characterId),
    };
  }
  public getCharacterDamageDefenses(characterId): any[] {
    let damageDefenses = [];

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
        damageDefenses = [
          ...damageDefenses,
          ...this.getFeatureDamageDefenses(trait, this.character?.race.choices),
        ];
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        damageDefenses = [
          ...damageDefenses,
          ...this.getFeatureDamageDefenses(trait, this.character?.race.choices),
        ];
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            damageDefenses = [
              ...damageDefenses,
              ...this.getFeatureDamageDefenses(feature, c.choices),
            ];
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            damageDefenses = [
              ...damageDefenses,
              ...this.getFeatureDamageDefenses(feature, c.choices),
            ];
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          damageDefenses = [
            ...damageDefenses,
            ...this.getFeatureDamageDefenses(
              featData,
              this.character?.background.choices
            ),
          ];
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      damageDefenses = [
        ...damageDefenses,
        ...this.getFeatureDamageDefenses(feature, []),
      ];
    });

    damageDefenses = damageDefenses.sort((a, b) => {
      if (a.type.localeCompare(b.type) < 0) {
        return -1;
      } else if (a.type.localeCompare(b.type) === 0) {
        return a.level - b.level;
      } else {
        return 1;
      }
    });

    return damageDefenses.reduce((acc, curr) => {
      const existingDefense = acc.find((attack) => attack.type === curr.type);

      if (existingDefense) {
        if (curr.level > existingDefense.level) {
          existingDefense.level = curr.level;
        }
      } else {
        acc.push(curr);
      }

      return acc;
    }, []);
  }
  public getFeatureDamageDefenses(feature: any, choices: any[]): any[] {
    let damageDefenses = [];

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          damageDefenses.push(
            ...this.getFeatureDamageDefenses(infusionRecord, choices)
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          damageDefenses.push(
            ...this.getFeatureDamageDefenses(techniqueRecord, choices)
          );
        }
      }

      if (g.type === 'damage-resistance') {
        for (let o of g.options) {
          damageDefenses.push({
            type: o.toLowerCase(),
            level: 1,
          });
        }
      } else if (g.type === 'damage-immunity') {
        for (let o of g.options) {
          damageDefenses.push({
            type: o.toLowerCase(),
            level: 2,
          });
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      damageDefenses.push(...this.getFeatureDamageDefenses(s, choices));
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        damageDefenses = [
          ...damageDefenses,
          ...this.getChoiceDamageDefenses(choice, choices),
        ];
      }
    } else {
      damageDefenses = [
        ...damageDefenses,
        ...this.getChoiceDamageDefenses(feature.choices, choices),
      ];
    }

    if (feature.listed) {
      damageDefenses = [
        ...damageDefenses,
        ...this.getListedDamageDefenses(feature.listed, choices),
      ];
    }

    return damageDefenses;
  }
  private getChoiceDamageDefenses(choice: any, choices: any[]) {
    let damageDefenses = [];

    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        damageDefenses = [
          ...damageDefenses,
          ...this.getFeatureDamageDefenses(trait, choices),
        ];
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        damageDefenses = [
          ...damageDefenses,
          ...this.getFeatureDamageDefenses(feat, choices),
        ];
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        damageDefenses = [
          ...damageDefenses,
          ...this.getFeatureDamageDefenses(data, choices),
        ];
      }
    } else if (
      choice?.type === 'text' &&
      choice?.grants === 'damage-resistance'
    ) {
      damageDefenses.push({
        type: choiceEntry.value.toLowerCase(),
        level: 1,
      });
    } else if (
      choice?.type === 'text' &&
      choice?.grants === 'damage-immunity'
    ) {
      damageDefenses.push({
        type: choiceEntry.value.toLowerCase(),
        level: 2,
      });
    }

    return damageDefenses;
  }
  private getListedDamageDefenses(listed: any, choices: any[]): any[] {
    let damageDefenses = [];

    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          damageDefenses = [
            ...damageDefenses,
            ...this.getFeatureDamageDefenses(data, choices),
          ];
        }
      }
    } else if (this.dataService.getGenericKeys().includes(listed?.type)) {
      damageDefenses.push(...(choiceEntry?.list ?? []));
    }

    return damageDefenses;
  }

  public getCharacterConditionDefenses(characterId): any[] {
    let conditionDefenses = [];

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
        conditionDefenses = [
          ...conditionDefenses,
          ...this.getFeatureConditionDefenses(
            trait,
            this.character?.race.choices
          ),
        ];
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        conditionDefenses = [
          ...conditionDefenses,
          ...this.getFeatureConditionDefenses(
            trait,
            this.character?.race.choices
          ),
        ];
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            conditionDefenses = [
              ...conditionDefenses,
              ...this.getFeatureConditionDefenses(feature, c.choices),
            ];
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            conditionDefenses = [
              ...conditionDefenses,
              ...this.getFeatureConditionDefenses(feature, c.choices),
            ];
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          conditionDefenses = [
            ...conditionDefenses,
            ...this.getFeatureConditionDefenses(
              featData,
              this.character?.background.choices
            ),
          ];
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      conditionDefenses = [
        ...conditionDefenses,
        ...this.getFeatureConditionDefenses(feature, []),
      ];
    });

    conditionDefenses = conditionDefenses.sort((a, b) => {
      if (a.type.localeCompare(b.type) < 0) {
        return -1;
      } else if (a.type.localeCompare(b.type) === 0) {
        return a.level - b.level;
      } else {
        return 1;
      }
    });

    return conditionDefenses.reduce((acc, curr) => {
      const existingDefense = acc.find((attack) => attack.type === curr.type);

      if (existingDefense) {
        if (curr.level > existingDefense.level) {
          existingDefense.level = curr.level;
        }
      } else {
        acc.push(curr);
      }

      return acc;
    }, []);
  }
  public getFeatureConditionDefenses(feature: any, choices: any[]): any[] {
    let conditionDefenses = [];

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          conditionDefenses.push(
            ...this.getFeatureConditionDefenses(infusionRecord, choices)
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          conditionDefenses.push(
            ...this.getFeatureConditionDefenses(techniqueRecord, choices)
          );
        }
      }

      if (g.type === 'condition-advantage') {
        for (let o of g.options) {
          conditionDefenses.push({
            type: o.toLowerCase(),
            level: 1,
          });
        }
      } else if (g.type === 'condition-immunity') {
        for (let o of g.options) {
          conditionDefenses.push({
            type: o.toLowerCase(),
            level: 2,
          });
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      conditionDefenses.push(...this.getFeatureConditionDefenses(s, choices));
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        conditionDefenses = [
          ...conditionDefenses,
          ...this.getChoiceConditionDefenses(choice, choices),
        ];
      }
    } else {
      conditionDefenses = [
        ...conditionDefenses,
        ...this.getChoiceConditionDefenses(feature.choices, choices),
      ];
    }

    if (feature.listed) {
      conditionDefenses = [
        ...conditionDefenses,
        ...this.getListedConditionDefenses(feature.listed, choices),
      ];
    }

    return conditionDefenses;
  }
  private getChoiceConditionDefenses(choice: any, choices: any[]) {
    let conditionDefenses = [];

    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        conditionDefenses = [
          ...conditionDefenses,
          ...this.getFeatureConditionDefenses(trait, choices),
        ];
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        conditionDefenses = [
          ...conditionDefenses,
          ...this.getFeatureConditionDefenses(feat, choices),
        ];
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        conditionDefenses = [
          ...conditionDefenses,
          ...this.getFeatureConditionDefenses(data, choices),
        ];
      }
    } else if (
      choice?.type === 'text' &&
      choice?.grants === 'condition-advantage'
    ) {
      conditionDefenses.push({
        type: choiceEntry.value.toLowerCase(),
        level: 1,
      });
    } else if (
      choice?.type === 'text' &&
      choice?.grants === 'condition-immunity'
    ) {
      conditionDefenses.push({
        type: choiceEntry.value.toLowerCase(),
        level: 2,
      });
    }

    return conditionDefenses;
  }
  private getListedConditionDefenses(listed: any, choices: any[]): any[] {
    let conditionDefenses = [];

    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          conditionDefenses = [
            ...conditionDefenses,
            ...this.getFeatureDamageDefenses(data, choices),
          ];
        }
      }
    } else if (this.dataService.getGenericKeys().includes(listed?.type)) {
      conditionDefenses.push(...(choiceEntry?.list ?? []));
    }

    return conditionDefenses;
  }

  public async getHpBonus(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let hpBonus = 0;

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
        hpBonus += this.getFeatureHpBonus(trait, this.character?.race.choices);
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        hpBonus += this.getFeatureHpBonus(trait, this.character?.race.choices);
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            hpBonus += this.getFeatureHpBonus(feature, c.choices);
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            hpBonus += this.getFeatureHpBonus(feature, c.choices);
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          hpBonus += this.getFeatureHpBonus(
            featData,
            this.character?.background.choices
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      hpBonus += this.getFeatureHpBonus(feature, []);
    });

    return hpBonus;
  }
  public getFeatureHpBonus(feature: any, choices: any[]): number {
    let hpBonus = 0;

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          hpBonus += this.getFeatureHpBonus(infusionRecord, choices);
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          hpBonus += this.getFeatureHpBonus(techniqueRecord, choices);
        }
      }

      if (g.type === 'hit-point-level') {
        hpBonus += g.amount;
      }
    });
    feature.subFeatures?.forEach((s) => {
      hpBonus += this.getFeatureHpBonus(s, choices);
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        hpBonus += this.getChoiceHpBonus(choice, choices);
      }
    } else {
      hpBonus += this.getChoiceHpBonus(feature.choices, choices);
    }

    if (feature.listed) {
      hpBonus += this.getListedHpBonus(feature.listed, choices);
    }

    return hpBonus;
  }
  private getChoiceHpBonus(choice: any, choices: any[]): number {
    let hpBonus = 0;

    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        hpBonus += this.getFeatureHpBonus(trait, choices);
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        hpBonus += this.getFeatureHpBonus(feat, choices);
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        hpBonus += this.getFeatureHpBonus(data, choices);
      }
    }

    return hpBonus;
  }
  private getListedHpBonus(listed: any, choices: any[]): number {
    let hpBonus = 0;

    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          hpBonus += this.getFeatureHpBonus(data, choices);
        }
      }
    }

    return hpBonus;
  }

  public async getInitBonus(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let initBonus = 0;

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
        initBonus += this.getFeatureInitBonus(
          trait,
          this.character?.race.choices
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        initBonus += this.getFeatureInitBonus(
          trait,
          this.character?.race.choices
        );
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            initBonus += this.getFeatureInitBonus(feature, c.choices);
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            initBonus += this.getFeatureInitBonus(feature, c.choices);
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          initBonus += this.getFeatureInitBonus(
            featData,
            this.character?.background.choices
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      initBonus += this.getFeatureInitBonus(feature, []);
    });

    return initBonus;
  }
  public getFeatureInitBonus(feature: any, choices: any[]): number {
    let initBonus = 0;

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          initBonus += this.getFeatureInitBonus(infusionRecord, choices);
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          initBonus += this.getFeatureInitBonus(techniqueRecord, choices);
        }
      }

      if (g.type === 'initiative-bonus') {
        if (g.amount) {
          initBonus += g.amount;
        } else if (g.score) {
          if (g.score.includes('-')) {
            const choiceEntry = choices.find((ch) => ch.id === g.score);
            if (choiceEntry) {
              initBonus += this.getModifier(choiceEntry.value);
            }
          } else {
            initBonus += this.getModifier(g.score);
          }
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      initBonus += this.getFeatureInitBonus(s, choices);
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        initBonus += this.getChoiceInitBonus(choice, choices);
      }
    } else {
      initBonus += this.getChoiceInitBonus(feature.choices, choices);
    }

    if (feature.listed) {
      initBonus += this.getListedInitBonus(feature.listed, choices);
    }

    return initBonus;
  }
  private getChoiceInitBonus(choice: any, choices: any[]): number {
    let initBonus = 0;

    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        initBonus += this.getFeatureInitBonus(trait, choices);
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        initBonus += this.getFeatureInitBonus(feat, choices);
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        initBonus += this.getFeatureInitBonus(data, choices);
      }
    }

    return initBonus;
  }
  private getListedInitBonus(listed: any, choices: any[]): number {
    let initBonus = 0;

    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          initBonus += this.getFeatureInitBonus(data, choices);
        }
      }
    }

    return initBonus;
  }

  public async getSaveBonus(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let saveBonus = {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
      death: 0,
    };

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
        saveBonus = this.getFeatureSaveBonus(
          trait,
          this.character?.race.choices,
          saveBonus
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        saveBonus = this.getFeatureSaveBonus(
          trait,
          this.character?.race.choices,
          saveBonus
        );
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            saveBonus = this.getFeatureSaveBonus(feature, c.choices, saveBonus);
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            saveBonus = this.getFeatureSaveBonus(feature, c.choices, saveBonus);
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          saveBonus = this.getFeatureSaveBonus(
            featData,
            this.character?.background.choices,
            saveBonus
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      saveBonus = this.getFeatureSaveBonus(feature, [], saveBonus);
    });

    return saveBonus;
  }
  public getFeatureSaveBonus(
    feature: any,
    choices: any[],
    saveBonus: any
  ): any {
    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          saveBonus = this.getFeatureSaveBonus(
            infusionRecord,
            choices,
            saveBonus
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          saveBonus = this.getFeatureSaveBonus(
            techniqueRecord,
            choices,
            saveBonus
          );
        }
      }

      if (g.type === 'save-bonus') {
        let amount = 0;
        // if (g.amount.includes('-')) {
        //   const choiceEntry = choices.find((ch) => ch.id === g.amount)?.value;
        //   amount = this.getModifier(choiceEntry);
        // } else {
        //   amount = this.getModifier(g.amount);
        // }

        if (g.options === 'all') {
          for (let k of Object.keys(saveBonus)) {
            saveBonus[k] += amount;
          }
        } else {
          for (let option of g.options) {
            saveBonus[option] += amount;
          }
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      saveBonus = this.getFeatureSaveBonus(s, choices, saveBonus);
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        saveBonus = this.getChoiceSaveBonus(choice, choices, saveBonus);
      }
    } else {
      saveBonus = this.getChoiceSaveBonus(feature.choices, choices, saveBonus);
    }

    if (feature.listed) {
      saveBonus = this.getListedSaveBonus(feature.listed, choices, saveBonus);
    }

    return saveBonus;
  }
  private getChoiceSaveBonus(choice: any, choices: any[], saveBonus: any): any {
    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        saveBonus = this.getFeatureSaveBonus(trait, choices, saveBonus);
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        saveBonus = this.getFeatureSaveBonus(feat, choices, saveBonus);
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        saveBonus = this.getFeatureSaveBonus(data, choices, saveBonus);
      }
    }

    return saveBonus;
  }
  private getListedSaveBonus(listed: any, choices: any[], saveBonus: any): any {
    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          saveBonus = this.getFeatureSaveBonus(data, choices, saveBonus);
        }
      }
    }

    return saveBonus;
  }

  public async getTelepathy(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let telepathy = 0;

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
        telepathy = this.getFeatureTelepathy(
          trait,
          this.character?.race.choices,
          telepathy
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        telepathy = this.getFeatureTelepathy(
          trait,
          this.character?.race.choices,
          telepathy
        );
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            telepathy = this.getFeatureTelepathy(feature, c.choices, telepathy);
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            telepathy = this.getFeatureTelepathy(feature, c.choices, telepathy);
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          telepathy = this.getFeatureTelepathy(
            featData,
            this.character?.background.choices,
            telepathy
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      telepathy = this.getFeatureTelepathy(feature, [], telepathy);
    });

    return telepathy;
  }
  public getFeatureTelepathy(feature: any, choices: any[], telepathy): number {
    if (telepathy === -1) {
      return telepathy;
    }

    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          telepathy = this.getFeatureTelepathy(
            infusionRecord,
            choices,
            telepathy
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          telepathy = this.getFeatureTelepathy(
            techniqueRecord,
            choices,
            telepathy
          );
        }
      }

      if (g.type === 'telepathy' && g.range > telepathy) {
        telepathy = g.range;
      }
    });
    feature.subFeatures?.forEach((s) => {
      telepathy = this.getFeatureTelepathy(s, choices, telepathy);
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        telepathy = this.getChoiceTelepathy(choice, choices, telepathy);
      }
    } else {
      telepathy = this.getChoiceTelepathy(feature.choices, choices, telepathy);
    }

    if (feature.listed) {
      telepathy = this.getListedTelepathy(feature.listed, choices, telepathy);
    }

    return telepathy;
  }
  private getChoiceTelepathy(choice: any, choices: any[], telepathy): number {
    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        telepathy = this.getFeatureTelepathy(trait, choices, telepathy);
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        telepathy = this.getFeatureTelepathy(feat, choices, telepathy);
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        telepathy = this.getFeatureTelepathy(data, choices, telepathy);
      }
    }

    return telepathy;
  }
  private getListedTelepathy(listed: any, choices: any[], telepathy): number {
    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          telepathy = this.getFeatureTelepathy(data, choices, telepathy);
        }
      }
    }

    return telepathy;
  }

  public async getInfusions(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let infusions = [];

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
        infusions = this.getFeatureInfusions(
          trait,
          this.character?.race.choices,
          infusions
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        infusions = this.getFeatureInfusions(
          trait,
          this.character?.race.choices,
          infusions
        );
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            infusions = this.getFeatureInfusions(feature, c.choices, infusions);
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            infusions = this.getFeatureInfusions(feature, c.choices, infusions);
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          infusions = this.getFeatureInfusions(
            featData,
            this.character?.background.choices,
            infusions
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      infusions = this.getFeatureInfusions(feature, [], infusions);
    });

    return infusions;
  }
  public getFeatureInfusions(feature: any, choices: any[], infusions): any[] {
    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          infusions = this.getFeatureInfusions(
            infusionRecord,
            choices,
            infusions
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          infusions = this.getFeatureInfusions(
            techniqueRecord,
            choices,
            infusions
          );
        }
      }

      if (g.type === 'infusion') {
        for (let i of g.options) {
          const infusionData = this.dataService.getGenericListItem(
            'infusion',
            i
          );
          if (
            !infusionData.prereqLevel ||
            this.getTotalLevel() >= infusionData.prereqLevel
          ) {
            infusions.push(i);
          }
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      infusions = this.getFeatureInfusions(s, choices, infusions);
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        infusions = this.getChoiceInfusions(choice, choices, infusions);
      }
    } else {
      infusions = this.getChoiceInfusions(feature.choices, choices, infusions);
    }

    if (feature.listed) {
      infusions = this.getListedInfusions(feature.listed, choices, infusions);
    }

    return infusions;
  }
  private getChoiceInfusions(choice: any, choices: any[], infusions): any[] {
    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        infusions = this.getFeatureInfusions(trait, choices, infusions);
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        infusions = this.getFeatureInfusions(feat, choices, infusions);
      }
    } else if (choice?.type === 'infusion') {
      infusions.push(choiceEntry.value);
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        infusions = this.getFeatureInfusions(data, choices, infusions);
      }
    }

    return infusions;
  }
  private getListedInfusions(listed: any, choices: any[], infusions): any[] {
    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (listed?.type === 'infusion') {
      infusions.push(...choiceEntry.list);
    } else if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          infusions = this.getFeatureInfusions(data, choices, infusions);
        }
      }
    }

    return infusions;
  }

  public async getSpeeds(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let speeds: any = {};
    let speedBonuses: any = {};

    const raceData = this.dataService.getRace(this.character?.race?.name);
    let subraceData;
    if (this.character?.race?.subrace) {
      subraceData = this.dataService.getSubrace(
        this.character?.race.name,
        this.character?.race.subrace
      );
    }

    if (raceData) {
      speeds.walk = raceData.speed;

      for (let trait of raceData.traits) {
        [speeds, speedBonuses] = this.getFeatureSpeeds(
          trait,
          this.character?.race.choices,
          this.getTotalLevel(),
          speeds,
          speedBonuses
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        [speeds, speedBonuses] = this.getFeatureSpeeds(
          trait,
          this.character?.race.choices,
          this.getTotalLevel(),
          speeds,
          speedBonuses
        );
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            [speeds, speedBonuses] = this.getFeatureSpeeds(
              feature,
              c.choices,
              c.level,
              speeds,
              speedBonuses
            );
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            [speeds, speedBonuses] = this.getFeatureSpeeds(
              feature,
              c.choices,
              c.level,
              speeds,
              speedBonuses
            );
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          [speeds, speedBonuses] = this.getFeatureSpeeds(
            featData,
            this.character?.background.choices,
            this.getTotalLevel(),
            speeds,
            speedBonuses
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      [speeds, speedBonuses] = this.getFeatureSpeeds(
        feature,
        [],
        this.getTotalLevel(),
        speeds,
        speedBonuses
      );
    });

    for (let k of Object.keys(speeds)) {
      const val = speeds[k];
      if (val === -1) {
        speeds[k] = speeds.walk;
      }
      if (val === -0.5) {
        speeds[k] = Math.floor(speeds.walk / 2 / 5) * 5;
      }

      if (speedBonuses[k]) {
        speeds[k] += speedBonuses[k];
      }
    }

    return speeds;
  }
  public getFeatureSpeeds(
    feature: any,
    choices: any[],
    level: number,
    speeds: any,
    speedBonuses: any
  ): any {
    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          [speeds, speedBonuses] = this.getFeatureSpeeds(
            infusionRecord,
            choices,
            level,
            speeds,
            speedBonuses
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          [speeds, speedBonuses] = this.getFeatureSpeeds(
            techniqueRecord,
            choices,
            level,
            speeds,
            speedBonuses
          );
        }
      }

      let amount = 0;
      if (Array.isArray(g.amount)) {
        amount = g.amount[level - 1];
      } else {
        amount = g.amount;
      }

      if (g.type === 'speed') {
        if (g.speed) {
          if (
            (amount > (speeds[g.speed] ?? 0) || amount === -1) &&
            speeds[g.speed] !== -1 &&
            speeds[g.speed] !== -0.5
          ) {
            speeds[g.speed] = amount;
          }
        } else {
          if (amount > speeds.walk ?? 0) {
            speeds.walk = amount;
          }
        }
      } else if (g.type === 'speed-bonus') {
        if (g.speed) {
          if (speedBonuses[g.speed]) {
            speedBonuses[g.speed] += amount;
          } else {
            speedBonuses[g.speed] = amount;
          }
        } else {
          if (speedBonuses.walk) {
            speedBonuses.walk += amount;
          } else {
            speedBonuses.walk = amount;
          }
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      [speeds, speedBonuses] = this.getFeatureSpeeds(
        s,
        choices,
        level,
        speeds,
        speedBonuses
      );
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        [speeds, speedBonuses] = this.getChoiceSpeeds(
          choice,
          choices,
          level,
          speeds,
          speedBonuses
        );
      }
    } else {
      [speeds, speedBonuses] = this.getChoiceSpeeds(
        feature.choices,
        choices,
        level,
        speeds,
        speedBonuses
      );
    }

    if (feature.listed) {
      [speeds, speedBonuses] = this.getListedSpeeds(
        feature.listed,
        choices,
        level,
        speeds,
        speedBonuses
      );
    }

    return [speeds, speedBonuses];
  }
  private getChoiceSpeeds(
    choice: any,
    choices: any[],
    level: number,
    speeds: any,
    speedBonuses: any
  ): any {
    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        [speeds, speedBonuses] = this.getFeatureSpeeds(
          trait,
          choices,
          level,
          speeds,
          speedBonuses
        );
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        [speeds, speedBonuses] = this.getFeatureSpeeds(
          feat,
          choices,
          level,
          speeds,
          speedBonuses
        );
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        [speeds, speedBonuses] = this.getFeatureSpeeds(
          data,
          choices,
          level,
          speeds,
          speedBonuses
        );
      }
    }

    return [speeds, speedBonuses];
  }
  private getListedSpeeds(
    listed: any,
    choices: any[],
    level: number,
    speeds: any,
    speedBonuses: any
  ): any {
    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          [speeds, speedBonuses] = this.getFeatureSpeeds(
            data,
            choices,
            level,
            speeds,
            speedBonuses
          );
        }
      }
    }

    return [speeds, speedBonuses];
  }

  public async getJumping(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let jump = {
      modifier: 0,
      multiplier: 0,
      standing: false,
    };

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
        jump = this.getFeatureJumping(
          trait,
          this.character?.race.choices,
          jump
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        jump = this.getFeatureJumping(
          trait,
          this.character?.race.choices,
          jump
        );
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            jump = this.getFeatureJumping(feature, c.choices, jump);
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            jump = this.getFeatureJumping(feature, c.choices, jump);
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          jump = this.getFeatureJumping(
            featData,
            this.character?.background.choices,
            jump
          );
        }
      }
    });

    return jump;
  }
  public getFeatureJumping(feature: any, choices: any[], jump: any): any {
    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          jump = this.getFeatureJumping(infusionRecord, choices, jump);
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          jump = this.getFeatureJumping(techniqueRecord, choices, jump);
        }
      }

      if (g.type === 'jump') {
        if (g.multiplier) {
          jump.multiplier += g.multiplier;
        } else if (g.bonus) {
          jump.modifier += g.bonus;
        }
      } else if (g.type === 'standing-jump') {
        jump.standing = true;
      }
    });
    feature.subFeatures?.forEach((s) => {
      jump = this.getFeatureJumping(s, choices, jump);
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        jump = this.getChoiceJumping(choice, choices, jump);
      }
    } else {
      jump = this.getChoiceJumping(feature.choices, choices, jump);
    }

    if (feature.listed) {
      jump = this.getListedJumping(feature.listed, choices, jump);
    }

    return jump;
  }
  private getChoiceJumping(choice: any, choices: any[], jump: any): any {
    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        jump = this.getFeatureJumping(trait, choices, jump);
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        jump = this.getFeatureJumping(feat, choices, jump);
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        jump = this.getFeatureJumping(data, choices, jump);
      }
    }

    return jump;
  }
  private getListedJumping(listed: any, choices: any[], jump: any): any {
    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          jump = this.getFeatureJumping(data, choices, jump);
        }
      }
    }

    return jump;
  }

  public getMaxUsesById(
    dataObj: any,
    characterObj: any,
    useId: string,
    level: number
  ): number {
    let maxUses = 0;
    if (!dataObj) {
      const choiceEntry = characterObj.choices?.find(
        (ch) => ch.id === 'bg-feat'
      )?.value;
      const featData = this.dataService.getFeat(choiceEntry);

      const choiceEntry4 = characterObj.choices?.find(
        (ch) => ch.id === 'bg-feat-4'
      )?.value;
      const featData4 = this.dataService.getFeat(choiceEntry4);

      if (featData || featData4) {
        return (
          this.getFeatureUses(
            featData,
            characterObj.choices,
            useId,
            level,
            maxUses
          ) ||
          this.getFeatureUses(
            featData4,
            characterObj.choices,
            useId,
            level,
            maxUses
          )
        );
      }
    }

    if (dataObj?.traits) {
      for (let trait of dataObj.traits) {
        maxUses = this.getFeatureUses(
          trait,
          characterObj.choices,
          useId,
          level,
          maxUses
        );
      }
    } else if (dataObj?.features) {
      for (let i = 1; i <= level; i++) {
        if (dataObj.features[i]) {
          for (let feature of dataObj.features[i]) {
            maxUses = this.getFeatureUses(
              feature,
              characterObj.choices,
              useId,
              level,
              maxUses
            );
          }
        }
      }
    }

    if (dataObj?.subraces) {
      let subrace = dataObj.subraces.find(
        (s) => s.name === characterObj.subrace
      );
      if (subrace) {
        for (let trait of subrace.traits) {
          maxUses = this.getFeatureUses(
            trait,
            characterObj.choices,
            useId,
            level,
            maxUses
          );
        }
      }
    }
    if (dataObj?.subclasses) {
      let subclass = dataObj.subclasses.find(
        (s) => s.name === characterObj.subclass
      );
      if (subclass) {
        for (let i = 1; i <= level; i++) {
          if (subclass.features[i]) {
            for (let feature of subclass.features[i]) {
              maxUses = this.getFeatureUses(
                feature,
                characterObj.choices,
                useId,
                level,
                maxUses
              );
            }
          }
        }
      }
    }

    this.character?.overrides?.forEach((feature) => {
      maxUses = this.getFeatureUses(feature, [], useId, level, maxUses);
    });

    return maxUses;
  }
  private getFeatureUses(
    feature: any,
    choices: any[],
    useId: string,
    level: number,
    maxUses: number
  ): number {
    if (maxUses !== -1) {
      if (feature.uses) {
        if (Array.isArray(feature.uses)) {
          for (let use of feature.uses) {
            if (use.id === useId) {
              switch (use.type) {
                case 'fixed':
                  maxUses += use.amount;
                  break;
                case 'level':
                  maxUses += use.amount[level - 1];
                case 'derived':
                  let amount = 0;
                  switch (use.source) {
                    case 'level':
                      amount = level;
                      break;
                    case 'proficiency':
                      amount = Math.floor(2 + (level - 1) / 4);
                      break;
                    case 'score':
                      let score;
                      if (use.score.includes('-')) {
                        score = choices.find(
                          (ch) => ch.id === use.score
                        )?.value;
                      } else {
                        score = use.score;
                      }

                      if (score) {
                        amount = this.getModifier(score);
                      }
                      break;
                  }

                  switch (use.modifier) {
                    case '*2':
                      amount *= 2;
                      break;
                    case '+1':
                      amount += 1;
                      break;
                    case '*10':
                      amount *= 10;
                      break;
                    case '*5':
                      amount *= 5;
                      break;
                    case '/2':
                      amount = Math.floor(amount / 2);
                      break;
                  }

                  maxUses += amount;
                  break;
              }
            }
          }
        } else if (feature.uses.id === useId) {
          let use = feature.uses;
          if (use) {
            switch (use.type) {
              case 'fixed':
                maxUses += use.amount;
                break;
              case 'level':
                maxUses += use.amount[level - 1];
              case 'derived':
                let amount = 0;
                switch (use.source) {
                  case 'level':
                    amount = level;
                    break;
                  case 'proficiency':
                    amount = Math.floor(2 + (level - 1) / 4);
                    break;
                  case 'score':
                    let score;
                    if (use.score.includes('-')) {
                      score = choices.find((ch) => ch.id === use.score)?.value;
                    } else {
                      score = use.score;
                    }

                    if (score) {
                      amount = this.getModifier(score);
                    }
                    break;
                }

                switch (use.modifier) {
                  case '*2':
                    amount *= 2;
                    break;
                  case '+1':
                    amount += 1;
                    break;
                  case '*10':
                    amount *= 10;
                    break;
                  case '*5':
                    amount *= 5;
                    break;
                  case '/2':
                    amount = Math.floor(amount / 2);
                    break;
                }

                maxUses += amount;
                break;
            }
          }
        }
      }

      if (feature.subFeatures) {
        for (let s of feature.subFeatures) {
          maxUses = this.getFeatureUses(s, choices, useId, level, maxUses);
        }
      }

      if (Array.isArray(feature.choices)) {
        for (let choice of feature.choices) {
          maxUses = this.getChoiceUses(choice, choices, useId, level, maxUses);
        }
      } else {
        maxUses = this.getChoiceUses(
          feature.choices,
          choices,
          useId,
          level,
          maxUses
        );
      }

      if (feature.listed) {
        maxUses = this.getListedUses(
          feature.listed,
          choices,
          useId,
          level,
          maxUses
        );
      }
    }
    return maxUses;
  }
  private getChoiceUses(
    choice: any,
    choices: any[],
    useId: string,
    level: number,
    maxUses: number
  ): number {
    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        maxUses = this.getFeatureUses(trait, choices, useId, level, maxUses);
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        maxUses = this.getFeatureUses(feat, choices, useId, level, maxUses);
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        maxUses = this.getFeatureUses(data, choices, useId, level, maxUses);
      }
    }

    return maxUses;
  }
  private getListedUses(
    listed: any,
    choices: any[],
    useId: string,
    level: number,
    maxUses: number
  ): number {
    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          maxUses = this.getFeatureUses(data, choices, useId, level, maxUses);
        }
      }
    }

    return maxUses;
  }

  public getUseResetById(
    dataObj: any,
    characterObj: any,
    useId: string,
    level: number
  ): number {
    let reset = 0;
    if (!dataObj) {
      const choiceEntry = characterObj.choices?.find(
        (ch) => ch.id === 'bg-feat'
      )?.value;
      const featData = this.dataService.getFeat(choiceEntry);

      const choiceEntry4 = characterObj.choices?.find(
        (ch) => ch.id === 'bg-feat-4'
      )?.value;
      const featData4 = this.dataService.getFeat(choiceEntry4);

      if (featData || featData4) {
        return (
          this.getFeatureUseReset(
            featData,
            characterObj.choices,
            useId,
            level,
            reset
          ) ||
          this.getFeatureUseReset(
            featData4,
            characterObj.choices,
            useId,
            level,
            reset
          )
        );
      }
    }

    if (dataObj?.traits) {
      for (let trait of dataObj.traits) {
        reset = this.getFeatureUseReset(
          trait,
          characterObj.choices,
          useId,
          level,
          reset
        );
      }
    } else if (dataObj?.features) {
      for (let i = 1; i <= level; i++) {
        if (dataObj.features[i]) {
          for (let feature of dataObj.features[i]) {
            reset = this.getFeatureUseReset(
              feature,
              characterObj.choices,
              useId,
              level,
              reset
            );
          }
        }
      }
    }

    if (dataObj?.subraces) {
      let subrace = dataObj.subraces.find(
        (s) => s.name === characterObj.subrace
      );
      if (subrace) {
        for (let trait of subrace.traits) {
          reset = this.getFeatureUseReset(
            trait,
            characterObj.choices,
            useId,
            level,
            reset
          );
        }
      }
    }
    if (dataObj?.subclasses) {
      let subclass = dataObj.subclasses.find(
        (s) => s.name === characterObj.subclass
      );
      if (subclass) {
        for (let i = 1; i <= level; i++) {
          if (subclass.features[i]) {
            for (let feature of subclass.features[i]) {
              reset = this.getFeatureUseReset(
                feature,
                characterObj.choices,
                useId,
                level,
                reset
              );
            }
          }
        }
      }
    }

    this.character?.overrides?.forEach((feature) => {
      reset = this.getFeatureUseReset(feature, [], useId, level, reset);
    });

    return reset;
  }
  private getFeatureUseReset(
    feature: any,
    choices: any[],
    useId: string,
    level: number,
    reset: number
  ): number {
    if (feature.uses) {
      let use;
      if (Array.isArray(feature.uses)) {
        use = feature.uses.find((u) => u.id === useId);
      } else if (feature.uses.id === useId) {
        use = feature.uses;
      }

      if (use) {
        if (use.reset < reset || !reset) {
          reset = use.reset;
        }
      }
    }

    if (feature.subFeatures) {
      for (let s of feature.subFeatures) {
        reset = this.getFeatureUseReset(s, choices, useId, level, reset);
      }
    }

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        reset = this.getChoiceUseReset(choice, choices, useId, level, reset);
      }
    } else {
      reset = this.getChoiceUseReset(
        feature.choices,
        choices,
        useId,
        level,
        reset
      );
    }

    if (feature.listed) {
      reset = this.getListedUseReset(
        feature.listed,
        choices,
        useId,
        level,
        reset
      );
    }
    return reset;
  }
  private getChoiceUseReset(
    choice: any,
    choices: any[],
    useId: string,
    level: number,
    reset: number
  ): number {
    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        reset = this.getFeatureUseReset(trait, choices, useId, level, reset);
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        reset = this.getFeatureUseReset(feat, choices, useId, level, reset);
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        reset = this.getFeatureUseReset(data, choices, useId, level, reset);
      }
    }

    return reset;
  }
  private getListedUseReset(
    listed: any,
    choices: any[],
    useId: string,
    level: number,
    reset: number
  ): number {
    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          reset = this.getFeatureUseReset(data, choices, useId, level, reset);
        }
      }
    }

    return reset;
  }

  public async getCharacterPassives(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    let passiveBonuses = {};

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
        passiveBonuses = this.getFeaturePassives(
          trait,
          this.character?.race.choices,
          passiveBonuses
        );
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        passiveBonuses = this.getFeaturePassives(
          trait,
          this.character?.race.choices,
          passiveBonuses
        );
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            passiveBonuses = this.getFeaturePassives(
              feature,
              c.choices,
              passiveBonuses
            );
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            passiveBonuses = this.getFeaturePassives(
              feature,
              c.choices,
              passiveBonuses
            );
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          passiveBonuses = this.getFeaturePassives(
            featData,
            this.character?.background.choices,
            passiveBonuses
          );
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      passiveBonuses = this.getFeaturePassives(feature, [], passiveBonuses);
    });

    return passiveBonuses;
  }
  public getFeaturePassives(
    feature: any,
    choices: any[],
    passiveBonuses
  ): number {
    feature.granted?.forEach((g) => {
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          passiveBonuses = this.getFeaturePassives(
            infusionRecord,
            choices,
            passiveBonuses
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          passiveBonuses = this.getFeaturePassives(
            techniqueRecord,
            choices,
            passiveBonuses
          );
        }
      }

      if (g.type === 'passive-skill') {
        for (let skill of g.options) {
          let amount = g.amount;
          if (typeof amount === 'string') {
            if (amount.includes('-')) {
              const choiceEntry = choices.find((ch) => ch.id === amount);
              if (choiceEntry) {
                amount = this.getScore(choiceEntry.value);
              }
            } else {
              amount = this.getScore(amount);
            }
          }

          if (Object.keys(passiveBonuses).includes(skill)) {
            passiveBonuses[skill] += amount;
          } else {
            passiveBonuses[skill] = amount;
          }
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      passiveBonuses = this.getFeaturePassives(s, choices, passiveBonuses);
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        passiveBonuses = this.getChoicePassives(
          choice,
          choices,
          passiveBonuses
        );
      }
    } else {
      passiveBonuses = this.getChoicePassives(
        feature.choices,
        choices,
        passiveBonuses
      );
    }

    if (feature.listed) {
      passiveBonuses = this.getListedPassives(
        feature.listed,
        choices,
        passiveBonuses
      );
    }

    return passiveBonuses;
  }
  private getChoicePassives(
    choice: any,
    choices: any[],
    passiveBonuses
  ): number {
    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    if (choice?.type === 'trait') {
      const traits =
        choice.options?.find((o: any) => o.name === choiceEntry?.value)
          ?.traits ?? [];
      for (let trait of traits) {
        passiveBonuses = this.getFeaturePassives(
          trait,
          choices,
          passiveBonuses
        );
      }
    } else if (choice?.type === 'feat') {
      const feat = this.dataService.getFeat(choiceEntry?.value);
      if (feat) {
        passiveBonuses = this.getFeaturePassives(feat, choices, passiveBonuses);
      }
    } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
      const data = this.dataService.getGenericListItem(
        choice?.type,
        choiceEntry?.value
      );
      if (data) {
        passiveBonuses = this.getFeaturePassives(data, choices, passiveBonuses);
      }
    }

    return passiveBonuses;
  }
  private getListedPassives(
    listed: any,
    choices: any[],
    passiveBonuses
  ): number {
    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          passiveBonuses = this.getFeaturePassives(
            data,
            choices,
            passiveBonuses
          );
        }
      }
    }

    return passiveBonuses;
  }

  public async getCreatureType(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    if (this.character?.race) {
      const raceData = this.dataService.getRace(this.character.race.name);
      return raceData.type;
    }

    return 'Humanoid';
  }

  public async dieSizeUp(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }
    if (this.character?.classes) {
      for (let c of this.character?.classes) {
        if (c.subclass === 'Master At Arms') {
          return true;
        }
      }
    }
    return false;
  }

  public async getCompanionIds(characterId) {
    if (!this.character || !Object.keys(this.character ?? {}).length) {
      await this.getCharacterFromDb(characterId);
    }

    let companions: string[] = [];

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
        companions = [
          ...companions,
          ...this.getFeatureCompanions(trait, this.character?.race.choices).map(
            (co) => {
              co.source = 'race';
              return co;
            }
          ),
        ];
      }
    }
    if (subraceData) {
      for (let trait of subraceData.traits) {
        companions = [
          ...companions,
          ...this.getFeatureCompanions(trait, this.character?.race.choices).map(
            (co) => {
              co.source = 'race';
              return co;
            }
          ),
        ];
      }
    }

    this.character?.classes?.forEach((c, index) => {
      const classData = this.dataService.getClass(c.name);
      const subclassData = classData.subclasses.find(
        (s: any) => s.name === c.subclass
      );

      if (classData) {
        for (let level: number = 1; level <= c.level; level++) {
          (classData?.features ?? {})[level]?.forEach((feature) => {
            companions = [
              ...companions,
              ...this.getFeatureCompanions(feature, c.choices).map((co) => {
                co.source = c.name;
                return co;
              }),
            ];
          });
          (subclassData?.features ?? {})[level]?.forEach((feature) => {
            companions = [
              ...companions,
              ...this.getFeatureCompanions(feature, c.choices).map((co) => {
                co.source = c.name;
                return co;
              }),
            ];
          });
        }
      }
    });
    this.character?.background?.choices?.forEach((choice) => {
      if (choice.id === 'bg-feat' || choice.id === 'bg-feat-4') {
        const featData = this.dataService.getFeat(choice.value);
        if (featData) {
          companions = [
            ...companions,
            ...this.getFeatureCompanions(
              featData,
              this.character?.background.choices
            ).map((co) => {
              co.source = 'background';
              return co;
            }),
          ];
        }
      }
    });

    this.character?.overrides?.forEach((feature) => {
      companions = [
        ...companions,
        ...this.getFeatureCompanions(feature, []).map((co) => {
          co.source = 'override';
          return co;
        }),
      ];
    });

    companions = [...new Set(companions)];
    companions = companions.sort();

    return companions;
  }
  private getFeatureCompanions(feature: any, choices: any[]): any {
    let companions = [];

    feature.granted?.forEach((g) => {
      if (g.type === 'companion') {
        companions.push({ key: g.key });
      }
      if (g.type === 'infusion') {
        for (let infusion of g.options) {
          const infusionRecord = this.dataService.getGenericListItem(
            'infusion',
            infusion
          );
          companions.push(
            ...this.getFeatureCompanions(infusionRecord, choices)
          );
        }
      }
      if (g.type === 'ki-technique') {
        for (let technique of g.options) {
          const techniqueRecord = this.dataService.getGenericListItem(
            'ki-technique',
            technique
          );
          companions.push(
            ...this.getFeatureCompanions(techniqueRecord, choices)
          );
        }
      }
    });
    feature.subFeatures?.forEach((s) => {
      companions.push(...this.getFeatureCompanions(s, choices));
    });

    if (Array.isArray(feature.choices)) {
      for (let choice of feature.choices) {
        companions.push(...this.getChoiceCompanions(choice, choices));
      }
    } else {
      companions.push(...this.getChoiceCompanions(feature.choices, choices));
    }

    if (feature.listed) {
      companions.push(...this.getListedCompanions(feature.listed, choices));
    }

    return companions;
  }
  private getChoiceCompanions(choice: any, choices: any[]) {
    const choiceEntry = choices.find((c: any) => c.id === choice?.id);
    var companions = [];
    if (choiceEntry) {
      if (choice?.type === 'trait') {
        const traits =
          choice.options?.find((o: any) => o.name === choiceEntry?.value)
            ?.traits ?? [];
        for (let trait of traits) {
          companions = this.getFeatureCompanions(trait, choices);
        }
      } else if (choice?.type === 'feat') {
        const feat = this.dataService.getFeat(choiceEntry?.value);
        if (feat) {
          companions = this.getFeatureCompanions(feat, choices);
        }
      } else if (this.dataService.getGenericListKeys().includes(choice?.type)) {
        const data = this.dataService.getGenericListItem(
          choice?.type,
          choiceEntry?.value
        );
        if (data) {
          companions = this.getFeatureCompanions(data, choices);
        }
      } else if (choice?.type == 'companion') {
        companions = [{ key: choiceEntry.value }];
      }
    }

    return companions;
  }
  private getListedCompanions(listed: any, choices: any[]) {
    var companions = [];

    const choiceEntry = choices.find((c: any) => c.id === listed?.id);
    if (this.dataService.getGenericListKeys().includes(listed?.type)) {
      for (let item of choiceEntry?.list ?? []) {
        const data = this.dataService.getGenericListItem(listed.type, item);
        if (data) {
          companions.push(...this.getFeatureCompanions(data, choices));
        }
      }
    }

    return companions;
  }
}
