import CartModel from "./cart.model";
import UserModel from "./user.model";

class OrderModel {

    public _id: string;
    public user: UserModel;
    public cart: CartModel;
    public price: number;
    public city: string;
    public st: string;
    public shippingDate: string;
    public orderDate: string;
    public card: string;

    public static convertToFormData(order: OrderModel): FormData {
        const myFormData = new FormData();
        myFormData.append("user", order.user._id);
        myFormData.append("cart", order.cart._id);
        myFormData.append("price", order.price.toString());
        myFormData.append("city", order.city);
        myFormData.append("st", order.st);
        myFormData.append("shippingDate", order.shippingDate);
        myFormData.append("orderDate", order.orderDate);
        myFormData.append("card", order.card);

        return myFormData;
    }

}

export default OrderModel;