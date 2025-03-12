import { Injectable } from '@angular/core';
import spells from '../data/character-creation-resources/spells.json';
import exploits from '../data/character-creation-resources/exploits.json';
import races from '../data/character-creation-resources/races.json';
import classes from '../data/character-creation-resources/classes.json';
import extraLists from '../data/character-creation-resources/lists.json';
import backgroundFeatures from '../data/character-creation-resources/background-features.json';
import feats from '../data/character-creation-resources/feats.json';
import transformations from '../data/character-creation-resources/transformations.json';
import generic from '../data/character-creation-resources/generic.json';
import companions from '../data/character-creation-resources/companions.json';
import monsters from '../data/monsters.json';
import { IClass, IRace, ISubclass, ISubrace } from 'src/app/models/data.models';

import meleeWeapons from '../data/general-store/weapons/melee-weapons.json';
import rangedWeapons from '../data/general-store/weapons/ranged-weapons.json';
import shields from '../data/general-store/shields.json';
import equipmentPacks from '../data/general-store/adventuring-equipment/equipment-packs.json';
import magicalFoci from '../data/general-store/adventuring-equipment/magical-foci.json';
import instruments from '../data/general-store/adventuring-equipment/musical-instruments.json';
import tools from '../data/general-store/adventuring-equipment/tools.json';

import injuries from '../data/house-rules/injuries.json';

import gods from '../data/pantheons.json';

import wildMagic from '../data/character-creation-resources/wild-magic.json';
import { cp } from 'fs';

