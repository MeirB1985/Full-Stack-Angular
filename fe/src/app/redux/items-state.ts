import ItemModel from 'src/app/models/item.model';

// Items State: 
export class ItemsState {
    public items: ItemModel[] = [];
}

// Item Action Types:
export enum ItemActionType {
    itemsDownloaded = "itemsDownloaded",
    itemAdded = "itemAdded",
    itemDeleted = "itemDeleted"
}

// Item Action: 
export interface ItemAction {
    type: ItemActionType;
    payload: any;
}

// Item Action Creators: 
export function itemsDownloadedAction(items: ItemModel[]): ItemAction {
    return { type: ItemActionType.itemsDownloaded, payload: items };
}
export function itemAddedAction(item: ItemModel): ItemAction {
    return { type: ItemActionType.itemAdded, payload: item };
}
export function itemDeletedAction(id: string): ItemAction {
    return { type: ItemActionType.itemDeleted, payload: id };
}
export function itemDeleteAllAction(): ItemAction {
    return { type: ItemActionType.itemDeleted, payload: "" };
}

// Items Reducer:
export function itemsReducer(currentState: ItemsState = new ItemsState(), action: ItemAction): ItemsState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case ItemActionType.itemsDownloaded: // Here payload is all items (ItemModel[])
            newState.items = action.payload;
            break;
        case ItemActionType.itemAdded: // Here payload is the added item (ItemModel)
            newState.items.push(action.payload);
            break;
        case ItemActionType.itemDeleted: { // Here payload is the deleted item's id (number)
            const index = newState.items.findIndex(p => p._id === action.payload);
            newState.items.splice(index, 1);
            break;
        }
    }

    return newState;
}