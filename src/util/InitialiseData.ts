import fs from "fs";
let csvToJson = require('convert-csv-to-json');

const csvFile = 'sphere-sample-data.csv';
const outputFile = 'sphere-sample-data.json';

(async () => {
    try {
        if(!fs.existsSync(outputFile)||fs.statSync(outputFile).size === 0){
            csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(csvFile,outputFile);
        }
    } catch (error) {
        console.error(error);
    }
})();

