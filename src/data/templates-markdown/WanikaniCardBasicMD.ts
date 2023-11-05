import SubjectsService from "../api/SubjectsService.ts";

export default class WanikaniCardBasicMD {

    private readonly subject: object;
    private subjectsService: SubjectsService;
    private front: string;
    private back: string;

    constructor(subject) {
        this.subject = subject;
        this.subjectsService = new SubjectsService();
        this.front = '';
        this.back = '';
    }

    generateFront() {
        return this.front =
            `<h1 style="text-align: center;">
                <strong>${this.subject.characters}</strong>
            </h1>`
    }

    generateBack() {
        const reading = this.subjectsService.hasReading(this.subject) ?
            `<h3>
                <b><span style="color: rgb(38,225,38);">${this.subjectsService.getReadings(this.subject).join(', ')}</span></b>
            </h3>` : '';

        const meaningMnemonic = this.subjectsService.getMeaningMnemonic(this.subject) ?
            `<p>${this.subjectsService.getMeaningMnemonic(this.subject)}</p>` : '';

        const meaningHint = this.subjectsService.hasMeaningHint(this.subject) ?
            `<code>${this.subjectsService.getMeaningHint(this.subject)}</code><br><br>` : '';

        const readingMnemonic = this.subjectsService.getReadingMnemonic(this.subject) ?
            `<p>${this.subjectsService.getReadingMnemonic(this.subject)}</p>` : '';

        const readingHint = this.subjectsService.hasReadingHint(this.subject) ?
            `<code>${this.subjectsService.getReadingHint(this.subject)}</code>` : '';

        return this.back =
            `<div style="text-align: center;">
                <h2><b>${this.subjectsService.getMeaningPrimary(this.subject)}</b></h2>
                <h5>
                    ${this.subjectsService.getMeanings(this.subject).join(', ')}
                </h5>
                ${reading}
            </div>
            ${meaningMnemonic}
            ${meaningHint}
            ${readingMnemonic}
            ${readingHint}
            <br>
            <i><small style="color: #fc0d0d">${this.subject.type}</small></i>`
    }
}