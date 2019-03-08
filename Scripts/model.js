let currentList;

let listSpot = $("#list1");
let taskSpot = $("#body");

let starOff = "Assets/Images/starEmpty.png";
let starOn = "Assets/Images/starFull.png";
let doneOff = "Assets/Images/checkBoxEmpty.png";
let doneOn = "Assets/Images/checkBoxFull.png";

class MainList {
    constructor() {
        this.AllLists = [];
    }
    NewList(name) {
        let newList = new List(name, this.AllLists.length);
        this.AllLists.push(newList);
        let listString = `<li class="listItem" id="${newList.ID}">` +
            `<a href="#">${newList.Name}</a>` +
            `</li>`;
        listSpot.append(listString);
        newList.HTML = $(`#${newList.ID}`);
        currentList = newList;
    }
    DeleteList(id) {
        this.AllLists.splice(id, 1);
    }
    UpdateListProperty(id, property, value) {
        this.AllLists[id][property] = value;
    }
    LoadList(id) {
        let selectedList = this.AllLists[id];
        ClearPage();
    }
}

class List {
    constructor(name, id) {
        this.Name = name;
        this.ID = id;
        this.Tasks = [];
        this.HTML = null;
    }
    NewTask(title, body, isImportant = false, isDone = false) {
        let newTask = new Task(title, body, "Task" + this.Tasks.length, isImportant, isDone);
        this.Tasks.push(newTask);

        let importantImg = ((bool) => {
            switch (bool) {
                case true:
                    return starOn;
                case false:
                    return starOff;
            }
        })(newTask.IsImportant);
        let doneImg = ((bool) => {
            switch (bool) {
                case true:
                    return doneOn;
                case false:
                    return doneOff;
            }
        })(newTask.IsDone);

        let taskString =
            `<div class="taskItem col-12" id="${newTask.ID}" data-isDone="${newTask.IsDone}" data-isImportant="${newTask.IsImportant}">` +
            `<a class="importantImageClick">` +
            `<img src="${importantImg}" alt="Star Icon" class="importantImage">` +
            `</a>` +
            `<div class="taskHeader">` +
            newTask.Title +
            `</div>` +
            `<a class="doneImageClick">` +
            `<img src="${doneImg}"  alt="Check Box Icon" class="doneImage">` +
            `</a>` +
            `<a class="garbageImageClick" onclick="">` +
            `<img src="Assets/Images/garbageColored.png" alt="Garbage Can Icon" class="garbageImage">` +
            `</a>` +
            `<div class="taskBody">` +
            newTask.Body +
            `</div>` +
            `</div>`;
        taskSpot.append(taskString);

        newList.HTML = $(`#${newList.ID}`);
    }
    DeleteDone() {
        let allDone = $('[data-isDone="true"]').map(function () {
            return this;
        }).get();
        for (let i = 0; i < allDone.length; i++) {
            let stringID = allDone[i].ID;
            let taskID = Number(taskID.substring(4));
            this.Tasks.splice(taskID, 1);

            $(allDone[stringID]).remove();
        }
    }
}

class Task {
    constructor(title, body, id, isImportant, isDone) {
        this.Title = title;
        this.Body = body;
        this.ID = id;
        this.IsImportant = isImportant;
        this.IsDone = isDone;
        this.HTML = null;
    }
}

function UpdateLists() {

}

function UpdateTasks(list) {

}

function ClearPage() {
    $(".taskItem").remove();
};

function SaveData() {
    localStorage.setItem("SavedTasks", JSON.stringify(allLists));
    localStorage.setItem("CurrentID", currentId.toString());
};

let masterList = new MainList;