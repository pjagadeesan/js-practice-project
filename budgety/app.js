/*

SECTION 6 - BUDGET APP

In section 6 you built a budget app - but there are still some things that can be improved.
You can complete this problem in your own project files or you can copy and paste your JS in here and work in codepen.

1. The formatNumber function adds a comma to numbers that are four digits or more, however, it breaks down if a number is seven digits or more. Improve the function so that it deals with numbers of any length and inserts commas in all the correct places.
E.g. if the number 1234567890 is entered, 1,234,567,890 should be displayed.

2. The default value for the available budget shows up as '- 0.00'. Adjust it so that it displays '0.00' by default instead.

3. Alert the user if they are over budget (if available budget is less than zero). You can choose how you want to accomplish this.

4. Alert the user if they are making a mistake on their entry (like not entering a description) and inform them of what their mistake was.

5. CHALLENGE QUESTION - NOT REQUIRED: Add in functionality so that a user can edit an existing item including the ability to change an income to an expense.

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

SECTION 7 - ES6

Refactor and simplify portions of your code by using ES6 syntax.
At a minimum, find a way to incorporate:

* Let and const variable declarations
* String syntax
* Arrow functions
* Destructuring
* New array functions
* Classes

EXTRA: find a way to incorporate these as well:
* New string functions
* Spread operator / rest parameters
* Maps

*/

