import { AbilityScores } from "./ability-scores";
import { CharacterBackground } from "./character-background";
import { CharacterClass } from "./character-class";
import { CharacterCurrency, CharacterEquipment } from "./character-equipment";
import { CharacterRace } from "./character-race";
import { CharacterUses } from "./character-uses";

export class Character {
    name: string;
    scores: AbilityScores;

    background: CharacterBackground;
    race: CharacterRace;
    classes: CharacterClass[];

    equipment: CharacterEquipment[];
    currency: CharacterCurrency;
    notes: string;

    uses: CharacterUses[];

    overrides: any[];
}