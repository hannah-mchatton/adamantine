export class AbilityScores {
    scores: AbilityScore[];
    canRoll: boolean;
    rolls: number[];
}

export class AbilityScore {
    name: string;
    baseValue: number;

    constructor(name: string, baseValue: number) {
        this.name = name;
        this.baseValue = baseValue;
    }
}