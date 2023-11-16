addTransactionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputTimeStamp = document.getElementById("input-timeStamp");
    let inputTotalCost = document.getElementById("input-totalCost");
    let inputCustomerID = document.getElementById("input-customerID");
    let inputPaymentType = document.getElementById("input-paymentType");

    let timeStampValue = inputTime.value;
    let totalCostValue = parseFloat(inputTotalCost.value);
    let customerIDValue = parseInt(inputCustomerID.value);
    let paymentTypeValue = inputPaymentType.value;

    let data = {
        timeStamp: timeStampValue,
        totalCost: totalCostValue,
        customerID: customerIDValue,
        paymentType: paymentTypeValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-transaction-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);

            inputTime.value = '';
            inputTotalCost.value = '';
            inputCustomerID.value = '';
            inputPaymentType.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error.")
        }
    }

    xhttp.send(JSON.stringify(data));
})

addRowToTable = (data) => {
    let currentTable = document.getElementById("transactions-table");
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]


    let row = document.createElement("TR");
    let transactionIDCell = document.createElement("TD");
    let timeStampCell = document.createElement("TD");
    let totalCostCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let paymentTypeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");


    transactionIDCell.innerText = newRow.transactionID;
    timeStampCell.innerText = newRow.timeStamp;
    totalCostCell.innerText = newRow.totalCost;
    customerIDCell.innerText = newRow.customerID;
    paymentTypeCell.innerText = newRow.paymentType;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTransaction(newRow.id);
    };

    row.appendChild(transactionIDCell);
    row.appendChild(timeStampCell);
    row.appendChild(totalCostCell);
    row.appendChild(customerIDCell);
    row.appendChild(paymentTypeCell);

    row.setAttribute('data-value', newRow.id);
    
    currentTable.appendChild(row);
}

addRowToTable = (data) => {
    let currentTable = document.getElementById("transactions-table");
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("tr");
    let transactionIDCell = document.createElement("td");
    let totalCostCell = document.createElement("td");
    let customerIDCell = document.createElement("td");
    let paymentTypeCell = document.createElement("td");

    let deleteCell = document.createElement("td");
    
    transactionIDCell.innerText = newRow.transactionID;
    totalCostCell.innerText = newRow.totalCost;
    customerIDCell.innerText = newRow.customerID;
    paymentTypeCell.innerText = newRow.paymentType;

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function() {
        deleteTransaction(newRow.transactionID);
    };


    row.appendChild(transactionIDCell);
    row.appendChild(totalCostCell);
    row.appendChild(customerIDCell);
    row.appendChild(paymentTypeCell);
    row.appendChild(deleteButton);

    row.setAttribute('data-value', newRow.transactionID);

    currentTable.appendChild(row);

    // Add new transaction to the dropdown menu for updating transactions
    let selectMenu = document.getElementById("transactionSelect");
    let option = document.createElement("option");
    option.text = newRow.transactionID;
    option.value = newRow.transactionID;
    selectMenu.add(option);
}
