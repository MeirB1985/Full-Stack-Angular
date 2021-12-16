import ProductModel from "./product.model";

class CategoryModel {

    public _id: string;
    public name: string;
    public products: ProductModel[];

    public static convertToFormData(category: CategoryModel): FormData {
        const myFormData = new FormData();
        myFormData.append("name", category.name);
        return myFormData;
    }

}

export default CategoryModel;