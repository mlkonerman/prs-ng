import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/purchase-request.class';
import { User } from '@model/user.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { SystemService } from '@svc/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseRequestLineItemService } from '@svc/purchase-request-line-item.service';
import { PurchaseRequestLineItem } from '@model/purchase-request-line-item.class';

@Component({
  selector: 'app-purchase-request-approve',
  templateUrl: './purchase-request-approve.component.html',
  styleUrls: ['./purchase-request-approve.component.css']
})
export class PurchaseRequestApproveComponent implements OnInit {

  jr: JsonResponse;
  purchaseRequests: PurchaseRequest[];
  prlis: PurchaseRequestLineItem[];
  purchaseRequest: PurchaseRequest;
  title: string = 'Purchase Requests to Review'
  user: User;
  prliIdStr: string;
  prIdStr: string;

  constructor(private prSvc: PurchaseRequestService,
    private prliSvc: PurchaseRequestLineItemService,
    private sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.prIdStr = params['id']);
    this.prSvc.get(this.prIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
      this.purchaseRequest.reasonForRejection = "";
      // if(this.sysSvc.data.user.loggedIn) {
      //   this.purchaseRequest.user = this.sysSvc.data.user.instance;
      // } else {
      //   console.error("User not logged in.")
      // }   
    });
    this.prliSvc.getLines(this.prIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        this.prlis = this.jr.data as PurchaseRequestLineItem[];
      }
    )
  }

  approve() {
    this.prSvc.approve(this.purchaseRequest)
      .subscribe(
        jresp => {
          this.jr = jresp;
          //assuming a good call, fwd to product list
          this.router.navigate(['/pr/review'])
          
        });
  }

  reject() {
    this.prSvc.reject(this.purchaseRequest)
      .subscribe(
        jresp => {
          this.jr = jresp;
          //assuming a good call, fwd to product list
          this.router.navigate(['/pr/review'])
          
        });
  }

}
