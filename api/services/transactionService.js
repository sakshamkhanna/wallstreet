module.exports= {


    buyStock: function(playerID,stockSym,qty,timestamp,stockPrice,callback){
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
        if(player.liquid >= (stock.snapshot['value'] * qty)){
            if(!player.stocks[stockSym]){
                player.stocks[stockSym]=qty;
            }
            else{
                player.stocks[stockSym]+=qty;
            }
            player.inStock.push({
                symbol: stockSym,
                qty: qty,
                timestamp: timestamp
            });
            player.save(function(err){
                callack(err);
                return;
            });
            callack(null);
            return;
        }
        else{
            callback(true);
            return;
        }
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
    }
}