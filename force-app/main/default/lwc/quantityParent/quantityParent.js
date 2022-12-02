import { LightningElement } from 'lwc';

export default class QuantityParent extends LightningElement {
    total;
    tax;
    quantity;
    price;
 handleChange(event){
    let boxname=event.target.name;
    if(boxname=='Quantity'){
        this.quantity=event.target.value;
    }
    else{
        this.price=event.target.value;
    }


 }
 Total(event){
    this.total = parseInt(this.quantity) * parseInt(this.price);
 }
 Tax(){
    this.tax=((this.total*0.05)+this.total);
 }
 


}