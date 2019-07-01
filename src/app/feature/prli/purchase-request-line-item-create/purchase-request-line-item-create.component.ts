import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequestLineItem } from '@model/purchase-request-line-item.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { SystemService } from '@svc/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseRequestLineItemService } from '@svc/purchase-request-line-item.service';
import { ProductService } from '@svc/product.service';
import { Product } from '@model/product.class';
import { PurchaseRequest } from '@model/purchase-request.class';

@Component({
  selector: 'app-purchase-request-line-item-create',
  templateUrl: './purchase-request-line-item-create.component.html',
  styleUrls: ['./purchase-request-line-item-create.component.css']
})
export class PurchaseRequestLineItemCreateComponent implements OnInit {
  title: string = "Add a New Line Item";
  jr: JsonResponse;
  prli: PurchaseRequestLineItem = new PurchaseRequestLineItem;
  products: Product[];
  prIdStr: string;
  purchaseRequest: PurchaseRequest;

  constructor(private prliSvc: PurchaseRequestLineItemService,
    private prSvc: PurchaseRequestService,
    private productSvc: ProductService,
    private sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {

    this.productSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        this.products = this.jr.data as Product[];
      }
    );
    this.route.params.subscribe(params =>
      this.prIdStr = params['id']);
    this.prSvc.get(this.prIdStr).subscribe(jresp => {
      this.jr = jresp;
      console.log(this.jr);
      this.purchaseRequest = this.jr.data as PurchaseRequest;
      this.prli.purchaseRequest = this.purchaseRequest;
    });
  }

  create() {
    this.prliSvc.create(this.prli)
      .subscribe(
        jresp => {
          this.jr = jresp;
          //assuming a good call, fwd to pr list
          this.router.navigate(['/pr/lines/' + this.prli.purchaseRequest.id])

        });
  }


}
