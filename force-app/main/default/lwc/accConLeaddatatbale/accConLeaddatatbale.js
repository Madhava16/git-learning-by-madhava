import { LightningElement, wire } from 'lwc';
import getleadconacc from '@salesforce/apex/leadcontactandAccount.getleadconacc'
const colus=[
    {label:'Name',fieldName:'Name',Object:'Account'},
    {label:'ContactName',fieldName:'LastName',Object:'Contact'} ,
    {label:'LeadName',fieldName:'LastName',Object:'Lead'}
];
export default class AccConLeaddatatbale extends LightningElement {
columns=colus;
data;
acclist;
conlist;leadlist;
@wire(getleadconacc,{lstAccToInsert:'$acclist',lstContactToInsert:'conlist',lstLeadToInsert:'leadlist'}) contactList({data,error}){
    if(data){
     this.data=data;
    }
    else if(error){
     this.data=undefined;
    }
     }
// connectedCallback(){
//     getleadconacc().then(result=>{
//         this.data=result
//     })
// }

}