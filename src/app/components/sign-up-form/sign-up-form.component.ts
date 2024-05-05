import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { generateId } from '../../utils/utils';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent implements OnInit {
  user: User = new User();

  constructor(
    private router: Router,
    private authService: AuthService,
    private databaseService: DatabaseService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  signUpWithEmail(signUpForm: NgForm) {
    // Create a new account with email
    if (signUpForm.valid) {
      this.user.displayName = this.user.email.split('@')[0];
      this.user.id = generateId();

      this.authService.signUpWithEmail(this.user.email, this.user.password);
      this.authService.userId = this.user.id;

      this.databaseService.addUser(this.user);
    }
  }
}
