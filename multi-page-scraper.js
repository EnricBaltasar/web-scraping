const axios = require('axios'); 
const cheerio = require('cheerio'); 

const extractContent = $ =>  {
	$('.product') 
		.map((_, product) => { 
			const $product = $(product); 
			return { 
				id: $product.find('a[data-product_id]').attr('data-product_id'), 
				title: $product.find('h2').text(), 
				price: $product.find('.price').text(), 
			}; 
		}) 
		.toArray(); 

    const content = extractContent($); 
    console.log(content); 
// [{ id: '759', title: 'Bulbasaur', price: '£63.00' }, ...]
    }

const extractLinks = $ => [ 
	new Set( 
		$('.page-numbers a') // Select pagination links 
			.map((_, a) => $(a).attr('href')) // Extract the href (url) from each link 
			.toArray() // Convert cheerio object to array 
	), 
]; 
 
axios.get('https://scrapeme.live/shop/').then(({ data }) => { 
	const $ = cheerio.load(data); // Initialize cheerio 
	const links = extractLinks($); 
 
	console.log(links); 
	// ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ] 
});




