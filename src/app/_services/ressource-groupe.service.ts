import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const apiUrl = environment.apiUrl;
const API_URL = `${apiUrl}resourceGroups/`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class RessourceGroupeService {

  constructor(private http: HttpClient) {}

  createResourceGroup(rg: any): Observable<any> {
    return this.http.post(API_URL + 'add', rg, httpOptions);
  }
  getAllResourceGroups(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'getAllRessource');
  }
  updateResourceGroup(id: string, updatedResourceGroup: any): Observable<any> {
    return this.http.put(API_URL + 'update/' + id, updatedResourceGroup, httpOptions);
  }
  
  
}