import { api, LightningElement, track } from 'lwc';
//import My_Resource from '@salesforce/resourceUrl/myResources';   
import My_Resource from '@salesforce/resourceUrl/myzipfile';
export default class ChildComponent extends LightningElement {
    product
    title
    imgUrl 
    description
    price
    discount
    sellingPrice
    dataObject

    products = {
        'shirt' : {
            'image' : My_Resource + '/POINTS.jpg',
            'description' : 'The solid grey casual shirt comes with a curved hem, a shirt collar, long sleeves and a front patch pocket.' ,
            'price' : 800,
            'discount' : 150   
        },
        'pant' : {
            'image' : false ? My_Resource + '/SHIRT2.jpg' : My_Resource + '/SHIRT2.jpg',
            'description' : 'A pair of dark stone wash jeans, that comes with skinny fit. A staple update for a casual wardrobe, this one also blends well with casual shirt and slip ons.The model (height 6 ft 1 in) is wearing size 32.' ,
            'price' : 1000,
            'discount' : 110     
        },
        'hat' : {
            'image' : My_Resource + 'SHIRT3.jpg',
            'description' : 'The solid grey casual shirt comes with a curved hem, a shirt collar, long sleeves and a front patch pocket.' ,
            'price' : 1500,
            'discount' : 80 
        },
        'belt' : {
            'image' : My_Resource + '/SHIRTS.jpg',
            'description' : 'This brown belt from Peter England will lend a perfect finish to your ensemble.' ,
            'price' : 900,
            'discount' : 75 
        },
        'shoe' : {
            'image' : My_Resource + '/SHIRTS.jpg',
            'description' : 'The unique design of Ajile Navy Sports Shoes is sure to give your casual attire a refreshing twist. With a chunky and textured base, this pair helps you maintain balance on smooth and slippery surfaces.' ,
            'price' : 2000,
            'discount' : 0     
        }
    }


    @api
    fromParent(selectedProduct){
        this.product = selectedProduct[0];
        if(this.product == undefined){
            this.title = ''
        } else {
            this.title = (this.product).toUpperCase();
            this.imgUrl = this.products[selectedProduct]['image']
            this.description = this.products[selectedProduct]['description']
            this.price = this.products[selectedProduct]["price"]
            this.discount = this.products[selectedProduct]["discount"]
            this.sellingPrice = parseInt(this.price) - parseInt(this.discount)
        }
        this.dataObject = {product : this.product, price : this.sellingPrice }
    }

    addProduct(event) {
        const addCartEvent = new CustomEvent("addtocart",{
            detail : this.dataObject
        })
        this.dispatchEvent(addCartEvent)
    }

}