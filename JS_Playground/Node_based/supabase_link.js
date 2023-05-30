const {createClient} = require("@supabase/supabase-js")
const supabaseUrl = 'https://rplgtmbudrvtzsvocdlr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGd0bWJ1ZHJ2dHpzdm9jZGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk2NDg0NjcsImV4cCI6MTk5NTIyNDQ2N30.hiDzv2C2v0a9tbZ8-fc5fbsqVds4rg2bpVS28gik0KI'
const supabase = createClient(supabaseUrl, supabaseKey)

//supabase.auth.session()._token.access_token = supabaseKey;

//Sign In function that takes a hardcorded email and password to sign in a user 
async function sign_in (log_result){
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test_user1@test.com',
        password: '123456',
    })
    // Checks if log_result is truthy and if it returns (null,undefined,etc...), wenn es truthy ist --> Data die vom API Benutzt wurden printen sowie den Error.
    if (log_result){
        console.log(data,error)
    }
}

// Eine Funktion mit Argumenten 'from und select'  from --> Tables selektieren, sekect -->
async function get_all_entrys (from,select){
    //data und error constant wurden benannt und man wartet auf supabase
    let { data, error } = await supabase
    //from --> Tables selektieren
    .from(from)
    // Select --> Columns returned in the query result
    .select(select)

    // If error = truthy, dann error printen, wenn nicht dann, return data
    if(error) {
        console.error(error)
        return error
    }
    return data
}
async function get_entrys_filtered (from,select,filter_field,filter_value){
    //data und error constant wurden benannt und man wartet auf supabase
    let { data, error } = await supabase
    //from --> Tables selektieren
    .from(from)
    // Select --> Columns returned in the query result
    .select(select)
    .eq(filter_field,filter_value)

    // If error = truthy, dann error printen, wenn nicht dann, return data
    if(error) {
        console.error(error)
        return error
    }
    return data
}

//Eine Funktion mit 3 parameters 'from,payload_dict,entry_id
async function update_entry (from,payload_dict,entry_id){
    let { data, error } = await supabase
    //Tables selektieren
    .from(from)
    //Inserts new data into the table
    .update(payload_dict)
    //Row im Table updaten mit der richtigen entry_id
    .eq("id",entry_id)

    //If Error = truthy, dann error printen und  error zurueckgeben
    if(error) {
        console.error(error)
        return error
    }
    //Return data if error isn't truthy
    return data
}

async function supabase_test (){
    // Sign In und log_result wurde als falsch "markiert" damit man reinkommt.
    await sign_in (false)
    //Ruft die get_all_entrys Funktion und ersetzt den "from" Argument mit 'Cart' und "select" mit "*" ruft alle Einträge aus der Tabelle 'Cart' ab 
    //und speichert das Ergebnis in der Variable carts.
    carts = await get_all_entrys('Cart','*')
    //Logt die Carts vom Nutzer
    console.log('Cart',carts)
    //Ruft die get_all_entrys Funktion und ersetzt den "from" Argument mit "Cart_Types" und "select " mit "*" 
    //ruft alle Einträge aus der Tabelle 'Cart_types' ab und speichert das Ergebnis in der Variablen cart_types.
    cart_types = await get_all_entrys('Cart_types','*')
    //Prints cart_types to the console
    console.log('Cart_types',cart_types)
    //Das Gleiche nur mit Product als "from" ersetzen und Eintraege aus der Tabelle "Products" abrufen und es in Variable "products" speichern.
    products = await get_all_entrys('Product','*')
    //Prints products to the console
    console.log('Product',products)

    //Payload Object with a hardcore price of 100(Als String!!!)
    payload={
        current_price: "100",
        //set to the current date and time
        last_updated: ((new Date()).toISOString()),
    }
    //Updates update_entry with "from" with "Product", payload_dict durch payload ersetzt und entry_id als"1"
    response = update_entry("Product",payload,"1")
    //Prints response to the console
    console.log('update response',response)
}



//Starts the function
//supabase_test ()
module.exports = {
    update_entry,
    get_all_entrys,
    sign_in,
    get_entrys_filtered
};