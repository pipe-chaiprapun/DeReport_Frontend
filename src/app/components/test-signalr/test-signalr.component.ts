import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { isNullOrUndefined } from 'util';
declare const App;
declare const $;
@Component({
  selector: 'app-test-signalr',
  templateUrl: './test-signalr.component.html',
  styleUrls: ['./test-signalr.component.css']
})
export class TestSignalrComponent implements OnInit {
  public name: string;
  public messages = [];
  public txtbox: HTMLInputElement;
  public chatHub;
  public connection;
  constructor(private detactor: ChangeDetectorRef) {  }

  ngOnInit() {
    App.initLoadJquery();
    $.connection.hub.url = 'http://localhost:58465/signalr';
    this.connection = $.connection;
    this.chatHub = $.connection.chatHub;
    console.log(this.chatHub);
    const self = this;

    this.chatHub.client.serversend = function(data) {
      self.getMessage(data);
    };

    this.chatHub.client.broadcast = function(data) {
      self.getMessage(data);
    };

    this.chatHub.client.login = function(data) {
      self.getMessage(data);
    };

    this.connection.hub.start().done(function() {
      self.inputName();
    });

    this.txtbox = document.getElementById('txtChat') as HTMLInputElement;
  }
  public send(data) {
    this.chatHub.server.clientSend(data.value);
    this.messages.push({
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg',
      name: this.name,
      me: true,
      message: data.value
    });
    this.txtbox.value = '';
  }
  public updateMsg(data) {
    this.messages = data;
  }
  public inputName() {
    if (isNullOrUndefined(this.name)) {
      this.name = prompt('กรุณาตั้งชื่อเล่น', 'Plachado');
      if (!isNullOrUndefined(this.name)) {
        this.chatHub.server.setID(this.name);
        $('#txtChat').removeAttr('disabled');
        $('#btnChat').removeAttr('disabled');
      }
    }
  }
  private getMessage(data) {
    console.log(data);
    const self = this;
    self.messages.push({
      // tslint:disable-next-line:max-line-length
      image: data.username === 'Admin' ? 'https://s3.amazonaws.com/uifaces/faces/twitter/tonypeterson/48.jpg' : 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg',
      name: data.username,
      me: data.username !== this.name ? false : true,
      message: `${data.username}: ${data.message}`
    });
    self.detactor.detectChanges();
  }
}
