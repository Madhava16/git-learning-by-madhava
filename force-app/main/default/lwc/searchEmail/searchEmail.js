import {  LightningElement } from 'lwc';

export default class SearchEmail extends LightningElement {
    searchKey;

    handleChange(event){
        this.searchKey=event.target.value;
    }

    handleClick(){
        this.template.querySelector('c-contact-and-leads').returnEmail(this.searchKey);
    }
}