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
    };
    NewList(name) {
        let newList = new List(name, this.AllLists.length);
        this.AllLists.push(newList);
        let listString = `<li class="listItem" id="${newList.ID}">` +
            `<a href="#">${newList.Name}</a>` +
            `</li>`;
        listSpot.append(listString);
        currentList = newList;
    };
    DeleteList(id) {
        this.AllLists.splice(id, 1);
    };
    UpdateListProperty(id, property, value) {
        this.AllLists[id][property] = value;
    };
    LoadList(id) {
        let selectedList = this.AllLists[id];
        ClearPage();
    };
}

class List {
    constructor(name, id) {
        this.Name = name;
        this.ID = id;
        this.Tasks = [];
    }
    NewTask(title, body, isImportant = false, isDone = false) {
        let newTask = new Task(title, body, "Task" + this.Tasks.length, isImportant, isDone);

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
            `<a class="importantImageClick" onclick="MarkAsImportant(`+this.Tasks.length+`, event)">` +
            `<img src="${importantImg}" alt="Star Icon" class="importantImage">` +
            `</a>` +
            `<div class="taskHeader">` +
            newTask.Title +
            `</div>` +
            `<a class="doneImageClick" onclick="MarkAsDone(`+this.Tasks.length+`, event)">` +
            `<img src="${doneImg}"  alt="Check Box Icon" class="doneImage">` +
            `</a>` +
            `<a class="garbageImageClick" onclick="DeleteTaskDOM(`+this.Tasks.length+`)">` +
            `<img src="Assets/Images/garbageColored.png" alt="Garbage Can Icon" class="garbageImage">` +
            `</a>` +
            `<div class="taskBody">` +
            newTask.Body +
            `</div>` +
            `</div>`;
        //`<input onkeyup="addItem(this, this.value, event, `+ i +`)" type="text" placeholder="">`
        this.Tasks.push(newTask);
        taskSpot.append(taskString);
    }
    DeleteDone() {
        let totalWaitTime = 600;
        for (let i = this.Tasks.length; i > 0; i--) {
            if (this.Tasks[i-1].IsDone == true){
                let taskID = this.Tasks[i-1].ID;
                // totalWaitTime += 300;
                $(`#${taskID}`).delay(300).fadeOut(300);
                this.Tasks.splice(i-1, 1);
            };
        };
        setTimeout(function(){
            UpdateTasks();
        }, totalWaitTime);
    };
    DeleteTask(key) {
        let selectedTask = this.Tasks[key];
        $(`#${selectedTask.ID}`).delay(300).fadeOut(300);
        console.log(key, selectedTask);
        this.Tasks.splice(key, 1);
        setTimeout(function(){
            UpdateTasks();
        }, 600);
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

    SaveData();
};

function UpdateTasks() {
    ClearPage();
    for (let i = 0; i < currentList.Tasks.length; i++) {
        let newTask = currentList.Tasks[i];
        newTask.ID = "Task"+i;

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
            `<a class="importantImageClick" onclick="MarkAsImportant(`+i+`, event)">` +
            `<img src="${importantImg}" alt="Star Icon" class="importantImage">` +
            `</a>` +
            `<div class="taskHeader">` +
            newTask.Title +
            `</div>` +
            `<a class="doneImageClick" onclick="MarkAsDone(`+i+`, event)">` +
            `<img src="${doneImg}"  alt="Check Box Icon" class="doneImage">` +
            `</a>` +
            `<a class="garbageImageClick" onclick="DeleteTaskDOM(`+i+`)">` +
            `<img src="Assets/Images/garbageColored.png" alt="Garbage Can Icon" class="garbageImage">` +
            `</a>` +
            `<div class="taskBody">` +
            newTask.Body +
            `</div>` +
            `</div>`;
        taskSpot.append(taskString);

    };
    SaveData();
};

function LoadTasks(){

};

function ClearPage() {
    $(".taskItem").remove();
};

function SaveData() {
    localStorage.setItem("SavedTasks", JSON.stringify(masterList));
};

let masterList = new MainList;