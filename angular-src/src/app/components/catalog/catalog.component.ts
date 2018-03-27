import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  productId: Number;
  name: String;
  category: String;
  quantity: Number;

  constructor(
    private catalogService: CatalogService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onAddProductSubmit() {
    const product = {
      productId: this.productId,
      name: this.name,
      category: this.category,
      quantity: this.quantity
    }

    // Add Product
    this.catalogService.addProduct(product).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('New Product has been added!', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Something went wrong. Try adding product again.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

}
