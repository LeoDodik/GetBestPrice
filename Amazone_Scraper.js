const {By,Key,Builder,} = require("selenium-webdriver");

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

var path = require('chromedriver').path;
    
let service = new chrome.ServiceBuilder(path).build();
let options = new chrome.Options()
    options.addArguments('--headless=new')

let prod_url_list = [
    "https://www.amazon.de/-/en/Fujitsu-Esprimo-Business-Computer-Refurbished/dp/B0854LM164/ref=sr_1_6?keywords=Mini-PC&qid=1679096312&sprefix=mini%2Caps%2C82&sr=8-6",
    "https://www.amazon.de/dp/B0BVR31MCC/ref=sspa_dk_detail_1?psc=1&pd_rd_i=B0BVR31MCC&pd_rd_w=UNrCZ&content-id=amzn1.sym.f63cb723-41a5-4d60-97aa-9969c9663073&pf_rd_p=f63cb723-41a5-4d60-97aa-9969c9663073&pf_rd_r=XX3YMA2P8KMCPCRSKH48&pd_rd_wg=EsBpH&pd_rd_r=567d9f75-f0e3-4e8e-88e3-cc13693e1257&s=computers&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw",
]

const screen = {
    width: 800,
    height: 600
  };



async function grab_amazone (url){
    // Create new Session
    let driver = chrome.Driver.createSession(options, service);
    // go to Page
    await driver.get(url);
    // get information
    var title = await driver.findElement(By.xpath('//*[@id="productTitle"]')).getAttribute("innerHTML")
    var price = await driver.findElement(By.xpath('//*[@id="corePrice_feature_div"]/div/span/span[2]')).getAttribute("innerHTML")
    
    // work with Information
    let rTitel = title
    // Converting value with Currency to Float (deciimal seperator is , )
    // Number(price.replace(/[^0-9.-]+/g,""));
    let rPrice = Number(price.replace(/[^0-9.-]+/g,""))
    
    // replace with post request 
    console.log('Title is:',rTitel);
    console.log('Price is:',rPrice);
    await driver.quit();
}

async function collect (){
    for (const url of prod_url_list) {
        console.log(url);
        await grab_amazone(url);
    }
}

collect ()


