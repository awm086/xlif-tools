import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import fs from 'fs';
import path from 'path';

// Define input and output directories and file paths
const inputDir = './csvs';
const outputFile = './csvs/merged.csv';

// Read all CSV files from the input directory
const csvFiles = fs.readdirSync(inputDir)
  .filter(file => file.endsWith('.csv'))
  .map(file => path.join(inputDir, file))
  .map(file => ({
    file,
    data: fs.readFileSync(file, 'utf-8')
  }));

// Define a set to store unique column names
const columnSet = new Set();

// Extract column data from each CSV file
const columnData = csvFiles.map(({ data }) => {
  const parsedData = parse(data);
  const headers = parsedData.length ? Object.keys(parsedData[0]) : [];

  // Add headers to the set of unique column names
  headers.forEach(header => columnSet.add(header));

  return parsedData;
});

// Define an array of unique column names
const columns = Array.from(columnSet);

// Merge the column data from each CSV file into a single array
const mergedData = columnData.reduce((merged, data) => {
  data.forEach((row, index) => {
    if (!merged[index]) {
      merged[index] = [];
    }
    merged[index] = [...merged[index], ...row];
  });
  return merged;
}, []);

// Define an array of arrays representing the output CSV data
const csvData = [
  ...mergedData,
];

// Convert the CSV data to a CSV string
const csvString = stringify(csvData);

// Write the CSV string to the output file
fs.writeFileSync(outputFile, csvString, 'utf-8');
console.log(`Merged CSV file saved to ${outputFile}`);
