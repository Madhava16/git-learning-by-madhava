import { LightningElement,track } from 'lwc';
import getAccounts from '@salesforce/apex/DataTableApexClassWithCombobox.getAccountlistFormCombpbox';
import getRelatedContacts from '@salesforce/apex/DataTableApexClassWithCombobox.getContacts';
const columns=[
    {label:'Contact Name' ,fieldName:'Name'},
    {label:'Email',fieldName:'Email'}
];
export default class DataTableWithCombobox extends LightningElement {
    @track value='';
    @track optionarr=[];
    @track cardVisible=false;
    @track data=[];
    @track columns=columns;

    get options(){
        return this.optionarr;
    }
    connectedCallback(){
        getAccounts()
        .then(response=>{
            let arr=[];
   for(let i=0;i<response.length;i++){
    arr.push({label:response[i].Name,value:response[i].Id});

   }
           this.optionarr=arr;
        })

        
    }
    handleChange(event){
        this.cardVisible=true;
        this.value=event.detail.value;

        getRelatedContacts({recordId:this.value})
        .then(result=>{
            this.data=result;
        })
        .catch(error=>{
            widows.alert('error');
        })
    }
}