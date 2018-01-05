import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.css']
})
export class AdditionalComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  diffState(state: number): void {
    this.storeService.passState(state);
  }
}
