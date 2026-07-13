(function () {
  "use strict";

  var container = document.getElementById("post-return");
  var link = document.getElementById("back-to-list");
  if (!container || !link) return;

  var postUrl = new URL(window.location.href);
  var source = postUrl.searchParams.get("from");
  var targetUrl;

  if (source === "search") {
    var query = postUrl.searchParams.get("q");
    if (!query) return;

    targetUrl = new URL("/search/", window.location.origin);
    targetUrl.searchParams.set("q", query);
    link.textContent = "← Back to search results";
  } else if (source === "posts") {
    targetUrl = new URL("/posts/", window.location.origin);
    link.textContent = "← Back to posts";
  } else {
    return;
  }

  link.href = targetUrl.href;
  container.hidden = false;

  link.addEventListener("click", function (event) {
    if (!document.referrer) return;

    var referrer = new URL(document.referrer);
    if (referrer.origin === window.location.origin && referrer.pathname === targetUrl.pathname) {
      event.preventDefault();
      window.history.back();
    }
  });
}());
