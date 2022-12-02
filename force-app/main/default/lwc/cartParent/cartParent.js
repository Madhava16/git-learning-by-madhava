import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ParentComponent extends LightningElement {
    
    product = []
    @track addedProducts = []
    @track shirtCount = 0
    @track pantCount = 0
    @track hatCount = 0
    @track beltCount = 0
    @track shoeCount = 0
    @track totalPrice = 0

    get options() {
        return [
            { label: 'Shirt (' + this.shirtCount + ')', value: 'shirt' },
            { label: 'Pant(' + this.pantCount + ')', value: 'pant' },
            { label: 'Hat(' + this.hatCount + ')', value: 'hat' },
            { label: 'Belt(' + this.beltCount + ')', value: 'belt' },
            { label: 'Shoe(' + this.shoeCount + ')', value: 'shoe' }
        ];
    }


    handleChange(e) {
        const __value = Array.from(e.detail.value)
        .filter((val) => val !== this.product[0]); 
        this.product = __value;
        this.template.querySelector('.childComponent').fromParent(this.product);
    }


    addToCart(event){
        var addedProduct = event.detail.product
        var price = event.detail.price
        if (addedProduct === 'shirt'){
            if(this.shirtCount < 3){
                this.shirtCount += 1
                this.totalPrice += price
            }
            else
                this.callErrorToast()
            this.updateAddedProducts('Shirt', this.shirtCount) 
        }    
        else if (addedProduct === 'pant'){
            if(this.pantCount < 3){
                this.pantCount += 1
                this.totalPrice += price
            }
            else
                this.callErrorToast()
            this.updateAddedProducts('Pant', this.pantCount)
        }
        else if (addedProduct === 'hat'){
            if(this.hatCount < 3){
                this.hatCount += 1
                this.totalPrice += price
            }
            else
                this.callErrorToast()
            this.updateAddedProducts('Hat', this.hatCount)
        }
        else if (addedProduct === 'belt'){
            if(this.beltCount < 3){
                this.beltCount += 1
                this.totalPrice += price
            }
            else
                this.callErrorToast()
            this.updateAddedProducts('Belt', this.beltCount)
        }
        else if (addedProduct === 'shoe'){
            if(this.shoeCount < 3){
                this.shoeCount += 1
                this.totalPrice += price
            }
            else
                this.callErrorToast()
            this.updateAddedProducts('Shoe', this.shoeCount)
        }
    }


    updateAddedProducts(productName, count) {
        if(this.addedProducts.some(product => product.name === productName)){
            var index = this.addedProducts.findIndex(product => product.name === productName)
            this.addedProducts[index].quantity = count
        } 
        else 
            this.addedProducts.push({name: productName, quantity: count})
    }

        
    callErrorToast(){
        const evnt = new ShowToastEvent({
            title: 'Cart size exceeded',
            message: 'Cannot have more than 3 items in cart',
            variant: 'error',
        })
        this.dispatchEvent(evnt)
    }

}