import { LightningElement } from 'lwc';

export default class ForEachInLWC extends LightningElement {
    Patientlist;
    showhandlerlist(){
        this.Patientlist=[
            {
                id:1,
                Name:'Gowri',
            },
            {
                id:2,
                Name:'Nanda',
            },
            {
                id:3,
                Name:'Sandeep',
                
            },
            {
                id:4,
                Name:'saleem',
            },
            {
                id:5,
                Name:'manjunath',
            },
            {
                id:6,
                Name:'Eswar',
            },
            {
                id:7,
                Name:'madhava',
            },
            
        
        ]
    }
}