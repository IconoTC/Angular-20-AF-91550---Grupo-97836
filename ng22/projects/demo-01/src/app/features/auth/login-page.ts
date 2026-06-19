import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ind-login-page',
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  template: `
    <h1>Login</h1>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <label for="username">Username:</label>
      <input type="text" id="username" formControlName="username" />
      <br />
      <label for="password">Password:</label>
      <input type="password" id="password" formControlName="password" />
      <br />
      <button type="submit">Login</button>
    </form>

    <pre>{{ loginForm.value | json }}</pre>
    <p>
      ¿Olvidaste tu contraseña? Puedes recuperarla en el
      <a [routerLink]="['/user', 'recover']">recuperar contraseña</a>
    </p>
    <p>
      Si no tienes cuenta, puedes registrarte en el
      <a [routerLink]="['/user', 'register']">registro</a>
    </p>
  `,
  styles: ``,
})
export class LoginPage {
  private fb = inject(FormBuilder);

  // formGroup
  // new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required]),
  // });

  protected loginForm: FormGroup = this.fb.group({
    username: [''],
    password: [''],
  });

  onSubmit() {
    //
  }
}
