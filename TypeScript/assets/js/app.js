var Person = (function () {
    function Person() {
    }
    return Person;
}());
$(document).ready(function () {
    var person = new Person();
    person.id = 1;
    person.name = 'Kamran';
    person.surname = 'A-eff';
    console.log(person);
});
