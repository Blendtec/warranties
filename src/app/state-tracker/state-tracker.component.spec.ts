import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreService } from '../services/store.service';

import { StateTrackerComponent } from './state-tracker.component';

describe('StateTrackerComponent', () => {
  let component: StateTrackerComponent;
  let fixture: ComponentFixture<StateTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateTrackerComponent ],
      providers: [ StoreService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
