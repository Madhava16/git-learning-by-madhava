import { LightningElement } from 'lwc';

export default class ComboBox extends LightningElement {
    value='';
    get options(){
        return[
            {label:'firstPatient' , value:'sandeep'},
            {label:'secondPatient', value:'manju'},
            {label:'thirdPatient' , value:'gowri'},
            {label:'fourthPatient', value:'nanda'},
            {label:'fifthPatient' , value:'saleem'},
            {label:'sixthPatient' , value:'eswar'},
            {label:'seventhPatient' ,  value:'madhav'},
        ];
    }
    handleChange(event){
        this.value=(event.detail.value);
    }
}