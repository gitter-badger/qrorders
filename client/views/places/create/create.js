Template.createPlace.events({
  'click .addUser': function (evt, tmpl) {
    evt.preventDefault();
    var  inputMail, inputPassword = '';
    if (tmpl.find('#inputMail')) {
      inputMail = tmpl.find('#inputMail').value;
      inputPassword = tmpl.find('#inputPassword').value;
    };

    if ( inputMail != '' && inputPassword != '') {
      var valid = true;
      $('.form-group').removeClass('has-error');
      $('.form-group').removeClass('has-warning');

      var inputMail = $.trim(inputMail);
      var inputPassword = $.trim(inputPassword);

      if(!validateEmail(inputMail)) {
        // email faux !
        $('#mail').addClass('has-error');
        $('#inputMail').focus();
        $.growl({
          icon:'glyphicon glyphicon-warning-sign',
          title:'<strong> Erreur </strong>',
          message: 'Adresse email invalide'
        },{
          type: 'warning'
        });
        var valid = false;
      };

      if (inputPassword.length < 7) {
        // mot de passe trop court
        $('#password').addClass('has-error');
        $('#inputPassword').focus();
        $.growl({
          icon:'glyphicon glyphicon-warning-sign',
          title:'<strong> Erreur </strong>',
          message: 'Mot de passe trop court'
        },{
          type: 'warning'
        });
        var valid = false;
      };

      if (valid === true) {
        // tout vas bien, on créé l'utilisateur
        Accounts.createUser({email: inputMail, password : inputPassword}, function(err){
          if (err) {
            swal("Oops...", "Problème avec la création du compte", "error");
          } else {
            swal("Impec !", "Le compte à été créé!", "success");
          }
        });
      }
    };
  },
  'click .addPlace': function (evt, tmpl) {
    evt.preventDefault();
    var inputName, inputPhone = '';
    var inputName = tmpl.find('#inputName').value;
    var inputPhone = tmpl.find('#inputPhone').value;

    if (inputName != '' && inputPhone  != '' && Meteor.userId()) {
      var valid = true;
      $('.form-group').removeClass('has-error');
      $('.form-group').removeClass('has-warning');
      var inputName = $.trim(inputName);
      var inputPhone = $.trim(inputPhone);

      if (!validatePhone(inputPhone)) {
        // téléphone faux !
        $('#phone').addClass('has-error');
        $('#inputPhone').focus();
        $.growl({
          icon:'glyphicon glyphicon-warning-sign',
          title:'<strong> Erreur </strong>',
          message: 'Numéro de téléphone invalide'
        },{
          type: 'warning'
        });
        var valid = false;
      };

      if (valid === true) {
        var now = Date.now();
        Places.insert({
          name: inputName,
          phone: inputPhone,
          owner: [Meteor.userId()],
          waiter: [Meteor.userId()],
          created: now
        });
        swal("Impec !", "Le restaurant " + inputName + " à été créé!", "success");
        Meteor.call('user_set_owner');
        Meteor.call('user_set_waiter');
        Router.go('owner');
      };
    } else {
      $('.form-group').addClass('has-error');
      $.growl({
        icon:'glyphicon glyphicon-warning-sign',
        title:'<strong> Erreur </strong>',
        message: 'Tous les champs sont obligatoires'
      },{
        type: 'warning'
      });
    };
  }
});

Template.createPlace.helpers({
  isNotLoggedIn: function () {
    if (!Meteor.userId()) {
      return true;
    }
    return false;
  }
});