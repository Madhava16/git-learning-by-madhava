import { LightningElement,track } from 'lwc';
import getDetailsOfChild from '@salesforce/apex/getChild.getDetailsOfChild';
export default class TreeGridInLwc extends LightningElement {
    @track gridcolumns=[
        {
           type:'text',
           fieldName:'Name',
           label:'Name'
        },
        {
            type:'text',
            fieldName:'Firstname',
            label:'First Name'
         },
         {
            type:'text',
            fieldName:'LastName',
            label:'Last Name'
         }
    ];
    @track gridData;

    connectedCallback(){
        getDetailsOfChild()
        .then(result=>{
          console.log("result:"+JSON.stringify(result));
          var tempContact=JSON.parse(JSON.stringify(result));
          console.log("tempContact:"+JSON.stringify(tempContact));
          for(var i=0;i<tempContact.length;i++){
            var relatedContact=tempContact[i]['Contacts'];

            console.log("newContact:"+JSON.stringify(relatedContact));

            if(relatedContact){
                tempContact[i]._children=relatedContact;
                console.log("tempContact[i]._children:"+JSON.stringify(tempContact[i]._children));
                 delete tempContact[i].Contacts;
            }
          }
          this.gridData=tempContact;
          console.log("gridData:"+JSON.stringify(this.gridData));
        })
        .catch(error=>{
            console.log("result:",JSON.stringify(error));
        })
    }
}