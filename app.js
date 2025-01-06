// const jsonfile = require('jsonfile');
// const moment = require('moment');
// const simpleGit = require('simple-git');
// const fs = require('fs');

// const FILE_PATH = './data.json';

// const DATE = moment().format();

// const data = {
//     date: DATE
// };

// jsonfile.writeFile(FILE_PATH, data, { spaces: 2 }, (err) => {
//     if (err) {
//         console.error('Error writing to file:', err);
//         return;
//     }

//     console.log(`Data written to ${FILE_PATH} with date: ${DATE}`);

//     // Commit and push the changes
//     simpleGit()
//         .add([FILE_PATH])
//         .commit(DATE, { '--date': DATE })  // Commit with the current date
//         .push()
//         .then(() => {
//             console.log(`Commit for date (${DATE}) pushed to the repository.`);
//         })
//         .catch((err) => {
//             console.error('Error during commit or push:', err);
//         });
// });




const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

// Initialize the git instance
const git = simpleGit();

// Function to generate a random date between today and the same day last year
function getRandomDate() {
    const start = moment().subtract(1, 'year');  // Start date: 1 year ago
    const end = moment();  // End date: today

    // Generate a random number of days between the start and end date
    const randomDay = Math.floor(Math.random() * (end.diff(start, 'days') + 1));

    // Return a random date in the range
    return start.add(randomDay, 'days').format();
}

// Function to make automated commits
async function makeAutomatedCommits() {
    for (let i = 0; i < 300; i++) {
        // Get a random date
        const commitDate = getRandomDate();

        // Prepare the data for the JSON file
        const data = {
            date: commitDate
        };

        // Write the data to the file
        try {
            await jsonfile.writeFile(FILE_PATH, data, { spaces: 2 });
            console.log(`Data written to ${FILE_PATH} with date: ${commitDate}`);
        } catch (err) {
            console.error('Error writing to file:', err);
            continue;
        }

        // Commit and push the changes
        try {
            await git.add([FILE_PATH]);
            await git.commit(commitDate, { '--date': commitDate });
            await git.push();
            console.log(`Commit for ${commitDate} pushed to the repository.`);
        } catch (err) {
            console.error('Error during commit or push:', err);
        }
    }
}

// Run the automated commit function
makeAutomatedCommits();
