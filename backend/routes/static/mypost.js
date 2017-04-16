// data = {
//   "0" : "{\"className\" : [\"Greek (GREEK)\",\"Hebrew (HEBREW)\"],
//          \"froala_editor\" : \"<p>The bsauttons below will destroy and init the rich text editor again.</p>\"}",
//
//   "1" : "{\"className\" : [\"Cognitive Science (COG SCI)\",\"College Writing Program (COLWRIT)\"],
//          \"froala_editor\":\"<p>arwgaw</p>\"}"
// }

$(document).ready(function(){

  var url = '/mypins';
  $.get(url, function(data) {
    console.log("data in index.js: " + data);


// data length?
    var bookBox = $(".bookBox");
    console.log("data in length: " + Object.keys(data).length);
    var len = Object.keys(data).length;
    for (var i = 0; i < len; i++) {
      (function () {
        var onePost = JSON.parse(data[Object.keys(data)[i]]);
        var card = $('<div class="card mx-auto"><strong>Selling books for these classes: </strong><br></div>');
        var className = onePost.className;
        var bookInfo = onePost.froala_editor;

        var column = $('<div class="col-sm-8 col-md-offset-2"></div>');
        var row = $('<div class="row top-buffer"></div>');

        card.append(className);
        card.append('<br><strong>Book(s) Info: </strong><br>');
        card.append(bookInfo);

        bookBox.append(row);
        row.append(column);
        column.append(card);

      })();
    }
  });
  (function () {
    if (!!$.cookie('auth_token')) {
      // have cookie
      console.log("yes cookie!");
      $("#loginSignupNav").detach();

      var username;
      var getUsername = '/username';
      $.get(getUsername, function(data) {
        console.log("HELLLLLL");
        username = data;
        console.log("username is: " + username);
        $("#usernameDropdown").html(username);

      });

    } else {
     // no cookie
     $("#myPostsNav").detach();
     $("#loggedNav").detach();
     return;
    }
  })();
});
