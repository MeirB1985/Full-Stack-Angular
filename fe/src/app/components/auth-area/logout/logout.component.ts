import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-logout',
    template: ""
})
export class LogoutComponent implements OnInit {

    constructor(
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myRouter: Router) { }

    ngOnInit(): void {
        try {
            this.myAuthService.logout();
            this.notify.success("You are logged-out :-)");
            this.myRouter.navigateByUrl("/home");
        }
        catch (err) {
            console.log(err);
        }
    }

}
