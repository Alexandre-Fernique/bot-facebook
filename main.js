const dotenv = require('dotenv');
dotenv.config()
const puppeteer = require('puppeteer');
const fs = require('fs');


async function addReaction(page, message) {
    try {
        if (await message.$('[alt="🍆"]')) {
            /*console.log('Aubergine reaction found');*/
        }else {
            await message.hover()
            await message.waitForSelector('[aria-label="Réagir"]')
            const reaction = await message.$('[aria-label="Réagir"]')
            await reaction.click({button:'left',delay: 100})
            await page.waitForSelector("[aria-label='Réactions aux messages']")
            const barre_message = await page.$('[aria-label="Réactions aux messages"]')
            await (await barre_message.$('[tabindex="0"]')).click()
        }
    } catch (error) {
        console.log(error)
    }
}

(async () => {
    const browser = await puppeteer.launch({
        headless: process.env.HEADLESS |"true",
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 900
    })
    try {
        const cookies = JSON.parse(fs.readFileSync('./cookies.json', 'utf8'));
        for (const cookie of cookies) {
            await page.setCookie(cookie);
        }
        await page.goto('https://www.messenger.com',{waitUntil: 'networkidle0'});
        console.log('Connected to messenger')
    }catch (error) {
        await page.goto('https://www.messenger.com',{waitUntil: 'networkidle0'});
        console.log('Not Connected to messenger')
        const email_field = await page.$('#email');
        await email_field.type(process.env.EMAIL);
        const password_field = await page.$('#pass');
        await password_field.type(process.env.PASSWORD);
        await (await page.$('[type="checkbox"]')).click();
        const button_login = await page.$('#loginbutton');
        await button_login.click();
        await page.waitForNetworkIdle()
    }


    try {
        fs.writeFileSync('cookies.json', JSON.stringify(await page.cookies()))
        console.log('Cookies saved')
    }catch (error) {
        console.log('Cookies not saved')
    }

    await page.goto('https://www.messenger.com/new',{waitUntil: 'networkidle0'});

    while (true){
        try {
            await page.waitForSelector(".hnhda86s", {timeout: 0})
            const test = await page.$(".hnhda86s")
            await test.click()
            console.log("Message detected")
            await page.waitForSelector("[data-testid=message-container]")
            await page.waitForTimeout(2000)
            const message = await page.$$("[data-testid=message-container]")
            for (let i = 0; i < message.length; i++) {
                await addReaction(page, message[i])
            }
            await page.goto('https://www.messenger.com/new')
        }catch (error) {
            console.log(error)
        }


    }
})();



