

import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Injectable({
  providedIn: 'root'
})
export class FirebasedbService {

  constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore) { }


  async addDocumentToCollection(collectionName:string,data:{}):Promise<boolean>
  {
    let res=false;
    await this.afs.collection(collectionName).add(data).then(resp=>{
      res= true;
    }).catch(err=>{
      
    });
    return res;
  }

  async addDocumentToCollectionWithID(collectionName:string,id:string,data:any):Promise<boolean>
  {
    let res=false;
    await this.afs.collection(collectionName).doc(id).ref.get().then(docSnapshot=>{
      if(docSnapshot.exists)
      {
        
        docSnapshot.ref.collection("dataset").add(data);
        res=true;
      }
      else{
        docSnapshot.ref.set({}).then(resp=>{
          
          docSnapshot.ref.collection("dataset").add(data)
          
          res=true;
        });
      }

    })  
   
    return res;
  }



  async updateDocument(documentPath:string,data:any):Promise<boolean>
  {
    let res=false;
    await this.afs.doc(documentPath).ref.update(data).then(result=>{
      res= true;
    },err=>{
      res= false;
    });

    return res;

  }

  async deleteDocument(documentPath:string):Promise<boolean>
  {
    let res=false;
    await this.afs.doc(documentPath).ref.delete().then(result=>{
      res= true;
    },err=>{
      res= false;
    });

    return res;

  }

   async documentExists(collectionName:string,field1?,value1?,field2?,value2?,field3?,value3?):Promise<boolean>
  {
    let collectionRef=this.afs.collection(collectionName);
    let docSize=0;
    if(field1!==undefined && value1!==undefined && field2===undefined && value2===undefined && field3===undefined && value3===undefined)
    {
      docSize= (await collectionRef.ref.where(field1, '==', value1).get()).size;
    }
    else
    if(field1!==undefined && value1!==undefined && field2!==undefined && value2!==undefined && field3===undefined && value3===undefined)
    {
      docSize= (await collectionRef.ref.where(field1, '==', value1).where(field2, '==', value2).get()).size;
    }

    else
    if(field1!==undefined && value1!==undefined && field2!==undefined && value2!==undefined && field3!==undefined && value3!==undefined)
    {
      docSize= (await collectionRef.ref.where(field1, '==', value1).where(field2, '==', value2).where(field3, '==', value3).get()).size;
    }
    

    return docSize>0;
  }



  async getDocumentsAsObjectList(collectionName:string)
  {
    
    let docs= (await this.afs.collection(collectionName).ref.get()).docs;


    return docs;
    

  }

  
}
