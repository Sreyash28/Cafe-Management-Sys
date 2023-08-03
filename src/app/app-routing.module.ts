import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './Shared/auth.guard';
import { OrderComponent } from './order/order.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
const routes: Routes = [
  {path: "home" , component: HomeComponent, canActivate: [AuthGuard]},
  {path: "login" , component: LoginComponent},
  {path: "signup" , component: SignupComponent},
  {path: "menu" , component: MenuComponent, canActivate: [AuthGuard]},
  {path: "order" , component: OrderComponent, canActivate: [AuthGuard]},
  {path: "contact" , component: ContactUsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
