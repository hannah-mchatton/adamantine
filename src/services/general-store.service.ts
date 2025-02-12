import { Injectable } from '@angular/core';

import generalEquipment from '../data/general-store/adventuring-equipment/general-equipment.json';
import consumables from '../data/general-store/adventuring-equipment/consumables.json';
import containers from '../data/general-store/adventuring-equipment/containers.json';
import equipmentPacks from '../data/general-store/adventuring-equipment/equipment-packs.json';
import gamingSets from '../data/general-store/adventuring-equipment/gaming-sets.json';
import magicalFoci from '../data/general-store/adventuring-equipment/magical-foci.json';
import mundane from '../data/general-store/adventuring-equipment/mundane.json';
import instruments from '../data/general-store/adventuring-equipment/musical-instruments.json';
import poisons from '../data/general-store/adventuring-equipment/poisons.json';
import tools from '../data/general-store/adventuring-equipment/tools.json';

import animalEquipment from '../data/general-store/animals/animal-equipment.json';
import mounts from '../data/general-store/animals/mounts.json';
import pets from '../data/general-store/animals/pets.json';

import armor from '../data/general-store/armor.json';
import shields from '../data/general-store/shields.json';

import accomodations from '../data/general-store/other-costs/accommodations.json';
import construction from '../data/general-store/other-costs/construction.json';
import lifestyleExpenses from '../data/general-store/other-costs/lifestyle-expenses.json';
import services from '../data/general-store/other-costs/services.json';
import training from '../data/general-store/other-costs/training.json';

import goods from '../data/general-store/trading/trade-goods.json';
import livestock from '../data/general-store/trading/livestock.json';
import gems from '../data/general-store/trading/gemstones.json';

import vehicles from '../data/general-store/vehicles.json';

import meleeWeapons from '../data/general-store/weapons/melee-weapons.json';
import rangedWeapons from '../data/general-store/weapons/ranged-weapons.json';
import ammo from '../data/general-store/weapons/ammunition.json';
import siegeWeapons from '../data/general-store/weapons/siege-weapons.json';

import magicItems from '../data/general-store/magic-items/magic-items.json';

import trinkets from '../data/general-store/trinkets.json';

import firearmData from '../data/general-store/weapons/firearms.json';

interface Firearm {
  name: string;
  data: FirearmData;
}
interface FirearmData {
  [key: string]: number;
}

