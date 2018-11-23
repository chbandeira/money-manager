import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { TransactionService } from '../transaction/transaction.service';
import { doughnutChartConfig } from './doughnut-chart.config';
import { Transaction } from '../transaction/transaction.model';

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
  chartConfig = doughnutChartConfig;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.chart.data = [0, 0];
    this.chartConfig.chartOptions.title.text = 'November';

    this.transactions = this.transactionService.getTransactionsByDate('desc');

    this.transactions.subscribe(t => {
      this.chart.data[0] = this.transactionService.getTotalExpense(t).toFixed(2);
      this.chart.data[1] = this.transactionService.getTotalIncome(t).toFixed(2);
      this.overall = this.chart.data[1] - this.chart.data[0];
      this.chart.chart.update();
    });
  }
}
