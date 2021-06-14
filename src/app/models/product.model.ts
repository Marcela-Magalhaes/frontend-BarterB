export class Product{
    _id: string;
    name: string;
    description: string;
    imgUrl: string;
    categoryId: string;
    userId: string;

    constructor(pId: string, pName: string, pDescription: string, pImgUrl: string, pCategoryId: string, pUserId: string){
        this._id = pId;
        this.name = pName;
        this.description = pDescription;
        this.imgUrl = pImgUrl;
        this.categoryId = pCategoryId;
        this.userId = pUserId;
    }
}