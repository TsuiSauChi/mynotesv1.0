import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Categories } from '../data/category';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class FirebaseService{
    category: FirebaseListObservable<Categories[]>;

    constructor(private af:AngularFire, private http: Http){

    }

     getCategory(){
        this.category = this.af.database.list('Mynotes/') as
        FirebaseListObservable<Categories[]>;
        return this.category;
    } 

    addCategory(newCategory){
        this.category = this.af.database.list('Mynotes/') as
        FirebaseListObservable<Categories[]>;
        return this.category.push(newCategory);
    }

    updateCategory(key, updCategory){
        this.category = this.af.database.list('Mynotes/') as
        FirebaseListObservable<Categories[]>;
        return this.category.update(key, updCategory);
    }

    deleteCategory(key){
        return this.category.remove(key);
    }
}