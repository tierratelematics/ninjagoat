class Country {

    public id: number = 0;
    public phrase_text: string = "";
    public has_states: boolean = false;
    public code: string = "";
    public code3: string = "";
    public prefix: number = 0;

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.phrase_text;
    }

    hasStates(): boolean {
        return this.has_states;
    }
}

export default Country;
