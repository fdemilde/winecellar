import * as toastr from "toastr";
import {AuthenticationEndpoint} from "../../endpoints/AuthenticationEndpoint";
import {Panel} from "../../../common/components/panel/panel.component";
import {FormGroupFooter} from "../../../common/components/form/form-group-footer/form-group-footer.component";
import {FormGroupPassword} from "../../../common/components/form/form-group-password/form-group-password.component";
import {FormGroupTextbox} from "../../../common/components/form/form-group-textbox/form-group-textbox.component";
import {Component} from "angular2/core";
import {ControlGroup, Control, Validators} from "angular2/common";

@Component({
    selector: "register",
    directives: [FormGroupTextbox, FormGroupPassword, FormGroupFooter, Panel],
    styles: [require("./register.container.scss")],
    template: `
        <form [ngFormModel]="registerForm" class="form-horizontal" (ngSubmit)="onSubmit()">
            <form-group-textbox 
                [label]="'First name (*)'" 
                [control]="registerForm.controls['firstName']" 
                [placeholder]="'Enter first name'">
            </form-group-textbox>
            <form-group-textbox 
                [label]="'Last name (*)'" 
                [control]="registerForm.controls['lastName']" 
                [placeholder]="'Enter last name'">
            </form-group-textbox>
            <form-group-textbox 
                [label]="'Login (*)'" 
                [control]="registerForm.controls['login']" 
                [placeholder]="'Enter login'">
            </form-group-textbox>
            <form-group-password 
                [label]="'Password (*)'" 
                [control]="registerForm.controls['password']" 
                [placeholder]="'Enter password'">
            </form-group-password>
            <form-group-password 
                [label]="'Confirm password (*)'" 
                [control]="registerForm.controls['confirmPassword']" 
                [placeholder]="'Confirm your password'">
            </form-group-password>
            <form-group-footer>
                 <button 
                    type="submit" 
                    [disabled]="!registerForm.valid" 
                    class="btn btn-primary btn-block btn-lg">
                        <i class="fa fa-user"></i>
                        Sign up
                </button>
            </form-group-footer>
        </form>
       `
})
export class Register {
    public registerForm: ControlGroup;

    constructor(private endpoint: AuthenticationEndpoint) {
        this.registerForm = new ControlGroup({
            "firstName": new Control("", Validators.required),
            "lastName": new Control("", Validators.required),
            "login": new Control("", Validators.required),
            "password": new Control("", Validators.required),
            "confirmPassword": new Control("", Validators.required)
        });
    }

    public onSubmit(): void {
        if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
            toastr.error("Passwords don't match");
        } else {
            this.endpoint.register(this.registerForm.value);
        }
    }
}