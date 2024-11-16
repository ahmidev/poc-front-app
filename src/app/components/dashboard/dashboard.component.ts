import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  role: string = ''; 
  unreadCount: number = 0; 

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || 'Client';

    this.chatService.getUnreadMessages(this.role).subscribe((messages) => {
      this.unreadCount = messages.length;
    });
  }

  goToChat(): void {
    this.router.navigate(['/chat']);
  }
}
