/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    listStocks: function(req,res){
        Stock.find({}).exec(function(err,obj){
            return res.json(obj);
        })
    },

    buyStock: function(req,res){
        var pid,sym,qty,time,price;
        pid=req.param('playerID');
        sym=req.param('stockSymbol');
        qty=req.param('qty');
        time=Date.now();
        price=req.param('price');
        if(!pid || !sym || !qty){
            return res.badRequest();
        }

        
        //validate


        transactionService.buyStock(pid,sym,qty,time,price,function(err){
            if(!err){
                return res.ok();
            }
            else{
                console.log(err);
                return res.redirect('back');
            }
        });
    },

    sellStock: function(req,res){
        var pid,sym,qty,time,price;
        pid=req.param('playerID');
        sym=req.param('stockSymbol');
        qty=req.param('qty');
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

