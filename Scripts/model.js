let masterList = new MainList;

let sideBarList = $("#list1");
let tasksSpot = $("#body");

class MainList {
    constructor() {
        this.AllLists = [];
    }
    NewList(name) {
        let newList = new List(name, this.AllLists.length);
        this.AllLists.push(newList);
        let listString = `<li class="listItem" id="${newList.ID}"><a href="#">${newList.Name}</a></li>`;
        listSpot.Append(listString);
    }
    DeleteList(id) {
        this.AllLists.splice(id, 1);
    }
    UpdateListProperty(id, property, value) {
        this.AllLists[id][property] = value;
    }
    LoadList(id) {
        let selectedList = this.AllLists[id];

    }
}

class List {
    constructor(name, id) {
        this.Name = name;
        this.ID = id;
        this.Tasks = [];
    }
    NewTask(title, body, isImportant = false, isDone = false) {
        let newTask = new Task(title, body, "Task"+this.Tasks.length, isImportant, isDone);
        this.Tasks.push(newTask);
        
    }
    DeleteDone(){
        let allDone = $('[data-isDone="true"]').map(function() {
            return this;
        }).get();
        for (let i = 0; i < allDone.length; i++){
            let stringID = allDone[i].ID;
            let taskID = Number(taskID.substring(4));
            this.Tasks.splice(taskID, 1);

            $(allDone[i]).remove();
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
    }
}