interface GenericDictionary {
  [value: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private skillData = [
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
  private spellLists = [
    'arcane',
    'divine',
    'elemental',
    'melodic',
    'invention',
    'occult',
    'primal',
    'psionic',
  ];
  private exploitLists: GenericDictionary = {
    brutal: 'Brawler',
    deadeye: 'Gunslinger',
    defiant: 'Juggernaut',
    devious: 'Rogue',
    martial: 'Fighter',
    savage: 'Barbarian',
    tactical: 'Warlord',
    wild: 'Nomad',
  };
  private scoreReference: GenericDictionary = {
    str: 'Strength',
    dex: 'Dexterity',
    con: 'Constitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    cha: 'Charisma',
  };
  public classIcons: GenericDictionary = {
    artificer: 'cog',
    atavist: 'heart-broken',
    barbarian: 'axe-battle',
    bard: 'music-clef-treble',
    bloodhunter: 'flask',
    brawler: 'boxing-glove',
    cleric: 'cross-celtic',
    commoner: 'hammer-sickle',
    demidragon: 'dharmachakra',
    dragonknight: 'chess-knight',
    druid: 'tree',
    empowered: 'domino-mask',
    fighter: 'sword-cross',
    gunslinger: 'pistol',
    harbinger: 'biohazard',
    inventor: 'tools',
    juggernaut: 'security',
    magus: 'magic-staff',
    monk: 'hand-back-left',
    mystic: 'brain',
    nomad: 'compass-rose',
    paladin: 'shield-cross',
    palemaster: 'skull',
    ranger: 'bow-arrow',
    rogue: 'knife-military',
    savant: 'school',
    shaman: 'crystal-ball',
    sorcerer: 'creation',
    summoner: 'account-group',
    troubadour: 'violin',
    vessel: 'account-child',
    warlock: 'pentagram',
    warlord: 'flag-variant',
    witch: 'candelabra-fire',
    wizard: 'script-text',
  };

  constructor() {}

  public generateUUID() {
    var d = new Date().getTime();
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  private nameUrlEncode(name: string): string {
    return name?.replace(/[ '"\(\)!\/:,]/g, '-')?.toLowerCase() ?? '';
  }
  private capitalize(text: string): string {
    if (text == undefined) {
      return '';
    }
    return text?.charAt(0).toUpperCase() + text.slice(1);
  }

  public wildMagicSurge(): string {
    let surge = wildMagic[Math.floor(Math.random() * wildMagic.length)];

    if (surge.includes('~')) {
      if (surge.includes('spell~')) {
        if (surge.includes('1stlevel')) {
          let filtered = spells.filter((s) => s.level === 1);
          let spell = filtered[Math.floor(Math.random() * filtered.length)];

          surge = surge.replace('spell~1stlevel', spell.name);
        } else if (surge.includes('2ndlevel')) {
          let filtered = spells.filter((s) => s.level === 2);
          let spell = filtered[Math.floor(Math.random() * filtered.length)];

          surge = surge.replace('spell~2ndlevel', spell.name);
        } else if (surge.includes('3rdlevel')) {
          let filtered = spells.filter((s) => s.level === 3);
          let spell = filtered[Math.floor(Math.random() * filtered.length)];

          surge = surge.replace('spell~3rdlevel', spell.name);
        } else if (surge.includes('4thlevel')) {
          let filtered = spells.filter((s) => s.level === 4);
          let spell = filtered[Math.floor(Math.random() * filtered.length)];

          surge = surge.replace('spell~4thlevel', spell.name);
        } else if (surge.includes('5thlevel')) {
          let filtered = spells.filter((s) => s.level === 5);
          let spell = filtered[Math.floor(Math.random() * filtered.length)];

          surge = surge.replace('spell~5thlevel', spell.name);
        }
      }
    }

    return surge;
  }

  public getMulticlassingData(): any[] {
    return this.getClasses().map((c) => {
      return {
        name: c.name,
        scores: c.multiclassScores,
        special: c.multiclassSpecial,
        spellcastingLevel: c.spellcastingLevel ?? 0,

        armor: c.proficiencies.multiclassArmor,
        weapons: c.proficiencies.multiclassWeapons,
        tools: c.proficiencies.multiclassTools,
        skills: c.proficiencies.multiclassSkills,
      };
    });
  }

  public getSpellsByList(list: string): any[] {
    let filteredSpells: any[] = [];
    if (list === 'all') {
      filteredSpells = spells;
    } else {
      if (this.spellLists.includes(list)) {
        filteredSpells = spells.filter((s: any) =>
          s.lists?.map((l: string) => l.toLowerCase())?.includes(list)
        );
      } else {
        filteredSpells = spells.filter(
          (s: any) => s.school.toLowerCase() === list
        );
      }
    }

    filteredSpells = filteredSpells
      .sort((a: any, b: any) => {
        if (a.level < b.level) {
          return -1;
        } else if (a.level === b.level) {
          return a.name.localeCompare(b.name);
        } else {
          return 1;
        }
      })
      .map((s: any) => {
        s.index = this.nameUrlEncode(s.name);
        return s;
      });

    const splitSpells: any[] = [];
    for (let i = 0; i < 10; i++) {
      if (filteredSpells.find((s: any) => s.level === i)) {
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
          spells: filteredSpells.filter((s: any) => s.level === i),
        });
      }
    }

    return splitSpells;
  }
  public getSpellsByListUnsplit(list: string): any[] {
    let filteredSpells: any[] = [];
    if (list === 'all') {
      filteredSpells = spells;
    } else {
      if (this.spellLists.includes(list)) {
        filteredSpells = spells.filter((s: any) =>
          s.lists?.map((l: string) => l.toLowerCase())?.includes(list)
        );
      } else {
        filteredSpells = spells.filter(
          (s: any) => s.school.toLowerCase() === list
        );
      }
    }

    filteredSpells = filteredSpells
      .sort((a: any, b: any) => {
        if (a.level < b.level) {
          return -1;
        } else if (a.level === b.level) {
          return a.name.localeCompare(b.name);
        } else {
          return 1;
        }
      })
      .map((s: any) => {
        s.index = this.nameUrlEncode(s.name);
        return s;
      });

    return filteredSpells;
  }
  public getSpell(name: string): any {
    return spells.find(
      (s: any) => this.nameUrlEncode(s.name) === this.nameUrlEncode(name)
    );
  }

  public getExploitsByList(list: string): any[] {
    let filteredExploits: any[] = [];
    if (list === 'all') {
      filteredExploits = exploits;
    } else {
      filteredExploits = exploits.filter((e: any) =>
        e.lists.map((l: string) => l.toLowerCase()).includes(list)
      );
    }

    filteredExploits = filteredExploits
      .sort((a: any, b: any) => {
        if (a.degree < b.degree) {
          return -1;
        } else if (a.degree === b.degree) {
          return a.name.localeCompare(b.name);
        } else {
          return 1;
        }
      })
      .map((e: any) => {
        e.index = this.nameUrlEncode(e.name);
        if (e.save) {
          e.save = this.scoreReference[e.save];
        }
        return e;
      });

    const splitExploits: any[] = [];
    for (let i = 1; i <= 5; i++) {
      if (filteredExploits.find((e: any) => e.degree === i)) {
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
          exploits: filteredExploits.filter((e: any) => e.degree === i),
        });
      }
    }

    return splitExploits;
  }
  public getExploitsByListUnsplit(list: string): any[] {
    let filteredExploits: any[] = [];
    if (list === 'all') {
      filteredExploits = exploits;
    } else {
      filteredExploits = exploits.filter((e: any) =>
        e.lists.map((l: string) => l.toLowerCase()).includes(list)
      );
    }

    filteredExploits = filteredExploits
      .sort((a: any, b: any) => {
        if (a.degree < b.degree) {
          return -1;
        } else if (a.degree === b.degree) {
          return a.name.localeCompare(b.name);
        } else {
          return 1;
        }
      })
      .map((e: any) => {
        e.index = this.nameUrlEncode(e.name);
        if (e.save) {
          e.save = this.scoreReference[e.save];
        }
        return e;
      });

    return filteredExploits;
  }
  public getExploit(name: string): any {
    let exploit = exploits.find(
      (e: any) => this.nameUrlEncode(e.name) === this.nameUrlEncode(name)
    );
    if (exploit.save) {
      exploit.save = this.scoreReference[exploit.save];
    }
    return exploit;
  }
  public getExploitData(name: string): any {
    return exploits.find(
      (e: any) => this.nameUrlEncode(e.name) === this.nameUrlEncode(name)
    );
  }

  public getRaces(): any {
    let raceData = races;
    raceData = raceData.map((r: any) => {
      r.index = this.nameUrlEncode(r.name);
      return r;
    });

    let splitRaces: any[] = [];
    for (let race of raceData) {
      let list = splitRaces.find((s: any) => s.name === race.category);
      if (list) {
        list.list.push(race);
        list.list = list.list.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      } else {
        splitRaces.push({
          name: race.category,
          list: [race],
        });
      }
    }

    splitRaces = splitRaces.sort((a, b) => a.name.localeCompare(b.name));

    return splitRaces;
  }
  public getRace(name: string): IRace {
    return races.find((r: any) => this.nameUrlEncode(r.name) === name);
  }
  public getSubrace(raceName: string, subraceName: string): ISubrace {
    const raceData = this.getRace(raceName);
    return raceData.subraces?.find(
      (s: any) => this.nameUrlEncode(s.name) === this.nameUrlEncode(subraceName)
    );
  }

  public getClasses(): any {
    let classData = classes;
    classData = classData
      .filter((c) => c.show !== false)
      .map((c: any) => {
        c.index = this.nameUrlEncode(c.name);
        return c;
      });

    return classData;
  }
  public getClass(name: string): IClass {
    const classData: any[] = classes;
    return classData.find((r: any) => this.nameUrlEncode(r.name) === name);
  }
  public getSubclass(className: string, subclassName: string): ISubclass {
    const classData = this.getClass(className);
    return classData.subclasses.find(
      (s: any) =>
        this.nameUrlEncode(s.name) === this.nameUrlEncode(subclassName)
    );
  }
  public getGenericListKeys(): string[] {
    return Object.keys(extraLists);
  }
  public getExtraTabData(dataType: string): any {
    const data = extraLists[dataType];

    let splitData: any[] = [];
    for (let item of data) {
      if (
        item.prereq &&
        (item.prereq.type === 'choice' || item.prereq.type === 'subclass')
      ) {
        const list = splitData.find((l) => l.prereq === item.prereq.value);

        if (!list) {
          splitData.push({
            prereq: item.prereq.value,
            name: item.prereq.value,
            list: [item],
          });
        } else {
          list.list.push(item);
        }
      } else if (item.prereqLevel) {
        const list = splitData.find((l) => l.prereq === item.prereqLevel);

        if (!list) {
          splitData.push({
            prereq: item.prereqLevel,
            list: [item],
          });
        } else {
          list.list.push(item);
        }
      } else {
        const list = splitData.find((l) => l.prereq === 'none');

        if (!list) {
          splitData.push({
            prereq: 'none',
            list: [item],
          });
        } else {
          list.list.push(item);
        }
      }
    }

    if (splitData.findIndex((l) => l.prereq === 'none') !== -1) {
      let firstDegree = splitData.find((l) => l.prereq === 'none');
      splitData = splitData.filter((l) => l.prereq !== 'none');
      splitData = splitData.sort((a: any, b: any) => {
        if (isNaN(a.prereq) && isNaN(b.prereq)) {
          return 0;
        } else if (isNaN(a.prereq) && !isNaN(b.prereq)) {
          return 1;
        } else if (!isNaN(a.prereq) && isNaN(b.prereq)) {
          return -1;
        } else {
          return a.prereq - b.prereq;
        }
      });
      splitData = [firstDegree, ...splitData];
      for (let i = 0; i < splitData.length; i++) {
        if (!splitData[i].name) {
          switch (i + 1) {
            case 1:
              splitData[i].name = '1st-Degree';
              break;
            case 2:
              splitData[i].name = '2nd-Degree';
              break;
            case 3:
              splitData[i].name = '3rd-Degree';
              break;
            default:
              splitData[i].name = `${i + 1}th-Degree`;
              break;
          }
        }
      }
    } else {
      for (let i = 0; i < splitData.length; i++) {
        if (!splitData[i].name) {
          switch (i + 1) {
            case 1:
              splitData[i].name = '1st-Degree';
              break;
            case 2:
              splitData[i].name = '2nd-Degree';
              break;
            case 3:
              splitData[i].name = '3rd-Degree';
              break;
            default:
              splitData[i].name = `${i + 1}th-Degree`;
              break;
          }
        }
      }
    }

    return splitData;
  }
  public getExtraTabDataUnsplit(dataType: string): any {
    return extraLists[dataType];
  }
  public getGenericListItem(dataType: string, name: string): any {
    return extraLists[dataType].find((i: any) => i.name === name);
  }

  public getBackgroundFeatures(): any[] {
    return backgroundFeatures;
  }

  public getFeats(): any[] {
    let featData = feats;
    featData = featData.map((f: any) => {
      f.index = this.nameUrlEncode(f.name);
      return f;
    });

    let splitFeats: any[] = [];
    for (let feat of featData) {
      if (feat.name !== 'placeholder') {
        let list = splitFeats.find(
          (s: any) => s.name === this.capitalize(feat.type)
        );
        if (list) {
          list.list.push(feat);
          list.list = list.list.sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
          );
        } else {
          splitFeats.push({
            name: this.capitalize(feat.type),
            list: [feat],
          });
        }
      }
    }

    splitFeats = splitFeats.sort((a, b) => a.name.localeCompare(b.name));
    return splitFeats;
  }
  public getFeatsUnsplit(): any[] {
    let featData = feats;
    featData = featData
      .map((f: any) => {
        f.index = this.nameUrlEncode(f.name);
        return f;
      })
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    return featData;
  }
  public getFeat(name: string): any {
    return feats.find(
      (f: any) => this.nameUrlEncode(f.name) === this.nameUrlEncode(name)
    );
  }

