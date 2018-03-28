import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class CatalogService {

  constructor(
    private http:Http,
    private authService: AuthService
  ) { }

  addProduct(product) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/products/add', product, {headers: headers}).map(res => res.json());
  }

  getProduct(id) {
    let headers = new Headers();
    if (this.authService.loggedIn()) {
      headers.append('Content-Type', 'application/json');
      return this.http.get(`http://localhost:3000/products/product/id/${id}`, {headers: headers}).map(res => res.json());
    }
  }

  getCatalog() {
    let headers = new Headers();
    if (this.authService.loggedIn()) {
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:3000/products/catalog', {headers: headers}).map(res => res.json());
    }
  }

}
