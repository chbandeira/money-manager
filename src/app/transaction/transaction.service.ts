import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from './transaction.model';
import { OrderByDirection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private db: AngularFirestore) { }

  getTransactionsByDate(directionStr: OrderByDirection = 'asc'): Observable<Transaction[]> {
    return this.db.collection<Transaction>('transactions', q =>
      q.orderBy('date', directionStr)).valueChanges();
  }

  private sumValues(transactions: Transaction[]): number {
    return transactions.reduce((acc, transaction) => acc + transaction.value, 0);
  }

  getTotalExpense(transactions: Transaction[]): number {
    return this.sumValues(transactions.filter(t => t.type === 'expense'));
  }

  getTotalIncome(transactions: Transaction[]): number {
    return this.sumValues(transactions.filter(t => t.type === 'income'));
  }
}
