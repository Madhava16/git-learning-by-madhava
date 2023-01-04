import { LightningElement,track,wire} from 'lwc';
import getAllObjects from '@salesforce/apex/GetAllObjectsinSingleMethod.getAllObjects';
import getfields from '@salesforce/apex/GetAllObjectsinSingleMethod.getfields';

export default class GetAllObjectsinSingleMethod extends LightningElement {

    @track value='';
    @track  optionarr=[];
    
    get options(){
        return this.optionarr;
    }
    connectedCallback(){
        getAllObjects()
        .then((result) => {
                    let data = JSON.parse(JSON.stringify(result));
                    let lstOption = [];
                  for (var i = 0;i < data.length;i++) {
                      lstOption.push({value: data[i].QualifiedApiName,label: data[i].QualifiedApiName
                      });
                    }
                    this.optionarr = lstOption;
                  //  this.showLoadingSpinner = false;
                  })
                  .catch((error) => {
                    error;
                  });

    }

    @track value = 'inProgress';
    @track data1 = [];
get Options() {
    return this.data1;
}
handleChange(event) {
        this.value = event.detail.value;
        const select = event.detail.value;
    getfields({
      objectname: select
    })
      .then((result) => {
        let data = JSON.parse(JSON.stringify(result));
        let lstOption = [];
      for (var i = 0;i < data.length;i++) {
          lstOption.push({value: data[i].QualifiedApiName,label: data[i].DeveloperName
          });
        }
        this.data1 = lstOption;
        this.showLoadingSpinner = false;
      })
      .catch((error) => {
        error;
      });
     }

}