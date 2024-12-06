import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FAQsComponent } from './pages/faqs/faqs.component';
import path from 'path';

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'about', component: AboutComponent},
    {path:'faqs', component: FAQsComponent},
    {path:'', redirectTo: '/home', pathMatch: 'full'}

];
