import { Component, OnInit } from '@angular/core';

import { Pen } from '../pen';
import { PenService } from '../pen.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  data: any;
  pens: any = [];
  transactions: any;

  constructor(private penService: PenService) { }

  ngOnInit() {
    this.getPens();
    this.getTransactions();
  }

  getPens(): void {
    this.penService.getPens()
    .subscribe(data => {
      console.log(data);
      this.pens = data.data.goods
    });
  }

  getTransactions(): void {
    this.penService.getTransactions()
      .subscribe(data => {
        console.log(data);
        this.transactions = data.data.transactions
      });
  }

  buy(cost: string, quantity: string): void {
    let arg1 = parseFloat(cost);
    let arg2 = parseInt(quantity);
    this.penService.addBallpen({'cost': arg1, 'quantity': arg2})
      .subscribe(pen => {
        this.pens.push(pen.data);
        this.getTransactions();
      });
  }

  sell(cost: string, quantity: string): void {
    let arg1 = parseFloat(cost);
    let arg2 = parseInt(quantity);
    this.penService.sellBallpen({'cost': arg1, 'quantity': arg2})
      .subscribe(pen => {
        this.getPens();
        this.getTransactions();
      });
  }

  clear(): void {
    this.penService.clearDB()
      .subscribe(data => {
        this.getPens();
        this.getTransactions();
      });
  }

}
