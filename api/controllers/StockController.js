/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    listStocks: function(req,res){
        var arch=req.param('archive');
        if(!arch || arch==false){
            Stock.find({select: ['symbol','name','snapshot']}).exec(function(err,obj){
                if(err){
                    console.log(err);
                    return res.serverError();
                }
                return res.json(obj);
            });
        }
        else{ 
            Stock.find({select: ['symbol','name','snapshot','archive']}).exec(function(err,obj){
                if(err){
                    console.log(err);
                    return res.serverError();
                }
                return res.json(obj);
            });
        }
    },

    buyStock: function(req,res){
        var pid,sym,qty,time,price;
        sym=req.param('stockSymbol');
        qty=req.param('qty');
        time=Date.now();
        price=req.param('price');
        if(!sym || !qty){
            return res.badRequest();
        }

        
        //validate for latest values

        transactionService.buyStock(req.user.id,sym,qty,time,price,function(err){
            if(!err){
                var success = {status: 1};
                return res.send(success);
            }
            else{
                console.log(err);
                var failure = {status: -1};
                return res.send(failure);
            }
        });
    },

    sellStock: function(req,res){
        var pid,sym,qty,time,price;
        pid=req.param('playerID');
        sym=req.param('stockSymbol');
        qty=Number(req.param('qty'));
        time=Date.now();
        price=req.param('price');
        if(!pid || !sym || !qty){
            return res.badRequest();
        }

        
        //validate


        transactionService.sellStock(pid,sym,qty,time,price,function(err){
            if(!err){
                return res.ok();
            }
            else{
                console.log(err);
                return res.redirect('back');
            }
        });
    }
};

