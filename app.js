/*
    SETUP
*/
// app.js

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 54900;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./db-connector')


/*
    ROUTES
*/

app.delete('/delete-transaction-ajax/', function(req, res, next) {
    let data = req.body;
    let transactionID = parseInt(data.id);
    let deleteTransaction = `DELETE FROM transactions WHERE transactionID = ?`;

    db.pool.query(deleteTransaction, [transactionID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad request if there's an error
        } else {
            res.sendStatus(204); // Send a success status indicating deletion
        }
    });
});



app.post('/add-transaction-ajax', function(req, res) {
    let data = req.body;

    // Parsing the incoming data
    let totalCost = parseFloat(data.totalCost);
    let customerID = parseInt(data.customerID);
    let timeStamp = data.timeStamp; // Assuming timeStamp is received as a string
    let paymentType = data.paymentType; // Assuming paymentType is received as a string

    // Create the query to insert into transactions table
    let query = `INSERT INTO transactions (timeStamp, totalCost, customerID, paymentType) VALUES ('${timeStamp}', ${totalCost}, ${customerID}, '${paymentType}')`;

    // Run the query on the database
    db.pool.query(query, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad request if there's an error
        } else {
            // Select all transactions after insertion
            let selectQuery = 'SELECT * FROM transactions';
            db.pool.query(selectQuery, function(error, rows) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400); // Bad request if there's an error in the second query
                } else {
                    res.send(rows); // Send the results of the query back
                }
            });
        }
    });
});


app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM transactions;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

    app.put('/put-transaction-ajax', function(req,res,next){
        let data = req.body;
      
        let transactionID = parseInt(data.transactionID);
        let totalCost = parseFloat(data.totalCost);
        let customerID = parseInt(data.customerID);
        let paymentType = data.paymentType;
      
        let queryUpdateTransaction = `UPDATE transactions 
        SET totalCost = ?, customerID = ?, paymentType = ? 
        WHERE transactionID = ?`;

        let selectTransaction = `SELECT * FROM transactions WHERE transactionID = ?`;
      
        db.pool.query(queryUpdateTransaction, [totalCost, customerID, paymentType, transactionID], function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
            
                db.pool.query(selectTransaction, [transactionID], function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows); 
                    }
                });
            }
        });
    });

    /*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

