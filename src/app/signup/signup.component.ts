import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: any
  public userMsg: string
  public registerFlag:boolean;
  public passwordPattern:string;

  constructor(private formBuilder: FormBuilder,
              private readonly userSvc: UserService) { }

  ngOnInit() {
    this.passwordPattern = '^(?=.*[a-zA-Z])[a-zA-Z0-9_@!.$/%#&+-]{7,}$';
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSubmit(){
    if(this.signupForm.valid) {
      if(this.passwordValidation()) {
        const postData = { firstName : this.signupForm.value.firstName,
                           lastName : this.signupForm.value.lastName,
                           email : this.signupForm.value.email }
        this.saveUserDetails(postData);
        this.signupForm.reset();
      }
    } else {
      this.registerFlag = true;
      this.userMsg ='Please enter valid details';
    }
  }

  passwordValidation(){
    const firstName = this.signupForm.value.firstName;
    const lastName = this.signupForm.value.lastName;
    const password = this.signupForm.value.password;
    const confirmPassword = this.signupForm.value.confirmPassword;

    if(password.toLowerCase().includes(firstName.toLowerCase())
    || password.toLowerCase().includes(lastName.toLowerCase())) {
      this.registerFlag = true;
      this.userMsg ='Password not valid, should not contain your name';
      return false;
    }
    else if(confirmPassword !== password) {
      this.registerFlag = true;
      this.userMsg ='Password mismatch';
      return false
    }
    return true
  }

  saveUserDetails(postData){
    this.userSvc.postUserData(postData)
      .subscribe(response => {
        this.userMsg = 'Thank you for sign-up! See you soon!';
        this.registerFlag = true;
      }, error => {
        this.userMsg = 'Something went wrong. Please try later!';
        this.registerFlag = true;
      })
  }
}
