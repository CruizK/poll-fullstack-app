import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollDataService } from '../../services/poll-data.service'
import { PollSocketService } from '../../services/poll-socket.service'; 

import * as io from 'socket.io-client';


@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit, OnDestroy {
  private tag: String;
  private poll: any;
  private connection: any;

  constructor(
    private route: ActivatedRoute,
    private pollDataService: PollDataService,
    private pollSocketService: PollSocketService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.tag = params.tag;
      console.log(this.tag);
      this.pollDataService.getPoll(this.tag).subscribe( data => {
        if(!data.success) console.log("Error with getting poll");
        else  {
          this.poll = data.poll;
          this.socketSubscribe();
        }
      });
     });
  }

  socketSubscribe() {
    this.connection = this.pollSocketService.getObservable().subscribe(data => {
      if(this.tag == data.tag) {
        for(let i = 0; i < this.poll.options.length; i++) {
          if(this.poll.options[i].id == data.optionId)
            this.poll.options[i].votes++;
        }
      }
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
