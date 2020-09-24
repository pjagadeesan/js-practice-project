// 1. Write a function that would allow you to do this:
const exercise = activity => {
    return () => {
        return `Today's exercise: ${activity}`;
    }
}
var run = exercise('running');
console.log(run()); // prints "Today's exercise: running"
var swim = exercise('swimming');
console.log(swim()); // prints "Today's exercise: swimming"

// 2. Write a function that would allow you to do this:
const cutPizzaSlices = slice => {
    return (person) => {
        return `Each person gets ${(slice/person).toFixed(2)} slices of pizza`;
    }
}
var sharePizza = cutPizzaSlices(8);
console.log(sharePizza(2)); // prints "Each person gets 4.00 slices of pizza"
console.log(sharePizza(3)); // prints "Each person gets 2.67 slices of pizza"


// Bonus - Data Security: Inside of a closure, create an object called pii (Personally Identifiable Information)
//        that cannot be accessed directly. The object should have at least two properties: name and ssn.
//        Only the name property should be accessible, and it should be called through a public function.
//        The ssn property should not be accessible at all.

//        Creating private objects and private properties helps you control who has access to what data and helps you
//        prevent people who shouldn't see important info like social security numbers from getting access to the data.
//        You can use 'getName' or other get methods to access data that people might need. For example, people
//        addressing a package or email may need a customer's name, but they definitely shouldn't have access to their ssn.

function employeeData(){
    var person = {
        name: 'John',
        ssn: '333-XXX-000'
    }
    var getName = function() {
        return person.name;
    }
    return getName;
}
var empName= employeeData();
console.log(empName());
