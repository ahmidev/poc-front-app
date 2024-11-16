import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: Client;
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();
  private messages: ChatMessage[] = [];
  private roleSubject = new BehaviorSubject<string>(localStorage.getItem('role') || 'Anonymous');
  role$ = this.roleSubject.asObservable();
  private role: string = this.roleSubject.value;

  constructor(private http: HttpClient) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8081/chat'),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    this.stompClient.onConnect = () => {
      console.log('Connecté au serveur WebSocket');

      this.stompClient.subscribe('/topic/messages', (message) => {
        const parsedMessage = JSON.parse(message.body);
        this.addMessage(parsedMessage);
      });
    };

    this.updateConnectHeaders();
  }

  setRole(newRole: string): void {
    this.role = newRole; 
    localStorage.setItem('role', newRole); 
    this.roleSubject.next(newRole); 
    console.log('Rôle mis à jour :', newRole);
  }

  getRole(): string {
    return this.role;
  }

  private updateConnectHeaders(): void {
    this.stompClient.connectHeaders = {
      username: this.role
    };
  }

  connect(): void {
    if (!this.stompClient.active) {
      this.stompClient.activate();
    }
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }

  sendMessage(message: ChatMessage): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
      });
    } else {
      console.error("Impossible d'envoyer le message : connexion WebSocket fermée.");
    }
  }

  getUnreadMessages(receiver: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`http://localhost:8081/messages/unread?receiver=${receiver}`);
  }

  markMessagesAsRead(receiver: string): Observable<void> {
    return this.http.post<void>(`http://localhost:8081/messages/mark-as-read?receiver=${receiver}`, {});
  }

  private addMessage(message: ChatMessage): void {
    if (!this.messages.some((m) => m.timestamp === message.timestamp && m.content === message.content)) {
      this.messages.push(message);
      this.messagesSubject.next([...this.messages]);
    } else {
      console.warn('Message déjà ajouté, ignoré :', message);
    }
  }
}