import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';

import { CategoryPage } from '../category/category';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email: any;
  password: any;
  constructor(public navCtrl: NavController, public angFire: AngularFire) {
  }

   login() {
    this.angFire.auth.login({
      email: this.email,
      password: this.password
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((response) => {
      console.log('Login sucess' + JSON.stringify(response));
      let currentuser = {
        email: response.auth.email,
        picture: response.auth.photoURL
      };
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      this.navCtrl.push(CategoryPage);
    }).catch((error) => {
      console.log(error);
    })
  }

  twitterlogin(){
    this.angFire.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    }).then((response) => {
      console.log('Login success with twitter' + JSON.stringify(response));
      let currentuser = {
        email: response.auth.displayName,
        picture: response.auth.photoURL
      };
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      this.navCtrl.push(CategoryPage);
    }).catch((error) => {
      console.log(error);
    })
  }

   fblogin(){
    this.angFire.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then((response) => {
      console.log('Login success with Facebook' + JSON.stringify(response));
      let currentuser = {
        email: response.auth.displayName,
        picture: response.auth.photoURL
      };
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      this.navCtrl.pop();
    }).catch((error) => {
      console.log(error);
    })
  }


}

