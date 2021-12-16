export class UserModel {
    public _id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public id: string;
    public password: string;
    public confirmPassword: string;
    public city: string;
    public st: string;
    public token: string;
    public isAdmin: boolean;
    public admin: boolean;
}

export default UserModel;
