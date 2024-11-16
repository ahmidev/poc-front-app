import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  role: string = '';
  errorMessage: string = '';

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
  }

  joinChat(): void {
    if (this.role === 'Client' || this.role === 'Support') {
      this.chatService.setRole(this.role); 
      this.router.navigate(['/dashboard']); 
    } else {
      this.errorMessage = 'Veuillez choisir un rôle valide (Client ou Support).';
    }
  }
  



}
