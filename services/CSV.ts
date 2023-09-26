import * as fs from 'fs';
import {stringify, parse} from 'csv';

function validateFileContent(inputFileName) {
    let step1OutputFileName = inputFileName.replace('.csv', `_${Date.now()}_step_1.csv`);
    let step2OutputFileName = step1OutputFileName.replace('step_1', 'step_2');
    validateFileSyntax(inputFileName, step1OutputFileName);

    const fileContent = fs.readFileSync(step1OutputFileName);
    let step2OutputFileContent = [];

    parse(
        fileContent,
        {
            bom: true,
            encoding: 'utf8',
            delimiter: ',',
            escape: '"',
            columns: true,
            skip_empty_lines: true,
            trim: true
        },
        function(err, data) {
            if(err) {
                console.log("...err: ", err);
            } else {
                for (const record of data) {
                    if(validateEmail(record['Primary Email'])) {
                        step2OutputFileContent.push(Object.values(record));
                    }
                }
                stringify(
                    step2OutputFileContent,
                    {
                        header: true,
                        columns: Object.keys(data[0]) ,
                        bom: true,
                        encoding: 'utf8',
                        delimiter: ',',
                        escape: '"',
                        quoted_string: true,
                        quoted_empty: true
                    },
                    function (err, output) {
                        if (err) throw err;
                        fs.writeFile(step2OutputFileName, output, (err) => {
                            if (err) throw err;
                            console.log('Done !!!');
                        });
                    }
                );
            }
        }
    );
}

function validateFileSyntax(inputFileName, outputFileName) {
    const fileContent = fs.readFileSync(inputFileName);

    let result = fileContent.toString().replace(/\"(\r?\n|\r)\"/g, "\"ATHANH\"")
    result = result.replace(/(\r?\n|\r)/g, "")
    result = result.replace(/\"ATHANH\"/g, "\"\n\"")

    fs.writeFileSync(outputFileName, result);
}

function validateEmail(email) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
}

// validateFileContent('raw_data.csv');
// validateFileContent('raw_data.csv', `output_${Date.now()}.csv`);
// console.log("validateEmail: ", validateEmail(""))
