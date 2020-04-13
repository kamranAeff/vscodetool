import { Person } from "./Person";

$(document).ready(function () {
    let person = new Person();

    person.id = 1;
    person.name = 'Kamran';
    person.surname = 'A-eff';

    console.log(person);
});