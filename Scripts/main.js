let allLists = {}; //Main object, saves/loads to local storage
let currentList = null; //Keeps track of the currently used list

let savedTasks = localStorage.getItem("SavedTasks"); //Gets saved tasks, parsed later into allLists
let currentId = localStorage.getItem("CurrentID");

let mainModal = $("#mainModal"); //Main greeting modal
let modalCloseButton = $("#modalClose"); //Cose button for mainModal

let newListModal = $("#createListModal");
let newListModalClose = $("modalListClose");

let sideBarList = $("#list1");
let tasksSpot = $("#body");

let starOff = "Assets/Images/starEmpty.png";
let starOn = "Assets/Images/starFull.png";
let doneOff = "Assets/Images/checkBoxEmpty.png";
let doneOn = "Assets/Images/checkBoxFull.png";

class Task {
    constructor(description, header, list) {
        this.Description = description;
        this.Header = header;
        list.Content.push(this);
    };
    AddToDOM() {
        let taskString = "<div class=`taskItem col-12` data-isDone=`false` data-isImportant=`false`> \
        <a class=`importantImageClick`> \
            <img src=`Assets/Images/starEmpty.png` alt=`Empty Star Icon` class=`importantImage`> \
        </a> \
        <div class=`taskHeader`> \
            "+this.Header+" \
        </div> \
        <a class=`doneImageClick`> \
            <img src=`Assets/Images/checkBoxEmpty.png` alt=`Empty Check Box Icon` class=`doneImage`> \
        </a> \
        <div class=`taskBody`> \
            "+this.Description+" \
        </div> \
        </div> \
        ";
        tasksSpot.append(taskString);
    };
    DeleteAnimate() {
        //this.animate({parameters},speed,callback);
        $(this).delete();
    };
    ImportantAnimate() {
        //this.animate({parameters},speed,callback);
    };
};
class List {
    constructor(name) {
        this.Name = name;
        this.Id = GenerateId();
        this.Content = [];
        allLists[this.Name] = this;
        this.AddToDOM(); //Add list to DOM automatically on create
        this.Save(); //Save on new list create
    };
    Load() {
        if (currentList /= null){
            currentList.Save();
        };
        ClearPage();
        currentList = this;
        for (let i = 0; i < this.Content.length; i++) {
            tasksSpot.append(this.Content[i]);
        };
    };
    Save() {
        // $(`#${this.Id}`)
        this.Content = [];
        let allTasks =  $("#body").children();
        for (let i = 0; i < allTasks.length; i++){
            this.Content.push(JSON.stringify(allTasks[i]));
        };
        SaveData();
    };
    AddToDOM() {
        let listString = "<li class=`listItem` id=`"+this.Id+"`> \
        <a href=`#`>"+this.Name+"</a> \
        </li>";
        sideBarList.append(listString);
    };
};

function ClearPage() {
    $(".taskItem").remove();
};

function SaveData() {
    localStorage.setItem("SavedTasks", JSON.stringify(allLists));
    localStorage.setItem("CurrentID", currentId.toString());
};

function GenerateId() {
    currentId = currentId + 1;
    return currentId;
};

//Close the greeting modal
modalCloseButton.click(function () {
    mainModal.css("display", "none");
});
window.onclick = function (event) {
    // let eventTarget = $(event.target);
    if (event.target == mainModal[0]) {
        mainModal.css("display", "none");
    };
};
//
//Close the new list modal
newListModalClose.click(function () {
    newListModal.css("display", "none");
});
window.onclick = function (event) {
    // let eventTarget = $(event.target);
    if (event.target == newListModal[0]) {
        newListModal.css("display", "none");
    };
};
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

//List click
$(".listItem").click(function (event) {
    let target = $(event.target).parent();
    // console.log(target.attr("id"));

});
//

//New list click
$("#newList").click(function (event) {
    newListModal.css("display", "block");
});
//

//New task click
$("#newTask").click(function (event) {
    // newTaskModal.css("display", "block");
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
        currentId = currentId.Number();
        if (currentId.isNaN()){
            console.log("currentId is NaN! Setting to 0");
            currentId = 0;
        };

        allLists = JSON.parse(savedTasks);
        numOfLists = Object.keys(allLists);
        for (let i = 0; i < numOfLists.length; i++) {
            //Create list here using let list1 = allLists[numOfLists[i]];
            // for (let listIndex = 0; listIndex < )
        };
    } else {
        //Prompt to create new list
        currentId = 0; //Set the current task ID count to 0 (first time run)
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