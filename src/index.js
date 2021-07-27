import * as functions from "./modules/functions.js";

const form = document.querySelector("form");
const table = document.querySelector("table");
const cashRegisterSoundEffect = document.querySelector(".auido-cash-register");
const billAmtInputField = document.querySelector("#bill-amt");
const submitBtn = document.querySelector(".btn-submit");
const labelCashGiven = document.querySelector(".label-cash-given");
const cashGivenInputField = document.querySelector("#cash-given");
const calculateBtn = document.querySelector(".btn-calculate");
const messageContainer = document.querySelector(".message-container");
const graphic = document.querySelector(".graphic");

form.addEventListener("submit", (e) => e.preventDefault());

submitBtn.addEventListener("click", () => {
  if (
    billAmtInputField.value !== "" &&
    parseInt(billAmtInputField.value, 10) > 0 &&
    Number.isInteger(parseFloat(billAmtInputField.value))
  ) {
    messageContainer.innerText = "submitting...";
    setTimeout(() => {
      labelCashGiven.classList.remove("hide");
      calculateBtn.classList.remove("hide");
      submitBtn.classList.add("hide");
      messageContainer.innerText = "";
      submitBtn.setAttribute("type", "button");
      calculateBtn.setAttribute("type", "submit");
    }, 800);
  } else {
    messageContainer.innerText = "Enter valid bill amount";
  }
});

calculateBtn.addEventListener("click", () => {
  if (
    billAmtInputField.value !== "" &&
    parseInt(billAmtInputField.value, 10) > 0 &&
    cashGivenInputField.value !== "" &&
    parseInt(cashGivenInputField.value, 10) > 0 &&
    Number.isInteger(parseFloat(billAmtInputField.value)) &&
    Number.isInteger(parseFloat(cashGivenInputField.value))
  ) {
    const totalBillAmount = parseInt(billAmtInputField.value, 10);
    const totalCashGiven = parseInt(cashGivenInputField.value, 10);
    if (totalBillAmount === totalCashGiven) {
      graphic.setAttribute("src", "/");
      table.classList.add("hide");
      messageContainer.innerText = "no need to return anything";
    } else if (totalCashGiven < totalBillAmount) {
      table.classList.add("hide");
      messageContainer.innerText = "Cash given is less than total bill amount!";
      graphic.setAttribute(
        "src",
        "https://memes.co.in/memes/update/uploads/2021/04/mirzapur_memes-20210420-0001-950x500.jpg"
      );
    } else {
      const totalAmtToBeReturn = functions.getTotalAmtToBeReturn(
        totalBillAmount,
        totalCashGiven
      );
      const noteList = functions.getNoteList();
      const minNumberOfNotesToBeReturn = functions.getMinNumberOfNotes(
        noteList,
        totalAmtToBeReturn
      );
      const numberOfNotesCellList = document.querySelectorAll(
        ".number-of-notes"
      );
      for (let i = 0; i < numberOfNotesCellList.length; i++) {
        numberOfNotesCellList[i].innerText = minNumberOfNotesToBeReturn[i];
      }
      table.classList.add("hide");
      graphic.setAttribute("src", "/");
      messageContainer.innerText = "calculating...";
      setTimeout(() => {
        messageContainer.innerText = "result below 👇";
        table.classList.remove("hide");
        cashRegisterSoundEffect.play();
      }, 800);
    }
  } else if (
    billAmtInputField.value === "" ||
    parseInt(billAmtInputField.value, 10) <= 0 ||
    Number.isInteger(parseFloat(billAmtInputField.value)) === false
  ) {
    graphic.setAttribute("src", "/");
    table.classList.add("hide");
    messageContainer.innerText = "Enter valid bill amount";
  } else {
    graphic.setAttribute("src", "/");
    table.classList.add("hide");
    messageContainer.innerText = "Enter valid cash given value";
  }
});
