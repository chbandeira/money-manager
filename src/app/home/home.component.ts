import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Transaction } from '../transaction/transaction.model';

@Component({
  selector: 'mm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  transactions: Observable<Transaction[]>

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.transactions = this.db.collection<Transaction>('transactions', q => q.orderBy('type')).valueChanges();
  }

}
