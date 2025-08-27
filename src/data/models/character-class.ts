import { CharacterChoice } from "./character-choice";

export class CharacterClass {
    classKey: string;
    subclassKey?: string;
    level: number;
    hp: number[];
    choices: CharacterChoice[];
}