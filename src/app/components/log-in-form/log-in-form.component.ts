import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './log-in-form.component.html',
  styleUrl: './log-in-form.component.scss',
})
export class LogInFormComponent {
  user: User = new User();

  constructor(private authService: AuthService) {}

  logInWithEmail(signUpForm: NgForm) {
    if (signUpForm.valid) {
      this.authService.logInWithEmail(this.user.email, this.user.password);
    }
  }

  logInWithGoogle() {
    this.authService.logInWithGoogle();
  }
}
