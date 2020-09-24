/* 
Final Project: Create a grade book program without removing or modifying the HTML or CSS provided.
Requirements: 
    - You must be able to add an assignment that will be displayed in the container grid.
    - You must be able to remove an assignment that has already been displayed in the container grid.
    - The form should not submit unless all fields have been entered.
Extra Credit: 
    - Check for information that has been entered incorrectly, and either alert the user to fix this or properly format the data for the user.
    - Keep separate averages by subject, or try adding weighted grades based on assignment type.
Notes:
    - You may add any new features that you see fit, but ensure that any new changes meet the requirements above.
    - You may only add HTML and CSS if you are implementing new features not required. However, please add comments where these changes have been added in the code. Remember, do not remove or modify any prexisting HTML or CSS.
*/


//=== HTML helper Functions ===
//Provided an HTML id as id, this function will return the value within the HTML element.
function getValue(id) {
    return document.getElementById(id).value;
}

    //Provided a string as val and an HTML id as id, this function will set the value within a specified input element to the string provided.
function setValue(val, id) {
    document.getElementById(id).value = val;
}

    //Provided a string as val and an optional HTML id, this funcion will place the HTML string inside the specified HTML element. If no element is specified, it will default to container.
function updateHTML(val, id = 'container') {
    document.getElementById(id).innerHTML = val;
}

//UIController
const gradeController = (function(){
    //Grade constructor
    const Grade = function(id, subject, assignment, score){
        this.id = id;
        this.subject = subject;
        this.assignment = assignment;
        this.score = score;
    };
    //array of subjects
    const subjects = [];

    //data to hold all grades, 
    const data = {
        grades : [],
        avgPerSubject : [],
        gpa : 0
    };

    return {
        addAssignment : function(item){
            let newItem, id;

            if (data[grades].length > 0) {
                id = data[grades][data[grades].length - 1].id + 1;
              } else {
                id = 0;
              }

              newItem = new Grade(id, item.subject, item.assignment, item.score);
              data[grades].push(newItem);
              return newItem;
        },

        deleteAssignment: function (itemId) {
            let splitID, type, id;
      
            splitID = itemId.split("-");
            type = splitID[0];
            id = splitID[1];
      
            data[grades].splice(id, 1);
          },

          calcualteGPA : function(){

            //calcualte total score
             //1. calculate total score subject wise

            //calculate gpa  = total score / total subject

          }

    };

})();