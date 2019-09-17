const db = require('../db');

const productPerPage = 9;
const numPagePerPageBar = 5;

module.exports = {
  index: function (request, response) {
    var page = parseInt(request.query.page) || 1;
    var startProduct = productPerPage * page - productPerPage;
    var endProduct = productPerPage * page;
    response.render('products/index', {
      products: db.get('products').slice(startProduct, endProduct).value(),
      active: 'products',
      pageCurrent: page,
      numProduct: db.get('products').value().length,
      productPerPage: productPerPage,
      numPagePerPageBar: numPagePerPageBar
    });
  }
}