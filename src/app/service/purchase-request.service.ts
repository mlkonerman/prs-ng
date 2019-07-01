import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { HttpClient } from '@angular/common/http';
import { PurchaseRequest } from '@model/purchase-request.class';
import { User } from '@model/user.class';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {

  url: string = "http://localhost:8080/purchase-requests/";

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  get(purchaseRequestId: string): Observable<JsonResponse> {
    return this.http.get(this.url + purchaseRequestId) as Observable<JsonResponse>;
  }

  create(pr: PurchaseRequest): Observable<JsonResponse> {
    return this.http.post(this.url + "submit-new", pr) as Observable<JsonResponse>;
  }

  edit(pr: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url, pr) as Observable<JsonResponse>;
  }

  remove(pr: PurchaseRequest): Observable<JsonResponse> {
    return this.http.delete(this.url + pr.id) as Observable<JsonResponse>;
  }

  submitForReview(pr: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url + "submit-review", pr) as Observable<JsonResponse>;
  }

  listForReview(userId: number): Observable<JsonResponse> {
    return this.http.get(this.url + "list-review/" + userId) as Observable<JsonResponse>;
  }
 
  approve(pr: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url + "approve", pr) as Observable<JsonResponse>;
  }

  reject(pr: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url + "reject", pr) as Observable<JsonResponse>;
  }

}
