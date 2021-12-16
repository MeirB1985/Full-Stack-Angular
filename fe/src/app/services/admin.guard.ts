import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';

// Guard from entering or leaving a specific route in the front (not in the back)

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    public constructor(private notify: NotifyService, private myRouter: Router) { }

    public canActivate(): boolean {

        // If user is logged-in AND use is admin: 
        if (store.getState().authState.user?.admin)
            return true; // You can enter the route

        // If user isn't logged-in or not admin:
        this.notify.error("You must be admin!!!");
        this.myRouter.navigateByUrl("/home");
        return false; // You can't enter the route
    }

}
