# bamazon_storefront
An app that simulates an Amazon-like storefront with MySQL and takes in orders from customers/deplete stock from the store's inventory. App requires the MySQL and Inquirer npm packages and has functionality for data input and storage.

## Customer
The User (Costumer) is shown a list of products from the bamazon database and then prompted to confirm whether or not they would like to purchase an item.

If User would like to purchase an item, they will be prompted to type in the product ID number of the item they wish to purchase/how many units. If sufficient units exist for the item User wishes to purchase, the transaction will complete and the inventory will reflect an updated quantity number in the bamazon database.

If a requested product does not have the requisite inventory, User will be notified of how many units are in stock, and be given the option to continue with the purchasing process.


## Technology

  * [Node](https://nodejs.org/en/)
  * [bluebird](http://bluebirdjs.com/docs/install.html)
  * [cli-table](https://www.npmjs.com/package/cli-table)
  * [clear](https://www.npmjs.com/package/clear)
  * [colors](https://www.npmjs.com/package/colors)
  * [inquirer](https://www.npmjs.com/package/inquirer)
  * [mysql](https://www.npmjs.com/package/mysql)
