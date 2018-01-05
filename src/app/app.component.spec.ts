import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreService } from './services/store.service';
import { Subscription } from 'rxjs/Subscription';
import { PersonalComponent } from './personal/personal.component';
import { ProductComponent } from './product/product.component';
import { AdditionalComponent } from './additional/additional.component';
import { StateTrackerComponent } from './state-tracker/state-tracker.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PersonalComponent,
        ProductComponent,
        AdditionalComponent,
        StateTrackerComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [StoreService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
