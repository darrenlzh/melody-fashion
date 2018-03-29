import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import host from 'config';
import 'rxjs/add/operator/map';

@Injectable()
export class CatalogService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  addProduct(product) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${host}/products/add`, product, {headers: headers}).map(res => res.json());
  }

  getProduct(id) {
    let headers = new Headers();
    if (this.authService.loggedIn()) {
      headers.append('Content-Type', 'application/json');
      return this.http.get(`${host}/products/product/id/${id}`, {headers: headers}).map(res => res.json());
    }
  }

  getCatalog() {
    let headers = new Headers();
    if (this.authService.loggedIn()) {
      headers.append('Content-Type', 'application/json');
      return this.http.get(`${host}/products/catalog`, {headers: headers}).map(res => res.json());
    }
  }

  uploadFile() {
    let headers = new Headers();
    headers.append('Content-Type', 'text/plain');
    return this.http.post(`${host}/products/upload`, {headers: headers}).map(res => res.json());
  }

}
