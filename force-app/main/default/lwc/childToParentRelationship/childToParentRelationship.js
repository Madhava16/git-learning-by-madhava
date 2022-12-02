import { LightningElement, track, wire } from 'lwc';
import conlist from '@salesforce/apex/DisplayContacts.Conlist';
import getconlist from '@salesforce/apex/DisplayContacts.getcontacts';
const cols = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Email', fieldName: 'Email' }
];
export default class ChildToParentRelationship extends LightningElement {
    columns = cols;
    data = [];//data stored for table
    searchkey;
    @track item;// all records contained
    @track StartingRecord = 0;
    @track page = 1;
    @track endingRecord = 1;
    @track totalRecordCount; //total records count
    @track totalPage;// divided no.of pages
    @track pageSize = 5;
    //@track pagess;
    handleChange(event) {
        this.searchkey = event.target.value;
        
    }
    hnadleClick() {
        getconlist({ searchkeys: this.searchkey })
            .then(response => {
                this.data = response;
                
            })
            .catch(err => {
                console.log('error', err);
            })
    }
    get pageNumbers() {
        return [
            { label: '5', value: 5 },
            { label: '10', value: 10 },
            { label: '15', value: 15 },
            { label: '20', value: 20 },
            { label: '100', value: 100 }
        ]
    }

    handlePageSize(event) {
        console.log('target-->', event.target.value);
        this.pageSize = parseInt(event.target.value);

        this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
        this.page = 1;
            this.displayRecordpage();
        }
           

        @wire(conlist) contact(result) {



            if (result.data) {
                this.item = result.data;
               this.totalRecordCount = result.data.length;
    
               this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
    
                this.data = this.item.slice(0, this.pageSize);
              //  this.endingRecord=this.pageSize;
            }
        }
        firstHandler1() {

            this.page = 1;
            this.displayRecordpage();
    
        }
        lastHandler1() {
           
                this.page = this.totalPage;
                this.displayRecordpage();
            
          
        }
        previousHandler1() {
           
                this.page = this.page - 1;
                this.displayRecordpage();
            
        }
        nextHandler1() {
            
                this.page = this.page + 1;
                this.displayRecordpage();
            
        }
        displayRecordpage(page) {
            this.StartingRecord = (this.page - 1) * this.pageSize;
        
            this.endingRecord = this.page * this.pageSize;
          // this.endingRecord=(this.endingRecord>this.totalRecordCount)?this.totalRecordCount:this.endingRecord;
            this.data = this.item.slice(this.StartingRecord, this.endingRecord);
            this.StartingRecord = this.StartingRecord + 1;
        }

        get previous(){
            if(this.StartingRecord == 1 && this.page==1){
                return true;
            } else {
                return false;
            }
        }
        get next(){
            if((this.StartingRecord + this.pageSize) > this.totalRecordCount){
                return true;
            } else {
                return false;   
            }
        }





    
    
}