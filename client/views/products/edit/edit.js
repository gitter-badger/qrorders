Template.editProduct.events({
  'click .save': function (evt, tmpl) {
    evt.preventDefault();
    var inputName = tmpl.find('#inputName').value.trim();
    var inputPrice = tmpl.find('#inputPrice').value;
    var inputDesc = tmpl.find('#inputDesc').value.trim();
    var inputTags = tmpl.find('#inputTags').value.split(',');
    var inputOptions = [];
    if ($('.inputOptions:checked')) {
      $('.inputOptions:checked').each(function(){
        inputOptions.push(this.id);
      });
    };
    console.log(inputOptions);
    if (inputName != '' && inputPrice != '') {
      var productId = Router.current().params.product_id;
      Products.update({_id: productId}, {$set: {
        name: inputName,
        price: inputPrice,
        desc: inputDesc,
        options: inputOptions
      }});
      if (inputOptions.length > 0) {
        $('.inputOptions:checkbox').each(function(){
          Options.update({_id: this.id}, {$pull: {products: productId}});
        });
        $.each(inputOptions, function(index, optionId) {
           Options.update({_id: optionId}, {$push: {products: productId}});
        });
      };
      if (inputTags.length > 0) {
        $.each(inputTags, function(index, value) {
          if (value != '') {
            Products.addTag(value, 'Products', {_id: productId});
          };
        });
      };
      growl('OK', inputName+' mis à jour', 'success');
      var placeId = Router.current().params.place_id;
      Router.go('productsPlace', {_id: placeId});
    }
  },
  'click .delete': function (evt, tmpl) {
    Products.remove({_id: this._id});
    growl('OK', 'Produit supprimé', 'danger');
    var placeId = Router.current().params.place_id;
    Router.go('productsPlace', {_id: placeId});
  }
});

Template.editProduct.helpers({
  place_id: function () {
    return Router.current().params.place_id;

  }
});