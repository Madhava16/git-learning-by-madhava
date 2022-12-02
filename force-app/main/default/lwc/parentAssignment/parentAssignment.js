
import { LightningElement,track} from 'lwc';

export default class ParentAssignment extends LightningElement {
 data=[
    {
       India:[
        {label:'rajasthan', value:'rajasthan'},
        {label:'madhyapradesh',value:'madhypradesh'},
       ],
       india:[
        {label:'AndhraPradesh',value:'AndhraPradesh'},
        {label:'telgana',value:'telgana' },
    ],
}
]
@track states=[];
get countries(){
    var countryarr=[];
    for(let key in this.data[0]){
        var country={label:key, value:key};
        countryarr.push(country);
    }
    return countryarr;
} 


ChangeStates(event){

    console.log(event)
    console.log(event.detail)




    const country=event.detail.value;
    this.states=this.data[0][country];
}


      
   
}