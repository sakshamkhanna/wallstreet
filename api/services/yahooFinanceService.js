var request = require('request');

module.exports =  {
    FetchStockValues : function(){

        var time=Date.now();

        function updateStock(err,newStock,data){
            if(!err){
                console.log('updating the value with ' + newStock.archive.length);
                Stock.update({
                    symbol: data['Symbol']},newStock).exec(function(err,obj){
                        if(err) console.log(err);
                        else console.log('Updated value of '+data['Symbol']+' to '+data['Ask']);
                    });
                // newStock.save(function(err){
                //     if(err) console.log(err);
                // });
            }
        }

        function pushNew(newStock){
            Stock.create(newStock).exec(function(err,obj){
                if(err) console.log(err);
                else console.log('New entry created in stock db : '+newStock['symbol']);
            })
        }

        function createNew(err,old,data){
            if(!err){
                var newStock=old;
                if(!newStock) newStock= {
                    symbol: data['Symbol'],
                    name:data['Name'],
                    archive: []
                };
                newStock.snapshot={
                    value: data['Ask'],
                    change: data['Change'],
                    timestamp: time
                }
                newStock.archive.push(newStock.snapshot);
                if(!old){
                    pushNew(newStock);
                }
                else{
                    updateStock(err,newStock,data);
                }
            }
            else{
                console.log(err);
            }
        }

        function findExisting(data){
            var sym=data['Symbol'];
            Stock.findOne({symbol:sym}).exec(function(err,obj){
                createNew(err,obj,data);
            })
        }

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                var query=data['query'];
                var results=query['results'];
                var quote=results['quote'];
                for(var i=0;i<query['count'];i++){
                    findExisting(quote[i]);



                    // if(old){

                    // }
                    // var stock={
                    //     symbol: quote[i]['Symbol'],
                    //     name: quote[i]['Name'],
                    // };
                    // console.log(stock);
                    // var snapshot={
                    //     value: quote[i]['Ask'],
                    //     change: quote[i]['Change'],
                    //     timestamp: time
                    // };
                    // Stock.findOne({
                    //     symbol: stock.symbol
                    // }).exec(function (err, old){
                    //     if(err){
                    //         console.log(err);
                    //     }
                    //     else{
                    //         if(!old){
                    //             stock.snapshot=snapshot;
                    //             stock.archive=[snapshot];
                    //             Stock.create(stock).exec(function(err,obj){
                    //                 if(err){
                    //                     console.log(err);
                    //                 }
                    //                 else{
                    //                     console.log('New Stock created');
                    //                 }
                    //             });
                    //         }
                    //         else{
                    //             console.log('old stock found');
                    //             console.log(old);
                    //             var archive=old.archive;
                    //             archive.push(snapshot);
                    //             Stock.update({
                    //                 symbol:stock.symbol},{
                    //                 snapshot: snapshot,
                    //                 archive: archive
                    //             }).exec(function(err,updated){
                    //                 if(err){
                    //                     console.log(err);
                    //                 }
                    //                 else{
                    //                     console.log(updated.symbol+':'+updated.snapshot);
                    //                 }
                    //             });
                    //         }
                    //     }
                    // });
                    // console.log(quote[i]['symbol']+'  '+quote[i]['Ask']);
                }
            }
            else{
                console.log(error);
            }
        }
        var query='select * from yahoo.finance .quotes where symbol in ("YHOO","AAPL","GOOG"," MSFT")';
        var options={
            url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance%20.quotes%20where%20symbol%20in%20(%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22%20MSFT%22)%0A%09%09&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback='
        }

        request(options,callback);
    }
}