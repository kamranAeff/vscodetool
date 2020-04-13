/* *** Developed by Kamran A-eff *** */

class Person {
    id: number;
    name: string;
    surname: string;
}

$(document).ready(function () {
    let person = new Person();

    person.id = 1;
    person.name = 'Kamran';
    person.surname = 'A-eff';

    console.log(person);
});
