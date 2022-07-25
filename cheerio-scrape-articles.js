// Scraping
const request = require('request');
const cheerio = require('cheerio');

// Convert to CSV
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// Write headers
writeStream.write(`Title,Link,Date \n`);

// Make request
request('https://enricbaltasar.com/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        // Save in var $ as if we were selecting from the DOM like with jQuery
        const $ = cheerio.load(html);

        $('.post').each((i, el) => {
            const title = $(el)
              .find('.excerpt-title')
              .text()
              .replace(/\s\s+/g, ''); // regex to remove all whitespace
            const link = $(el)
              .find('a')
              .attr('href');
            const date = $(el)
                .find('.entry-meta-top')
                .text()
                .replace(/\s\s+/g, '')
                .replace(/Published /g, '');

            // Write row to CSV
            writeStream.write(`${title}, ${link}, ${date} \n`);
        });

        console.log('Scraping done.');
    }
});