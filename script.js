const simpleGit = require('simple-git');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

// Initialize simple-git
const git = simpleGit();

// File path where the change will happen (You can customize this)
const filePath = path.join(__dirname, 'auto_change.txt');

// Function to make automated changes and commit them
async function makeAutomatedCommit(dateInput) {
  try {
    // If no date is provided, use today's date
    const date = dateInput || moment().format('YYYY-MM-DD');
    const commitMessage = `Automated commit for ${date}`;

    // Create or modify a file with automated content
    const fileContent = `Changes made on ${date} at ${moment().format('HH:mm:ss')}`;
    fs.writeFileSync(filePath, fileContent, { flag: 'w' }); // 'w' flag overwrites the file

    console.log(`File '${filePath}' has been updated.`);

    // Stage all changes
    await git.add('./*');

    // Commit changes with the provided date (or today's date if no date was given)
    await git.commit(commitMessage);

    // Force push changes to the remote repository (default is 'main', change if needed)
    await git.push('origin', 'main', { '--force': null }); // Force push

    console.log(`Commit made with message: "${commitMessage}" and forcefully pushed to remote repository.`);
  } catch (error) {
    console.error('Error during commit:', error);
  }
}

// Get the date input from the command-line arguments
const dateInput = process.argv[2];

// Run the automated commit function with the date input
makeAutomatedCommit(dateInput);
