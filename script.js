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
		// chapater 9 validation codes
	var visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
	var mc = /^5[1-5][0-9]{14}$/;
	var amex = /^3[47][0-9]{13}$/;
	var cardNotMatch;
	var cvvNotThree;
	
	
	try{ //verify ccNum and CVV entries are numerical
		if (isNaN(ccNumElement.value) || ccNumElement.value ===""){
			ccNotNum = true;
		} else {
			ccNumElement.style.background = "";
			ccNumErrorMessage.style.display = "none";
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
		//additional code for chapter 9 validation
		if (!(document.getElementById("visa").checked && (visa.test(ccNumElement))) 
			|| !(document.getElementById("mc").checked && (mc.test(ccNumElement)))
			|| !(document.getElementById("amex").checked && (amex.test(ccNumElement)))){
			cardNotMatch = true;
			throw "information does not match. Please re-enter.";	
		} else {	
			ccNumElement.style.background = "";
			ccNumErrMsg.stle.display = "none";
		}
		
		if (!(/.{3,}/.test(cvvElement.value))=== true){
			cvvNotThree = true;
			throw "must be 3 characters long";
		}
	}	
	catch(msg){
		if (ccNotNum || cardNotMatch){
			ccNumElement.style.background = "rgb(204,255,255)";
			ccNumErrMsg.innerHTML = "The card number " + msg;
		}
		if (cvvNotNum || cvvNotThree){
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
		document.getElementById("thankYou").innerHTML = "Thank you for your order.";
		document.getElementById("thankYou").style.display = "block";
	} else{
		document.getElementById("errorText").innerHTML = "Please fix the highlighted areas and re-submit your order.";
		document.getElementById("errorText").style.display = "block";
		scroll(0,0);
	}
} // end function.
	function calcTotal() {
		var itemTotal = 0;
		var metal1 = document.getElementById("metal1");// get input from check boxes
		var metal2 = document.getElementById("metal2");
		var metal3 = document.getElementById("metal3");
		var metal4 = document.getElementById("metal4");
		var metal5 = document.getElementById("metal5");
		var metal6 = document.getElementById("metal6");
		(metal1.checked) ? (itemTotal += 6.66) : (itemTotal +=0);//calculate total, decimals still need formatting
		(metal2.checked) ? (itemTotal += 10.00) : (itemTotal +=0);
		(metal3.checked) ? (itemTotal += 9.99) : (itemTotal +=0);
		(metal4.checked) ? (itemTotal += 11.11) : (itemTotal +=0);
		(metal5.checked) ? (itemTotal += 11.11) : (itemTotal +=0);
		(metal6.checked) ? (itemTotal += 10.00) : (itemTotal +=0);
		var salesTaxRate = 0.08; //Tempe sales tax
		itemTotal *= 100;
		var orderTotal = (itemTotal + (itemTotal * salesTaxRate)) / 100;
		document.getElementById("Order").addEventListener("click", calcTotal, false);
	}

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