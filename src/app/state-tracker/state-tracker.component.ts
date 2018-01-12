import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-state-tracker',
  templateUrl: './state-tracker.component.html',
  styleUrls: ['./state-tracker.component.css']
})
export class StateTrackerComponent implements OnInit, OnDestroy {
  title = 'app';
  appStateSub: Subscription;
  appState: number;
  defaultState = 1;


  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.appState = this.defaultState;
    const self = this;
    this.appStateSub = this.storeService.retrieveNumState$.subscribe(
      data => {
        self.appState = data;
      });
  }

  ngOnDestroy() {
    this.appStateSub.unsubscribe();
  }


}
