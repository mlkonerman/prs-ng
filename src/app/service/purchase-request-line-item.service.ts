import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PurchaseRequestLineItem } from '@model/purchase-request-line-item.class';
import { Observable } from 'rxjs';
import { JsonResponse } from '@model/json-response.class';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestLineItemService {

  url: string = "http://localhost:8080/purchase-request-line-items/";

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  get(prliId: string): Observable<JsonResponse> {
    return this.http.get(this.url+prliId) as Observable<JsonResponse>;
  }

  getLines(prId: string): Observable<JsonResponse> {
    return this.http.get(this.url+"lines-for-pr/"+prId) as Observable<JsonResponse>;
  }

  create(prli: PurchaseRequestLineItem): Observable<JsonResponse> {
    return this.http.post(this.url, prli) as Observable<JsonResponse>;
  }
  
  edit(prli: PurchaseRequestLineItem): Observable<JsonResponse> {
    return this.http.put(this.url, prli) as Observable<JsonResponse>;
  }

  remove(prli: PurchaseRequestLineItem): Observable<JsonResponse> {
    return this.http.delete(this.url+prli.id) as Observable<JsonResponse>;
  }

}
