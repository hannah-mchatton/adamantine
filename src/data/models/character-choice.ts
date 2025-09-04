export class CharacterChoice {
    id: string;
    value: string | string[];

    sourceId: string;
    sourceValue: string;

    invalidChoice: boolean = false;

    constructor(id: string, sourceId: string, sourceValue: string) {
        this.id = id;
        this.sourceId = sourceId;
        this.sourceValue = sourceValue;
    }
}