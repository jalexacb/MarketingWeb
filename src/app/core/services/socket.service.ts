import { Injectable } from '@angular/core';
import Echo from "laravel-echo"

// window['io'] = require('socket.io-client');
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  echo: Echo = null;
  constructor() { 

    
  }


 listenPrivateChannel(){
  this.echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
  })

    this.echo.connector.socket.on('connect', function () {
      console.log('CONNECTED');
  });

  this.echo.connector.socket.on('reconnecting', function () {
      console.log('CONNECTING');
  });

  this.echo.connector.socket.on('disconnect', function () {
      console.log('DISCONNECTED');
  });
    this.echo.private('channel.5')
      .listen('.test-privado', (e) => {
        console.log('hello', e)
      }).error(err => console.log('error', err))
 }

  leaveChannel(){
    this.echo.leave('orders');
  }
  listen():any{
    let status='';

    this.echo = new Echo({
      broadcaster: 'socket.io',
      host: window.location.hostname + ':6001',
    });
    
    this.echo.connector.socket.on('connect', function () {
        console.log('CONNECTED');
    });
    
    this.echo.connector.socket.on('reconnecting', function () {
        console.log('CONNECTING');
    });
    
    this.echo.connector.socket.on('disconnect', function () {
        console.log('DISCONNECTED');
    });
    
    return this.echo.channel('test-channel');
    console.log("statusprimerp",status);
    return status;
  }

}
