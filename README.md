# bamazon_storefront
An app that simulates an Amazon-like storefront with MySQL and takes in orders from customers, depletes stock from the store's inventory, and returns total cost of purchase. This app requires the MySQL and Inquirer npm packages and has functionality for data input and storage.

## Customer
The User (Customer) is shown a list of products from the bamazon database and then prompted to confirm whether or not they would like to purchase an item.

If User would like to purchase an item, they are prompted to type in the product ID number of the item they wish to purchase and indicate how many units. If sufficient inventory exist for the item User wishes to purchase, the total cost of the transaction will be posted for the User to see. If the user decides to continue with the purchase, the transaction will complete and an updated unit quantity will appear in the bamazon database. 

If the requested product does not have the sufficient inventory to fulfill the order, User will be notified of how many units are in stock, and be given the option to continue with the purchasing process.


## Technology

  * [Node](https://nodejs.org/en/)
  * [bluebird](http://bluebirdjs.com/docs/install.html)
  * [cli-table](https://www.npmjs.com/package/cli-table)
  * [clear](https://www.npmjs.com/package/clear)
  * [colors](https://www.npmjs.com/package/colors)
  * [inquirer](https://www.npmjs.com/package/inquirer)
  * [mysql](https://www.npmjs.com/package/mysql)
