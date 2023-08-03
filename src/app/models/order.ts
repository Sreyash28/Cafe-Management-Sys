import { Menu } from './menu';

export class Users {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class OrderItems {
  constructor(public menu: Menu, public quantity: number) {}
}

export class Orders {
  constructor(
    public user: Users,
    public orderItems: OrderItems[],
    public id?: number,
    public total?: number
  ) {}
}
