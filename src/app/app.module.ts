import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './shared/interceptors';

@NgModule({ 
  //components
  declarations: [
    AppComponent
  ],
  //modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    HttpClientModule,
    
  ],
  providers: [httpInterceptorProviders], //services
  bootstrap: [AppComponent] //the first component will run in the project
})
export class AppModule { }
