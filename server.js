var express = require("express");
var app     = express();
app.use(express.static(__dirname));
var path    = require("path");
var mongodb = require('mongodb');


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/mongo', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
	var q = req.query.q;
var MongoClient = mongodb.MongoClient;

var url = 'mongodb://tarekzrl:tarekzrl@ds161503.mlab.com:61503/jsons';      
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

if(q) {
db.collection("docs").aggregate([{$match: { $text: { $search: ".*" + q + ".*" }}}, { $sort: {score: { $meta: "textScore" }}}, {$limit: 20}]).toArray(function(err,result) {
  db.close();
    if (err) throw err;
res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(result,null,4));
});
}
}
});

});
app.listen(process.env.PORT || 3000);
