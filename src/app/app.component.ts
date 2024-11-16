import { Component, HostListener, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'POC contact support via le Chat';
  role: string = ''; // Le rôle de l'utilisateur

  constructor(private chatService: ChatService, private router: Router) {}
  
  ngOnInit(): void {
    this.chatService.role$.subscribe((newRole) => {
      this.role = newRole; 
      console.log('Rôle mis à jour dans AppComponent :', this.role);
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  clearRoleOnRefresh(event: Event): void {
    localStorage.removeItem('role');
    this.router.navigate(['']);
    console.log('Rôle effacé du localStorage lors du rafraîchissement.');
  }
  
}
