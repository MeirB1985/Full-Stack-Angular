import CartModel from "./cart.model";
import ProductModel from "./product.model";

class ItemModel {

    public _id: string;
    public product: ProductModel;
    public products: ProductModel[];
    public quantity: number;
    public price: number;
    public cart: CartModel;

    public static convertToFormData(item: ItemModel): FormData {
        const myFormData = new FormData();
        myFormData.append("product", item.product._id);
        myFormData.append("quantity", item.quantity.toString());
        myFormData.append("price", item.price.toString());
        myFormData.append("cart", item.cart._id);
        return myFormData;
    }

}

export default ItemModel;