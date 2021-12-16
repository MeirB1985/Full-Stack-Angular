import CategoryModel from "./category.model";

class ProductModel {

    public _id: string;
    public name: string;
    public price: number;
    public category: CategoryModel;
    public categoryToSend: string;
    public imageName: string;
    public image: FileList;

    public static convertToFormData(product: ProductModel): FormData {
        const myFormData = new FormData();
        myFormData.append("name", product.name);
        myFormData.append("price", product.price.toString());
        myFormData.append("category", product.categoryToSend);
        if(product.image) myFormData.append("image", product.image.item(0));
        return myFormData;
    }

}

export default ProductModel;