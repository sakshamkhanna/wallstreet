module.exports =  {
    calculate: function(playerID,critical){
        console.log('calculationg worth of '+playerID);
        Player.findOne({id:playerID}).exec(function(err,player){
            if(err) console.log(err);
            if(!player) return;
            var need=false;
            need= need | critical;
            need= need | !player.updateTime;
            if(updateTime){
                var diff=Date.now()-player.updateTime;
                need= need | diff > 300000;
            }
            if(need){
                var w=0.0;
                w+=player.liquid;
                for (s in player.stocks){
                    var val=0;
                    Stock.findOne({symbol: s.symbol}).exec(function(err,obj){
                        if(err) console.log(err);
                        val=obj.snapshot.value * player.stocks[s];
                    });
                    w+=val;
                }
                //?? include invested amount
                
                var per= 0.0;
                for (s in player.inMF){
                    per+=Number(player.inMF[s]);
                }

                w=w*(100-per);
                player.worth=w;
                player.updateTime=Date.now();
                Player.update({id:player.id},player).exec(function(err){
                    if(err) console.log(err);
                });
            }
        });
    }
}