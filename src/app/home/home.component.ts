import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Transaction } from '../transaction/transaction.model';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'mm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;

  transactions: Observable<Transaction[]>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.chart.labels = ['Expense', 'Income'];
    this.chart.data = [0, 0];
    this.chart.colors = [{
      backgroundColor: ['#ff4444', '#4285F4']
    }]; 

    this.transactions = this.db.collection<Transaction>('transactions', q =>
      q.orderBy('date', 'desc')).valueChanges();

    this.transactions.subscribe(transaction => {
      this.chart.data[0] = transaction.filter(t => t.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.value, 0);
      this.chart.data[1] = transaction.filter(t => t.type === 'income')
        .reduce((acc, transaction) => acc + transaction.value, 0);
      this.chart.chart.update();
    });
  }

}
