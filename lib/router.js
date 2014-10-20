Router.configure({
  layoutTemplate: 'layout'
});

Router.map( function () {
  this.route('home', {
    path: '/'
  });
  this.route('cart', {
    path: '/cart'
  });
  this.route('search', {
    path: '/search'
  });
  this.route('profile', {
    path: '/profile'
  });
  this.route('waiter', {
    path: '/waiter'
  });
  this.route('owner', {
    path: '/owner'
  });
  this.route('resto', {
    path: '/resto'
  });
  this.route('createPlace', {
    path: '/create'
  });
  this.route('editPlace', {
    path: '/edit/:_id',
    data: function() {
      return Places.findOne({_id: this.params._id});
    }
  });
  this.route('productsPlace', {
    path: '/products/:_id',
    onBeforeAction: function() {
      Meteor.subscribe('Products', this.params._id);
    },
    data: function() {
      return Places.findOne({_id: this.params._id});
    }
  });
  this.route('createProduct', {
    path: '/createproduct/:_id',
    data: function() {
      return Places.findOne({_id: this.params._id});
    }
  });
  this.route('editProduct', {
    path: '/editproduct/:place_id/:product_id',
    onBeforeAction: function() {
      Meteor.subscribe('Products', this.params.place_id);
    },
    data: function() {
      return Products.findOne({_id: this.params.product_id});
    }
  });
  this.route('createOrder', {
    path: '/createorder/:_id',
    onBeforeAction: function() {
      Meteor.subscribe('Products', this.params._id);
      Meteor.subscribe('Orders', this.params._id);
      Meteor.subscribe('Lines', this.params._id);
    },
    data: function() {
      templateData = {
        place: Places.findOne({_id: this.params._id}),
        lines: Lines.find({place: this.params._id}).fetch()
      }
      return templateData;
    }
  });
  this.route('adminUsers', {
      path:'/users',
      template: 'adminUsers',
      onBeforeAction: function() {
          if (Meteor.loggingIn()) {
              this.render(this.loadingTemplate);
          } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
              console.log('redirecting');
              this.redirect('/');
          }
      }
  });
});