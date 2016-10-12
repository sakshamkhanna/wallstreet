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
                var quote = JSON.parse(body.replace("// ", ""));
                for(var i=0;i<quote.length;i++){
                    var smallquote = {
                        Symbol: quote[i].t,
                        Ask: quote[i].l,
                        Change: quote[i].c,
                        Name: quote[i].t
                    }
                    findExisting(smallquote);



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

        var symbols = "MSFT,YHOO";
        var options={
            url: 'http://finance.google.com/finance/info?client=ig&q=NASDAQ:' + symbols
        }

        request(options,callback);
    }
}