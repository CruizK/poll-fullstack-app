import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollDataService } from '../../services/poll-data.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  options = [];
  title: String;
  currentIndex = 0;
  newOption = {
    name: ''
  }
  constructor(private router:Router, private pollDataService:PollDataService) { }

  ngOnInit() {
  }
  
  onAddOption() {
    if(this.newOption.name == '')
      return;
    
    this.options.push({
      id: this.currentIndex,
      name: this.newOption.name
    });
    this.newOption.name = '';
    this.currentIndex++;
    console.log(this.currentIndex);
    console.log(this.options);
  }

  onDeleteOption(id) {
    for(let i = 0; i < this.options.length; i++) {
      console.log("option id: " + this.options[i].id + ", passed in id: " + id);
      if(this.options[i].id == id) {
        this.options.splice(i, 1);
      }
    }
  }

  onSubmitPoll() {
    this.pollDataService.createPoll({
      title: this.title,
      options: this.options
    }).subscribe(data => {
      if(!data.success) {
        console.log("There was an error creating the poll");
      } else {
        console.log(data.tag);
        this.router.navigate(['/poll', data.tag]);
      }
    })
  }

  

}
