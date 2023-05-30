const {By,Key,Builder,} = require("selenium-webdriver");

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

var path = require('chromedriver').path;
    
let service = new chrome.ServiceBuilder(path).build();
let options = new chrome.Options();
    options.addArguments('--headless=new')

const screen = {
    width: 800,
    height: 600
};

// Debug Prod List
let prod_url_list = [
    "https://www.amazon.de/Apple-MacBook-Pro-Chip-12%E2%80%91Core-CPU-19%E2%80%91Core-GPU/dp/B0BSHHBH3N/ref=sr_1_3?keywords=macbook+pro+m2&qid=1680021447&sprefix=macbook%2Caps%2C213&sr=8-3",
    "https://www.amazon.de/-/en/Fujitsu-Esprimo-Business-Computer-Refurbished/dp/B0854LM164/ref=sr_1_6?keywords=Mini-PC&qid=1679096312&sprefix=mini%2Caps%2C82&sr=8-6",
    "https://www.amazon.de/dp/B0BVR31MCC/ref=sspa_dk_detail_1?psc=1&pd_rd_i=B0BVR31MCC&pd_rd_w=UNrCZ&content-id=amzn1.sym.f63cb723-41a5-4d60-97aa-9969c9663073&pf_rd_p=f63cb723-41a5-4d60-97aa-9969c9663073&pf_rd_r=XX3YMA2P8KMCPCRSKH48&pd_rd_wg=EsBpH&pd_rd_r=567d9f75-f0e3-4e8e-88e3-cc13693e1257&s=computers&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw",
    "https://www.amazon.de/8-Thread-Raytracing-Computer-Garantie-7061/dp/B0B8ZWR5G6/ref=sr_1_5?__mk_de_DE=ÅMÅŽÕÑ&crid=1JGGC3DYAS9I1&keywords=pc&qid=1679923228&sprefix=pc%2Caps%2C119&sr=8-5",
]
// Crawl alternatives
var listTypes = [
    // XPaths
    '//*[@id="corePrice_feature_div"]/div/span/span[1]',
    '//*[@id="corePrice_feature_div"]/div/span/span[2]',
    '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span/span[1]', //BAD -> Last hope
    // Full Xpaths
    '/html/body/div[2]/div[2]/div[7]/div[5]/div[1]/div[2]/div/div[1]/div/div/div/form/div/div/div/div/div[2]/div[1]/div/span/span[1]',
    '/html/body/div[2]/div[2]/div[7]/div[5]/div[1]/div[2]/div/div[1]/div/div/form/div/div/div/div/div[2]/div[1]/div/span/span[1]',
    '/html/body/div[2]/div[2]/div[7]/div[5]/div[4]/div[11]/div[3]/div[1]/span/span[1]',//BAD -> Last hope

    '/html/body/div[4]/div[3]/div[4]/div[13]/div[4]/div[16]/div[3]/div[1]', // ???
];

// Helper Functions
function convert_text_currency (text){
    if (!text.includes("$")){ // Supporting only Euro
        text = text.replace("€","").replace(" ","")
        if (text.charAt(text.length-3) == "."){ // delimeter is .
            text = text.replace(",","")
        } else if (text.charAt(text.length-3) == ","){ // delimiter is ,
            text = text.replace(".","").replace(",",".")
        }
        return parseFloat(text) // string to float
    } else {return null}
}


async function grab_amazone (url){
    let driver = chrome.Driver.createSession(options, service);// Create new Session
    await driver.get(url);// go to Page
   
    // Collected Data
    var title = await driver.findElement(By.xpath('//*[@id="productTitle"]')).getAttribute("innerHTML")
    var price = null 
    
    for(var i = 0; i<listTypes.length; i++){ // Price Retriving
        try{
            let test_price = await driver.findElement(By.xpath(listTypes[i])).getAttribute("innerHTML")
            test_price = convert_text_currency(test_price)
            if(test_price){ // Prüft gegen null, nan, 0, false, "", undefined 
                price = test_price;
                break;
            }
            throw new Error('Price can not be converted to Number (is not a Number)');
        } catch(error){
            // Debug -> Replace with Logging
            console.log(error);
        }
    }

    // Resulting Data
    let rTitel = title // skipped further transformation
    let rPrice = price // skipped further transformation

    await driver.quit();
    return [rTitel, rPrice];
}

async function collect(all_products) {
    const products_updated = [];
    for (var product_original of all_products) {
        let url = product_original.url;
        var product = await grab_amazone(url); // Returns [rTitel, rPrice]
        product_original.title = product[0]
        product_original.current_price = product[1]
        product_original.last_updated= ((new Date()).toISOString())
        products_updated.push(product_original);
    }
    return products_updated;
  }
    
    //collect ()
    module.exports = {collect}