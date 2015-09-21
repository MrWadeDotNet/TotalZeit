//Random background changer

var images = ['1.jpg', 
              '2.jpg', 
              '3.jpg', 
              '4.jpg', 
              '5.jpg', 
              '6.jpg'];


 $('body').css({'background-image': 'url(imgs/' + images[Math.floor(Math.random() * images.length)] + ')'});

 //end background changer

// Show About Section
 $("#about").click(function () { 
    console.log("About clicked");
   $(".inviteform").addClass("hide");
   $(".about-content").removeClass("hide");
 });

 // Back to invite page

  $("#toinvite").click(function () { 
   $(".about-content").addClass("hide");
   $(".inviteform").removeClass("hide");
 });



 //Invite to sign up

$('#submitinvite').click(function () {

  var inviteName = {};
  inviteName.name = $("#invitename").val();
  inviteName.email = $("#inviteemail").val();

  if(inviteName.email === "") { 
    $(".enteremail").removeClass("hide");
  }
  else
  {
  
    $.ajax({
          url: "https://total-zeit.firebaseio.com/invites.json",
          dataType: "JSON",
          type: 'POST',
          data: JSON.stringify(inviteName),
      })
      .done(function(inviteName) {
          console.log("Successfully posted data");
          //Hide after submission
          $(".inviteform").addClass("hide");
          $(".success").addClass("show");
      })
      .fail(function(xhr, status, error) {
          console.log(error);
      });
  }



})

