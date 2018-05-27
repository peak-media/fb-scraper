// Get intial page
// Update cursor
// Get next page
// Until no more pages

var stdin = process.openStdin();
var request = require('request');

var data = {
  posts: []
};

function loadPreviousPage(url, done, error) {
  request(url, function (err, res, body) {
    if (err) return error(err);
    done(JSON.parse(body));
  });
}

console.log('name, is_popular, created_time, link, type, status_type, page');

loadPreviousPage(process.argv[2], function next(page) {
  page.data.map(function (post) {
    var { name, is_popular, created_time, link, type, status_type } = post;
    console.log(`"${ name }", "${ is_popular }", "${ created_time }", "${ link }", "${ type }", "${ status_type }", "${ page.paging.cursors.before }"`);
  });

  if (page.paging.next) {
    loadPreviousPage(page.paging.next, next);
  } else {
    process.exit();
  }
}, console.error.bind(console));
