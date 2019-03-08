let savedTasks = localStorage.getItem("SavedTasks"); //Gets saved tasks, parsed later into allLists

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

//Delete Task Single
$(".garbageImageClick").click(function (event) {
    let imageContainer = $(event.target);
    let mainTask = imageContainer.parent().parent();

});
//

// List click
$("#list1").on("click", "li", function (event) {
    let target = $(this);
    // console.log(target, target.text(), target.attr("class"))
    $(".listItem").removeClass("active");
    target.addClass("active");
});


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
$("#modalTaskSave").click(function (event) {
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
});
//

//Initial startup
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    if (savedTasks == null){
        mainModal.css("display", "block");
    }else{
        //Load saved data
    };
});
//

/* remember
>jquery .children() returns an array of the element's children
>use an upward counting variable to assign unique ID's to the lists
>jquery .append() to add an HTML element to the prepended element
>jquery $("elementThing").parents("div") this grabs the nearest parent div
    and creates a jquery object out of it.
>setTimeout(function(){ alert("Hello"); }, 3000); waits 3 seconds
*/