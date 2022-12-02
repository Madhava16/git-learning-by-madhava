import { LightningElement,api } from 'lwc';

export default class UserInforemation extends LightningElement {
    firstname='Madhava';
    Lastname='reddy';
    phone='6303118065';
    Email='gmadhava2000@gmail.com';

    handleClick(){
        console.log('you click see the magic');
       this.firstname='Madhava Reddy';
        this.Lastname='salesforce Developer';
    }
    

}