export class ReposNotFound extends Error {
    constructor() {
        super(`No repositories were found.`);
        this.name = "ReposNotFound";
    }
}