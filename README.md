## Needed Dependencies
Install these 3 packages
`npm i mochawesome` // installing mochawesome first
`npm install mochawesome-report-generator` for the reports and  `npm i mochawesome-merge` to merge multiple reports together

we now need to update our cypress.json file with this new reporter we want to use via
{
    "reporter":"mochawesome",
    "reporterOptions": {
        "charts":true,
        "overwrite":false,
        "html":false,
        "json":true,
        "reportDir":"cypress/reports" 

    }
}


To run the command: `npx cypress run --reporter mochawesome` this would run all the test in your integration folder and will generate a report

## Merging multiple reports together

In events where we had to run tests for different test scripts and we generate different test results (mochawesome.json files), we can merge all the reports into a single report file via the command: `npx mochawesome-merge .\cypress\reports\*.json | out-file -encoding ascii ./combined.json` where reports is the name of the of the folder where the mochasome.json exists and *.json means we wanna merge all the files. combined .json is the name we give the file we want to store everything into.

Then we run the command to generate the html report: `npx marge .\combined.json --reportDir ./ --inline`

## Optimizing our commands

instead of always needing to write this long boring command everytime we wanna run the code `npx mochawesome-merge .\cypress\reports\*.json | out-file -encoding ascii ./combined.json` and `npx marge .\combined.json --reportDir ./ --inline`
, we can just go to our package.json file under the script section and create a json for it. e.g  
"merge_reports": "npx mochawesome-merge ./cypress/reports/*.json > ./combined.json",
"generator":"npx marge ./combined.json --reportDir ./ --inline"

Note: we replaced all \ with / inside the scripts part.

Now to run those command on terminal, we will just run: `npm run merge_reports` and `npm run generator` to merge the files and generate the html reports simultaneously

## Building a robost command to run our script
install rimraf via `npm install rimraf` then proceed to create a "pretest" key under scripts with the value `rimraf -r locationOfYourJsonReports` this command will be the first to run and it will remove all the previously generated .json file from the reports folder. So that a new / fresh report(.json file) is generated e.g    "pretest":"rimraf -r ./cypress/reports/*json"

Note pretest, test and posttest are keywords but we have to provide any value of our choice.

for the posttest, it is what should run after 'test' has ran. Here we used: `"posttest": "npm run merge_reports && npm run generator"` meaning we are calling and running merge_reports and generator. I used the and (&&) because I want `npm run merge_reports` to run then `npm run generator`  because if `npm run merge_reports` failed, we dont want to run `npm run generator`


  "test": "npm run cypress-run || npm run posttest", firstly, we want to generate the reports and we used npm run cypress-run , where cypress-run=> cypress run. This is equivalent to `npx cypress run --reporter mochawesome` that I ran independently. Then I called / ran posttest


  to run this project, use: `npm run test`.