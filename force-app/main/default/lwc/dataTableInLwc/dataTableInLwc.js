
import { LightningElement, wire,track } from 'lwc';
import getcontact from '@salesforce/apex/datatable.getcontacts';
import deleteContact from '@salesforce/apex/datatable.deleteContact';
import { NavigationMixin } from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
const actions=[
  {label:'View',name:'view'},
  {label:'Edit',name:'edit'},
  {label:'Delete',name:'delete'},
];

const columns=[
    {label:'Name', fieldName:'Name'},
    {label:'Phone',fieldName:'Phone'},
    {
      type:'action',
      typeAttributes:{
        rowActions:actions
      }
    }
];
export default class DataTableInLwc extends NavigationMixin(LightningElement) {
  
  @track data;
    columns=columns;
    booleanflag=false;
    hideformHandler(){
      this.booleanflag=false;
    }
    showformHandler(){
        this.booleanflag=true;
    }
  @wire(getcontact) contactList({data,error}){
 if(data){
  this.data=data;
 }
 else if(error){
  this.data=undefined;
 }
  }
 


handleChange(event){

  let keyWrd = event.detail.value;

  getcontact({ searchkeys : keyWrd})
  .then(responce =>{

      this.data = responce;
  })
  .catch(error =>{

      console.log(error)
  })

 


}
handleRowAction(event){
  const actionname=event.detail.action.name;
  console.log('event action is :',actionname);
  const row=event.detail.row;
  switch(actionname){
    case 'view':
      this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: row.Id,
            actionName: 'view'
           
        },
    });
    break;

    case 'edit':
      this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: row.Id,
            actionName: 'edit'
          },
        });
        break;
        case 'delete':
          this.deleteContact(row);
          break;
      }
    } 
       
    deleteContact(currentRow){
      deleteContact({objcontact:currentRow})
      .then((result)=>{
        this.dispatchEvent(new ShowToastEvent({
          title:'Success',
          message:currentRow.Name+'Contact deleted',
          varient:'success'
        }))
      })
      .catch((error)=>{
        this.dispatchEvent(new ShowToastEvent({
          title:'Error',
          message:error,
          varient:'error'
        }))
      })
      
    }
  }  
       


   



    
