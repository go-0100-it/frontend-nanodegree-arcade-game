// Get the modal
var _modal = document.getElementById('myModal');
// Get the elements of the modal for reference
var modelTitle = document.getElementById("modal_title");

_modal.style.display = "none";

//A function to invoke pointer related function statements
function pointer(func, element){
    func(element);
}

//A function to invoke modal related function statements
function modal(func) {
    func(clear);
}

// On pointer hover set white close image.
var hover = function(element) {
    element.setAttribute('src', 'Images/close_button_white.png');
}

// When pointer is no long hovering set grey close image.
var unhover = function(element) {
    element.setAttribute('src', 'Images/close_button_grey.png');
}

// A function statement to be passed to the modal function when the user clicks the button.
// The modal function will invoke this function to show the modal.
// Also selecting the project object and extracting the corresponding project values.
var showModal = function(message) {

    modelTitle.textContent = message;

    //Displaying the modal.
    _modal.style.display = "block";
}

// A function statement to be passed to the modal function, to hide the modal.
var close_modal = function(func) {
    func();
    _modal.style.display = "none";
}

// A function statement to be passed to the modal function, to clear all previously set element values.
var clear = function() {
    modelTitle.textContent = "";
}
