import { LightningElement, wire } from 'lwc';
import { fireEvent,registerListener } from 'c/pubsub';
import{ CurrentPageReference } from 'lightning/navigation';
export default class PublisherComponent extends LightningElement {

@wire(CurrentPageReference) pageRef;
message;
handleShow(){
    fireEvent(this.pageRef,"showData","Hello Good morning I am Publisher");
}
handleSendDetails(){
    const dataArray=this.template.querySelectorAll(".forInput");
    fireEvent(this.pageRef,"sendDetails",dataArray);
}
// connectedCallback(){
//     registerListener("sendToPublisher",this.handlePublisher,this)
// }
handlePublisher(data){
this.message=data;
}
handleSubscribe(){
    registerListener("sendToPublisher",this.handlePublisher,this)
}
}