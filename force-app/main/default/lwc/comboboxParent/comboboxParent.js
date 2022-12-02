import { LightningElement ,track } from 'lwc';
import getAccounts from  '@salesforce/apex/DataTableApexClassWithCombobox.getAccountlistFormCombpbox';
export default class ComboboxParent extends LightningElement {
    @track value='';
    @track  optionarr=[];
    
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

        console.log(this.value)

        this.template.querySelector('c-data-table-child').getContacts(this.value);
}
}