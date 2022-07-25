const request = require('request');
const cheerio = require('cheerio');


// https://scrapeme.live/shop/
// https://enricbaltasar.com/

request('https://www.eldiario.es/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        // Save in var $ as if we were selecting from the DOM like with jQuery
        const $ = cheerio.load(html);

        // const sideHeading = $('.site-title');
        // console.log(sideHeading.text());

        // const menuItem = $('#menu-item-6338').find('a').text();
        // console.log(menuItem);

        // exp eldiario.es
        // const menuItem = $('#nav-carrousel').find('.item').text();
        // console.log(menuItem);

        output = $('#nav-carrousel').find('.item a');
        console.log(output.text());

        // index, element
        // $('.item a').each((i, el), () => {
        //     const item = $(el).text();
        //     const link = $(el).attr('href');
        //     console.log(link);
        // }); 

    }
});