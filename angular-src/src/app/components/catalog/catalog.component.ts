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
  catalog: Array<Object>;
  filesToUpload: Array<File> = [];

  constructor(
    private catalogService: CatalogService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {



    this.catalogService.getCatalog().subscribe(data => {
      this.catalog = data.catalog;
      // console.log(data.catalog);
    })
    // this.catalogService.uploadFile().subscribe(data => {
    //   console.log(data);
    // });
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
        this.catalog.push(product);
      } else {
        this.flashMessage.show('Something went wrong. Try adding product again.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

    // Reset form
    this.productId = null;
    this.name = '';
    this.category = '';
    this.quantity = null;


  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    console.log(files);

    for(let i =0; i < files.length; i++){
      formData.append("uploads", files[i], files[i]['name']);
    }

    this.catalogService.uploadFiles(formData).subscribe(result => console.log(result));
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
