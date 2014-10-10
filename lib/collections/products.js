Products = new Meteor.Collection("products");

Products.allow({
  insert: function (userId, doc) {
    return (userId && _.contains(doc.owner, userId));
  },
  update: function (userId, doc, fields, modifier) {
    return (userId && _.contains(doc.owner, userId));
  },
  remove: function (userId, doc) {
    return (userId && _.contains(doc.owner, userId));
  },
  fetch: ['owner']
});

Products.deny({
  update: function (userId, doc, fields, modifier) {
    return _.contains(fields, 'owner');
  },
  fetch: ['owner']
});

var Schemas = {};
Schemas.Products = new SimpleSchema({
  name: {
    type: String,
    label: "Nom",
    max: 250
  },
  price: {
    type: Number,
    label: "Prix",
    max: 100
  },
  desc: {
    type: String,
    label: "Description",
    max: 250,
    optional: true
  }
});

Products.attachSchema(Schemas.Products);