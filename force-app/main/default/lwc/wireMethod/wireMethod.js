import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/WireApexClass.getContactList';

const colum=[
    {label:'Name',fieldName:'Name'},
    {label:'Phone',fieldName:'Phone'}
]
export default class WireMethod extends LightningElement {
    columns=colum;
   condata;
   connectedCallback(){
    getContactList().then(result=>{
        this.condata=result;
    })
    .catch(error=>{
        console.log(error);
    })

    
   }
   
}