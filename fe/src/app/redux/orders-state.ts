import OrderModel from 'src/app/models/order.model';

// Orders State: 
export class OrdersState {
    public orders: OrderModel[] = [];
}

// Order Action Types:
export enum OrderActionType {
    ordersDownloaded = "ordersDownloaded",
    orderAdded = "orderAdded"
}

// Order Action: 
export interface OrderAction {
    type: OrderActionType;
    payload: any;
}

// Order Action Creators: 
export function ordersDownloadedAction(orders: OrderModel[]): OrderAction {
    return { type: OrderActionType.ordersDownloaded, payload: orders };
}
export function orderAddedAction(order: OrderModel): OrderAction {
    return { type: OrderActionType.orderAdded, payload: order };
}

// Orders Reducer:
export function ordersReducer(currentState: OrdersState = new OrdersState(), action: OrderAction): OrdersState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case OrderActionType.ordersDownloaded: // Here payload is all orders (OrderModel[])
            newState.orders = action.payload;
            break;
        case OrderActionType.orderAdded: // Here payload is the added order (orderModel)
            newState.orders.push(action.payload);
            break;
    }

    return newState;
}