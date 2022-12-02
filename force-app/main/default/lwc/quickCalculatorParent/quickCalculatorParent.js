import { LightningElement ,api} from 'lwc';

export default class QuickCalculatorParent extends LightningElement {
    // value='+';
    firstnumber;
    secondnumber;
  @api  result;
    
    get options(){
        return[
            {label:'Additon' , value:'+'},
            {label:'Subtract', value:'-'},
            {label:'Multiplication' , value:'*'},
            {label:'Division', value:'/'},
            
        ];
    }
    handleChange(event){
        this.value=event.detail.value;
             
    }

   
   
   handle(event){
    this.firstnumber=parseInt(event.target.value);
   
   }
   handle1(event){
   
   this.secondnumber=parseInt(event.target.value);
   }
   handlechange1(){
     if(this.value=='+'){
        this.result=this.firstnumber+this.secondnumber;
    }
   else if(this.value=='-'){
        this.result=this.firstnumber-this.secondnumber;
    }
  else  if(this.value=='*'){
        this.result=this.firstnumber*this.secondnumber;
    }
   else if(this.value=='/'){
        this.result=this.firstnumber/this.secondnumber;
    }
}
}