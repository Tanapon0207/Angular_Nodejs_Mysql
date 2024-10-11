import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  router = inject(Router)
  loginObj: any = {
    username: '',
    password: ''
  };


  login(){
    if(this.loginObj.email == 1 && this.loginObj.password == 1){
      this.router.navigateByUrl('/dashboard')
    }else{
      Swal.fire({
        title: "Login Failed",
        text: "Please check your email and password",
        icon: "error"
      });
    }

  }

}