@Injectable({
  providedIn: 'root',
})
export class GeneralStoreService {
  public tabs = [
    {
      name: 'Basic Equipment',
      children: [
        {
          name: 'General Equipment',
          type: 'generic',
          data: 'generalEquipment',
        },
        {
          name: 'Consumables',
          type: 'generic',
          data: 'consumables',
        },
        {
          name: 'Containers',
          type: 'generic',
          data: 'containers',
        },
        {
          name: 'Equipment Packs',
          type: 'generic',
          data: 'equipmentPacks',
          excluded: ['contentsSheet'],
        },
        {
          name: 'Gaming Sets',
          type: 'generic',
          data: 'gamingSets',
        },
        {
          name: 'Magical Foci',
          type: 'generic',
          data: 'magicalFoci',
        },
        {
          name: 'Mundane Items',
          type: 'generic',
          data: 'mundane',
        },
        {
          name: 'Musical Instruments',
          type: 'generic',
          data: 'musicalInstruments',
        },
        {
          name: 'Poisons',
          type: 'generic',
          data: 'poisons',
        },
        {
          name: 'Tools',
          type: 'generic',
          data: 'tools',
        },
      ],
    },
    {
      name: 'Animals',
      children: [
        {
          name: 'Animal Equipment',
          type: 'generic',
          data: 'animalEquipment',
        },
        {
          name: 'Mounts',
          type: 'animal',
          data: 'mounts',
        },
        {
          name: 'Pets',
          type: 'pet',
          data: 'pets',
        },
      ],
    },
    {
      name: 'Armor',
      children: [
        {
          name: 'Clothing',
          type: 'armor',
          data: 'armor.clothing',
        },
        {
          name: 'Light Armor',
          type: 'armor',
          data: 'armor.light',
        },
        {
          name: 'Medium Armor',
          type: 'armor',
          data: 'armor.medium',
        },
        {
          name: 'Heavy Armor',
          type: 'armor',
          data: 'armor.heavy',
        },
        {
          name: 'Shields',
          type: 'armor',
          data: 'shields',
        },
      ],
    },
    {
      name: 'Other Costs',
      children: [
        {
          name: 'Accomodations',
          type: 'generic',
          data: 'accomodations',
        },
        {
          name: 'Lifestyle Expenses',
          type: 'generic',
          data: 'lifestyleExpenses',
        },
        {
          name: 'Services',
          type: 'generic',
          data: 'services',
        },
        {
          name: 'Training',
          type: 'generic',
          data: 'training',
        },
      ],
    },
    {
      name: 'Trade Goods',
      children: [
        {
          name: 'Goods',
          type: 'generic',
          data: 'goods',
        },
        {
          name: 'Livestock',
          type: 'generic',
          data: 'livestock',
        },
        {
          name: 'Gemstones',
          type: 'generic',
          data: 'gems',
        },
      ],
    },
    {
      name: 'Vehicles',
      children: [
        {
          name: 'Land Vehicles',
          type: 'vehicle',
          data: 'vehicles.land',
        },
        {
          name: 'Water Vehicles',
          type: 'vehicle',
          data: 'vehicles.water',
        },
        {
          name: 'Air Vehicles',
          type: 'vehicle',
          data: 'vehicles.air',
        },
        {
          name: 'Astral Vehicles',
          type: 'vehicle',
          data: 'vehicles.astral',
        },
      ],
    },
    {
      name: 'Weapons',
      children: [
        {
          name: 'Simple Melee Weapons',
          type: 'melee-weapon',
          data: 'weapons.simple.melee',
        },
        {
          name: 'Simple Ranged Weapons',
          type: 'ranged-weapon',
          data: 'weapons.simple.ranged',
        },
        {
          name: 'Martial Melee Weapons',
          type: 'melee-weapon',
          data: 'weapons.martial.melee',
        },
        {
          name: 'Martial Ranged Weapons',
          type: 'ranged-weapon',
          data: 'weapons.martial.ranged',
        },
        {
          name: 'Exotic Melee Weapons',
          type: 'melee-weapon',
          data: 'weapons.exotic.melee',
        },
        {
          name: 'Exotic Ranged Weapons',
          type: 'ranged-weapon',
          data: 'weapons.exotic.ranged',
        },
        {
          name: 'Firearms',
          type: 'firearm',
        },
        {
          name: 'Ammunition',
          type: 'ammo',
          data: 'weapons.ammunition',
        },
        {
          name: 'Siege Weapons',
          type: 'siege-weapon',
          data: 'weapons.siege',
        },
      ],
    },
  ];
  public allItems = [
    ...generalEquipment,
    ...consumables,
    ...containers,
    ...equipmentPacks,
    ...gamingSets,
    ...magicalFoci,
    ...mundane,
    ...instruments,
    ...poisons,
    ...tools,

    ...animalEquipment,
    ...mounts,
    ...pets,

    ...armor,
    ...shields,

    ...goods,
    ...gems,

    ...meleeWeapons,
    ...rangedWeapons,
    ...ammo,
  ];
  public itemData = {
    generalEquipment: generalEquipment,
    consumables: consumables,
    containers: containers,
    equipmentPacks: equipmentPacks,
    gamingSets: gamingSets,
    magicalFoci: magicalFoci,
    musicalInstruments: instruments,
    mundane: mundane,
    poisons: poisons,
    tools: tools,

    animalEquipment: animalEquipment,
    mounts: mounts,
    pets: pets,

    armor: {
      clothing: armor.filter((a: any) => a.type === -1),
      light: armor.filter((a: any) => a.type === 0),
      medium: armor.filter((a: any) => a.type === 1),
      heavy: armor.filter((a: any) => a.type === 2),
    },
    shields: shields,

    accomodations: accomodations,
    construction: construction,
    lifestyleExpenses: lifestyleExpenses,
    services: services,
    training: training,

    goods: goods,
    livestock: livestock,
    gems: gems,

    vehicles: {
      land: vehicles.filter((v: any) => v.type === 'land'),
      water: vehicles.filter((v: any) => v.type === 'water'),
      air: vehicles.filter((v: any) => v.type === 'air'),
      astral: vehicles.filter((v: any) => v.type === 'astral'),
    },

    weapons: {
      simple: {
        melee: meleeWeapons.filter((w: any) => w.type === 0),
        ranged: rangedWeapons.filter((w: any) => w.type === 0),
      },
      martial: {
        melee: meleeWeapons.filter((w: any) => w.type === 1),
        ranged: rangedWeapons.filter((w: any) => w.type === 1),
      },
      exotic: {
        melee: meleeWeapons.filter((w: any) => w.type === 2),
        ranged: rangedWeapons.filter((w: any) => w.type === 2),
      },
      ammunition: ammo,
      siege: siegeWeapons,
      firearms: firearmData.default,
    },
  };
  public itemTypes = {
    generalEquipment: generalEquipment,
    consumables: consumables,
    containers: containers,
    equipmentPacks: equipmentPacks,
    gamingSets: gamingSets,
    magicalFoci: magicalFoci,
    musicalInstruments: instruments,
    mundane: mundane,
    tools: tools,

    animalEquipment: animalEquipment,
    mounts: mounts,
    pets: pets,

    armor: armor,
    shields: shields,

    accomodations: accomodations,
    construction: construction,
    lifestyleExpenses: lifestyleExpenses,
    services: services,
    training: training,

    goods: goods,
    livestock: livestock,
    gems: gems,

    vehicles: vehicles,

    weapons: [...meleeWeapons, ...rangedWeapons],
    ammunition: ammo,
  };

