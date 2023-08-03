export class User {
  constructor(
    public email: string,
    public password: string,
    public userName?: string,
    public contactNumber?: string,
    public id?: number
  ) {}
}
