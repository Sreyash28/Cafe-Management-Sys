import { Component, OnInit } from '@angular/core';
import { Menu } from '../models/menu';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menu: Menu[] = [];

  constructor(public service: MenuService) {}

  ngOnInit(): void {
      this.findAllMenuItems();
  }


  getImageUrl(item: any): string {

    switch (item.itemName) {
      case 'Tea':
        return 'assets/Menu/Tea.jpg';
      case 'Coffee':
        return 'assets/Menu/coffee.jpg';
      case 'Cold Coffee':
        return 'assets/Menu/cold-coffe.jpg';
      case 'Water Bottle':
        return 'assets/Menu/waterb.jpg';
      case 'Samosa':
        return 'assets/Menu/samosa.jpg';
      case 'Cappuccino':
        return 'assets/Menu/capac.jpg';
      case 'Hot Chocolate':
        return 'assets/Menu/hot-choco.jpg';
      case 'Iced Tea':
        return 'assets/Menu/ice-t.jpg';
      case 'Smoothies Fruit Based':
        return 'assets/Menu/fruit-smt.jpg';
      case 'Smoothies Protien Based':
        return 'assets/Menu/protien=smt.jpg';
      case 'Veg Burger':
        return 'assets/Menu/burger.jpg';
      case 'Normal Sandwich':
        return 'assets/Menu/veg-san.jpg';
      case 'Paneer Sandwich':
        return 'assets/Menu/paneer-s.jpg';
      case 'Wada Pav':
        return 'assets/Menu/wada-pav.jpg';
      case 'Kachori':
        return 'assets/Menu/kachori.jpg';
      default:
        return 'assets/Menu/cold-coffe.jpg';
    }
  }


  findAllMenuItems(){
    this.service.findAllMenuItems().subscribe({

      next: (res) => {
        console.log(res);
        this.menu = res;
      },
      error: (error) => { },
      complete: () => { }

    })
  }
}
