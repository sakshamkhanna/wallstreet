module.exports= {


    buyStock: function(playerID,stockSym,qty,timestamp,stockPrice,callback){
        console.log(playerID);
        Player.findOne({id: playerID}).exec(function(err,player){
            if(err){
                callack(err);
                return;
            }
            Stock.findOne({symbol: stockSym}).exec(function(err,stock){
                if(err){
                    callack(err);
                    return;
                }
                if(!player || !stock){
                    console.log('Invalid params');
                    console.log(player);
                    console.log(stock);
                    return;
                }
                if(player.liquid >= (stock.snapshot['value'] * qty)){

                    player.liquid-=(stock.snapshot['value'] * qty);

                    console.log('-----------------------------------');
                    if(!player.stocks[stockSym]){
                        player.stocks[stockSym]=qty;
                    }
                    else{
                        player.stocks[stockSym]+=qty;
                    }
                    console.log(player.stocks);
                    player.inStock.push({
                        symbol: stockSym,
                        qty: qty,
                        timestamp: timestamp
                    });
                    Player.update({id:player.id},player).exec(function(err){
                        if(err) console.log(err);
                    });
                    // player.save(function(err){
                    //     callback(err);
                    //     return;
                    // });
                    console.log("new player");
                    console.log(player);
                    callback(null);
                    return;
                }
                else{
                    callback(true);
                    return;
                }

            });
        });

    },




    sellStock: function(playerID,stockSym,qty,timestamp,stockPrice,callback){
        var player,stock;
        Player.findOne({id: playerID}).exec(function(err,obj){
            if(err){
                callack(err);
                return;
            }
            player=obj;
        });
        Stock.findOne({symbol: stockSymol}).exec(function(err,obj){
            if(err){
                callack(err);
                return;
            }
            stock=obj;
        });
        if(!player.stocks[stockSym] || player.stocks[stockSym]<qty){
            callback(true);
            return;
        }
        player.stocks[stockSym]-=qty;
        player.liquid+=(stock.snapshot['value'] * qty);
        player.save(function(err){
            callack(err);
            return;
        });
        callack(null);
        return;
    },


    investMF: function(source,target,amount){
            Player.findOne({id:source}).exec(function(err,s){
            if(err){
                return res.serverError();
            }
            Player.findOne({id:target}).exec(function(err,p){
                if(err){
                    return res.serverError();
                }
                if(s.liquid<amt){
                    return res.invalidRequest();
                }
                calculateUserWorth.calculate(t.id,true);
                calculateUserWorth.calculate(s.id,false);
                var per=(amt/(amt+t.worth));
                p.liquid+=amt;
                s.liquid-=amt;
                if(!s.outMF[t.id]){
                    s.outMF[t.id]=0;
                }
                s.outMF[t.id]+=per;
                if(!t.inMF[s.id]){
                    t.inMF[s.id]=0;
                }
                t.inMF[s.id]+=per;
                s.ownedMF.push({
                    id:t.id,
                    per:per,
                    amt:amt
                });
                Player.update({id:s.id},s).exec(function(err){
                    console.log(err);
                });
                Player.update({id:p.id},p).exec(function(err){
                    console.log(err);
                });
            });
        });
    }
}