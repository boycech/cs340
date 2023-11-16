let updateTransactionForm = document.getElementById('update-transaction-form-ajax');

updateTransactionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputTransactionID = document.getElementById("transactionSelect");
    let inputTotalCost = document.getElementById("input-totalCost");
    let inputCustomerID = document.getElementById("input-customerID");
    let inputPaymentType = document.getElementById("input-paymentType");

    let transactionIDValue = inputTransactionID.value;
    let totalCostValue = inputTotalCost.value;
    let customerIDValue = inputCustomerID.value;
    let paymentTypeValue = inputPaymentType.value;

    if (isNaN(inputTransactionID)) 
    {
        return;
    }

    if (isNaN(inputTotalCost)) 
    {
        return;
    }

    if (isNaN(inputPaymentType)) 
    {
        return;
    }



    let data = {
        transactionID: transactionIDValue,
        totalCost: totalCostValue,
        customerID: customerIDValue,
        paymentType: paymentTypeValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-transaction-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, transactionIDValue);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error.");
        }
    }

    xhttp.send(JSON.stringify(data));
});

function updateRow(data, transactionID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("transactions-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == transactionID) {
 

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdTotalCost = updateRowIndex.getElementsByTagName("td")[2];
            let tdCustomerID = updateRowIndex.getElementsByTagName("td")[3];
            let tdPaymentType = updateRowIndex.getElementsByTagName("td")[4];

            tdTotalCost.innerHTML = parsedData.totalCost;
            tdCustomerID.innerHTML = parsedData.customerID;
            tdPaymentType.innerHTML = parsedData.paymentType;
        }
    }
}