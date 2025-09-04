import { Injectable } from "@angular/core";
import { Character } from "src/data/models/character";

@Injectable({
  providedIn: 'root',
})
export class CharacterBuilderService {
  private uuidTest = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  private chromaticSubraces = [
    'Black',
    'Blue',
    'Green',
    'Purple',
    'Red',
    'White',
  ];
  private gemSubraces = [
    'Amethyst',
    'Diamond',
    'Emerald',
    'Moonstone',
    'Obsidian',
    'Ruby',
    'Sapphire',
    'Topaz',
  ];
  private metallicSubraces = [
    'Brass',
    'Bronze',
    'Copper',
    'Gold',
    'Platinum',
    'Silver',
    'Steel',
    'Tungsten',
  ];
  private planarSubraces = [
    'Adamantine',
    'Arboreal',
    'Astral',
    'Battle',
    'Beast',
    'Blight',
    'Chaos',
    'Chole',
    'Concordant',
    'Edict',
    'Elysian',
    'Gloom',
    'Hellfire',
    'Howling',
    'Mirage',
    'Paradise',
    'Pyroclastic',
    'Radiant',
    'Rust',
    'Tarterian',
  ];

  public rollStats(): number[] {
    let stats = [];

    // Roll 7 stats
    for (let i = 0; i < 7; i++) {
      let rolls = [];
      
      // Roll 4d6, rerolling 1s
      rolls.push(Math.floor(Math.random() * 5) + 2);
      rolls.push(Math.floor(Math.random() * 5) + 2);
      rolls.push(Math.floor(Math.random() * 5) + 1);
      rolls.push(Math.floor(Math.random() * 5) + 1);

      // Remove the lowest roll
      rolls.sort();
      rolls.shift();

      // Add them up
      stats[i] = rolls[0] + rolls[1] + rolls[2];
    }

    // Remove the lowest stat
    stats.sort();
    stats.shift();

    // Reshuffle the array for looks
    for (var i = stats.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = stats[i];
        stats[i] = stats[j];
        stats[j] = temp;
    }
    
    return stats;
  }

  public getChoiceOptions(choice: any, character: Character): any[] {
    switch (choice.type) {
      case 'trait':
        // If the choice isn't a special id, we don't have to anything special to get its options
        if (this.uuidTest.test(choice.id)) {
          return choice.options;
        }

        let options = [];
        // If the choice is a special id, we have to do some special calculations to rule out invalid options
        switch (choice.id) {
          case 'draconic-legacy':
            // Prevent the user from selecting a pureblood legacy for a subrace different from their own
            options = choice.options;
            if (this.chromaticSubraces.includes(character.race.subraceKey)) {
              options = options.filter(o => (!o.name.includes('Pureblood') || o.name === 'Pureblood Chromatic'));
            }
            else if (this.gemSubraces.includes(character.race.subraceKey)) {
              options = options.filter(o => (!o.name.includes('Pureblood') || o.name === 'Pureblood Gem'));
            }
            else if (this.metallicSubraces.includes(character.race.subraceKey)) {
              options = options.filter(o => (!o.name.includes('Pureblood') || o.name === 'Pureblood Metallic'));
            }
            else if (this.planarSubraces.includes(character.race.subraceKey)) {
              options = options.filter(o => (!o.name.includes('Pureblood') || o.name === 'Pureblood Planar'));
            }
            else {
              options = options.filter(o => !o.name.includes('Pureblood'));
            }

            return options;

          case 'chromatic-breath':
          case 'metallic-breath':
          case 'planar-breath':
            // Only present the user with the option corresponding to their subrace
            return choice.options.filter(o => o.name.includes(character.race.subraceKey));

        }
      default:
        return [];
    }
  }
}