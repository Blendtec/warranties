import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from './services/store.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  appStateSub: Subscription;
  appState: number;
  testAppState: number;
  defaultState = 1;


  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.appState = this.defaultState;
    const self = this;
    this.appStateSub = this.storeService.retrieveState$.subscribe(
      data => {
        self.appState = data;
      });
  }

  ngOnDestroy() {
    this.appStateSub.unsubscribe();
  }

  ngIncrementState(howMuch: number) {
    if (this.appState + howMuch > 0 && this.appState + howMuch < 4 ) {
      this.storeService.passState(this.appState + howMuch);
    }
  }

  setStateTest() {
    this.storeService.passState(this.testAppState);
  }
}
