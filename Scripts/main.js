$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});

let currentTasks = {};
let allLists = [];
let currentList = "";

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
};

let savedTasks = localStorage.getItem("SavedTasks");

if (savedTasks != null){
    currentTasks = JSON.parse(savedTasks);
    allLists = Object.keys(currentTasks);
    for (let i = 0; i < allLists.length; i++){
        //Add list to HTML
    };
}else{
    //First time run, prompt user to create a new list
};

function SaveData(){
    localStorage.setItem("SavedTasks", JSON.stringify(currentTasks));
};