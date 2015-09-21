//Random background changer

var images = ['1.jpg', 
              '2.jpg', 
              '3.jpg', 
              '4.jpg', 
              '5.jpg', 
              '6.jpg'];


 $('body').css({'background-image': 'url(imgs/' + images[Math.floor(Math.random() * images.length)] + ')'});

 //end background changer