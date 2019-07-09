import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly Root_Url;
  constructor(private http:HttpClient) { 
      this.Root_Url = "http://localhost:3000";
  }

  get(uri:string){
   return  this.http.get(`${this.Root_Url}/${uri}`);
  }

  postr(uri:string,payload:object){
    return this.http.post(`${this.Root_Url}/${uri}`,payload);
  }

  patch(uri:string,payload:object){
    return this.http.patch(`${this.Root_Url}/${uri}`,payload);

  }
  delete(uri:string){
    return this.http.delete(`${this.Root_Url}/${uri}`);
  }
}
