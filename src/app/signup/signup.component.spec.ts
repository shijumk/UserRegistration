import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { of, throwError } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let usrsrvc: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [ SignupComponent ],
      providers: [ FormBuilder, UserService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    usrsrvc = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get success message on form submit', fakeAsync(() => {
    spyOn(usrsrvc, 'postUserData').and.returnValue(of({}));
    component.ngOnInit();
    component.signupForm.controls.firstName.setValue('dummy');
    component.signupForm.controls.lastName.setValue('user');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Tester123');
    component.signupForm.controls.confirmPassword.setValue('Tester123');
    component.onSubmit();
    expect(usrsrvc.postUserData).toHaveBeenCalled();
    expect(component.userMsg).toEqual('Thank you for sign-up! See you soon!');
  }));

  it('check for api error scenario', fakeAsync(() => {
    spyOn(usrsrvc, 'postUserData').and.returnValue(throwError('error'));
    component.ngOnInit();
    component.signupForm.controls.firstName.setValue('dummy');
    component.signupForm.controls.lastName.setValue('user');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('Tester123');
    component.signupForm.controls.confirmPassword.setValue('Tester123');
    component.onSubmit();
  }));

  it('should validate for empty field', fakeAsync(() => {

    component.signupForm.controls.firstName.setValue('');
    component.signupForm.controls.lastName.setValue('');
    component.signupForm.controls.email.setValue('test');
    component.signupForm.controls.password.setValue('');
    component.onSubmit();
    expect(component.userMsg).toEqual('Please enter valid details');
  }));

  it('should check for passwordValidation', fakeAsync(() => {

    component.signupForm.controls.firstName.setValue('dummy');
    component.signupForm.controls.lastName.setValue('user');
    component.signupForm.controls.email.setValue('test@test.com');
    component.signupForm.controls.password.setValue('dummy123');

    component.passwordValidation();
    expect(component.userMsg).toEqual('Password not valid, should not contain your name');
    component.signupForm.controls.password.setValue('Tester123');
    component.signupForm.controls.confirmPassword.setValue('Tester1234');
    component.passwordValidation() ;
    expect(component.userMsg).toEqual('Password mismatch');

  }));

});
