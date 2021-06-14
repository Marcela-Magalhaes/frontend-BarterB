
export class User{
    address = {
        zipCode: String,
        district: String
    };
    productsList: [string];
    _id: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    imgUrl: string;

    constructor(pZipCode: StringConstructor, pDistrict: StringConstructor, pProductsList: [string], pId?: '', pName?: string, pSurname?: string, pUsername?: string, pEmail?: string, pPassword?: string, pPhoneNumber?: string, pImgUrl?: string){
        this.address.zipCode = pZipCode;
        this.address.district = pDistrict || '';
        this.productsList = pProductsList;
        this._id = pId || '';
        this.name = pName || '';
        this.surname = pSurname || '';
        this.username = pUsername || '';
        this.email = pEmail || '';
        this.phoneNumber = pPhoneNumber || '';
        this.password = pPassword || '';
        this.imgUrl = pImgUrl || '';
    }

    get id(): string{
        return this._id;
    }
 
    set id(pId: string){
        this._id = pId;
    }

}