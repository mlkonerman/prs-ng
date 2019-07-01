import { Component, OnInit } from '@angular/core';
import { Vendor } from '@model/vendor.class';
import { JsonResponse } from '@model/json-response.class';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '@svc/vendor.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  title: string = "Vendor Details";
  vendorIdStr: string;
  jr: JsonResponse;
  vendor: Vendor;

  constructor(private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.vendorIdStr = params['id']);
    this.vendorSvc.get(this.vendorIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.vendor = this.jr.data as Vendor;
    });

  }

  remove() {

    this.vendorSvc.remove(this.vendor).subscribe(
      jresp => {
        this.jr = jresp;
        this.vendor = this.jr.data as Vendor;
        this.router.navigate(['/vendor/list'])
      }
    );

  }


  

}
