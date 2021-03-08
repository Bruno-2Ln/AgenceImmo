import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminPropertiesComponent } from './admin/admin-properties/admin-properties.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './authentication/signin/signin.component';
import { SinglePropertyComponent } from './components/single-property/single-property.component';
import { AdminAgentComponent } from './admin/admin-agent/admin-agent.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { HeartStrokePropertyComponent } from './heart-stroke-property/heart-stroke-property.component';
import { SearchPropertiesComponent } from './components/search-properties/search-properties.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdminDashboardComponent,
    AdminPropertiesComponent,
    SigninComponent,
    SinglePropertyComponent,
    AdminAgentComponent,
    AccueilComponent,
    HeartStrokePropertyComponent,
    SearchPropertiesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
