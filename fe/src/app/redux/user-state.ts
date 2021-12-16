import { UserModel } from '../models/user.model';

// Products State: 
export class UsersState {
    public users: UserModel[] = [];
    user: any;
}

// Product Action Types:
export enum UserActionType {
    usersDownloaded = "usersDownloaded"
}

// Product Action: 
export interface UserAction {
    type: UserActionType;
    payload: any;
}

// Product Action Creators: 
export function usersDownloadedAction(users: UserModel[]): UserAction {
    return { type: UserActionType.usersDownloaded, payload: users };
}

// Products Reducer:
export function usersReducer(currentState: UsersState = new UsersState(), action: UserAction): UsersState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case UserActionType.usersDownloaded: // Here payload is all products (ProductModel[])
            newState.users = action.payload;
            break;
    }

    return newState;
}