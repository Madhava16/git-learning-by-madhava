import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/RefreshApexClass.getAccountDetails';
import { deleteRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';


 const cols=[
    {label:'Account Name',fieldName:'Name'},
    {label:'Phone',fieldName:'Phone'},
    {label:'Type',fieldName:'Type'},
 ]

export default class RefreshApexDemo extends LightningElement {
     columns=cols;
     accounts;
     error;
     selectedRecord;
     Accountlist;
     @wire(getAccounts) accountsdata(result){
        this.Accountlist=result;
        if(result.data){
            this.accounts=result.data;

        }
        else if(result.error){
            this.error=result.error;
        }
            
        }
     
     handleRowSelecton(event){
       
            this.selectedRecord=event.detail.selectedRows[0].Id;
            console.log('selectedrow')
            console.log('rec id--> ',this.selectedRecord)

        
       
     }
     handleDelete(){
        console.log('deleted Account');

        deleteRecord(this.selectedRecord)
        .then(result=>{

            window.alert('Record deleted successfully !');
            refreshApex(this.Accountlist);
            
        })
        .catch(error=>{

            window.alert(JSON.stringify(error));
        })
     }
}