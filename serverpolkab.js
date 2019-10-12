//const sirv = require('sirv');
//const compression = require('compression');
//const { json } = require('body-parser');

import polka from "polka";
import sirv from "sirv";
import compression from "compression";
import { json } from 'body-parser';

var { PORT , NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
if(PORT == null){PORT = process.env.PORT || 8080;}

const app = polka();
app.use(json());//need for window.URL.createObjectURL
app.use(compression({ threshold: 0 }));
app.use(sirv('public', { dev }));
//app.use(Gun.serve);
//console.log("PORT: "+PORT);
//app.listen(PORT); //this will return polka
app.listen(PORT, err => {
    if (err) throw err;
    //console.log(app);
    console.log(`> Running on localhost:`+PORT);
});

console.log("test babel 7");