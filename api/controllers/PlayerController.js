/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    signup: function(req,res){
        var player = req.param('player');
        console.log(player);
        if(player){
            Player.create(player).exec(function(err,rec){
                if(err){
                     console.log(err);
                     return res.serverError();
                }
                return res.ok();
            });
        }
    }

    id: function(req,res){
        var playerid=req.param('id');
        if(!playerid){
            return res.invalidRequest();
        }
        Player.findOne({id:playerid}).exec(function(err,obj){
            if(err){
                return res.serverError();
            }
            return res.json(obj);
        })
    }

    // update: function(req,res){
    //     if(req)
    // }
	
};

