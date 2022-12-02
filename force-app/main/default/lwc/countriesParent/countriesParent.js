import { LightningElement } from 'lwc';

export default class CountriesParent extends LightningElement {
value='';
get options(){
    return[  {label:'India',value:'India'},
    {label:'USA',value:'USA'},
    {label:'China',value:'China'},
    {label:'Japan',value:'Japan'},
];
}
handleChange(event){
    this.value=event.detail.value;
}
showDetails(){
    this.template.querySelector('c-famous-places-child').famousPlaces(this.value);
}
  
}