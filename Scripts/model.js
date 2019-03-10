let currentList;

let listSpot = $("#list1");
let taskSpot = $("#body");

let starOff = "Assets/Images/starEmpty.png";
let starOn = "Assets/Images/starFull.png";
let doneOff = "Assets/Images/checkBoxEmpty.png";
let doneOn = "Assets/Images/checkBoxFull.png";

let listHeader = $("#listIndicator");

class MainList {
    constructor() {
        this.AllLists = [];
    };
    NewList(name, initialize = true, existingId = null) {
        let newList;
        if (initialize == true) {
            let newId = existingId || this.AllLists.length;
            newList = new List(name, newId);
            this.AllLists.push(newList);
            let listString = `<li class="listItem" id="${newList.ID}">` +
                `<a href="#" onclick="SelectList(` + newList.ID + `, event)">${newList.Name}</a>` +
                `<img src="Assets/Images/garbageColored.png" alt="Garbage can Icon" class="listImage" onclick="DeleteListDOM(` + newList.ID + `)">` +
                `</li>`;
            listSpot.append(listString);
            currentList = newList;
        } else {
            newList = new List(name, existingId);
            this.AllLists.push(newList);
            UpdateLists();
        };
        SaveData();
        this.LoadList();
        return newList;
    };
    DeleteList(id) {
        $(`#${id}`).delay(300).fadeOut(300);
        this.AllLists.splice(id, 1);
        setTimeout(function () {
            UpdateLists();
        }, 600);
    };
    UpdateListProperty(id, property, value) {
        this.AllLists[id][property] = value;
        SaveData();
    };
    LoadList() {
        ClearPage();
        if (currentList) {
            listHeader.html(`My Tasks: ` + currentList.Name);
            LoadTasks(currentList.Tasks);
        } else {
            listHeader.html(`My Tasks: No List Selected`);
        };
    };
}

class List {
    constructor(name, id) {
        this.Name = name;
        this.ID = id;
        this.Tasks = [];
    }
    NewTask(title, body, isImportant = false, isDone = false, initialize = true, existingId = null, ) {
        if (initialize == true) {
            let newTaskInit = new Task(title, body, "Task" + this.Tasks.length, isImportant, isDone);
            let importantImg = ((bool) => {
                switch (bool) {
                    case true:
                        return starOn;
                    case false:
                        return starOff;
                }
            })(newTaskInit.IsImportant);
            let doneImg = ((bool) => {
                switch (bool) {
                    case true:
                        return doneOn;
                    case false:
                        return doneOff;
                }
            })(newTaskInit.IsDone);

            let taskString =
                `<div class="taskItem col-12" id="${newTaskInit.ID}">` +
                `<a class="importantImageClick" onclick="MarkAsImportant(` + this.Tasks.length + `, event)">` +
                `<img src="${importantImg}" alt="Star Icon" class="importantImage">` +
                `</a>` +
                `<div class="taskHeader" contenteditable="true" onfocusout="EditHead(` + this.Tasks.length + `, this)">` +
                newTaskInit.Title +
                `</div>` +
                `<a class="doneImageClick" onclick="MarkAsDone(` + this.Tasks.length + `, event)">` +
                `<img src="${doneImg}"  alt="Check Box Icon" class="doneImage">` +
                `</a>` +
                `<a class="garbageImageClick" onclick="DeleteTaskDOM(` + this.Tasks.length + `)">` +
                `<img src="Assets/Images/garbageColored.png" alt="Garbage Can Icon" class="garbageImage">` +
                `</a>` +
                `<div class="taskBody" contenteditable="true" onfocusout="EditBody(` + this.Tasks.length + `, this)">` +
                newTaskInit.Body +
                `</div>` +
                `</div>`;
            this.Tasks.push(newTaskInit);
            taskSpot.append(taskString);
        } else {
            let newTaskInit = new Task(title, body, existingId, isImportant, isDone);
            this.Tasks.push(newTaskInit);
        };
        SaveData();
    }
    DeleteDone() {
        for (let i = this.Tasks.length; i > 0; i--) {
            if (this.Tasks[i - 1].IsDone == true) {
                let taskID = this.Tasks[i - 1].ID;
                $(`#${taskID}`).delay(300).fadeOut(300);
                this.Tasks.splice(i - 1, 1);
            };
        };
        setTimeout(function () {
            UpdateTasks();
        }, 600);
    };
    DeleteTask(key) {
        let selectedTask = this.Tasks[key];
        $(`#${selectedTask.ID}`).delay(300).fadeOut(300);
        this.Tasks.splice(key, 1);
        setTimeout(function () {
            UpdateTasks();
        }, 600);
    };
    UpdateTaskProperty(id, property, value) {
        this.Tasks[id][property] = value;
        SaveData();
    };
};

