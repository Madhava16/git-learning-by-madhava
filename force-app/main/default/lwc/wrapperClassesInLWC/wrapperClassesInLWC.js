import { LightningElement, track, wire } from 'lwc';
import fetchAccount from '@salesforce/apex/WrapperClassInLwc.fetchAccounts';
const columns=[
    {
        label:'Account Name',
        fieldName:'AccountLink',
        type:'url',
        typeAttributes:{
            label:{
                fieldName:'AccountName'
            },
            target:'_blank',
        }
    },
    {label:'Type',fieldName:'Type'},
    {label:'BillingAddress',fieldName:'billingAddress'},
    

];
export default class WrapperClassesInLWC extends LightningElement {
  @track columns=columns;
  @track data=[];

  @wire(fetchAccount)
  wirewrapperClass({data,error}){
    if(data){
        this.data=data;
    }
    else{
       console.log(error)
    }
  }

}