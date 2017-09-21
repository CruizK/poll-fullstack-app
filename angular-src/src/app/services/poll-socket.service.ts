import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class PollSocketService {
  private url:String = 'http://localhost:8080';
  private socket;

  private observable;
  getObservable() {
    if(!this.observable) {
      this.observable = new Observable(observer => {
        this.socket = io(this.url);
        this.socket.on('voteAdded', data => {
          observer.next(data);
        });

        return () => {
          this.socket.disconnect();
        }
      })
    }

    return this.observable;
  }

}
