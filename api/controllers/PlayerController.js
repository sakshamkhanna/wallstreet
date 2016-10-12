/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    signup: function(req,res){
        var pp=req.allParams();
        console.log(req.body);
        var name = req.param('name');
        var reg = req.param('regid');
        var num = req.param('number');
        var email = req.param('email');
        var pwd = req.param('password');

        var player={
            name: name,
            regno: reg,
            number: num,
            email: email,
            password: pwd
        };

        console.log(player);
        Player.create(player).exec(function(err,rec){
            if(err){
                console.log(err);
                return res.serverError();
            }
            return res.ok();
        });
    },

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
        });
    }

    // update: function(req,res){
    //     if(req)
    // }
	
};