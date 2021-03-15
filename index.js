// External Package
const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');

// Internal Package
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');



// I think I need this to store all the employees I add.
const teamMembers = [];

// 
function startApp() {
    writeHTML()
    newEmployee()
}


// Asking the questions I need to find a way to select the roles lib selection. I donte really get that part.
function newEmployee() {



    inquirer.prompt([{

        message: "Please enter your team member's name.",
        name: "name"
    },
    {
        type: "list",
        name: "role",
        message: "Please select your team member's role.",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],

    },
    {
        message: "Please enter your employees ID number.",
        name: "id"
    },
    {
        message: "Please enter your team members email address.",
        name: "email"
    }])

        // Rolequestion is an opent strig that allows the user input to fill in. 
        .then(function ({ name, role, id, email }) {
            let roleInfo = "";
            if (role === "Engineer") {
                roleInfo = "GitHub username.";
            } else if (role === "Intern") {
                roleInfo = "school name they attended.";
            } else {
                roleInfo = "office phone number.";
            }
            inquirer.prompt([{
                message: `Enter team member's ${roleInfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: chalk.yellow("Would you like to enter another team member?"),
                choices: [
                    "Yes",
                    "No"
                ],
                name: "moreMembers"
            }])
                .then(function ({ roleInfo, moreMembers }) {
                    let newMember;

                    if (role === "Engineer") { newMember = new Engineer(name, id, email, roleInfo); }

                    else if (role === "Intern") { newMember = new Intern(name, id, email, roleInfo); }

                    else  {
                        newMember = new Manager(name, id, email, roleInfo);
                    }


                    teamMembers.push(newMember);
                    WriteHtmlBodyPlease(newMember)
                        .then(function () {

                            if (moreMembers === "Yes") { newEmployee(); }

                            else {
                                finishHtml();
                            }
                        });
                });
        });
}


// Writes the head portion of the HTML and Displays the team name. 
function writeHTML() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

                <!-- THIS LINKS THE CSS -->
        <link rel="stylesheet" href="./style/style.css">
                <!-- THIS LINKS THE FONT AWESOME -->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
        
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
<body>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1 class="display-4">Team Profile</h1>
    </div>
</div>
<div class="container">
    <div class="row">`;

    fs.writeFile("./dist/team-index.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });

};

function WriteHtmlBodyPlease(employeeInfo) {
    return new Promise(function (resolve, reject) {
        
        const name = employeeInfo.getName();
        const role = employeeInfo.getRole();
        const id = employeeInfo.getId();
        const email = employeeInfo.getEmail();
        let data = "";

        if (role === "Engineer") {
            const gitHub = employeeInfo.getGitHub();
            data =
                `<div class="col-sm-4 ">
                    <div class="card">
                    <div class="card-body engineer">
                        <h2 class="card-title">${name}</h2>
                        <h4 class="card-text">${role}</h4>
                        <hr />
                        <p class="card-text">${name}'s ID Number: ${id}</p>
                        <p class="card-text">${name}'s Github User name: ${gitHub}</p>
                        <p class="card-text">${name}'s Email: ${email}</p>
                        
                    </div>
                    </div>
                </div>`;

        } else if (role === "Intern") {
            const school = employeeInfo.getSchool();
            data = `<div class="col-sm-4 ">
                    <div class="card">
                    <div class="card-body intern">
                        <h2 class="card-title">${name}</h2>
                        <h4 class="card-text">${role}</h4>
                        <hr />
                        <p class="card-text">${name}'s ID Number: ${id}</p>
                        <p class="card-text">${name}'s school they attended: ${school}</p>
                        <p class="card-text">${name}'s Email: ${email}</p>
                        
                    </div>
                    </div>
                </div>`;

        } else {
            const phone = employeeInfo.getOfficeNumber();
            data = `<div class="col-sm-4 ">
                    <div class="card">
                    <div class="card-body manager">
                        <h2 class="card-title">${name}</h2>
                        <h4 class="card-text">${role}</h4>
                        <hr />
                        <p class="card-text">${name}'s ID Number: ${id}</p>
                        <p class="card-text">${name}'s phone number ${phone}</p>
                        <p class="card-text">${name}'s Email: ${email}</p>
                        
                    </div>
                    </div>
                </div>`

        };
        fs.appendFile("./dist/team-index.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
};
//  Writes the ending tags for the HTML
function finishHtml() {
    const html = ` </div>
    </div>
    
        </body>
        </html>`;

    fs.appendFile("./dist/team-index.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log(chalk.green("Please check the dist folder for team-index.html!"));
};

startApp();
