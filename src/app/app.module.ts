import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoryPage } from '../pages/category/category';
import { ModelPage } from '../pages/model/model';

import {Image} from '../providers/image';
import {Database} from '../providers/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

const config = {
    apiKey: "AIzaSyBaOgtno6BXCLGRjmFq9VRp3PradprcC90",
    authDomain: "mynotesv0point6.firebaseapp.com",
    databaseURL: "https://mynotesv0point6.firebaseio.com",
    storageBucket: "mynotesv0point6.appspot.com",
    messagingSenderId: "144200417438"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoryPage,
    ModelPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoryPage,
    ModelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, Image, Database
  ]
})
export class AppModule {}
