import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  role: string = ''; 
  newMessage: string = ''; 
  messages: ChatMessage[] = []; 
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || 'Client';
    this.chatService.getUnreadMessages(this.role).subscribe((unreadMessages) => {
      this.messages = unreadMessages;

      this.chatService.markMessagesAsRead(this.role).subscribe(() => {
        console.log('Messages non lus marqués comme lus.');
      });
    });

    this.chatService.connect();

    this.chatService.messages$.subscribe((newMessages) => {
    newMessages.forEach((message) => {
      if (!this.messages.some((m) => m.timestamp === message.timestamp && m.content === message.content)) {
        this.messages.push(message);
      }
    });
  });
    
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
  
  sendMessage(): void {
    if (this.newMessage.trim()) {
      const receiver = this.role === 'Client' ? 'Support' : 'Client';
      const message = { sender: this.role,  receiver: receiver, content: this.newMessage, timestamp: new Date().toISOString() };
      this.chatService.sendMessage(message);
      this.newMessage = ''; 
    }
  }


  isMyMessage(message: ChatMessage): boolean {
    return message.sender === this.role;
  }
  
  getSenderPrefix(message: ChatMessage): string {
    if (this.isMyMessage(message)) {
      return 'Moi';
    }
    return message.sender; 
  }
  getSender(message: ChatMessage): string {
    return message.sender;
  }

  getMessageText(message: ChatMessage): string {
    return message.content;
  }


  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

 
}
