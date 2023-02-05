/* eslint-env jquery */

(($) => {

  // Check when the document is ready
  $(() => {
    const $errorBar = $('.bar');
    const $form = $errorBar.siblings('.tweets-container').find('.form');
    const $textArea = $errorBar.siblings('.tweets-container').find('#tweet-text');
    const $newTweet = $(".new-tweet");
    const $floatButton = $(".float");

    // load initial tweets
    loadTweets();

    // Validate and post a tweet
    $form.on("submit", (event) => validateForm(event, $textArea, $errorBar));

    // Toggle the "Write a new Tweet" button in the navbar
    $(".navbar-right").on("click", () => toggleComposeBox($newTweet, $textArea));

    // When user scroll -> display the arrow up (to top of the page) button
    $(window).scroll((event) => scrollingBehavior($(event.target), $floatButton));

    // Scroll to the top of the page when the button is clicked
    $floatButton.on("click", () => scrollToTop($newTweet, $textArea));
  });

  
  //-----------------------------------------HELPERS---------------------------------------------------------------
  // Toggle compose box
  const toggleComposeBox = ($newTweet, $textArea) => {
    $newTweet.slideToggle();
    $textArea.focus();
  };


  // Loading tweets functions
  const customEscape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweet) => {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <img class="individualProfile" src='${tweet.user.avatars ? tweet.user.avatars : "http://via.placeholder.com/300"}'/>
        <div class="user-profile">
          <div class="name">${tweet.user.name}</div>
          <div class="username">${tweet.user.handle}</div> 
        </div>
      </header>
      <p class="description">${customEscape(tweet.content.text)}</p>
      <footer>
        <p>${timeago.format(tweet.created_at)}</p>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    const $tweets = $('#tweets');
    $tweets.empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweets.prepend($tweet);
    }
  };

  const loadTweets = () => {
    $.get(TWEET_REQUEST).then(data => renderTweets(data));
  };


  // Sending a tweet functions
  const sendTweet = (context, $textArea) => {
    $.post(TWEET_REQUEST, context.serialize()).then(() => {
      $textArea.val('').trigger('input');
      loadTweets();
    });
  };

  const validateForm = (event, $textArea, $errorBar) => {
    event.preventDefault();
    const context = $(event.target);
    const textInput = $textArea.val();

    if (!textInput) {
      $errorBar.text("Tweet cannot be empty!").slideDown();
    } else if (textInput.length > 140) {
      $errorBar.text("Please enter only 140 characters!").slideDown();
    } else {
      $errorBar.slideUp();
      sendTweet(context, $textArea);
    }
  };


  // Scrolling behavior -> display float button
  const scrollingBehavior = (context, $floatButton) => {
    if (context.scrollTop() > 60) {
      $floatButton.css("display", "flex");
    } else {
      $floatButton.css("display", "none");
    }
  };


  // Floating button function -> scroll to the top
  const scrollToTop = ($newTweet, $textArea) => {
    $newTweet.slideDown();
    $("html").animate({ scrollTop: 0 }, "slow");
    $textArea.focus();
  };


})(jQuery);