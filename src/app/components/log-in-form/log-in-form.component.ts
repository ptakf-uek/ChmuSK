import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './log-in-form.component.html',
  styleUrl: './log-in-form.component.scss',
})
export class LogInFormComponent implements OnInit {
  user: User = new User();

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  logInWithEmail(signUpForm: NgForm) {
    if (signUpForm.valid) {
      this.authService.logInWithEmail(this.user.email, this.user.password);
    }
  }

  logInWithGoogle() {
    this.authService.logInWithGoogle();
  }
}
