import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Camera} from 'ionic-native';

import { FirebaseService } from '../../app/services/firebase.service';
import { CategoryPage } from '../category/category';
import { Image } from'../../providers/image';
import { Database } from'../../providers/database';

//import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

/*
  Generated class for the Model page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-model',
  templateUrl: 'model.html',
   providers: [FirebaseService],
})
export class ModelPage {
  public form          : any;
  public filmImage : any;
  public categorytitle : string;
  public image : string;
  public categoryImage: any = '';
  public isEditable    : boolean = false;
  
  public base64Image: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl       : ViewController,
    private _FB 	        : FormBuilder,
    public _firebaseService: FirebaseService,
    public _IMG           : Image,
    private _DB           : Database
   ) {

      this.base64Image = "http://placehold.it/125x125";
    
      this.form 	    = _FB.group({
         'title' 	    : ['', Validators.required],
         'image'		: ['', Validators.required],
      });

      if(navParams.get('isEdited'))
      {

       let category 		= navParams.get('category')

       this.categorytitle   = category.title;
       this.image = category.image
       this.isEditable      = true;
      }
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ModelPage');
  }

  saveCategory(val){
     let category 		= this.navParams.get('category')
     let title	    : string	= this.form.controls["title"].value,
         image     : string        = this.base64Image

     if(this.isEditable) 
      {
      if(image !== this.categoryImage)
        {
          this._DB.uploadImage(image)
          .then((snapshot : any) =>
          {
            let uploadedImage : any = snapshot.downloadURL
          var updCategory = {
          title: title,
          Image: uploadedImage,
          }
          console.log(updCategory, JSON.stringify(category.$key));
          this._firebaseService.updateCategory(category.$key, updCategory);
        })
      }
        else{
          var updCategory = {
          title: title,
          Image: "http://placehold.it/85x85"
          }
          console.log(updCategory, JSON.stringify(category.$key));
          this._firebaseService.updateCategory(category.$key, updCategory);
        }
        }
      else
      {
        this._DB.uploadImage(image)
        .then((snapshot: any) => 
        {
           let uploadedImage : any = snapshot.downloadURL;

            var newCategory = {
              title: title,
              Image: uploadedImage,
            }

            this._firebaseService.addCategory(newCategory);
            })
      }
      this.closeModal();
      }

      closeModal()
      {
          this.viewCtrl.dismiss();
      }

   selectImage()
   {
     Camera.getPicture({
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 125,
        targetHeight: 125,
        encodingType       : Camera.EncodingType.JPEG,
        correctOrientation : true
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
  }
