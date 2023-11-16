function deleteTransaction(transactionID) {
    let link = '/delete-transaction-ajax/';
    let data = {
      id: transactionID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(transactionID, 'transactions-table');
      }
    });
  }
  
  function deleteRow(transactionID) {
    let table = document.getElementById('transactions-table');
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == transactionID) {
             table.deleteRow(i);
             break;
        }
     }
 }

 function deleteTransaction(transactionID) {
    let data = {
        id: transactionID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-transaction-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(transactionID);

        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error.");
        }
    };

    xhttp.send(JSON.stringify(data));
}

function deleteRow(transactionID) {
    let table = document.getElementById('transactions-table');
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == transactionID) {
            table.deleteRow(i);
            break;
        }
    }
}
