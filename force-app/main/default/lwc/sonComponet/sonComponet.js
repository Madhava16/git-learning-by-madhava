import { LightningElement,track } from 'lwc';

export default class SonComponet extends LightningElement {
    name='Saleem';
     message;
    handelesend(){
      this.message='I am miss You ';
    }
}