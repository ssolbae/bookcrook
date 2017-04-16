// data = {
//   "0" : "{\"className\" : [\"Greek (GREEK)\",\"Hebrew (HEBREW)\"],
//          \"froala_editor\" : \"<p>The bsauttons below will destroy and init the rich text editor again.</p>\"}",
//
//   "1" : "{\"className\" : [\"Cognitive Science (COG SCI)\",\"College Writing Program (COLWRIT)\"],
//          \"froala_editor\":\"<p>arwgaw</p>\"}"
// }

$(document).ready(function(){
  (function () {
    if (!!$.cookie('auth_token')) {
      // have cookie
      console.log("yes cookie!");
      $("#loginSignupNav").detach();

      var username;
      var getUsername = '/username';
      $.get(getUsername, function(data) {
        username = data;
        console.log("username is: " + username);
        $("#usernameDropdown").html(username);

      });

    } else {
     // no cookie
     $("#myPostsNav").detach();
     $("#loggedNav").detach();
     $("#writePostsNav").detach();
     return;
    }
  })();


  var url = '/getpins';
  $.get(url, function(data) {
    // console.log("data in index.js: " + data);
    var bookBox = $(".bookBox");
    // console.log("data in length: " + Object.keys(data).length);
    var len = Object.keys(data).length;
    console.log(data);
    for (var i = 0; i < len; i++) {
      (function () {
        var onePost = JSON.parse(data[Object.keys(data)[i]]);
        console.log("ONEPOST: " + JSON.stringify(onePost));
        var postby = onePost.createdBy;
        postby = $('<div><strong>POST BY: ' + postby + '</strong></div>');
        var card = $('<div class="card mx-auto"><strong>Selling books for these classes: </strong></div><br>');
        var className = onePost.className;
        var bookInfo = onePost.froala_editor;

        var createdAt = onePost.createdAt
        createdAt = $('<div>' + createdAt + '</div>');


        var column = $('<div class="col-sm-8 col-md-offset-2"></div>');
        var row = $('<div class="row top-buffer"></div>');

        postby.append(createdAt)
        createdAt.append(card);
        card.append(className);
        card.append('<br><strong>Book(s) Info: </strong><br>');
        card.append(bookInfo);


        bookBox.append(row);
        row.append(column);
        column.append(postby);

      })();
    }
  });
});
