import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Menu } from '../models/menu';
import { Orders, OrderItems, Users } from '../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  user: Users = new Users(0); // Initialize the user with a default ID of 0
  orderItems: OrderItems[] = [];
  menuItems: Menu[] = [];
  selectedMenuItem: Menu;
  quantity: number;
  createdOrder: Orders;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.findAllMenuItems();
  }

  findAllMenuItems(): void {
    this.orderService.findAllMenuItems().subscribe({
      next: (res) => {
        console.log(res);
        this.menuItems = res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  addOrderItem(): void {
    if (this.selectedMenuItem && this.quantity) {
      const orderItem = new OrderItems(this.selectedMenuItem, this.quantity);
      this.orderItems.push(orderItem);

      // Reset the selection and quantity
      this.selectedMenuItem = null;
      this.quantity = null;
    }
  }

  createOrder(): void {
    if (this.user.id && this.orderItems.length > 0) {
      const order = new Orders(this.user, this.orderItems);
      this.orderService.createOrder(order).subscribe({
        next: (res) => {
          console.log(res);
          alert(
            'Your Order Created Successfully🤩, please wait ,your order is on the way....'
          );
          this.createdOrder = res; // Store the created order
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  calculateTotal(): number {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.menu.itemPrice * orderItem.quantity;
    }
    return total;
  }
}
