import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../../../public/constants/constants';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) {}

 getData<T>(key: string): T | null {
   const storedData = localStorage.getItem(key);
   return storedData ? JSON.parse(storedData) : null;
 }
  private storageKey = 'secureCustomerId';
  private secretKey = 'd9a123e8bc7f45d89f18ce39b6a4f25bd1e4cfa8279e5d72a4ff5ba2ed9cb7cd';

  encryptId(id: string): string {
    const idToEncrypt = String(id);
    return CryptoJS.AES.encrypt(idToEncrypt, this.secretKey).toString();
  }

  decryptId(encryptedId: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedId, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // New method to get the encrypted ID
  getEncryptedId(id: string): string {
    return this.encryptId(id);
  }

 

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  login(credentials:any){
    return this.http.post<any>(`${Constants.baseApi}/login`,credentials)
  }
  checkExist(credentials:any){
    return this.http.post<any>(`${Constants.baseApi}/check-detials`,credentials)
  }
  submitSurvey(payLoad:any){
    return this.http.post<any>(`${Constants.baseApi}/survey-submit`,payLoad)
  }
  addreview(credentials:any){
    return this.http.post<any>(`${Constants.baseApi}/review-store`,credentials)
  }
  Logout(){
    return this.http.post<any>(`${Constants.baseApi}/logout`,{})
  }
  homeScreen(categoryId?: string,company_id?:any): Observable<any> {
    let httpParams = new HttpParams();
    if (categoryId) {
      httpParams = httpParams.set('category_id', categoryId);
    }
    if (company_id) {
      httpParams = httpParams.set('company_id', company_id);
    }
    return this.http.get<any>(`${Constants.baseApi}/home`, { params: httpParams });
  }
  
  getCtegories(): Observable<any> {
    return this.http.get<any>(`${Constants.baseApi}/categories-listing`);
  }
  getSurveys(): Observable<any> {
    return this.http.get<any>(`${Constants.baseApi}/survey-listing`);
  }
  userInfo(){
    return this.http.get<any>(`${Constants.baseApi}/profile`);

  }
  setLoginStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }
  updateOffer(promotionId:any,promotionData:FormData){
    return this.http.post<any>(`${Constants.baseApi}/offers/${promotionId}`, promotionData);

  }
  deleteoffer(groupId:any):Observable<any>{
    return this.http.delete<any>(`${Constants.baseApi}/offers/${groupId}`)
   }
  getCompaignsDetailById(groupId:any){
   return this.http.get<any>(`${Constants.baseApi}/campaigns/${groupId}`)
  }
 
  getpromotions(params?: { per_page?: number; page?: number; search?: string; no_campaigns?: any }): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
        if (params.per_page) {
            httpParams = httpParams.set('per_page', params.per_page.toString());
        }
        if (params.page) {
            httpParams = httpParams.set('page', params.page.toString());
        }
        if (params.search) {
            httpParams = httpParams.set('search', params.search);
        }
        if (params.no_campaigns) {
            httpParams = httpParams.set('no_campaigns', params.no_campaigns);
        }
    }

    return this.http.get<any>(`${Constants.baseApi}/promotions`, { params: httpParams });
}
profileInformation(id:any){
  return this.http.get<any>(`${Constants.baseApi}/company-profile/${id}`);

}
}
