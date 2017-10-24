/*	JavaScript CIS166AA
*	Author:	Alycia Saris
*	Date:	2017-10-23
*
*	None More Black
*	Functions
*	Filename:	script.js*/

	
"use strict";

/* declare global variables */
var formValidity = true;

/* remove select default from state selection list and credit month/year */
function removeSelectDefaults(){
	var emptyBoxes = document.getElementsByTagName("select");
	for (var i = 0; i < emptyBoxes.length; i++){
		emptyBoxes[i].selectedIndex = -1;
	}
}//end function.

/* function to validate address fields */
function validateAddress(fieldsetId){
	var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
	var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
	var fieldsetValidity = true;
	var elementCount = inputElements.length;
	var currentElement;
	try{
		for(var i = 0; i < elementCount; i++){
			// validate elements in fieldsetId.
			currentElement = inputElements[i];
			if (currentElement.value === ""){
				currentElement.style.background = "rgb(204,255,255)";
				fieldsetValidity = false;
			} else {
				currentElement.style.background = "white";
			}
		}currentElement = document.querySelector("#" + fieldsetId + " select");
		//validate state.
		if (currentElement.selectedIndex === -1){
			currentElement.style.border = "1px solid blue";
			fieldsetValidity = false;
		} else{
			currentElement.style.border + "";
		}
		if (fieldsetValidity === false){
			// throw error message if address fields not completed.
			throw "Please complete all Address information.";
		}
	}
	catch(msg){
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}// end function.
/* validate payment fieldset */
function validatePayment(){
	var errorDiv = document.querySelector("#paymentInfo .errorMessage");
	var fieldsetValidity = true;
	var ccNumElement = document.getElementById("ccNum");
	var selectElements = document.querySelectorAll("#paymentInfo select");
	var elementCount = selectElements.length;
	var cvvElement = document.getElementById("cvv");
	var cards = document.getElementsByName("PaymentType");
	var currentElement;
	try{
		if(!cards[0].checked && !cards[1].checked && !cards[2].checked){
			for(i = 0; i < 3; i++){
				cards[i].style.outline = "1px solid blue";
			}
			fieldsetValidity = false;
		}
		if(ccNumElement.value ===""){
			ccNumElement.style.background = "rgb(204,255,255)";
			fieldsetValidity = false;
		} else {
			ccNumElement.style.background = "white";
		}
		for (var i = 0; i < elementCount; i++){//verify month and year have been selected
			currentElement = selectElements[i];
			if (currentElement.selectedIndex === -1){
				currentElement.style.border = "1px solid blue";
				fieldsetValidity = false;
			} else{
				currentElement.style.border = "";
			}
		}
		if (cvvElement.value ===""){
			cvvElement.style.background = "rgb(204,255,255)";
			fieldsetValidity = false;
		} else {
			cvvElement.style.background = "white";
		}
		if (!fieldsetValidity){
			throw "Please complete all payment information.";
		} else errorDiv.style.display = "none";
	}
	catch(msg){
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}// end function.
/* create function to verify all input is numerical for older browsers */
function validateNumbers(){
	var ccNotNum;
	var cvvNotNum;
	var ccNumElement = document.getElementById("ccNum");
	var cvvElement = document.getElementById("cvv");
	var ccNumErrMsg = document.getElementById("ccNumErrorMessage");
	var cvvErrMsg = document.getElementById("cvvErrorMessage");
	try{ //verify ccNum and CVV entries are numerical
		if (isNaN(ccNumElement.value) || ccNumElement.value ===""){
			ccNotNum = true;
		} else {
			ccNumElement.style.background = "";
			ccNumErrMsg.style.display = "none";
		}
		if (isNaN(cvvElement.value) || cvvElement.value === ""){
			cvvNotNum = true;
		} else {
			cvvElement.style.background = "";
			cvvErrMsg.style.display = "none";
		}
		if (ccNotNum || cvvNotNum){
			throw "must contain numbers only.";
		}
	}
	catch(msg){
		if (ccNotNum){
			ccNumElement.style.background = "rgb(204,255,255)";
			ccNumErrMsg.innerHTML = "The card number " + msg;
		}
		if (cvvNotNum){
			cvvElement.style.background = "rgb(204,255,255)";
			cvvErrMsg.style.display = "block";
			cvvErrMsg.innerHTML = "The cvv number " + msg;
		}
		formValidity = false;
	}
}	//end function.

/* validate entire form*/
function validateForm(evt){
	if (evt.preventDefault){
		evt.preventDefault(); // prevents form from submitting
	} else{
		evt.returnValue = false; // prevents form form submitting in IE8
	}
	formValidity = true;
	validateAddress("address");
	validatePayment();
	validateNumbers();
	
	if (formValidity === true){
		document.getElementById("errorText").innerHTML = "";
		document.getElementById("errorText").style.display = "none";
		document.getElementsByTagName("form")[0].submit();
	} else{
		document.getElementById("errorText").innerHTML = "Please fix the highlighted areas and re-submit your order.";
		document.getElementById("errorText").style.display = "block";
		scroll(0,0);
	}
} // end function.
/* create event Listeners */
function createEventListeners(){
	var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener){
		form.addEventListener("submit", validateForm, false);
	} else if (form.attachEvent){
		form.attachEvent("onsubmit",validateForm);
	}
}
/* reset form for fresh input*/
function setUpPage(){
	removeSelectDefaults();
	createEventListeners();
}
/* run setup function when page finishes loading*/
if (window.addEventListener){
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent){
	window.attachEvent("onload", setUpPage);
}