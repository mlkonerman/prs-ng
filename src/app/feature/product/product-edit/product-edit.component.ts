import { Component, OnInit } from '@angular/core';
import { Product } from '@model/product.class';
import { JsonResponse } from '@model/json-response.class';
import { VendorService } from '@svc/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '@svc/product.service';
import { Vendor } from '@model/vendor.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = "Edit Product";
  jr: JsonResponse;
  product: Product;
  productIdStr: string;
  vendors: Vendor[];

  constructor(private productSvc: ProductService,
              private vendorSvc: VendorService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //get product from db
    this.route.params.subscribe(params =>
      this.productIdStr = params['id']);
      this.productSvc.get(this.productIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.product = this.jr.data as Product;
      });
      this.vendorSvc.list().subscribe(
        jresp => {
          this.jr = jresp;
          this.vendors = this.jr.data as Vendor[];
        }
      );
  }

  edit() {
    this.productSvc.edit(this.product).subscribe(
      jresp => {
        this.jr = jresp;
        //next line is not necessary
        this.product = this.jr.data as Product;
        this.router.navigate(['/product/list'])
      }
    );
  }

  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

}
