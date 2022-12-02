import { LightningElement,api } from 'lwc';

export default class ChildComponent1 extends LightningElement {
    @api username;
    @api email;
    @api contactNumber;

   
    @api
    callFromParent(data){
this.username=data[0].value;
this.email=data[1].value;
this.contactNumber=data[2].value;
    }
}