
# xlif-tool

The xlif-tool  simplifies the process of creating a comprehensive CSV file containing all XLIFF translations. The tool generates a CSV file that includes both the source and target languages, making it easier to review and portable to import into different environments.

For instance, suppose you have an XLIFF file for translating a piece of content from Drupal. In that case, the resulting files will have the following format:

```
fileName_en_es.xlf
fileName_en_zh.xlf
fileName_en_ar.xlf
```

Each file contains the content translation from the source to the target language. By using a simple node script, the xlif tool creates a CSV file for all the languages, which can be easily reviewed and used as a standard format when translations are exported from non-production environments.

## Usage

To use the tool, follow the instructions below:

1. Install the dependencies using `npm i`.
2. Place all the XLIFF files in the `./xlif` directory. The files should be named using the following format:

   ```
   ./xlif/fileName_en_es.xlf
   ./xlif/fileName_en_zh.xlf
   ./xlif/fileName_en_ar.xlf
   ```

   Each file should contain the content translation from the source to the target language.

3. Run `npm run create-csv`. This will create CSV files for each language and a `merged.csv` file with all the content in the `./csvs` directory.

## Contributing

Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)