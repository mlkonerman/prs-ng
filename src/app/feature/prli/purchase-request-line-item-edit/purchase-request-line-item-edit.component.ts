import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequestLineItem } from '@model/purchase-request-line-item.class';
import { Product } from '@model/product.class';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestLineItemService } from '@svc/purchase-request-line-item.service';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { SystemService } from '@svc/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '@svc/product.service';

@Component({
  selector: 'app-purchase-request-line-item-edit',
  templateUrl: './purchase-request-line-item-edit.component.html',
  styleUrls: ['./purchase-request-line-item-edit.component.css']
})
export class PurchaseRequestLineItemEditComponent implements OnInit {

  title: string = "Edit Line Item";
  jr: JsonResponse;
  products: Product[];
  prliIdStr: string;
  prli: PurchaseRequestLineItem;

  constructor(private prliSvc: PurchaseRequestLineItemService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.prliIdStr = params['id']);
    this.prliSvc.get(this.prliIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.prli = this.jr.data as PurchaseRequestLineItem;
    });
    this.productSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        this.products = this.jr.data as Product[];
      }
    );
  }

  edit() {
    this.prliSvc.edit(this.prli)
      .subscribe(
        jresp => {
          this.jr = jresp;
          //assuming a good call, fwd to pr list
          this.prli = this.jr.data as PurchaseRequestLineItem;
          this.router.navigate(['/pr/lines/' + this.prli.purchaseRequest.id])

        });
  }

  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

}
