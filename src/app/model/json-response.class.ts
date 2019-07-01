export class JsonResponse {
    data: object;
    errors: object;
    meta: object;

    constructor(inData: object, inErrors: object, inMeta: object) {
        this.data = inData;
        this.errors = inErrors;
        this.meta = inMeta;
    }
}