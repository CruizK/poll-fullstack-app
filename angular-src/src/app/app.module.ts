import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CreatePollComponent } from './components/create-poll/create-poll.component';
import { ViewPollComponent } from './components/view-poll/view-poll.component';
import { VotePollComponent } from './components/vote-poll/vote-poll.component';

import { PollDataService } from './services/poll-data.service';
import { PollSocketService } from './services/poll-socket.service';

const appRoutes: Routes = [
  { path: '', redirectTo:'/create', pathMatch:'full'},
  { path:'create', component: CreatePollComponent},
  { path:'poll/:tag', component:VotePollComponent},
  { path:'poll/:tag/results', component:ViewPollComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CreatePollComponent,
    ViewPollComponent,
    VotePollComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
  ],
  providers: [PollDataService, PollSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
