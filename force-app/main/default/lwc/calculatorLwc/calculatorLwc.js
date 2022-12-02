import { LightningElement } from 'lwc';

export default class CalculatorLwc extends LightningElement {
    firstnumber;
    secondnumber;
    result;
    input;
   handle(event){
    this.firstnumber=parseInt(event.target.value);
   
   }
   handle1(event){
   
   this.secondnumber=parseInt(event.target.value);
   }
   add(){
    this.result=parseInt(this.firstnumber)+(this.secondnumber);
   }
   sub(){
    this.result=parseInt(this.firstnumber)-(this.secondnumber);
   } 
   mul(){
    this.result=parseInt(this.firstnumber)*(this.secondnumber);
   } 
   div(){
    this.result=parseInt(this.firstnumber)/(this.secondnumber);
   }
  
}