class Task {
    constructor(title, body, id, isImportant, isDone) {
        this.Title = title;
        this.Body = body;
        this.ID = id;
        this.IsImportant = isImportant;
        this.IsDone = isDone;
    };
};

function UpdateLists() {
    ClearPage();
    ClearLists();
    currentList = null;
    if (masterList.AllLists[0]) {
        currentList = masterList.AllLists[0];
        for (let i = 0; i < masterList.AllLists.length; i++) {
            let newList = masterList.AllLists[i];
            newList.ID = i;
            let listString = `<li class="listItem" id="${newList.ID}">` +
                `<a href="#" onclick="SelectList(` + newList.ID + `, event)">${newList.Name}</a>` +
                `<img src="Assets/Images/garbageColored.png" alt="Garbage can Icon" class="listImage" onclick="DeleteListDOM(` + newList.ID + `)">` +
                `</li>`;
            listSpot.append(listString);
        };
    };
    SaveData();
    masterList.LoadList();
};

function UpdateTasks() {
    ClearPage();
    for (let i = 0; i < currentList.Tasks.length; i++) {
        let newTask = currentList.Tasks[i];
        newTask.ID = "Task" + i;

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
            `<div class="taskItem col-12" id="${newTask.ID}">` +
            `<a class="importantImageClick" onclick="MarkAsImportant(` + i + `, event)">` +
            `<img src="${importantImg}" alt="Star Icon" class="importantImage">` +
            `</a>` +
            `<div class="taskHeader" contenteditable="true" onfocusout="EditHead(` + i + `, this)">` +
            newTask.Title +
            `</div>` +
            `<a class="doneImageClick" onclick="MarkAsDone(` + i + `, event)">` +
            `<img src="${doneImg}"  alt="Check Box Icon" class="doneImage">` +
            `</a>` +
            `<a class="garbageImageClick" onclick="DeleteTaskDOM(` + i + `)">` +
            `<img src="Assets/Images/garbageColored.png" alt="Garbage Can Icon" class="garbageImage">` +
            `</a>` +
            `<div class="taskBody" contenteditable="true" onfocusout="EditBody(` + i + `, this)">` +
            newTask.Body +
            `</div>` +
            `</div>`;
        taskSpot.append(taskString);

    };
    SaveData();
};

function LoadTasks() {
    for (let i = 0; i < currentList.Tasks.length; i++) {
        let newTask = currentList.Tasks[i];

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
            `<div class="taskItem col-12" id="${newTask.ID}">` +
            `<a class="doneImageClick" onclick="MarkAsDone(` + i + `, event)">` +
            `<img src="${doneImg}"  alt="Check Box Icon" class="doneImage">` +
            `</a>` +
            `<a class="importantImageClick" onclick="MarkAsImportant(` + i + `, event)">` +
            `<img src="${importantImg}" alt="Star Icon" class="importantImage">` +
            `</a>` +
            `<div class="taskHeader" contenteditable="true" onfocusout="EditHead(` + i + `, this)">` +
            newTask.Title +
            `</div>` +
            `<a class="garbageImageClick" onclick="DeleteTaskDOM(` + i + `)">` +
            `<img src="Assets/Images/garbageColored.png" alt="Garbage Can Icon" class="garbageImage">` +
            `</a>` +
            `<div class="taskBody" contenteditable="true" onfocusout="EditBody(` + i + `, this)">` +
            newTask.Body +
            `</div>` +
            `</div>`;
        taskSpot.append(taskString);
    };
};

function ClearPage() {
    $(".taskItem").remove();
};

function ClearLists() {
    $(".listItem").remove();
};

function SaveData() {
    localStorage.setItem("SavedTasksV1.0", JSON.stringify(masterList));
};

let masterList = new MainList;