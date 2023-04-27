import fs from 'fs';
import path from 'path';
import { Parser } from 'xml2js';
import { stringify } from 'csv-stringify/sync';

const parser = new Parser();

const inputDir = './xlif';
const outputDir = './csvs';

// Get a list of all XLIFF files in the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(files);

  // Process each XLIFF file
  files.filter(file => file.endsWith('.xlf')).forEach(file => {
    console.log(file);

    const inputFile = path.join(inputDir, file);
    const outputFile = path.join(outputDir, `${file}.csv`);

    fs.readFile(inputFile, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      parser.parseString(data, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }

        const groups = result.xliff.file[0].body[0].group;
        const sourceLang = result.xliff.file[0].$['source-language'];
        const targetLang = result.xliff.file[0].$['target-language'];

        const csvData = groups.map(unit => ({
          [sourceLang]: unit["trans-unit"][0].source,
          [targetLang]: unit["trans-unit"][0].target,
        }));

        // Define the CSV headers as an array of strings
        const csvHeaders = [sourceLang, targetLang];

        // Map the CSV data array to an array of arrays, where each inner array contains the values for each row
        const csvRows = csvData.map(row => [
          row[sourceLang][0]._,
          row[targetLang][0]._,
        ]);

        // Combine the CSV headers and rows into a single array of arrays
        const csvArray = [csvHeaders, ...csvRows];

        // Convert the array to a CSV string
        const csvString = stringify(csvArray);

        fs.writeFile(outputFile, csvString, err => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(`CSV file saved to ${outputFile}`);
        });
      });
    });
  });
});
