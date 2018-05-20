//
//Basic QA Cinema App
//

var tableDiv = document.getElementById("table-div");
tableDiv.style.display = "none";
var dayMenu = document.getElementById("day-div");
dayMenu.style.display = "block";

ticketTable = document.getElementById("ticket-table");
function fillCell(cell, child, style) {
  cell.appendChild(child);
  cell.classList.add(style);
}

//Set initial total price display
var totalPrice = 0;
var totalPriceField = document.getElementById("total-price-display");
var totalPriceText = document.createTextNode("Total: £" + totalPrice);
totalPriceField.appendChild(totalPriceText);

//Create Menu for Days
var daySelection = document.getElementById("day-selection");
var ticketDay = document.getElementById("ticket-day");

function createDropDownButton(day) {
  button = document.createElement("BUTTON");
  buttonText = document.createTextNode(day);
  button.appendChild(buttonText);
  button.classList.add("button");
  button.addEventListener("click", function() {
    if (day === "Wednesday") {
      standardTicket.price = 6;
      oapTicket.price = 4;
      studentTicket.price = 4;
      childTicket.price = 2;
    }
    else {
      standardTicket.price = 8;
      oapTicket.price = 6;
      studentTicket.price = 6;
      childTicket.price = 4;
    }
    dayMenu.style.display="none";
    tableDiv.style.display="block";
    ticketDay.innerText = day;
  });
  daySelection.appendChild(button);
}

var dayList = ["Monday", "Tuesday", "Wednesday", "Thursday",
               "Friday", "Saturday", "Sunday"];
for (var i=0; i<dayList.length; i++) {
  createDropDownButton(dayList[i]);
}



//Create tickets
var standardTicket = createTicket("Standard");
createTicketDiv(standardTicket);
var oapTicket = createTicket("OAP");
createTicketDiv(oapTicket);
var studentTicket = createTicket("Student");
createTicketDiv(studentTicket);
var childTicket = createTicket("Child");
createTicketDiv(childTicket);

function createTicket(ticketType) {
  ticket = {
    type: ticketType,
    price: 0,
    amount: 0,
  };
  return ticket;
}

function createTicketDiv(ticket){
  
  var row = ticketTable.insertRow(ticketTable.rows.length);
  
  var ticketTypeField = document.createTextNode(ticket.type);
  fillCell(row.insertCell(0), ticketTypeField, "tabletext");
  
  
  var decreaseButton = document.createElement("BUTTON");
  var decreaseButtonText = document.createTextNode("-");
  decreaseButton.classList.add("minusbutton");
  decreaseButton.appendChild(decreaseButtonText);
  decreaseButton.addEventListener('click', function(){
    if (ticket.amount>0){
      ticket.amount--;
      ticketAmountField.innerText = " " + ticket.amount + " ";
      unitPriceField.innerText = "£" + ticket.amount*ticket.price;
      totalPrice-=ticket.price;
      totalPriceField.innerText = "Total: £" + totalPrice;
    }
  });
  fillCell(row.insertCell(1), decreaseButton);
  
  var ticketAmountField = document.createElement("SPAN");
  var ticketAmountText = document.createTextNode(" " + ticket.amount + " ");
  ticketAmountField.appendChild(ticketAmountText);
  fillCell(row.insertCell(2), ticketAmountField, "tabletext");
  
  var increaseButton = document.createElement("BUTTON");
  var increaseButtonText = document.createTextNode("+");
  increaseButton.classList.add("plusbutton");
  increaseButton.appendChild(increaseButtonText);
  increaseButton.addEventListener('click', function(){
    ticket.amount+=1;
    ticketAmountField.innerText = " " + ticket.amount + " ";
    unitPriceField.innerText = "  £" + ticket.amount*ticket.price;
    totalPrice+=ticket.price;
    totalPriceField.innerText = "Total: £" + totalPrice;
  });
  fillCell(row.insertCell(3), increaseButton);
  
  var unitPriceField = document.createElement("SPAN");
  var unitPriceText = document.createTextNode("£" + ticket.amount*ticket.price);
  unitPriceField.appendChild(unitPriceText);
  fillCell(row.insertCell(4), unitPriceField, "tabletext");
}