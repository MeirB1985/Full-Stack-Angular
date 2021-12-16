import CartModel from 'src/app/models/cart.model';

// Carts State: 
export class CartsState {
    public carts: CartModel[] = [];
}

// Cart Action Types:
export enum CartActionType {
    cartsDownloaded = "cartsDownloaded",
    cartAdded = "cartAdded",
    cartUpdated = "cartUpdated",
    cartDeleted = "cartDeleted"
}

// Cart Action: 
export interface CartAction {
    type: CartActionType;
    payload: any;
}

// Cart Action Creators: 
export function cartsDownloadedAction(carts: CartModel[]): CartAction {
    return { type: CartActionType.cartsDownloaded, payload: carts };
}
export function cartAddedAction(cart: CartModel): CartAction {
    return { type: CartActionType.cartAdded, payload: cart };
}
export function cartUpdatedAction(cart: CartModel): CartAction {
    return { type: CartActionType.cartUpdated, payload: cart };
}
export function cartDeletedAction(id: string): CartAction {
    return { type: CartActionType.cartDeleted, payload: id };
}

// Carts Reducer:
export function cartsReducer(currentState: CartsState = new CartsState(), action: CartAction): CartsState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case CartActionType.cartsDownloaded: // Here payload is all carts (CartModel[])
            newState.carts = action.payload;
            break;
        case CartActionType.cartAdded: // Here payload is the added cart (cartModel)
            newState.carts.push(action.payload);
            break;
        case CartActionType.cartUpdated: { // Here payload is the updated cart (cartModel)
            const index = newState.carts.findIndex(p => p._id === action.payload.id);
            newState.carts[index] = action.payload;
            break;
        }
        case CartActionType.cartDeleted: { // Here payload is the deleted cart's id (number)
            const index = newState.carts.findIndex(p => p._id === action.payload);
            newState.carts.splice(index, 1);
            break;
        }
    }

    return newState;
}