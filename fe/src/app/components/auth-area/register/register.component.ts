import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public user = new UserModel();
    private usersList: UserModel[];
    public confirm: boolean;

    constructor(
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myUserService: UserService,
        private myRouter: Router) { }

    public async register() {
        try {
            await this.myAuthService.register(this.user);
            this.notify.success("You are registered :-)");
            this.myRouter.navigateByUrl("/home");
        }
        catch(err) {
            this.notify.error(err);
        }
    }

    public confirmFun() {
        if (this.user.password === this.user.confirmPassword) {
            this.confirm = true;
        } else {
            this.confirm = false;
        }
        return this.confirm;
    } 

    public async ngOnInit() {
        try {
                this.usersList = await this.myUserService.getAllUsers();
            }   catch(err) {
                    this.notify.error(err);
            }   
    }
    public checkEmail() {
        const email = this.user.email
        
        const result = this.usersList.filter(userObj => userObj.email === email);

        if (result.length >= 1) {
            return true;
        } else {
            return false;
        }
    }


    public checkId() {
        const id = this.user.id
        const result = this.usersList.filter(userObj => userObj.id === id);
      
        if (result.length >= 1) {
            return true;
        } else {
            return false;
        }
    }

}


