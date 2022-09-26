const { exit } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let phonebook = [{name:"Otto Heiskanen", phoneNum:"0000000000"}]

function add_person() {
    let name = "";
    let phoneNum = ""; 
    rl.question('Lisättävän henkilön nimi: ', nameAns => {
        name = nameAns;
        rl.question('Lisättävän henkilön puhelinnumero: ', numAns => {
            phoneNum = numAns;
            phonebook.push({name:name, phoneNum:phoneNum});
            console.log(phonebook[phonebook.length-1]);
            
            return navigate();
        })
    })
}

function search_person() {
    rl.question('Haettavan henkilön nimi: ', nameAns => {
        return search_number(phonebook, nameAns)
    })
}

function search_number(arr, name) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toUpperCase() == name.toUpperCase()) {
            console.log("Henkilön "+name+ " numero on: " +arr[i].phoneNum);
            //return phoneBook[i].phoneNum;
        }
     }
     return navigate();
}

function exit_program() {
    process.exit(1);
}

function navigate() {
    console.log("1) Lisää uusi henkilö. \n 2) Etsi henkilöä. \n 3) Sulje ohjelma.")
    rl.question('Vastaus (1-3): ', ans => {
        if(ans == 1) {
            //rl.close();
            add_person();
        } else if(ans == 2) {
            search_person();
        } else if(ans == 3) {
            exit_program();
        } else {
            exit_program();
        }
    })
}

navigate();
