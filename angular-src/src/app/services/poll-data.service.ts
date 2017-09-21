import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PollDataService {
  poll:any;

  constructor(private http:Http) { }

  createPoll(poll) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/polls/create', poll, {headers:headers})
      .map(res => res.json());
  }

  getPoll(tag) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/polls/get', {tag:tag}, {headers:headers})
      .map(res=> res.json());
  }

  addVote(tag, optionId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/polls/update', {tag:tag, optionId:optionId}, {headers:headers})
      .map(res=> res.json());
  }
}
