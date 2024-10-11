import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private authService : AuthService
  ){}

  registerObj : any = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }

  register(){
    this.authService.register(this.registerObj).pipe(first()).subscribe({
      next: () => {
        this.registerObj = {
          firstname: '',
          lastname: '',
          email: '',
          password: ''
        }
      }
    })
  }


















}
