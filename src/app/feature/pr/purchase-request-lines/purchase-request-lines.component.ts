import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from '@model/purchase-request.class';
import { JsonResponse } from '@model/json-response.class';
import { SystemService } from '@svc/system.service';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseRequestLineItem } from '@model/purchase-request-line-item.class';
import { PurchaseRequestLineItemService } from '@svc/purchase-request-line-item.service';

@Component({
  selector: 'app-purchase-request-lines',
  templateUrl: './purchase-request-lines.component.html',
  styleUrls: ['./purchase-request-lines.component.css']
})
export class PurchaseRequestLinesComponent implements OnInit {

  title: string = "Purchase Request Line Items";
  prIdStr: string;
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest;
  prlis: PurchaseRequestLineItem[];
  prli: PurchaseRequestLineItem;
  prliIdStr: string;

  constructor(private prSvc: PurchaseRequestService,
              private prliSvc: PurchaseRequestLineItemService,
              private sysSvc: SystemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.prIdStr = params['id']);
    this.refresh();
  }

  removeLine(prli) {
    
    this.prliSvc.remove(prli).subscribe(
      jresp => {
        this.jr = jresp;
        this.prli = this.jr.data as PurchaseRequestLineItem;
        this.refresh();
      }
    )};

    refresh() {
      this.prSvc.get(this.prIdStr).subscribe(jresp => {
        this.jr = jresp;
        this.purchaseRequest = this.jr.data as PurchaseRequest;
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

  submitForReview() {
    this.prSvc.submitForReview(this.purchaseRequest)
      .subscribe(
        jresp => {
          this.jr = jresp;
          //assuming a good call, fwd to product list
          this.router.navigate(['/pr/list'])
          
        });
  }

}

