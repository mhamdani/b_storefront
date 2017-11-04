var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var colors = require('colors');
var database = require('./database.js');
var bluebird = require('bluebird');


var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function(error) {
    if (error) {
        console.log('Error: ', error);
    }
    // console.log("======CONNECTED ID=======: "+ connection.threadId);
});

var query = bluebird.promisify(connection.query, {
    context: connection
});

var exports = module.exports = {};

function customerDisplay() {
    var customerProducts = new Table(
        {
            head: ['ID', 'Product', , 'Department     ','Price          ', 'Quantity       '],
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
        }
    );
    return query('SELECT id, product_name, department_name, price, stock_quantity FROM products ORDER BY id')
    .then(function(results) {
        if (results.length) {
            for (var i = 0; i < results.length; i++) {
                customerProducts.push(
                    [
                        results[i].id,
                        results[i].product_name,
                        results[i].department_name,
                        '$' + results[i].price,
                        results[i].stock_quantity,
                    ]
                );
            }
            console.log(customerProducts.toString());
        } else {
            console.log('No products in stock!');
        }
    })
        console.log('Display Products Error');
        process.exit();
}

function checkStock(id) {
    return query('SELECT stock_quantity, price, department_name FROM products WHERE ?', {
        id : id
    })
    .then(function(results) {
        if (results.length) {
            return results;
        } else {
            return false;
        }
    })
    .catch(function(error) {
        console.log('Check Stock Error: ', error);
        process.exit();
    });
}

// function addSales(department, sales) {
//     var salesDept = department;
//     var newSales = sales;
//     return query('SELECT total_sales FROM departments WHERE ?', {
//         department_name : salesDept
//     })
//     .then(function(result) {
//         var totalSales = result[0].total_sales;
//         var updatedSales = (parseFloat(totalSales) + parseFloat(newSales)).toFixed(2);
//         return query('UPDATE departments SET ? WHERE ?', [{
//             total_sales: updatedSales
//         }, {
//             department_name: salesDept
//         }])
//         .catch(function(error) {
//             console.log('Updated Sales Error: ', error);
//         });
//     })
//     .catch(function(error) {
//         console.log('Add Sales Error: ', error);
//         process.exit();
//     });
// }

function removeStock(id, units, stock) {
    var updateStock = parseInt(stock - units);
    return query('UPDATE products SET ? WHERE ?', [{
        stock_quantity: updateStock
    }, {
        id: id
    }]);
}

function lowInventory() {
    return query('SELECT * FROM products WHERE stock_quantity < 5')
    .then(function(results) {
        if (results.length) {
            var lowInventoryTbl = new Table (
                {
                    head: ['ID', 'Product', 'Category', 'Department', 'Price', 'Stock'],
                    chars: {
                        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                        , 'right': '║', 'right-mid': '╢', 'middle': '│'
                    }
                }
            );
            for (var i = 0; i < results.length; i++) {
                lowInventoryTbl.push(
                    [
                        results[i].item_id,
                        results[i].product_name,
                        results[i].category_name,
                        results[i].department_name,
                        '$' + results[i].price,
                        results[i].stock_quantity
                    ]
                )
            }
            console.log(lowInventoryTbl.toString());
        } else {
            console.log('All products are sufficiently stocked!');
        }
    });
}

exports.customerDisplay = customerDisplay;
exports.checkStock = checkStock;
exports.removeStock = removeStock;
// exports.addSales = addSales;
exports.lowInventory = lowInventory;
