import UserModel from "./user.model";

class CartModel {

    public _id: string;
    public user: UserModel;
    public date: string;

    public static convertToFormData(cart: CartModel): FormData {
        const myFormData = new FormData();
        myFormData.append("user", cart.user._id);
        myFormData.append("date", cart.date);
        return myFormData;
    }
}

export default CartModel;