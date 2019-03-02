let mainModal = $('#mainModal');
let modalCloseButton = $("#modalClose");

let currentTasks = {};
let allLists = [];
let currentList = "";

let savedTasks = localStorage.getItem("SavedTasks");

class Task {
    constructor(description, status) {
        this.Description = description;
        this.Status = status;
        currentTasks[currentList].Content.push(this);
    };
    DeleteAnimate() {
        //this.animate({parameters},speed,callback);
    };
    ImportantAnimate() {
        //this.animate({parameters},speed,callback);
    };
};
class List {
    constructor(name) {
        this.Name = name;
        this.Content = [];
        currentTasks[this.Name] = this;
    };
    Load() {
        ClearPage();
        let parsedArray = JSON.parse(stringedArray);
        console.log(parsedArray);
        let allKeys = Object.keys(parsedArray);
        for (let i = 0; i < allKeys.length; i++) {
            let currentArray = parsedArray[allKeys[i]];
            console.log(currentArray);
            for (let i2 = 0; i2 < currentArray.length; i2++) {
                console.log(currentArray[i2]);
            };
        };
        //Add content to HTML
    }
};

function ClearPage() {
    $(".taskItem").remove();
}

function SaveData() {
    localStorage.setItem("SavedTasks", JSON.stringify(currentTasks));
};

modalCloseButton.click(function () {
    mainModal.css("display", "none");
});
window.onclick = function (event) {
    console.log("fired");
    let eventTarget = $(event.target);
    console.log(eventTarget);
    if (event.target == mainModal[0]) {
        console.log("passed")
        mainModal.css("display", "none");
    }
}

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    if (savedTasks != null) {
        currentTasks = JSON.parse(savedTasks);
        allLists = Object.keys(currentTasks);
        for (let i = 0; i < allLists.length; i++) {
            //Must loop through each, and parse it
            //Add list to HTML with jQuery .append()
        };
    } else {
        //Prompt to create new task
        mainModal.css("display", "block");
    };
});


/* remember
>jquery .children() returns an array of the element's children
>use an upward counting variable to assign unique ID's to the lists
>jquery .append() to add an HTML element to the prepended element


sample code i made online as notes:

let array1 = [
  "<div class='task'></div>",
  "<div class='task'></div>"
];
let array2 = [
  "<div class='task2'></div>",
  "<div class='task2'></div>"
];

let mainObj = {
  Array1: array1,
  Array2: array2
};

let stringedArray = JSON.stringify(mainObj);
console.log(stringedArray);
let parsedArray = JSON.parse(stringedArray);
console.log(parsedArray);
let allKeys = Object.keys(parsedArray);
for (let i = 0; i < allKeys.length; i++){
  let currentArray = parsedArray[allKeys[i]];
  console.log(currentArray);
  for (let i2 = 0; i2 < currentArray.length; i2++){
    console.log(currentArray[i2]);
  };
};
*/