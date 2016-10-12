/**
 * Player.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    mit: {
      type: 'boolean',
      required: true,
      defaultsTo: true
    },
    number: {
      type: 'string',
      required: true
    },
    regno: {
      type: 'string'
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    mf: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    worth: {
      type: 'float',
      required: true,
      defaultsTo: '50000.0'
    },
    updateTime: {
      type: 'datetime'
    },
    liquid: {
      type: 'float',
      required: true,
      defaultsTo: '50000.0'
    },
    stocks: {
    type: 'json',
      defaultsTo: '{}'
    },
    inStock: {
      type: 'json',
      defaultsTo: '[]'
    },
    outStock: {
      type: 'json',
      defaultsTo: '[]'
    },
    inMF: {
      type: 'json',
      defaultsTo: '{}'
    },
    outMF: {
      type: 'json',
      defaultsTo: '{}'
    },
    ownedMF: {
      type: 'json',
      defaultsTo: '[]'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  }
};

