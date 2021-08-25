/* page link -> getData.js
                    1. iterate over every job tile
                    2. scrape data from every tile
                    3. data -> createXLSX.js
*/
let cheerio = require('cheerio');
let addToFile = require('./createXLSX');
let content = [];


// this will scrape data from each tile of the list
function getallData(html) {
    let searchTool = cheerio.load(html);
    // Arrays of job tiles
    let jobTile = searchTool('.job_seen_beacon');

    for (let i = 0; i < jobTile.length; i++) {
        // postion
        let name = searchTool(jobTile[i]).find('.jobTitle.jobTitle-color-purple').text();

        // Package
        let package = searchTool(jobTile[i]).find('.salary-snippet').text();
        if (package.length == 0) package = 'Not Available';

        // comapny name
        let companyName = searchTool(jobTile[i]).find('span.companyName').text();

        // company location
        let companyLocation = searchTool(jobTile[i]).find('.companyLocation').text().trim();

        // job description
        let jobDescription = searchTool(jobTile[i]).find('.job-snippet li').text().trim();
        if (jobDescription.length == 0) jobDescription = 'Not Available';

        // object of data
        let obj = {
            company_Name: companyName,
            company_Location : companyLocation,
            Position: name,
            package_offered: package,
            job_description: jobDescription,
        }
        // append objects -> array
        content.push(obj);
    }

    if (content.length >= 67) addToFile.appendFn(content);
}

module.exports = {
    data: getallData
}