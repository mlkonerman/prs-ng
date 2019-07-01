import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';

@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css']
})
export class PurchaseRequestListComponent implements OnInit {

  jr : JsonResponse;
  purchaseRequests: PurchaseRequest[];
  title: string = 'Purchase Requests';

  constructor(private prSvc: PurchaseRequestService) { }

  ngOnInit() {
    this.prSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if(this.jr.errors==null) {
        this.purchaseRequests = this.jr.data as PurchaseRequest[];
        }
        else {
          //Error happens
          console.log("Error getting purchase requests");
          //To do -- implement error handling
        }
        
      }
    )
  }

}