//Budget controller module - IIFE
const budgetController = (function () {
  //Income Constructor
  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //Expense Contructor
  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  //data to hold all incomes, expenses, total income, total expenses, budget
  const data = {
    inc: [],
    exp: [],
    totals: {
      inc: 0,
      exp: 0,
    },
    budget: 0,
    percentage: -1,
  };

  const calculateTotal = function (type) {
    let sum = 0;
    data[type].forEach((el) => {
      sum += el.value;
    });
    data.totals[type] = sum;
  };

  //addItem to data
  return {
    addItem: function (item) {
      let newItem, ID;

      if (data[item.type].length > 0) {
        ID = data[item.type][data[item.type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (item.type === "inc") {
        newItem = new Income(ID, item.description, item.value);
      } else {
        newItem = new Expense(ID, item.description, item.value);
      }
      data[item.type].push(newItem);

      //return newItem
      return newItem;
    },

    deleteItem: function (itemId) {
      let splitID, type, id;

      splitID = itemId.split("-");
      type = splitID[0];
      id = splitID[1];

      data[type].splice(id, 1);
    },

    calculateBudget: function () {
      //calcualte total
      calculateTotal("inc");
      calculateTotal("exp");
      // calcualte budget
      data.budget = data.totals.inc - data.totals.exp;

      //calculate percentage of income spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBugdet: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },

    calculatePercentages: function () {
      let percentage;
      data["exp"].forEach((expense) => {
        if (data.totals.inc > 0) {
          expense.percentage = Math.round(
            (expense.value / data.totals.inc) * 100
          );
        } else {
          expense.percentage = -1;
        }
      });
    },

    getPercentages: function () {
      let percentages = data.exp.map(function (cur) {
        return cur.percentage;
      });
      return percentages;
    },
  };
})();

//UI Controller
const UIConroller = (function () {
  const DOMStrings = {
    addButton: ".add__btn",
    inputValue: ".add__value",
    inputDescription: ".add__description",
    inputType: ".add__type",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    expensePercentage: ".item__percentage",
    budgetValue: ".budget__value",
    totalIncome: ".budget__income--value",
    totalExpense: ".budget__expenses--value",
    percentageValue: ".budget__expenses--percentage",
    container: ".container",
    titleMonth: ".budget__title--month",
  };

  const formatNumber = function () {
    //4566666.99987  -- > 4,566,666.99
    let num, numSplit, int, dec, result, sign;

    if (arguments.length === 1 && arguments[0] === 0) {
      return "0.00";
    }
    //saving the sign for budget value
    sign = Math.sign(arguments[0]);

    num = Math.abs(arguments[0]);
    num = num.toFixed(2);
    numSplit = num.split(".");

    int = numSplit[0];
    for (let i = int.length - 3; i > 0; i = i - 3) {
      int = int.slice(0, i) + "," + int.slice(i);
    }
    dec = numSplit[1];

    if (arguments.length > 1) {
      result = (arguments[1] === "exp" ? "-" : "+") + " " + int + "." + dec;
    } else {
      result = (sign >= 0 ? "+" : "-") + " " + int + "." + dec;
    }
    return result;
  };

  return {
    getInput: function () {
      return {
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
        description: document.querySelector(DOMStrings.inputDescription).value,
        type: document.querySelector(DOMStrings.inputType).value,
      };
    },

    //display month
    displayMonth: function () {
      let date, curMonth;

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      date = new Date();

      curMonth = months[date.getMonth()];
      document.querySelector(DOMStrings.titleMonth).textContent = curMonth;
    },
    //add item to UI
    addListItem: function (obj, type) {
      let html, newHtml, element;

      if (type === "inc") {
        element = DOMStrings.incomeContainer;
        html =
          `<div class="item clearfix" id="inc-${obj.id}">` +
          `<div class="item__description">${obj.description}</div>` +
          '<div class="right clearfix">' +
          `<div class="item__value"> ${formatNumber(obj.value, type)}</div>` +
          '<div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>' +
          "</div></div>";
      } else if (type === "exp") {
        element = DOMStrings.expenseContainer;
        html =
          `<div class="item clearfix" id="exp-${obj.id}">` +
          `<div class="item__description">${obj.description}</div>` +
          `<div class="right clearfix"><div class="item__value"> ${formatNumber(
            obj.value,
            type
          )}</div>` +
          '<div class="item__percentage">21%</div><div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      document.querySelector(element).insertAdjacentHTML("beforeend", html);
    },

    //delete item
    deleteListItem: function (itemId) {
      const element = document.getElementById(itemId);
      element.parentNode.removeChild(element);
    },

    //clear fields
    clearFields: function () {
      let fields = document.querySelectorAll(
        DOMStrings.inputDescription + " ," + DOMStrings.inputValue
      );

      fields.forEach((field) => {
        field.value = "";
      });

      fields[0].focus();
    },

    //display budget
    displayBudget: function (obj) {
      document.querySelector(DOMStrings.budgetValue).textContent = formatNumber(
        obj.budget
      );
      document.querySelector(DOMStrings.totalIncome).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(
        DOMStrings.totalExpense
      ).textContent = formatNumber(obj.totalExp, "exp");

      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageValue).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMStrings.percentageValue).textContent = "---";
      }
    },

    //display percentages for each expense
    displayPercentages: function (percentages) {
      const expPercentages = document.querySelectorAll(
        DOMStrings.expensePercentage
      );

      expPercentages.forEach(function (cur, index) {
        cur.textContent = percentages[index] + "%";
      });
    },
    getDOMStrings: function () {
      return DOMStrings;
    },
  };
})();

//App Controller
const appController = (function (budgetCntl, UICntl) {
  //set up event listener
  const setUpEventListener = function () {
    //set up eventlisteners
    const DOM = UICntl.getDOMStrings();

    document
      .querySelector(DOM.addButton)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  };

  const updateBudget = function () {
    let budget;
    //calculate budget
    budgetCntl.calculateBudget();
    //get budget
    budget = budgetCntl.getBugdet();

    //display budget
    UICntl.displayBudget(budget);
  };

  //Update percentages for expenses
  const updatePercentage = function () {
    //calculate percentage
    budgetCntl.calculatePercentages();

    //get percentage
    const percentages = budgetCntl.getPercentages();

    //display percentage
    UICntl.displayPercentages(percentages);
  };

  const ctrlDeleteItem = function (event) {
    //delete item from budget data
    const itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    budgetCntl.deleteItem(itemId);

    //delete item from UI
    UICntl.deleteListItem(itemId);

    //update budget
    updateBudget();

    //update percentages
    updatePercentage();
  };

  const alertUser = function (message) {
    const validationMessages = new Map();
    validationMessages.set("desc", "Please enter a valid description");
    validationMessages.set("value", "Please enter a valid value");
    validationMessages.set("overBudget", "Budget limit exceeded!!");
    alert(validationMessages.get(message));
  };
 
  const validateInput = function (input) {
    let isValid;

    if (
      input.description !== "" &&
      input.description !== undefined &&
      !isNaN(input.value) &&
      input.value > 0
    ) {
      isValid = true;
    } else if (input.description === "" || input.description === undefined) {
      isValid = false;
      alertUser("desc");
    } else if (isNaN(input.value) || input.value <= 0) {
      isValid = false;
      alertUser("value");
    }
    return isValid;
  };

  const ctrlAddItem = function () {
    let input, newItem, data;
    //get input
    input = UICntl.getInput();

    if (validateInput(input)) {
      //alert user for over budget
      data = budgetCntl.getBugdet();
      if (input.type === "exp" && data.budget - input.value < 0) {
        alertUser("overBudget");
      }

      //add item to the budget controller
      newItem = budgetCntl.addItem(input);

      //add income and expense to UI
      UICntl.addListItem(newItem, input.type);

      //clear fileds
      UICntl.clearFields();

      //displayBudget
      updateBudget();

      //update percentage for expense
      updatePercentage();
    }
  };

  return {
    initApp: function () {
      console.log("Application has started");
      setUpEventListener();
      UICntl.displayMonth();
      UICntl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
    },
  };
})(budgetController, UIConroller);

appController.initApp();
