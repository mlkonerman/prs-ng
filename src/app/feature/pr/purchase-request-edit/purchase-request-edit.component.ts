import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/purchase-request.class';
import { User } from '@model/user.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { UserService } from '@svc/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from '@svc/system.service';

@Component({
  selector: 'app-purchase-request-edit',
  templateUrl: './purchase-request-edit.component.html',
  styleUrls: ['./purchase-request-edit.component.css']
})
export class PurchaseRequestEditComponent implements OnInit {

  title: string = "Edit Purchase Request";
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest;
  prIdStr: string;
  users: User[];

  constructor(private prSvc: PurchaseRequestService,
    private sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //get purchase request from db
    this.route.params.subscribe(params =>
      this.prIdStr = params['id']);
      this.prSvc.get(this.prIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
      });
    if(this.sysSvc.data.user.loggedIn) {
      this.purchaseRequest.user = this.sysSvc.data.user.instance;
    } else {
      console.error("User not logged in.")
    }  
  }

  edit() {
    this.prSvc.edit(this.purchaseRequest)
      .subscribe(
        jresp => {
          this.jr = jresp;
          //assuming a good call, fwd to product list
          this.router.navigate(['/pr/list'])
          
        });
  }

  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

}
