import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollDataService } from '../../services/poll-data.service'

@Component({
  selector: 'app-vote-poll',
  templateUrl: './vote-poll.component.html',
  styleUrls: ['./vote-poll.component.css']
})
export class VotePollComponent implements OnInit {
  tag: String
  poll: any;
  selectedId: Number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pollDataService: PollDataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.tag = params.tag;
      this.pollDataService.getPoll(this.tag).subscribe( data => {
        if(!data.success) console.log("Error with getting poll");
        else this.poll = data.poll;
      });
     });
  }
  
  onListItemClicked(id) {
    this.selectedId = id;
  }

  onSubmitVote() {
    this.pollDataService.addVote(this.tag, this.selectedId).subscribe( data => {
      if(!data.success) {
        console.log("There was an error adding your vote");
        this.router.navigate(['/poll', this.tag]);
      } else {
        this.router.navigate(['./results'], {relativeTo: this.route});
      }
    });
  }

}
