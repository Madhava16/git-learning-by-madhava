import { LightningElement, api } from 'lwc';
import getContact from '@salesforce/apex/SearchEmail.getContact';
import { NavigationMixin } from 'lightning/navigation';

const actions=[
    {label:'View',name:'view'},
    
  ];
const columns=[
   { label:'Name',fieldName:'Name'},
   {label:'Phone',fieldName:'Phone'},
   {label:'Email',fieldName:'Email'},
   {
    type : 'button',

    typeAttributes : { label : 'View' ,name :'View'}
    }
  
];
export default class ContactAndLeads extends NavigationMixin(LightningElement) {
  //  searchKey;
      data=[];
     columns=columns;

     
   @api returnEmail(event){
    this.searchKey=event;

    getContact({searchkey:this.searchKey})
    .then(result=>{
        this.data=result;
    })
    .catch(err=>{
        console.log('error',err);
    })
   }
     handleRowAction(event){

        console.log('id ->>> ',event.detail.row.Id)

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.row.Id,
                objectApiName: 'Contact',
                actionName: 'view'
            }
        });
     }
    

}