  private nameUrlEncode(name: string): string {
    return name?.replace(/[ '"\(\)!\/:,]/g, '-')?.toLowerCase() ?? '';
  }

  public getItem(name: string): any {
    const firearm = firearmData.default.find(
      (d: Firearm) => this.nameUrlEncode(d.name) === this.nameUrlEncode(name)
    );
    if (firearm) {
      return this.generateFirearmItem(firearm);
    }
    return this.allItems.find(
      (i: any) => this.nameUrlEncode(i.name) === this.nameUrlEncode(name)
    );
  }
  public getItemType(name: string): string {
    for (let [type, items] of Object.entries(this.itemTypes)) {
      if (!items.find) {
        return '-';
      }
      if (items.find((i: any) => i.name === name)) {
        return type;
      }
    }

    return '';
  }
  public getItems(type: string): any[] {
    if (type.includes('.')) {
      let data: any = this.itemData;
      for (let subType of type.split('.')) {
        data = data[subType];
      }

      return data;
    } else {
      return this.itemData[type];
    }
  }
  public getMagicItems(rarity: number): any[] {
    return magicItems
      .filter((m: any) => m.rarity === rarity)
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  public getMagicItem(itemName: string): any {
    return magicItems.find((m: any) => m.index === itemName);
  }

  public getTrinket(): string {
    return trinkets[Math.floor(Math.random() * trinkets.length)];
  }

  public generateFirearmItem(data: Firearm): any {
    const weaponData = {
      name: data.name,
      damage: '',
      damageTypes: '',
      cost: this.getFirearmCost(data.data),
      weight: this.getFirearmWeight(data.data),
      properties: [],
      bonusDamage: [],
      type: 0,
      range: 0,
      longRange: 0,
      normalRangeBonus: 0,
      longRangeBonus: 0,
      magSize: 0,
      ammunition: '',
    };

    const firearmClass = firearmData.class[data.data['class']];
    weaponData.damage = `${firearmClass.dice}d${firearmClass.die}`;
    weaponData.damageTypes = 'Piercing';

    const mechanism = firearmData.mechanism[data.data['mechanism']];
    weaponData.type = mechanism.type;
    if (mechanism.type === 0) {
      weaponData.ammunition = firearmClass.simpleAmmo;
    } else {
      weaponData.ammunition = firearmClass.martialAmmo;
    }
    if (mechanism.name !== 'Break-action') {
      weaponData.magSize = mechanism.magSize;
    } else {
      weaponData.magSize = data.data['barrelNum'];
    }

    const barrel = firearmData.barrel[data.data['barrel']];
    let range = barrel.range;
    let longRange = barrel.longRange;

    if (data.data['rifled']) {
      range *= 2;
      longRange *= 2;
    }

    let properties = [];

    let bonusDamage = [];

    for (let [key, index] of Object.entries(data.data)) {
      const parts = firearmData[key];
      const part = parts[index];

      if (part.properties) {
        properties.push(...part.properties);
      }
      if (part.normalBonus) {
        weaponData.normalRangeBonus += part.normalBonus;
      }
      if (part.longBonus) {
        weaponData.longRangeBonus += part.longBonus;
      }

      if (part.normalRangeBonus) {
        if (part.normalRangeBonus % 1 !== 0) {
          range *= part.normalRangeBonus;
        } else {
          range += part.normalRangeBonus;
        }
      }
      if (part.longRangeBonus) {
        if (part.longRangeBonus % 1 !== 0) {
          longRange *= part.longRangeBonus;
        } else {
          longRange += part.longRangeBonus;
        }
      }

      if (part.damageType) {
        weaponData.damageTypes = part.damageType;
      }

      if (part.damage) {
        if (part.name.includes('Bayonet')) {
          properties.push({
            name: `Bayonet (${part.damage.dice}d${part.damage.die})`,
            description:
              'The firearm can be used to make a melee attack, dealing piercing damage.  A damage value in parentheses appears with the property - the damage when the weapon is used with two hands to make a melee attack.',
          });
        } else {
          bonusDamage.push(...part.damage);
        }
      }
    }

    if (firearmClass.name === 'Blunderbuss / Shotgun') {
      range *= 0.75;
      longRange *= 0.75;
    }
    if (firearmClass.name === 'Hand-Cannon') {
      longRange = 0;
    }

    weaponData.range = range;
    weaponData.longRange = longRange;

    const specialProps = [];
    const propNames = [];
    const filterOut = [];
    properties.forEach((p: any, index) => {
      if (p.name === 'Special') {
        specialProps.push(p.description);
      } else {
        if (propNames.includes(p.name)) {
          filterOut.push(index);
        } else {
          propNames.push(p.name);
        }
      }
    });
    properties = properties.filter((p: any, index) => {
      if (p.name === 'Special') {
        return false;
      } else {
        return !filterOut.includes(index);
      }
    });
    properties.push({
      name: 'Special',
      description: `<p>${specialProps.join('</p><p>')}</p>`,
    });

    let reloadDesc =
      'You can fire the firearm a certain number of times before needing to reload it. A number in parentheses appears with the property - the number of times it can be fired before reloading. ';
    switch (mechanism.reloadTime) {
      case '1 action':
        reloadDesc += 'You can reload the firearm completely as an action.';
        break;
      case '1 action or 2 bonus actions':
        reloadDesc +=
          'You can reload the firearm completely or as two bonus actions.';
        break;
      case '1 action loads PB':
        reloadDesc +=
          'You can reload the firearm as an action, loading a number of shots equal to your proficiency bonus.';
        break;
      case '1 action loads PB + 1':
        reloadDesc +=
          'You can reload the firearm as an action, loading a number of shots equal to your proficiency bonus + 1.';
        break;
      case '1 action loads PB - 1':
        reloadDesc +=
          'You can reload the firearm as an action, loading a number of shots equal to your proficiency bonus - 1.';
        break;
    }
    properties.push({
      name: `Reload (${weaponData.magSize})`,
      description: reloadDesc,
    });

    weaponData.bonusDamage = bonusDamage;
    weaponData.properties = properties;

    return weaponData;
  }
  public getFirearmCost(data: FirearmData): number {
    let cost = 0;

    const mechanismCostMod = firearmData.mechanism[data['mechanism']].costMod;
    const bodyCost = firearmData.material[data['material']].cost;

    cost += mechanismCostMod * bodyCost;

    for (let [key, index] of Object.entries(data)) {
      if (key === 'barrel') {
        let barrelCost = 0;
        if (data['barrelNum']) {
          barrelCost +=
            firearmData.barrel[data['barrel']].cost * data['barrelNum'];
        } else {
          barrelCost += firearmData.barrel[data['barrel']].cost;
        }

        if (data['rifled']) {
          barrelCost *= 2;
        }
        cost += barrelCost;
      } else if (
        !['class', 'mechanism', 'material', 'barrelNum', 'rifled'].includes(key)
      ) {
        const parts = firearmData[key];
        const partCost = parts[index].cost;

        if (partCost) {
          cost += partCost;
        }
      }
    }

    return cost;
  }
  public getFirearmWeight(data: FirearmData): number {
    let weight = 0;

    const classWeightMod = firearmData.class[data['class']].weightMod;
    const bodyWeight = firearmData.material[data['material']].weight;

    weight += classWeightMod * bodyWeight;

    for (let [key, index] of Object.entries(data)) {
      if (key === 'barrel') {
        if (data['barrelNum']) {
          weight +=
            firearmData.barrel[data['barrel']].weight * data['barrelNum'];
        } else {
          weight += firearmData.barrel[data['barrel']].weight;
        }
      } else if (
        !['class', 'mechanism', 'material', 'barrelNum', 'rifled'].includes(key)
      ) {
        const parts = firearmData[key];
        const partWeight = parts[index].weight;

        if (partWeight) {
          weight += partWeight;
        }
      }
    }

    return weight;
  }
  public getFirearmItemType(type: string): any[] {
    return firearmData[type];
  }

  public isWeapon(item: string): boolean {
    return [...meleeWeapons, ...rangedWeapons, ...firearmData.default].find(
      (w: any) => w.name.toLowerCase() === item.toLowerCase()
    );
  }
  public weaponData(data: any): any {
    let damageTypes: string[] = [];
    for (let type of data.damageTypes.split(' or ')) {
      if (type.includes(',')) {
        damageTypes.push(...type.split(','));
      } else {
        damageTypes.push(type);
      }
    }
    damageTypes = damageTypes
      .map((t: string) => t.toLowerCase().trim())
      .filter((t: string) => !!t);

    const returnData: any = {};
    returnData.profLevel = data.type;
    returnData.damage = [
      {
        dice: data.damage.split('d')[0],
        die: data.damage.split('d')[1],
        types: damageTypes,
      },
    ];
    if (data.bonusDamage) {
      returnData.damage.push(...data.bonusDamage);
    }
    returnData.finesse = !!data.properties?.find(
      (p: any) => p.name.toLowerCase() === 'finesse'
    );
    returnData.ranged = !!data.range;
    returnData.properties = data.properties;

    return returnData;
  }

  public getVehicle(index: string): any {
    const vehicle = vehicles.find((v) => v.index === index);
    return vehicle;
  }
}
