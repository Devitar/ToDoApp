let mainModal = $('#mainModal');
let modalCloseButton = $("#modalClose");

let currentTasks = {};
let allLists = [];
let currentList = "";

let savedTasks = localStorage.getItem("SavedTasks");

let starOff = "Assets/Images/starEmpty.png";
let starOn = "Assets/Images/starFull.png";
let doneOff = "Assets/Images/checkBoxEmpty.png";
let doneOn = "Assets/Images/checkBoxFull.png";

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

//Close the modal
modalCloseButton.click(function () {
    mainModal.css("display", "none");
});
window.onclick = function (event) {
    let eventTarget = $(event.target);
    if (event.target == mainModal[0]) {
        mainModal.css("display", "none");
    }
}
//

//Mark task as important
$(".importantImageClick").click(function (event) {
    let imageContainer = $(event.target);
    let mainTask = imageContainer.parent().parent();
    // console.log(imageContainer.attr("data-isToggled"));
    if (mainTask.attr("data-isImportant") == "false") {
        mainTask.attr("data-isImportant", "true");
        imageContainer.attr("src", starOn);
    } else {
        mainTask.attr("data-isImportant", "false");
        imageContainer.attr("src", starOff);
    };
});
//

//Mark task as done
$(".doneImageClick").click(function (event) {
    let imageContainer = $(event.target);
    let mainTask = imageContainer.parent().parent();
    // console.log(imageContainer.attr("data-isToggled"));
    if (mainTask.attr("data-isDone") == "false") {
        mainTask.attr("data-isDone", "true");
        imageContainer.attr("src", doneOn);
    } else {
        mainTask.attr("data-isDone", "false");
        imageContainer.attr("src", doneOff);
    };
});
//

//Initial startup
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    if (savedTasks != null) {
        allLists = JSON.parse(savedTasks);
        numOfLists = Object.keys(allTasks);
        for (let i = 0; i < numOfLists.length; i++) {
            //Create list here using let list1 = allLists[numOfLists[i]];
            // for (let listIndex = 0; listIndex < )
        };
    } else {
        //Prompt to create new list
        mainModal.css("display", "block");
    };
});
//

/* remember
>jquery .children() returns an array of the element's children
>use an upward counting variable to assign unique ID's to the lists
>jquery .append() to add an HTML element to the prepended element
>jquery $("elementThing").parents("div") this grabs the nearest parent div
    and creates a jquery object out of it.

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