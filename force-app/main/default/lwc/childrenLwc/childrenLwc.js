import { LightningElement, api } from 'lwc';

export default class ChildLwc extends LightningElement {
    @api firstnumber;
    @api secondnumber;

    handleevent(event){
       this.firstnumber=event.target.value;
    }
    handleevent2(event){
        this.secondnumber=event.target.value;
    }
    handlersubtract(event){

        console.log(event.target.label)



        let currentDetail = {

            fNum : this.firstnumber,
            sNum : this.secondnumber
        }


        //var subtra=event.target.value
        console.log(this.firstnumber)
        console.log(this.secondnumber)
       this.dispatchEvent(new CustomEvent('subtract',{detail: currentDetail}));
    }
    handlerAddition(event){
       // var addit=event.target.value
        console.log(this.secondnumber)
        let currentDetail = {

            fNum : this.firstnumber,
            sNum : this.secondnumber
        }
        this.dispatchEvent(new CustomEvent('add',{detail: currentDetail}));
    }



}