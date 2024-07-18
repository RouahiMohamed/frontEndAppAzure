import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const apiUrl = environment.apiUrl;
const API_URL = `${apiUrl}images/`;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VMImageService {

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<any> {
    return this.http.get(API_URL + 'getAll' , httpOptions);
  }

  getImageById(id: string): Observable<any> {
    return this.http.get(API_URL + id, httpOptions);
  }

  saveImage(image: any): Observable<any> {
    return this.http.post(API_URL + 'addImage', image, httpOptions);
  }

  deleteImageById(id: string): Observable<any> {
    return this.http.delete(API_URL + id, httpOptions);
  }
  updateImage(id: string, updatedImage: any): Observable<any> {
    return this.http.put(API_URL + `update/${id}`, updatedImage, httpOptions);
  }
}
