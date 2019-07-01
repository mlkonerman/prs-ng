import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-request-detail',
  templateUrl: './purchase-request-detail.component.html',
  styleUrls: ['./purchase-request-detail.component.css']
})
export class PurchaseRequestDetailComponent implements OnInit {

  title: string = "Purchase Request Details";
  prIdStr: string;
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest;

  constructor(private prSvc: PurchaseRequestService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.prIdStr = params['id']);
    this.prSvc.get(this.prIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
    });
  }

  remove() {

    this.prSvc.remove(this.purchaseRequest).subscribe(
      jresp => {
        this.jr = jresp;
        this.purchaseRequest = this.jr.data as PurchaseRequest;
        this.router.navigate(['/pr/list'])
      }
    );

  }

}