  public getTransformations(): any[] {
    return transformations.map((t: any) => {
      t.index = this.nameUrlEncode(t.name);
      return t;
    });
  }
  public getTransformation(name: string): any {
    return transformations.find(
      (t: any) => this.nameUrlEncode(t.name) === name
    );
  }

  public getGenericKeys(): any[] {
    return Object.keys(generic);
  }
  public getGeneric(list: string): any[] {
    return generic[list];
  }

  public getMonsters(): any[] {
    let monsterData = monsters;
    monsterData = monsterData
      .map((m: any) => {
        m.index = this.nameUrlEncode(m.name);
        return m;
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return monsterData;
  }
  public getMonster(name: string): any[] {
    return monsters.find(
      (m: any) => this.nameUrlEncode(m.name) === this.nameUrlEncode(name)
    );
  }

  public getItemsByType(
    type: string,
    subType: string = '',
    tower: boolean = false
  ): string[] {
    switch (type) {
      case 'simple-weapon':
        if (subType) {
          if (subType === 'melee') {
            return meleeWeapons
              .filter((w: any) => w.type === 0)
              .map((w: any) => w.name)
              .sort();
          } else if (subType === 'ranged') {
            return rangedWeapons
              .filter((w: any) => w.type === 0)
              .map((w: any) => w.name)
              .sort();
          }
        }
        return [
          ...meleeWeapons
            .filter((w: any) => w.type === 0)
            .map((w: any) => w.name),
          ...rangedWeapons
            .filter((w: any) => w.type === 0)
            .map((w: any) => w.name),
        ].sort();
      case 'martial-weapon':
        if (subType) {
          if (subType === 'melee') {
            return meleeWeapons
              .filter((w: any) => w.type === 1)
              .map((w: any) => w.name)
              .sort();
          } else if (subType === 'ranged') {
            return rangedWeapons
              .filter((w: any) => w.type === 1)
              .map((w: any) => w.name)
              .sort();
          }
        }
        return [
          ...meleeWeapons
            .filter((w: any) => w.type === 1)
            .map((w: any) => w.name),
          ...rangedWeapons
            .filter((w: any) => w.type === 1)
            .map((w: any) => w.name),
        ].sort();
      case 'exotic-weapon':
        if (subType) {
          if (subType === 'melee') {
            return meleeWeapons
              .filter((w: any) => w.type === 2)
              .map((w: any) => w.name)
              .sort();
          } else if (subType === 'ranged') {
            return rangedWeapons
              .filter((w: any) => w.type === 2)
              .map((w: any) => w.name)
              .sort();
          }
        }
        return [
          ...meleeWeapons
            .filter((w: any) => w.type === 2)
            .map((w: any) => w.name),
          ...rangedWeapons
            .filter((w: any) => w.type === 2)
            .map((w: any) => w.name),
        ].sort();
      case 'shield':
        return shields
          .filter(
            (s: any) =>
              !(
                [
                  'tower shield',
                  'snarlshield',
                  'wall shield',
                  'warshield',
                ].includes(s.name.toLowerCase()) && !tower
              ) && !(s.name.toLowerCase() === 'buckler')
          )
          .map((s: any) => s.name)
          .sort();
      case 'magical-foci':
        return magicalFoci
          .filter((m: any) => m.type.toLowerCase().includes(subType))
          .map((m: any) => m.name)
          .sort();
      case 'instrument':
        return instruments.map((i: any) => i.name).sort();
      case 'tool':
        return tools.map((t: any) => t.name).sort();
      case 'equipment-pack':
        return equipmentPacks.map((e: any) => e.name).sort();
      default:
        return [];
    }
  }

  public isEquipmentPack(itemName: string) {
    return !!equipmentPacks.find((e: any) => e.name.toLowerCase() === itemName);
  }
  public getEquipmentPackContents(itemName: string) {
    return equipmentPacks
      .find((e: any) => e.name.toLowerCase() === itemName)
      .contentsSheet.map((c: any) => {
        c.item = c.item.toLowerCase();
        return c;
      });
  }

  public getInjuries() {
    const newData = [];
    for (let [k, v] of Object.entries(injuries)) {
      newData.push({
        type: k,
        list: v,
      });
    }

    return newData;
  }

  public getCompanion(
    companionKey: string,
    level: number,
    choices: any[],
    splMod: number
  ) {
    const monsterData = monsters.find((m) => m.name === companionKey);
    if (monsterData) {
      return monsterData;
    }

    const proficiencyBonus = Math.floor(2 + (level - 1) / 4);
    let companionData = companions.find((co) => co.key === companionKey);

    let baseStats = companionData.stats['0'].any;
    if (Object.keys(companionData.stats['0']).length !== 1) {
      const choiceIndex = choices.find(
        (c) => c.id === companionData.stats['0'].id
      );
      if (choiceIndex) {
        const choiceValue = choiceIndex.value;
        const choiceStats = companionData.stats['0'][choiceValue];

        for (let [key, value] of Object.entries(choiceStats)) {
          let keyValue: any = value;

          if (['ac', 'name'].includes(key)) {
            baseStats[key] = keyValue;
          } else if (['str', 'dex', 'con', 'int', 'wis', 'cha'].includes(key)) {
            if (baseStats[key] < keyValue) {
              baseStats[key] = keyValue;
            }
          } else {
            if (Array.isArray(keyValue)) {
              if (baseStats[key] !== undefined) {
                for (let item of keyValue) {
                  baseStats[key] = baseStats[key].filter((baseItem) => {
                    if (item.constructor.name === 'Object') {
                      return baseItem.name !== item.name;
                    } else {
                      if (baseItem.includes('understands')) {
                        return false;
                      }
                      return baseItem !== item;
                    }
                  });
                  baseStats[key].push(item);
                }
              } else {
                baseStats[key] = keyValue;
              }
            } else if (keyValue.constructor.name == 'Object') {
              if (baseStats[key] !== undefined) {
                baseStats[key] = { ...baseStats[key], ...keyValue };
              } else {
                baseStats[key] = keyValue;
              }
            }
          }
        }
      }
    }

    for (let companionLevel of Object.keys(companionData.stats)) {
      if (companionLevel === '0') {
        continue;
      }

      if (parseInt(companionLevel) <= level) {
        const levelStats = companionData.stats[companionLevel.toString()];
        if (levelStats) {
          if (levelStats['any']) {
            for (let [key, value] of Object.entries(levelStats['any'])) {
              let keyValue: any = value;

              if (['ac', 'name'].includes(key)) {
                baseStats[key] = keyValue;
              } else if (
                ['str', 'dex', 'con', 'int', 'wis', 'cha'].includes(key)
              ) {
                if (baseStats[key] < keyValue) {
                  baseStats[key] = keyValue;
                }
              } else {
                if (Array.isArray(keyValue)) {
                  if (baseStats[key] !== undefined) {
                    for (let item of keyValue) {
                      baseStats[key] = baseStats[key].filter((baseItem) => {
                        if (item.constructor.name === 'Object') {
                          return baseItem.name !== item.name;
                        } else {
                          if (baseItem.includes('understands')) {
                            return false;
                          }
                          return baseItem !== item;
                        }
                      });
                      baseStats[key].push(item);
                    }
                  } else {
                    baseStats[key] = keyValue;
                  }
                } else if (keyValue.constructor.name == 'Object') {
                  if (baseStats[key] !== undefined) {
                    baseStats[key] = { ...baseStats[key], ...keyValue };
                  } else {
                    baseStats[key] = keyValue;
                  }
                }
              }
            }
          }
          if (levelStats['id']) {
            const choiceIndex = choices.find((c) => c.id === levelStats['id']);
            if (choiceIndex) {
              const choiceValue = choiceIndex.value;
              const choiceStats = levelStats[choiceValue];

              for (let [key, value] of Object.entries(choiceStats)) {
                let keyValue: any = value;

                if (['ac', 'name'].includes(key)) {
                  baseStats[key] = keyValue;
                } else if (
                  ['str', 'dex', 'con', 'int', 'wis', 'cha'].includes(key)
                ) {
                  if (baseStats[key] < keyValue) {
                    baseStats[key] = keyValue;
                  }
                } else {
                  if (Array.isArray(keyValue)) {
                    if (baseStats[key] !== undefined) {
                      for (let item of keyValue) {
                        baseStats[key] = baseStats[key].filter((baseItem) => {
                          if (item.constructor.name === 'Object') {
                            return baseItem.name !== item.name;
                          } else {
                            if (baseItem.includes('understands')) {
                              return false;
                            }
                            return baseItem !== item;
                          }
                        });
                        baseStats[key].push(item);
                      }
                    } else {
                      baseStats[key] = keyValue;
                    }
                  } else if (keyValue.constructor.name == 'Object') {
                    if (baseStats[key] !== undefined) {
                      baseStats[key] = { ...baseStats[key], ...keyValue };
                    } else {
                      baseStats[key] = keyValue;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    if (baseStats.trait) {
      baseStats.trait = baseStats.trait.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (baseStats.action) {
      baseStats.action = baseStats.action.sort((a, b) => {
        if (a.name === 'Multiattack') {
          return 0;
        } else if (b.name === 'Multiattack') {
          return 1;
        }

        if (
          a.entries[0].includes('Weapon Attack') &&
          !b.entries[0].includes('Weapon Attack')
        ) {
          return -1;
        } else if (
          !a.entries[0].includes('Weapon Attack') &&
          b.entries[0].includes('Weapon Attack')
        ) {
          return 1;
        }

        if (a.name.includes('(') && !b.name.includes('(')) {
          return 1;
        } else if (!a.name.includes('(') && b.name.includes('(')) {
          return -1;
        }

        return a.name.localeCompare(b.name);
      });
    }

    baseStats = JSON.stringify(baseStats);
    baseStats = baseStats.replaceAll('{PB}', proficiencyBonus);
    baseStats = baseStats.replaceAll('{spl-mod}', splMod);
    baseStats = baseStats.replaceAll(
      '{spl-atk}',
      this.formatModifier(splMod + proficiencyBonus)
    );
    baseStats = baseStats.replaceAll('{spl-dc}', splMod + proficiencyBonus + 8);

    baseStats = baseStats.replaceAll(/\{[0-9A-F\-]+\}/g, function (match) {
      if (match === '{2}') {
        return match;
      }

      const choiceIndex = choices.find((c) => c.id === match);
      if (choiceIndex) {
        return choiceIndex.value;
      } else {
        return '';
      }
    });

    baseStats = baseStats.replaceAll(/\[[0-9\+]+\]/g, function (match) {
      return match
        .replace('[', '')
        .replace(']', '')
        .split('+')
        .reduce((partialSum, a) => partialSum + parseInt(a), 0);
    });
    baseStats = baseStats.replaceAll(/\|[0-9\+]+\|/g, function (match) {
      const mod = match
        .replace('|', '')
        .replace('|', '')
        .split('+')
        .reduce((partialSum, a) => partialSum + parseInt(a), 0);

      if (mod !== undefined) {
        if (mod > 0) {
          return `+${mod}`;
        } else {
          return mod.toString();
        }
      }
      return '';
    });
    baseStats = JSON.parse(baseStats);

    if (baseStats.pbac) {
      baseStats.ac[0].ac += proficiencyBonus;
    }
    let baseHp = baseStats.hp.base;
    if (baseStats.hp.levelMod) {
      baseHp += baseStats.hp.levelMod * level;
    }
    if (baseStats.hp.splMod) {
      baseHp += splMod;
    }
    baseStats.hp = { average: baseHp };

    baseStats.skill = {};
    for (let skill of baseStats.skillProfs) {
      if (!Object.keys(baseStats.skill).includes(skill)) {
        if (skill.includes('{2}')) {
          skill = skill.replace('{2}', '');
          baseStats.skill[skill] = this.formatModifier(
            this.getModifier(baseStats[this.getSkillAbility(skill)]) +
              2 * proficiencyBonus
          );
        } else {
          baseStats.skill[skill] = this.formatModifier(
            this.getModifier(baseStats[this.getSkillAbility(skill)]) +
              proficiencyBonus
          );
        }
      }
    }
    baseStats.save = {};
    for (let save of baseStats.saveProfs) {
      baseStats.save[save] = this.formatModifier(
        this.getModifier(baseStats[save]) + proficiencyBonus
      );
    }

    if (Object.keys(baseStats.skill).includes('perception')) {
      baseStats.passive =
        10 + parseInt(baseStats.skill.perception.replace('+', ''));
    } else {
      baseStats.passive = 10 + this.getModifier(baseStats.wis);
    }

    return baseStats;
  }
  public getSkillAbility(skill: string): string {
    return this.skillData.find((s) => s.name.toLowerCase() === skill)?.score;
  }
  public getModifier(score: number): number {
    let mod = -5;
    if (score) {
      mod = Math.floor((score - 10) / 2);
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

  public getHitDieSize(className: string): number {
    const c = classes.find(
      (cl) => cl.name.toLowerCase().replaceAll(' ', '-') === className
    );
    return c?.hitDie ?? 8;
  }

  public getPantheons(): any {
    return gods;
  }
  public getGodsByDomain(domain: string): any {
    let pantheons = JSON.parse(JSON.stringify(gods));

    for (let i = 0; i < pantheons.length; i++) {
      pantheons[i].gods = pantheons[i].gods.filter((g) =>
        g.domains.find((d) => d.toLowerCase() === domain.toLowerCase())
      );
    }
    pantheons = pantheons.filter((p) => p.gods?.length);

    return pantheons;
  }

  public getCompanionChoices(
    maxCr: number[],
    creatureType: string[],
    characterLevel: number = 1
  ): string[] {
    const maxCrValue = maxCr[characterLevel - 1];
    return monsters
      .filter((m) => {
        return (
          !m.minion &&
          m.cr <= maxCrValue &&
          Object.keys(m.type).some((t) => creatureType.includes(t))
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((m) => m.name);
  }
}
