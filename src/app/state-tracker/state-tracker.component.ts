import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ngx-state-tracker',
  templateUrl: './state-tracker.component.html',
  styleUrls: ['./state-tracker.component.css']
})
export class StateTrackerComponent implements OnInit, OnDestroy {
  title = 'app';
  appStateSub: Subscription;
  appState: number;
  defaultState = 1;
  displayState: number;

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {

    this.displayState = this.defaultState;
    this.appState = this.defaultState;
    const self = this;
    this.appStateSub = this.storeService.displayState$
      .subscribe(data => self.appState = data);
  }

  ngOnDestroy(): void {
    this.appStateSub.unsubscribe();
  }

}
