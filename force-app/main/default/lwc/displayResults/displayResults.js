import { LightningElement } from 'lwc';
const cols=[
    {label:'Name',fieldName:'Name'},
    {label:'Phone',fieldName:'Phone'}
]
export default class DisplayResults extends LightningElement {
   
    columns=cols;
    
}