/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    listMF: function(req,res){
        //TODO-validate
        Player.find({ select: ['id','name','mf','worth']}).exec(function(err,obj){
            if(err){
                return res.serverError();
            }
            var ret=[];
            for(var i=0;i<obj.length;i++){
                if(obj[i].mf){
                    ret.push(obj[i]);
                }
            }
        });
    },


    invest: function(req,res){
        //TODO-validate
        var source,target,amt;
        source=req.param('source');
        target=req.param('target');
        amt=req.param('amt');

        if(!source || !target || !amt){
            return req.invalidRequest();
        }
        Player.findOne({id:source}).exec(function(err,s){
            if(err){
                return res.serverError();
            }
            if(s.liquid<amt){
                return res.invalidRequest();
            }
            Player.findOne({id:target}).exec(function(err,p){
                if(err){
                    return res.serverError();
                    p.liquid+=amt;
                    s.liquid-=amt;
                    p.save();
                    s.save();
                }
            });
        });
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