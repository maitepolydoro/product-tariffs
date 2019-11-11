import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ListProducts } from 'src/app/interfaces/list.interface';
import { ToastrService } from 'ngx-toastr';
import { Tariff } from 'src/app/interfaces/tariffs.interface';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.scss']
})
export class TariffsComponent implements OnInit {
  listProducts: ListProducts[];
  sortOptions: SelectItem[];
  tariffs = [];
  responsiveOptions;
  selectedOptions: Tariff[];
  selectedSort: SelectItem;

  constructor(private productsService: ProductsService, private toastrService: ToastrService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];
   }

  async ngOnInit() {
    this.sortOptions = [{label: 'Highest Cost', value: 'highCost'}, {label: 'Lowest Cost', value: 'lowCost'}];
    await this.getProducts();
    await this.getTariffs();
  }

  async getProducts() {
    await this.productsService.getProducts(this.selectedOptions).then(res => {
      this.listProducts = res;
    });
    if (this.selectedSort) {
      this.sortProducts(this.selectedSort);
    }
  }

  getTariffs() {
    this.productsService.getTariffs().then(res => {
      this.tariffs = res;
    });
  }

  public addToCart() {
    this.toastrService.success('Added to cart!');
  }

  public sortProducts(event) {
    if (event === 'lowCost' || event.value === 'lowCost') {
      this.listProducts.sort((a, b) => a.annualCost - b.annualCost);
    } else {
      this.listProducts.sort((a, b) => b.annualCost - a.annualCost);
    }
  }

}
