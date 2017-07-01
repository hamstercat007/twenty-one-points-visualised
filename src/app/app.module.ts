import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserViewComponent } from './user-view/user-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RulesComponent } from './rules/rules.component';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'user/:userName', component: UserViewComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

export const firebaseConfig = {
    apiKey: 'AIzaSyDjx8yKcjJ7-ww2mFVqp8EnYo01ZPQnjDY',
    authDomain: 'points-visualised.firebaseapp.com',
    databaseURL: 'https://points-visualised.firebaseio.com',
    projectId: 'points-visualised',
    storageBucket: 'points-visualised.appspot.com',
    messagingSenderId: '167979637178'
  };

export function highchartsFactory() {
  return highcharts;
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserViewComponent,
    PageNotFoundComponent,
    LoginComponent,
    RulesComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ChartModule
  ],
  providers: [{
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }