import { LightningElement } from 'lwc';

export default class ParentComponent1 extends LightningElement {
    handleChild(){
        const dataArray=this.template.querySelectorAll(".forInput");
        this.template.querySelector(".childComponent").callFromParent(dataArray);
    }
}