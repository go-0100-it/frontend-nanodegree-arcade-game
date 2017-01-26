// Get the modal
var _modal = document.getElementById('myModal');
// Get the elements of the modal for reference
var modelTitle = document.getElementById("modal_title");
var modalText = document.getElementById("modal_text");
var modalImage = document.getElementById("project_example_image");

_modal.style.display = "none";

//A function to invoke pointer related function statements
function pointer(func, element, evt) {
    if (element) {
        func(element);
    } else if (evt) {
        func(evt);
    }
}

//A function to invoke modal related function statements
function modal(func, projectNum) {
    if (projectNum) {
        func(projectNum);
    } else {
        func(clear);
    }
}

// On pointer hover set white close image.
var hover = function(element) {
    element.setAttribute('src', 'Images/close_button_white.png');
}

// When pointer is no long hovering set grey close image.
var unhover = function(element) {
    element.setAttribute('src', 'Images/close_button_grey.png');
}

// When pointer is no long hovering reduce ball radius and return to original opacity.
var makeOpaque = function(evt) {
    evt.target.setAttributeNS(null, "opacity", "1");
    evt.target.setAttributeNS(null, "ry", "110");
    evt.target.setAttributeNS(null, "rx", "110");
}

// On pointer hover increase ball radius and reduce opacity.
var makeTransparent = function(evt) {
    evt.target.setAttributeNS(null, "opacity", "0.15");
    evt.target.setAttributeNS(null, "ry", "130");
    evt.target.setAttributeNS(null, "rx", "130");
}

// A function statement to be passed to the modal function when the user clicks the button.
// The modal function will invoke this function to show the modal.
// Also selecting the project object and extracting the corresponding project values.
var showModal = function(message) {

    modelTitle.textContent = message;
    //modalText.textContent = projects[projectNum].text;

    //Setting the project image to the modal if one exists else, hiding the img container.
    // if (projects[projectNum].imageSrc) {
    //     modalImage.style.display = "block";
    //     modalImage.src = projects[projectNum].imageSrc;
    // } else {
    modalImage.style.display = "none";
    //}

    //Displaying the modal.
    _modal.style.display = "block";
}

// A function statement to be passed to the modal function, to hide the modal.
var close_modal = function(func) {
    this.clear();
    _modal.style.display = "none";
}

// A function statement to be passed to the modal function, to clear all previously set element values.
var clear = function() {
    modelTitle.textContent = "";
    modalText.textContent = "";
    modalImage.src = "";
}
