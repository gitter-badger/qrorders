Template.profile.events({
  'click .logout': function (evt, tmpl) {
    evt.preventDefault();
    Meteor.logout();
    Router.go('home');
  },
  'click .save': function (evt, tmpl) {
    evt.preventDefault();
    var user = Meteor.user();
    var inputName = tmpl.find('#inputName').value.trim();
    if (inputName != '' && (!user.profile || user.profile.name !== inputName)) {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.name': inputName}});
      growl('OK', 'Profil mis à jours', 'success');
    };
    if (tmpl.find('#selectplace')) {
      var selectplace = tmpl.find('#selectplace').value.trim();
      Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.place': selectplace}});
    };
  }
});

Template.profile.helpers({
  user: function () {
    //console.log(Meteor.user());
    return Meteor.user();
  },
  isWaiter: function() {
    return Roles.userIsInRole(Meteor.user(), ['waiter']);
  },
  places: function() {
    return Places.find({waiter: Meteor.userId()}).fetch();
  }
});