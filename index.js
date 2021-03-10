
// External Package
const inquirer = require('inquirer');
const fs = require('fs');
const jest= require('jest');

// Internal Package
const manager = require('./lib/Manager.js');
const intern = require('./lib/Intern.js');
const engineer = require('./lib/Engineer.js');


const questions = () =>
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What is the current role of your employee?',
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the FIRST and LAST name of your Employee?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employees ID Number?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your employees Email?',
        },
        

    ]);



const init = () => {
    questions().then((answers) => {
        try {
            const html = manager(answers);

            fs.writeFileSync('team-index.html', html);

            console.log('Successfully wrote to team-index.html');
        }
        catch (error) {
            console.log(error);
        }
    });
};


init();
