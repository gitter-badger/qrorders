Meteor.publish('Places', function () {
  return Places.find({});
});

Meteor.publish('Products', function(placeId){
  return Products.find({place: placeId});
});

Meteor.publish('Orders', function(placeId){
  return Orders.find({place: placeId});
});

Meteor.publish('Lines', function(placeId){
  return Orders.find({place: placeId});
});

Meteor.publish('orderLines', function(orderId){
  return Orders.find({order: orderId});
});
