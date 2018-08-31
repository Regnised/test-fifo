import { Component, OnInit } from '@angular/core';
import { Pen } from '../pen';
import { PenService } from '../pen.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  pens: Pen[] = [];

  constructor(private penService: PenService) { }

  ngOnInit() {
    // this.getHeroes();
  }

  // getHeroes(): void {
  //   this.penService.getPens()
  //     .subscribe(pens => pens);
  // }
}
