export class SuccessResponse<T> {
    constructor(data: T){
        this.data = data;
    }

    data: T;
    success: true = true;
}