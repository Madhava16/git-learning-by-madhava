import { LightningElement,api } from 'lwc';

export default class FamousPlacesChild extends LightningElement {
details;
famouspalces=
{
    'India':{'Country':'India',
             'Population':'120crores',
            'President' : 'Mr.Modi',
          
           
        },

    'USA':{'Country' : 'USA',
    'Population' : '50Cr',
    'President' : 'Mr.Biden'
    }, 
    'China':{'Country' : 'China',
    'Population' : '200Cr',
    'President' : 'Mr.Xi Jinping'
    },
    'Japan':{'Country' : 'Japan',
    'Population' : '45Cr',
    'President' : 'Mr.Kishida'
    },                

}

@api famousPlaces(value){
this.details=this.famouspalces[value];
}



}



