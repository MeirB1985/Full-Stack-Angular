import CategoryModel from 'src/app/models/category.model';

// Products State: 
export class CategoriesState {
    public categories: CategoryModel[] = [];
}

// Product Action Types:
export enum CategoryActionType {
    categoriesDownloaded = "categoriesDownloaded",
    categoryAdded = "categoryAdded"
}

// Product Action: 
export interface CategoryAction {
    type: CategoryActionType;
    payload: any;
}

// Product Action Creators: 
export function categoriesDownloadedAction(categories: CategoryModel[]): CategoryAction {
    return { type: CategoryActionType.categoriesDownloaded, payload: categories };
}
export function categoryAddedAction(category: CategoryModel): CategoryAction {
    return { type: CategoryActionType.categoryAdded, payload: category };
}

// Products Reducer:
export function categoriesReducer(currentState: CategoriesState = new CategoriesState(), action: CategoryAction): CategoriesState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case CategoryActionType.categoriesDownloaded: // Here payload is all products (ProductModel[])
            newState.categories = action.payload;
            break;
        case CategoryActionType.categoryAdded: // Here payload is the added product (ProductModel)
            newState.categories.push(action.payload);
            break;
    }
    return newState;
}