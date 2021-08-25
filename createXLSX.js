/* data -> createXLSX.js
                    1. create workbook
                    2. create worksheet && convert JSON(data) to sheet's format
                    3. append that data into the workbook
                    4. write workbook data into xlsx file
*/
let xlsx = require('xlsx');


function appendFile(content) {
    // create new workbook
    let wb = xlsx.utils.book_new();
    // create new worksheet && convert JSON to sheet
    let ws = xlsx.utils.json_to_sheet(content);
    // append data -> sheet
    xlsx.utils.book_append_sheet(wb, ws, "Indeed");
    // write workbook data into file(if already present it'll get replaced)
    xlsx.writeFile(wb, "jobSearch.xlsx");
}


module.exports = {
    appendFn: appendFile
}