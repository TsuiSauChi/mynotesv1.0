import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';

import { ModelPage } from '../model/model';
import { FirebaseService } from '../../app/services/firebase.service';

/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  categories: any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl : ModalController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public _firebaseService: FirebaseService,) {
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
    this._firebaseService.getCategory().subscribe(categories => {
      console.log(categories);
      this.categories = categories;
    });
  }

  AddCategory(){
    let modal = this.modalCtrl.create(ModelPage);
    modal.present();
  }

 editcategory(category, key){
    let actionSheet = this.actionsheetCtrl.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this._firebaseService.deleteCategory(key);
          }
        },
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
             let params = { category: category, isEdited: true},
             modal = this.modalCtrl.create(ModelPage, params);

             modal.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  test(event, category){
    console.log(category.title);
  }



}
