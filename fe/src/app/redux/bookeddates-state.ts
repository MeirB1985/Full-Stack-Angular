import OrderModel from 'src/app/models/order.model';

// Orders State: 
export class BookedDatesState {
    public bookedDates: OrderModel[] = [];
}

// Order Action Types:
export enum BookedDateActionType {
    bookedDatesDownloaded = "bookedDatesDownloaded"
}

// Order Action: 
export interface BookedDateAction {
    type: BookedDateActionType;
    payload: any;
}

// Order Action Creators: 
export function bookedDatesDownloadedAction(bookedDates: OrderModel[]): BookedDateAction {
    return { type: BookedDateActionType.bookedDatesDownloaded, payload: bookedDates };
}

// Orders Reducer:
export function bookedDatesReducer(currentState: BookedDatesState = new BookedDatesState(), action: BookedDateAction): BookedDatesState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case BookedDateActionType.bookedDatesDownloaded: // Here payload is all orders (OrderModel[])
            newState.bookedDates = action.payload;
            break;
    }

    return newState;
}