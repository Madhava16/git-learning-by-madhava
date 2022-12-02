import { LightningElement, wire } from 'lwc';
import getAcclist from '@salesforce/apex/DataTableWithInlineEditing.getAcclist';
import updatedacclist from '@salesforce/apex/DataTableWithInlineEditing.updatedacclist'
const col=[
     {label:'Name',fieldName:'Name',editable:true},
     {label:'Phone',fieldName:'Phone',type:'Phone', editable:true},
     
];
export default class DataTableWithInlineEditing extends LightningElement {
  columns=col;
  data=[];
  saveDraftValues=[];


  @wire(getAcclist) accountdata(result){
    if(result.data){
        this.data=result.data;
    }
    else if(result.error){
        this.data=undefined;
    }
  }
  handleSave(event){
    let updatefield=event.detail.draftValues;
    console.log('updatefiled--->',JSON.stringify(updatefield));
    updatedacclist({accountdata:updatefield})
    .then(result=>{
        console.log('apex result',result);
    })
  }
}