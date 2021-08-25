let request = require('request');
let cheerio = require('cheerio');
let data = require('./getData');

let url = 'https://in.indeed.com/jobs?q=software%20developer&l=';
request(url, cb);


function cb(error, response, html) {
    if (error) console.log(error);
    else if (response.statusCode == 404) console.log('Page not found');
    else getPages(html);
}

// this will get all the pages of url to scrape data
function getPages(html) {
    let st = cheerio.load(html);
    let pages = st('ul.pagination-list a');

    // for first page
    request(url, cb1);
    for (let i = 0; i < pages.length - 1; i++) {
        // Page  links from 2nd page to pages.length - 1
        let pageLink = st(pages[i]).attr('href').trim();

        // create new page link
        let nextPageLink = `https://in.indeed.com${pageLink}`;
        request(nextPageLink, cb1);
    }
}
console.log('Scraping data...');
function cb1(error, response, html) {
    if (error) console.log(error);
    else if (response.statusCode == 404) console.log('Page not found');
    else {
        data.data(html);
    }

}