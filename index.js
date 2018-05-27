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

console.log('name, id, message, created_time, link, type, status_type, from_id, from_name');

loadPreviousPage(process.argv[2], function next(page) {
  page.data.map(function (post) {
    var { name, id, message, created_time, link, type, status_type, from } = post;
    console.log(`"${ name }", "${ id }", "${ message }", "${ created_time }", "${ link }", "${ type }", "${ status_type }", "${ from.id }", "${ from.name }"`);
  });

  if (page.paging.next) {
    loadPreviousPage(page.paging.next, next);
  } else {
    process.exit();
  }
}, console.error.bind(console));
