import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  diffState(state: number): void {
    this.storeService.passState(state);
  }
}
