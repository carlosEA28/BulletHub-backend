export class CurriculumAlreadyExists extends Error{
    constructor() {
        super("Curriculum Already Exists");
    }
}

export class UnauthorizedError extends Error {
    constructor() {
        super(`Unauthorized`);
        this.name = "UnauthorizedError";
    }
}

export class NoFileUploadedError extends Error {
    constructor() {
        super(`No file uploaded`);
        this.name = "NoFileUploadedError";
    }
}
