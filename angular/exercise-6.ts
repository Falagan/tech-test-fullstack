// ORIGINAL REQUIREMENTS:
// {
//   email: string; // mandatory, must be a email
//   name: string; // mandatory, max 128 characters
//   birthday?: Date; // Not mandatory, must be less than today
//   address: { // mandatory
//     zip: number; // mandatory
//     city: string; // mandatory, must contains only alpha uppercase and lower and space
//   };
// }

// ORIGINAL CODE:
// @Component({
//   selector: 'app-user-form',
//   template: `
//     <form>
//         <input type="text" placeholder="email">
//         <input type="text" placeholder="name">
//         <input type="date" placeholder="birthday">
//         <input type="number" placeholder="zip">
//         <input type="text" placeholder="city">
//     </form>
//   `
// })
// export class AppUserForm {
//   @Output()
//   event = new EventEmitter<{ email: string; name: string; birthday: Date; address: { zip: number; city: string; };}>;
//
//   constructor(
//     private formBuilder: FormBuilder
//   ) {
//   }
//   doSubmit(): void {
//     this.event.emit(...);
//   }
// }

// SOLUTION - COMPONENT LOGIC ONLY:

import { Component, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";

interface UserFormData {
  email: string;
  name: string;
  birthday?: Date;
  address: {
    zip: number;
    city: string;
  };
}

@Component({
  selector: "app-user-form",
  template: `
    <form [formGroup]="userForm" (ngSubmit)="doSubmit()">
      <input type="email" formControlName="email" placeholder="email" />
      <input type="text" formControlName="name" placeholder="name" />
      <input type="date" formControlName="birthday" placeholder="birthday" />
      <div formGroupName="address">
        <input type="number" formControlName="zip" placeholder="zip" />
        <input type="text" formControlName="city" placeholder="city" />
      </div>
      <button type="submit" [disabled]="userForm.invalid">Submit</button>
    </form>
  `,
})
export class AppUserForm {
  @Output()
  event = new EventEmitter<UserFormData>();

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", [Validators.required, Validators.maxLength(128)]],
      birthday: ["", [this.birthdayDateValidator]],
      address: this.formBuilder.group({
        zip: ["", [Validators.required, Validators.min(1)]],
        city: ["", [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      }),
    });
  }

  private birthdayDateValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const inputDate = new Date(control.value);
    const today = new Date();

    if (inputDate >= today) {
      return { futureDate: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const userData: UserFormData = {
        email: formData.email,
        name: formData.name,
        birthday: formData.birthday,
        address: {
          zip: formData.address.zip,
          city: formData.address.city,
        },
      };
      this.event.emit(userData);
    }
  }
}
