import { LightningElement, wire,api } from 'lwc';
import getConList from '@salesforce/apex/StylingContatViewFrom.getConList'
import returnSearchResult from '@salesforce/apex/StylingContatViewFrom.returnSearchResult'


export default class StylingContatViewFrom extends LightningElement {
 conRecords=[];
 searchValue='';
// viewTrue=false;
@api Name;

 //viewRec;
@wire(getConList,{SearchKey:'$searchValue'}) contacts;


 handleChange(event){
this.searchValue=event.target.value;

console.log('value --> ',event.target.value)

    returnSearchResult({searchKey:event.target.value})
    .then(res=>{

        console.log('res--> ',res)
        this.conRecords = res;
    })
    .catch(err=>{



    })

 }
 handleClick(event){
 
      this.template.querySelector('c-styling-contat-view-from-child').returnCon(this.Name);
 }
}