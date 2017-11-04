var mysql = require('mysql');
var colors = require('colors');
var inquirer = require('inquirer');
var database = require('./database.js');
var display = require('./display.js');
var clear = require('clear');
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
});

var exports = module.exports = {};

var query = bluebird.promisify(connection.query, {
    context: connection
});

var mainMenu = function() {
  clear();
  display.welcome();
  database.customerDisplay()
  .then(function() {
    inquirer.prompt([
    {
      name: 'confirm',
      type: 'confirm',
      message: '\n\nHello! Would you like to purchase any of items above?'.green.bold
    },
  ]).then(function(answer){
      if (answer.confirm) {
        makePurchase();
      } else {
        console.log('\n\nThanks for checking us out!'.magenta.bold)
        clear();
        process.exit();
      }
    });
  })
  .catch(function(error) {
    throw error;
});
}
mainMenu();

function makePurchase() {
    var id;
    var units;
    var stock;
    var price;
    var department;
    // get product id and units
    inquirer.prompt([
        {
            name: 'id',
            type: 'prompt',
            message: '\nPlease enter the ID # of the item you wish to purchase:'.cyan.bold
        }
    ])
    .then(function(answer) {
        id = answer.id;
        function getUnits(id) {
            inquirer.prompt([
                {
                    name: 'units',
                    type: 'prompt',
                    message: '\nHow many units would you like to purchase?'.magenta.bold
                }
            ])
            .then(function (answer) {
                units = answer.units;
                // get stock quantity from database
                return database.checkStock(id);
            })
            .then(function(results) {
                clear();
                if (results) {
                    // save stock quantity and price
                    stock = results[0].stock_quantity;
                    price = results[0].price;
                    department = results[0].department_name;
                    // if enough units are in stock...
                    if (stock >= units) {
                        var total = parseFloat(price * units).toFixed(2);
                        console.log('Product is in stock! Total is: $' + total);
                        // confirm purchase
                        inquirer.prompt([
                            {
                                name: 'confirm',
                                type: 'confirm',
                                message: 'Would you like complete your purchase?'
                            }
                        ]).then(function (answer) {
                            if (answer.confirm) {
                                console.log('\n\nThank you for your purchase!\n'.rainbow);
                                // update stock
                                database.removeStock(id, units, stock);
                                // update sales
                                // database.addSales(department, total);
                                inquirer.prompt([
                                    {
                                        name: 'confirm',
                                        type: 'confirm',
                                        message: '\n\nReturn to home page?'.magenta
                                    }
                                ])
                                .then(function (answer) {
                                    if (answer.confirm) {
                                        mainMenu();
                                    } else {
                                        console.log('\n\nThanks for checking us out! 😎 \nHope to see you again soon!\n\n'.bold);
                                        process.exit();
                                    }
                                });
                            } else {
                                console.log('Returning to home page...');
                                customerPage();
                            }
                        });
                        // if not enough in stock...
                    } else if (stock > 0) {
                        console.log('Only ' + stock + ' left in stock!');
                        inquirer.prompt([
                            {
                                name: 'confirm',
                                type: 'confirm',
                                message: 'We do not have sufficient inventory.\n\nTo purchase this item, you will need to pick a unit number within the quantity amount we have available. \n\nWould you still like to purchase this product?'.red
                            }
                        ]).then(function (answer) {
                            if (answer.confirm) {
                                getUnits(id);
                            } else {
                                console.log('Returning to home page...');
                                customerPage();
                            }
                        });
                    } else {
                        console.log('No more items in stock!');
                        inquirer.prompt([
                            {
                                name: 'confirm',
                                type: 'confirm',
                                message: 'Would you like to make another purchase?'.magenta
                            }
                        ]).then(function (answer) {
                            if (answer.confirm) {
                                makePurchase();
                            } else {
                                clear();
                                console.log('\n\nThanks for checking us out! 😎 \nHope to see you again soon!\n\n'.bold);
                                process.exit();
                            }
                        });
                    }
                } else {
                    console.log('Not a valid product ID');
                    inquirer.prompt([
                        {
                            name: 'confirm',
                            type: 'confirm',
                            message: 'Would you like to make another purchase?'.magenta
                        }
                    ]).then(function (answer) {
                        if (answer.confirm) {
                            makePurchase();
                        } else {
                            clear();
                            console.log('\n\nThanks for checking us out! 😎 \nHope to see you again soon!\n\n'.bold);
                            process.exit();
                        }
                    });
                }
            })
            .catch(function (error) {
                if (error) {
                    console.log('Make Purchase Error: ', error);
                    process.exit();
                }
            });
        }
        getUnits(id);
    });
}
