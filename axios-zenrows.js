const axios = require('axios');

const fs = require('fs');
const writeStream = fs.createWriteStream('manchestereveningnews.csv');

const apiKey = 'XXXXXXX';
const urlToScrape = 'https://www.manchestereveningnews.co.uk/sport/football/';
const cssExtractor = "{\"title\":\".teaser a\",\"link\":\".teaser a @href\"}"

writeStream.write(`Title,Link \n`);

axios({
	url: `https://api.zenrows.com/v1/?apikey=${apiKey}&url=${urlToScrape}&css_extractor=${cssExtractor}`,
	method: 'GET'
})
    .then(response => {
        // Get results in arrays and store in variables
        const resultsTitle = response.data.title.filter(element => {
            return element !== '';
        });
        const resultsLink = response.data.link;
        console.log('Scraping completed and empty strings removed.');

        // Pair results in multidimensional nested arrays
        let pairedResults = [];
        for ( let i = 0; i < resultsTitle.length; i++ ) {
            pairedResults.push( [ resultsTitle[i], resultsLink[i] ] );
        };

        // Write CSV
        pairedResults.forEach((element) => {
            writeStream.write('"' + element[0] + '",' + element[1] + '\n');

          });
        console.log('Results saved in CSV.');
    })
    .catch(error => console.log(error));
