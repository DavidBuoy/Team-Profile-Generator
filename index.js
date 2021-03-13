
// External Package
const inquirer = require('inquirer');
const fs = require('fs');
const jest = require('jest');

// Internal Package
const Manager = require('./lib/Manager.js');
// const intern = require('./lib/Intern.js');
const Engineer = require('./lib/Engineer.js');
const Employee = require('./lib/Employee.js');

// I think I need this to store all the employees I add.
const employeesArray = [];


function StartApp(){
    newEmployee()
    // startHtml()
    
}
// Asking the questions I need to find a way to select the roles lib selection. I donte really get that part.
function newEmployee() {
    inquirer.prompt([{
        message: "Enter team member's name",
        name: "name"
    },
    {
        type: "list",
        name: "role",
        message: "Select team member's role",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        
    },
    {
        message: "Enter team member's id",
        name: "id"
    },
    {
        message: "Enter team member's email address",
        name: "email"
    }])
        .then(function ({ name, role, id, email }) {
            let roleQuestion = "";
            if (role === "Engineer") {
                roleQuestion = "GitHub Username";
            } else if (role === "Intern") {
                roleQuestion = "School Name";
            } else {
                roleQuestion = "Office hone number";
            }
            inquirer.prompt([{
                message: `Enter team member's ${roleQuestion}`,
                name: "roleQuestion"
            },
            {
                type: "list",
                message: "Would you like to add more team members?",
                choices: [
                    "yes",
                    "no"
                ],
                name: "moreMembers"
            }])
                .then(function ({ roleQuestion, moreMembers }) {
                    let newMember;
                    if (role === "Engineer") {
                        newMember = new Engineer(name, id, email, roleQuestion);
                    } else if (role === "Intern") {
                        newMember = new Intern(name, id, email, roleQuestion);
                    } else {
                        newMember = new Manager(name, id, email, roleQuestion);
                    }
                    employeesArray.push(newMember);
                    (newMember)
                        .then(function () {
                            if (moreMembers === "yes") {
                                newEmployee();
                            } else {
                                console.log("ALL DONE");
                            
                            }
                        });

                });
        });
}



const startHtml = (answers) => {
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="./src/style.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1 class="display-4">Welcome to the team ${member.name}</h1>
    </div>
</div>

<div class="container">
    <div class="row">
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">${answers.name}</h3>
            <h5 class="card-text">${answers.role}</h5>
            <hr />
            <p class="card-text">${answers.email}</p>
            <p class="card-text">${answers.id}</p>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">${answers.name}</h3>
            <h5 class="card-text">${answers.role}</h5>
            <hr />
            <p class="card-text">${answers.email}</p>
            <p class="card-text">${answers.id}</p>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">${answers.name}</h3>
            <h5 class="card-text">${answers.role}</h5>
            <hr />
            <p class="card-text">${answers.email}</p>
            <p class="card-text">${answers.id}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    fs.writeFile("./dist/team.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });

}






// const init = () => {
//     addMember().then((answers) => {
//         try {
//             const html = generateHTML(answers);

//             fs.writeFileSync('./dist/team-index.html', html);

//             console.log('Successfully wrote to team-index.html');
//         }
//         catch (error) {
//             console.log(error);
//         }
//     });
// };

// init();

StartApp();