/* eslint-env jquery */

// Counting characters in textarea and trigger error bar/styles if needed
let changeSign = 1;
const countingCharacter = (counterEle, $errorBar, tweet) => {
  let newCount = 140 - tweet.length;
  if (newCount >= 0) {
    counterEle.removeClass("error");
    changeSign = 1;
    $errorBar.slideUp();
  } else {
    if (changeSign > 0) {
      changeSign = -1;
      $errorBar.text("Please enter only 140 characters!").slideDown();
    }
    counterEle.addClass("error");
  }
  counterEle.text(newCount);
};


// Toggle compose box
const toggleComposeBox = ($newTweet) => {
  $newTweet.slideToggle();
  $("#tweet-text").focus();
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
  $('#tweets').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets').prepend($tweet);
  }
};

const loadTweets = () => {
  $.get(tweetRequest, (data) => {
    renderTweets(data);
  });
};


// Sending a tweet functions
const sendTweet = (context) => {
  $.ajax({
    type: "POST",
    url: tweetRequest,
    data: context.serialize(),
    success: () => loadTweets(),
  });
  $("#tweet-text").val('');
  $(".counter").text("140");
};

const validateForm = (context) => {
  const textInput = $("#tweet-text").val();
  const $errorBar = $('.bar');
  if (!textInput) {
    $errorBar.text("Tweet cannot be empty!").slideDown();
  } else if (textInput.length > 140) {
    $errorBar.text("Please enter only 140 characters!").slideDown();
  } else {
    $errorBar.slideUp();
    sendTweet(context);
  }
};


// Scrolling behavior -> display float button
const scrollingBehavior = ($floatButton, context) => {
  if (context.scrollTop() > 60) {
    $floatButton.css("display", "flex");
  } else {
    $floatButton.css("display", "none");
  }
};


// Floating button function -> scroll to the top
const scrollToTop = ($newTweet) => {
  $newTweet.slideDown();
  $("html").animate({ scrollTop: 0 }, "slow");
  $("#tweet-text").focus();
};