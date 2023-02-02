/* eslint-env jquery */

$(() => {
  // load initial tweets
  loadTweets();

  // Validate and post a tweet
  $("form").on("submit", function(event) {
    event.preventDefault();
    validateForm($(this));
  });

  // Toggle the "Write a new Tweet" button in the navbar
  const $newTweet = $(".new-tweet");
  $(".navbar-right").on("click", () => {
    $newTweet.slideToggle();
  });

  // When user scroll -> display the arrow up (to top of the page) button
  const $floatButton = $(".float");
  $(window).scroll(function() {
    scrollingBehavior($floatButton, $(this));
  });

  // Scroll to the top of the page when the button is clicked
  $floatButton.on("click", function() {
    scrollToTop($newTweet);
  });
});