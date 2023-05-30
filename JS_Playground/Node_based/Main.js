const collectFunction = require('./Amazone_Scraper')
const supabase = require('./supabase_link')
const calculation = require('./Simulation');
const collect_timeout_sec = 5
const calculate_timeout_sec = 5




async function collect_data(){
    const productsList = await supabase.get_all_entrys('Product','*')
    const products = await collectFunction.collect(productsList);
    // Pushes Data to DB
    for (var updated_product_data of products) {
        await supabase.update_entry("Product", updated_product_data, updated_product_data.id)
    }
    return products;
}



async function update_carts(){
    const carts = await supabase.get_all_entrys('Cart','*') // = Get Carts (das ist die Pick Carts Funktion)
    for(let cart of carts){
        let cart_products = await supabase.get_entrys_filtered('Product','*',"cart",1)
        let eval_result = calculation.evaluate_cart(cart,cart_products)
        
        // here Notification Later
        console.log("By now Products in Cart == >",eval_result)

        cart.updated = ((new Date()).toISOString())
        await supabase.update_entry("Cart", cart, cart.id)


    }
    //setTimeout(1000 * calculate_timeout_sec)
}

async function run_main_loop(){
    while (true){
        //await collect_data();
        await update_carts();
        break; // TODO Debug -> Remove Later
    }

}
//collect_data();
run_main_loop () 



