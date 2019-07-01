import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  title: string = "Product Details";
  productIdStr: string;
  jr: JsonResponse;
  product: Product;

  constructor(private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.productIdStr = params['id']);
    this.productSvc.get(this.productIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.product = this.jr.data as Product;
    });
  }

  remove() {

    this.productSvc.remove(this.product).subscribe(
      jresp => {
        this.jr = jresp;
        this.product = this.jr.data as Product;
        this.router.navigate(['/product/list'])
      }
    );

  }

}