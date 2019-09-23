const db = require('../db');
const middlewareLogin = require('../middleware/login.middleware');

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
      numPagePerPageBar: numPagePerPageBar,
      user: middlewareLogin.postLogin(request)
    });
  },
  view: function(request, response) {
    var id = request.params.id;
    var product = db.get('products').find({ id: id }).value();
    response.render('products/view', {
      active: 'products',
      product: product,
      user: middlewareLogin.postLogin(request)
    })
  },
  search: function(request, response) {
    var query = request.query.q;
    var matchProducts = db.get('products')
                          .value()
                          .filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    
    response.render('products/index', {
      products: matchProducts,
      active: 'products',
      pageCurrent: undefined,
      query: query
    });
  }
}