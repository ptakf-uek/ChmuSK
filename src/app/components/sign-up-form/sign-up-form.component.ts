import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  user: User = new User();

  constructor(private authService: AuthService) {}

  signUpWithEmail(signUpForm: NgForm) {
    if (signUpForm.valid) {
      this.authService.signUpWithEmail(this.user.email, this.user.password);
    }
  }
}
