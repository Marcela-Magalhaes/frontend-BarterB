

export class Category{
    _id: string;
    name: string;
    imgUrl: string;
    productsList: [string];

    constructor(pId: '', pName: '', pImgUrl: '', pProductsList: [string]){
        this._id = pId || '';
        this.name = pName || '' ;
        this.imgUrl = pImgUrl || '';
        this.productsList = pProductsList || [''];
    }
}