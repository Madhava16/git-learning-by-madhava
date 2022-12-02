import { LightningElement,track,api, wire } from 'lwc';
import getRelatedContacts from '@salesforce/apex/DataTableApexClassWithCombobox.getContacts';
const columns=[
    {label:'Contact Name' ,fieldName:'Name'},
    {label:'Email',fieldName:'Email'}
];
export default class DataTableChild extends LightningElement {
    @track data;
    @track columns=columns;

    // @wire(getRelatedContacts) contactList({data,error}){
    //     if(data){
    //      this.data=data;
    //     }
    //     else if(error){
    //      this.data=undefined;
    //     }
    //      }


   @api getContacts(event){
        
        this.value=event;

        getRelatedContacts({recordId:this.value})
        .then(result=>{
            this.data=result;
        })
        .catch(error=>{
            widows.alert('error');
        })
    }
//    @api getContacts(event){


//     let keywrd=event.detail.value;

//     console.log(event.detail)
//     console.log(event)

//     getRelatedContacts({recordId:keywrd})
//     .then(result=>{
//         this.data=result;
//     })
//     .catch(error=>{
//         widows.alert('error');
//     })
// }


}