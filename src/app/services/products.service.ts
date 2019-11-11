import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base/base.service';
import { ToastrService } from 'ngx-toastr';
import { Tariff } from '../interfaces/tariffs.interface';
import { ListProducts } from '../interfaces/list.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {

  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, toastrService);
   }

  async getProducts(filter: Tariff[]) {
    const listProducts: ListProducts[] = [];
    let listProduct: ListProducts = {name: '', consumption: 0, annualCost: 0};
    await this.get('products').then(res => {
      if (filter && filter.length > 0) {
        res.map(item => {
          item.tariffs.map(tariff => {
            if (filter.find(x => x.consumption === tariff.consumption)) {
              listProduct = {name: '', consumption: 0, annualCost: 0};
              listProduct.name = item.name;
              listProduct.consumption = tariff.consumption;
              listProduct.annualCost = tariff.annualCost;
              listProducts.push(listProduct);
            }
          });
        });
      } else {
        res.map(item => {
          item.tariffs.map(tariff => {
            listProduct = {name: '', consumption: 0, annualCost: 0};
            listProduct.name = item.name;
            listProduct.consumption = tariff.consumption;
            listProduct.annualCost = tariff.annualCost;
            listProducts.push(listProduct);
          });
        });
      }

    });
    return listProducts;
  }

  async getTariffs() {
    const tariffs: Tariff[] = [];
    await this.get('products').then(res => {
      res.map(item => {
        item.tariffs.map(tf => {
          if (!tariffs.find(x => x.consumption === tf.consumption)) {
            tariffs.push(tf);
          }
        });
      });
    });
    return tariffs;
  }
}
