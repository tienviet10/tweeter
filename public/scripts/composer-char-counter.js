/* eslint-env jquery */

$(document).ready(function() {

  const counterEle = $(".counter");
  $("#tweet-text").on('input', function() {
    console.log(this); //The this keyword is a reference to the button

    counterEle.text(140 - this.value.length);
  });
});

