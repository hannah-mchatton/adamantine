import { AbilityScores } from "./ability-scores";
import { CharacterBackground } from "./character-background";
import { CharacterChoice } from "./character-choice";
import { CharacterClass } from "./character-class";
import { CharacterCurrency, CharacterEquipment } from "./character-equipment";
import { CharacterRace } from "./character-race";
import { CharacterUses } from "./character-uses";

export class Character {
    name: string;
    scores: AbilityScores;

    background: string;
    race: CharacterRace;
    classes: CharacterClass[];

    equipment: CharacterEquipment[];
    currency: CharacterCurrency;
    notes: string;

    choices: CharacterChoice[];
    uses: CharacterUses[];

    overrides: any[];
}