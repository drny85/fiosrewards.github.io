import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Referral } from './../../models/referral';
import { ReferralsService } from './../../services/referrals.service';


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  referralsCollection: AngularFirestoreCollection<Referral>;
  referrals: Observable<Referral[]>;
  referralList;


  constructor(private afs: AngularFirestore) { }

  ngOnInit() {

    this.referralsCollection = this.afs.collection('customer', ref => {
      return ref.where('status', '==', 'pending');

    });
    this.referralsCollection.snapshotChanges().pipe(map(changes => changes.map(
      a => {const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        }
    ))).subscribe(referral => this.referralList = referral);


  }

}

