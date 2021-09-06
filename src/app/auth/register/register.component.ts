import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submited = false;

  constructor(private formBuider: FormBuilder, private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuider.group(
      {
        name:["", [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/)]
        ],
        mobile:["", [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern(/^[0-9]*$/)]
        ],
        email:["", [
          Validators.required, 
          Validators.email, 
          Validators.pattern(/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/)]
        ],
        pass:["", [Validators.required, Validators.minLength(6)]],
        passConfirm:["", Validators.required],
      },
      {
        validator: this.mustMatch("pass", "passConfirm")
      }
    )
  }

  get form(){
    return this.registerForm.controls;
  }

  mustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      }else{
        matchingControl.setErrors(null);
      }

    }
  }

  onSubmit(){
    this.submited = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.auth.register(this.registerForm).then(()=>{
      this.route.navigate(['dashboard/usuario']);
    });

    // alert(
    //   "success:"+ JSON.stringify(this.registerForm.value)
    // )
  }
}
