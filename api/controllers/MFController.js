/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    listMF: function(req,res){
        //TODO-validate
        Player.find({where:{ mf: true},
         select: ['id','name','mf','worth']}
         ).exec(function(err,obj){
            if(err){
                return res.serverError();
            }
            console.log(obj);
            res.json(obj);
        });
    },


    invest: function(req,res){
        //TODO-validate
        console.log(req.allParams());
        var id,amt;
        id=req.param('userid');
        amt=req.param('amt');

        if(!id || !amt){
            return req.invalidRequest();
        }
        //defer to transaction

    },

    enable: function(req,res){
        var playerid=req.param('playerid');
        if(!playerid){
            return res.invalidRequest();
        }
        Player.findOne({id:playerid}).exec(function(err,obj){
            if(err){
                return res.serverError();
            }
            obj.mf=true;
            obj.save();
        });
    },

    disable: function(req,res){
        var playerid=req.param('playerid');
        if(!playerid){
            return res.invalidRequest();
        }
        Player.findOne({id:playerid}).exec(function(err,obj){
            if(err){
                return res.serverError();
            }
            obj.mf=false;
            obj.save();
        });
    },

    
};