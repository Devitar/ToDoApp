let savedTasks = localStorage.getItem("SavedTasks"); //Gets saved tasks, parsed later into allLists
let parsedList;

//Modal stuff
let mainModal = $("#mainModal"); //Main greeting modal
let modalCloseButton = $("#modalClose"); //Cose button for mainModal

let newListModal = $("#createListModal");
let newListModalClose = $("#modalListClose");

let newTaskModal = $("#createTaskModal");
let newTaskModalClose = $("#modalTaskClose");
//

//FAB buttons
let mainFAB = $("#FABMain")
let newListButton = $("#newList");
let newTaskButton = $("#newTask");
//

//Close the greeting modal
modalCloseButton.click(function () {
    mainModal.css("display", "none");
});
window.onclick = function (event) {
    // let eventTarget = $(event.target);
    if (event.target == mainModal[0]) {
        mainModal.css("display", "none");
    } else if (event.target == newListModal[0]) {
        newListModal.css("display", "none");
    } else if (event.target == newTaskModal[0]) {
        newTaskModal.css("display", "none");
    };
};
//

//Close the new list modal
newListModalClose.click(function () {
    newListModal.css("display", "none");
});
//

//Close the new task modal
newTaskModalClose.click(function () {
    newTaskModal.css("display", "none");
});
//

//New list click
newListButton.click(function (event) {
    mainModal.css("display", "none");
    newTaskModal.css("display", "none");
    newListModal.css("display", "block");
    mainFAB.removeClass("active");
});
$("#modalListSave").click(function (event) {
    let newListName = $("#newListInput").val();
    if (newListName == "") {
        newListName = "Unnamed List";
    };
    masterList.NewList(newListName);
    newListModal.css("display", "none");
});
//

//New task click
newTaskButton.click(function (event) {
    mainModal.css("display", "none");
    newListModal.css("display", "none");
    newTaskModal.css("display", "block");
    mainFAB.removeClass("active");
});
function NewTaskDOM() {
    if (currentList != null) {
        let newTaskName = $("#newTaskInput").val();
        if (newTaskName == "") {
            newTaskName = "Unnamed Task";
        };
        let newTaskBody = $("#newTaskInputBody").val();
        if (newTaskBody == "") {
            newTaskBody = "No task description.";
        };
        currentList.NewTask(newTaskName, newTaskBody);
        newTaskModal.css("display", "none");
    } else {
        alert("You must create a list before creating a task!");
    };
};
//

//List interaction
// $("#list1").on("click", "li", function (event) {
//     let target = $(event.target);
//     console.log(target);
//     // console.log(target, target.text(), target.attr("class"))
//     $(".listItem").removeClass("active");
//     target.addClass("active");
// });

function SelectList(key, event) {
    currentList = masterList.AllLists[key];
    console.log(currentList);
};

function DeleteListDOM(key) {
    masterList.DeleteList(key);
};
//

//Task interaction
function DeleteTaskDOM(key) {
    // console.log(element, key);
    currentList.DeleteTask(key)
};

function MarkAsDone(key, event) {
    let imageContainer = $(event.target);
    let mainTask = currentList.Tasks[key];

    if (mainTask.IsDone == false) {
        mainTask.IsDone = true;
        imageContainer.attr("src", doneOn);
    } else {
        mainTask.IsDone = false;
        imageContainer.attr("src", doneOff);
    };
};

function MarkAsImportant(key, event) {
    let imageContainer = $(event.target);
    let mainTask = currentList.Tasks[key];

    if (mainTask.IsImportant == false) {
        mainTask.IsImportant = true;
        imageContainer.attr("src", starOn);
    } else {
        mainTask.IsImportant = false;
        imageContainer.attr("src", starOff);
    };
};

function DeleteTaskAll() {
    if (currentList != null) {
        currentList.DeleteDone();
    };
};
//

//Initial startup
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    if (savedTasks == null) {
        mainModal.css("display", "block");
    } else {
        //Load saved data
        parsedList = JSON.parse(savedTasks);
        if (parsedList.AllLists[0]) {
            currentList = parsedList.AllLists[0];
            for (let i = 0; i < parsedList.AllLists.length; i++) { //Recreate list objects
                let existList = parsedList.AllLists[i];
                let newList = masterList.NewList(existList.Name, false, existList.ID);
                if (existList.Tasks[0]) {
                    for (let i2 = 0; i2 < existList.Tasks.length; i2++) { //Recreate task objects
                        let existTask = existList.Tasks[i2];
                        let newTask1 = newList.NewTask(existTask.Title, existTask.Body, existTask.IsImportant, existTask.IsDone, false, existTask.ID);
                    };
                };
            };
            masterList.LoadList();
        };
    };
});
//

/* remember
>jquery .children() returns an array of the element's children
>use an upward counting variable to assign unique ID's to the lists
>jquery .append() to add an HTML element to the prepended element
>jquery $("elementThing").parent() this grabs the nearest parent and creates a jquery object out of it.
>setTimeout(function(){ alert("Hello"); }, 3000); waits 3 seconds
*/