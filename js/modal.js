// Get the modal
var _modal = document.getElementById('myModal');
// Get the elements of the modal for reference
var modalTitle = document.getElementById("modal_title");
var modalImg = document.getElementById("modal_image");

_modal.style.display = "none";

// On pointer hover set white close image.
var hover = function(element) {
    element.setAttribute('src', 'Images/close_button_white.png');
};

// When pointer is no long hovering set grey close image.
var unhover = function(element) {
    element.setAttribute('src', 'Images/close_button_grey.png');
};

// A function statement to be passed to the modal function when the user clicks the button.
// The modal function will invoke this function to show the modal.
// Also selecting the project object and extracting the corresponding project values.
var showModal = function(message, src) {

    modalTitle.textContent = message;
    modalImg.setAttribute('src', src);

    //Displaying the modal.
    _modal.style.display = "block";
};

// A function statement to be passed to the modal function, to hide the modal.
var close_modal = function(func) {
    func();
    _modal.style.display = "none";
};

// A function statement to be passed to the modal function, to clear all previously set element values.
var clear = function() {
    modalTitle.textContent = "";
};
