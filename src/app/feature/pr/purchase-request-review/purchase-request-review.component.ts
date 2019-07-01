import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { SystemService } from '@svc/system.service';
import { User } from '@model/user.class';

@Component({
  selector: 'app-purchase-request-review',
  templateUrl: './purchase-request-review.component.html',
  styleUrls: ['./purchase-request-review.component.css']
})
export class PurchaseRequestReviewComponent implements OnInit {
  jr: JsonResponse;
  purchaseRequests: PurchaseRequest[];
  purchaseRequest: PurchaseRequest;
  title: string = 'Purchase Requests to Review'
  user: User;

  constructor(private prSvc: PurchaseRequestService,
    private sysSvc: SystemService) { }

  ngOnInit() {
    if (this.sysSvc.data.user.loggedIn) {
      this.user = this.sysSvc.data.user.instance;
      this.prSvc.listForReview(this.user.id).subscribe(
        jresp => {
          this.jr = jresp;
          this.purchaseRequests = this.jr.data as PurchaseRequest[];
        }
      )
    } else {
      console.error("User not logged in.")
    }
  }
}


