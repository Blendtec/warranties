import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor(private storeService: StoreService,
     private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  diffState(state: number): void {
    this.storeService.passState(state);
  }
}
