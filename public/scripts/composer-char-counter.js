/* eslint-env jquery */

// Counting characters in textarea and trigger error bar/styles if needed
$(() => {
  const counterEle = $(".counter");
  const $errorBar = $('.bar');

  $("#tweet-text").on('input', function() {
    countingCharacter(counterEle, $errorBar, this.value);
  });
});

