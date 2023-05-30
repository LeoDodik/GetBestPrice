const dict ={
    "0": {
        "product1": 50,
        "product2": 100,
        "product3": 200
    },
    "1": {
        "product1": 50,
        "product2": 100,
        "product3": 200
    },
    "2": {
        "product1": 50,
        "product2": 100,
        "product3": 200
    },
    "3": {
        "product1": 50,
        "product2": 100,
        "product3": 200
    },
    "4": {
        "product1": 50,
        "product2": 106,
        "product3": 200
    },
    "5": {
        "product1": 50,
        "product2": 106,
        "product3": 200
    },
    "6": {
        "product1": 50,
        "product2": 106,
        "product3": 200
    },
    "7": {
        "product1": 47,
        "product2": 106,
        "product3": 200
    },
    "8": {
        "product1": 47,
        "product2": 106,
        "product3": 200
    },
    "9": {
        "product1": 47,
        "product2": 106,
        "product3": 200
    },
    "10": {
        "product1": 47,
        "product2": 106,
        "product3": 200
    },
    "11": {
        "product1": 47,
        "product2": 106,
        "product3": 200
    },
    "12": {
        "product1": 47,
        "product2": 106,
        "product3": 200
    },
    "13": {
        "product1": 50,
        "product2": 94,
        "product3": 200
    },
    "14": {
        "product1": 30,
        "product2": 94,
        "product3": 200
    },
    "15": {
        "product1": 30,
        "product2": 94,
        "product3": 200
    },
    "16": {
        "product1": 30,
        "product2": 94,
        "product3": 200
    },
    "17": {
        "product1": 30,
        "product2": 94,
        "product3": 200
    },
    "18": {
        "product1": 30,
        "product2": 94,
        "product3": 200
    },
    "19": {
        "product1": 50,
        "product2": 94,
        "product3": 200
    },
    "20": {
        "product1": 25,
        "product2": 100,
        "product3": 124
    },
    "21": {
        "product1": 25,
        "product2": 100,
        "product3": 124
    },
    "22": {
        "product1": 25,
        "product2": 100,
        "product3": 200
    },
    "23": {
        "product1": 25,
        "product2": 100,
        "product3": 200
    },
    "24": {
        "product1": 25,
        "product2": 100,
        "product3": 173
    },
    "25": {
        "product1": 25,
        "product2": 100,
        "product3": 173
    },
    "26": {
        "product1": 25,
        "product2": 100,
        "product3": 173
    },
    "27": {
        "product1": 50,
        "product2": 100,
        "product3": 173
    },
    "28": {
        "product1": 50,
        "product2": 100,
        "product3": 200
    },
    "29": {
        "product1": 50,
        "product2": 100,
        "product3": 200
    }
}

const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);

const budget = 250

function cart_calc_0 (price_list,budget){
    // Simplest Callculation for Debuging
    // Returns  True    => Buy
    //          False   => Dont Buy
    let sum = (sumValues(price_list))
    let result = null 
    if (sum<budget) // Logic
        {result = true;} 
    else {result = false;}
    return result
}

function run_me (){
    for (const [day,price_list] of Object.entries(dict)) {

        let sum = (sumValues(price_list)) 
        if (sum<budget){
            console.log(day,price_list,"buy", sum);
        } else {
            console.log(day,price_list,"dont buy", sum);
        }
        // Neue Daten Festlegen 

        // Check
    }
}

function evaluate_cart (cart,products){
    let response = false
    let price_list = []
    for (let product of  products){
        price_list.push(product.current_price)
    } 
    if (cart.type===1){
        response = cart_calc_0(price_list,cart.budget)
    } else {
        response = false
    }
    return response
}   

module.exports = {evaluate_cart};