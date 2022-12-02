import { LightningElement } from 'lwc';

export default class CalculatePrincipalAmount extends LightningElement {
    principleAmount;
    numberOfYears;
    rateOfInterest;
    TotalInterest;
    principleHandler(event){
      this.principleAmount=event.target.value;
    }
    yearsHandler(event){
       this.numberOfYears=event.target.value;
    }
    rateHandler(event){
        this.rateOfInterest=event.target.value;
    }
    calculateHandler(event){
        this.TotalInterest='TotalInterest is : '+(this.principleAmount*this.numberOfYears*this.rateOfInterest)/100;
    }
}