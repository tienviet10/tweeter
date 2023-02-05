/* eslint-env jquery */

// Counting characters in textarea and trigger error bar/styles if needed
(($) => {

  // Check when the document is ready
  $(() => {
    const $errorBar = $('.bar');
    const $textArea = $errorBar.siblings('.tweets-container').find('#tweet-text');
    $textArea.on('input', (event) => countingCharacter(event.target, $errorBar));
  });

  // Counting characters in textarea and trigger error bar/styles if needed
  const countingCharacter = (event, $errorBar) => {
    let newCount = 140 - event.value.length;
    const $counterEle = $(event).closest('form').find(".counter");

    if (newCount >= 0) {
      $counterEle.removeClass("error");
      $errorBar.slideUp();
    } else {
      $errorBar.text("Please enter only 140 characters!").slideDown();
      $counterEle.addClass("error");
    }
    $counterEle.text(newCount);
  };

})(jQuery);