let basket = []

function addItem(myBasket, product){
    if (myBasket.length > 0) {

        let found = false;

        for (i = 0; i < myBasket.length; i++) {
            if (myBasket[i].name === product.name) {
                myBasket[i].quantity += 1
                found = true
            
            }
        }
        if (found === false) {
            myBasket.push(product)
        }
       
    } else {
        myBasket.push(product)
    }
    
    return myBasket;

}

function removeItem(index) {

    if (basket[index].quantity > 1) {
        basket[index].quantity -= 1
    } else {
        basket.splice(index, 1);
    }

    return basket

}

product1 = {
    name: "item1",
    quantity: 1
}

product2 = {
    name: "item2",
    quantity: 1
    
}

product3 = {
    name: "item3", 
    quantity: 1
}

product4 = {
    name: "item4",
    quantity: 1
}

basket = addItem(basket, product2)
basket = addItem(basket, product2)
basket = addItem(basket, product2)
basket = addItem(basket, product1)
basket = addItem(basket, product1)
basket = addItem(basket, product1)
basket = addItem(basket, product1)
basket = addItem(basket, product3)
basket = addItem(basket, product3)
console.log(basket+"\n\n\n")

basket = removeItem(1)

console.log(basket)