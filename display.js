var Table = require('cli-table');
var colors = require('colors');

var exports = module.exports = {};

function welcome() {
    var table = new Table(
        {
            head: ['\nWelcome to the mhamdani store!\n'.magenta.bold],
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
        }
    );
    console.log(table.toString());
}

exports.welcome = welcome;
