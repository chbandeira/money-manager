import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Transaction } from '../transaction/transaction.model';
import { BaseChartDirective } from 'ng2-charts';
import { TransactionService } from '../transaction/transaction.service';

@Component({
  selector: 'mm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;

  transactions: Observable<Transaction[]>;

  overall: number;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.chart.labels = ['Expense', 'Income'];
    this.chart.data = [0, 0];

    this.transactions = this.transactionService.getTransactionsByDate('desc');

    this.transactions.subscribe(transactionsArray => {
      const totalExpenses = this.transactionService.getTotal(transactionsArray.filter(t => t.type === 'expense'));
      this.chart.data[0] = totalExpenses.toFixed(2);

      const totalIncomes = this.transactionService.getTotal(transactionsArray.filter(t => t.type === 'income'));
      this.chart.data[1] = totalIncomes.toFixed(2);

      this.overall = totalIncomes - totalExpenses;
      
      this.chart.chart.update();
    });
  }

}
