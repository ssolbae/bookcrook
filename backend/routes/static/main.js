$(function() {
  $('#froala-editor').froalaEditor({
    imageDefaultAlign: 'left'
  })
});

$(document).ready(function(){
  $('option').mousedown(function(e) {
    e.preventDefault();

    $(this).prop('selected', $(this).prop('selected') ? false : true);
    return false;
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
