import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Message{
  content: string;
  author: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontHello';
  time = 'CZAS';
  messages = Array<Message>();
  newMessage:Message = {author: "", content: ""};
  constructor(private http: HttpClient) { }

  ngOnInit():void {
    this.http.get('/api/time', {responseType: 'text'}).subscribe(data => {this.time = data as string});
    this.http.get('/api/messages').subscribe((data:Array<Message>) => {this.messages = data});
  }

  send() {
      this.http.post('/api/messages', this.newMessage).subscribe((data:Array<Message>) => {
        this.messages = data;
        this.newMessage.content = '';
      });
  }
}
