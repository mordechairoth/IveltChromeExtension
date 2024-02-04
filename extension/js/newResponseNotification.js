(function () {
    if (window.location.pathname !== '/forum/viewtopic.php') return ;

    let currentCount = document
    .querySelector("div.pagination")
    .innerHTML.match(/(\d+) תגובות/)[1];
  let currentPostCount =
    document.getElementsByClassName("post has-profile").length;
  let lastPost =
    document.getElementsByClassName("post has-profile")[currentPostCount - 1];

  var topicURL = document.querySelector("h2.topic-title > a").href;
  var topicURLSearch = topicURL.substr(topicURL.indexOf("?"));
  var urlParams = new URLSearchParams(topicURLSearch);
  var topicId = urlParams.get("t");
  var forumURL = document.getElementsByClassName("left-box arrow-right")[0]
    .href;

  function isLastPage() {
    return document.getElementsByClassName("next").length == 0;
  }

  let title = document.title;
  // setting was unchecked by the user

  let backgroundSync =
    document
      .getElementById("iveltHelperSettings")
      .getAttribute("data-background-sync") === "true";
  let backgroundSyncPosts = document
    .getElementById("iveltHelperSettings")
    .getAttribute("data-background-sync-posts");
  if (!backgroundSync || !backgroundSyncPosts) return;

  let interval = parseInt(backgroundSyncPosts);
  let checkNewResponse = function () {
    if (isLastPage() && currentCount > 0) {
      fetch(forumURL)
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(data, "text/html");
          let topics = Array.from(
            Array.from(doc.getElementsByClassName("forumbg"))
              .pop()
              .getElementsByClassName("topics")[0]
              .querySelectorAll("li.row")
          );
          let topic = topics.find((t) => {
            let tHref = t.children[0]?.children[0].children[0].href;
            if (!tHref) return false;
            let tHrefSearch = tHref.substr(tHref.indexOf("?"));
            let tSearch = new URLSearchParams(tHrefSearch);
            let tId = tSearch.get("t");
            if (tId == topicId) return true;
            else return false;
          });
          //If we cannot find the topic on the first page of the forum we can safely assume that no new post exists.
          if (!topic) return setTimeout(checkNewResponse, interval);
          let newCount =
            topic.children[0]?.children[1]?.firstChild?.textContent?.trim();
          if (currentCount < newCount * 1 + 1) {
            lastPost.insertAdjacentHTML(
              "afterend",
              `<h3 style="margin:4px auto;text-align:center;background:#cadceb;padding:7px 5px 5px 5px;border:none;border-radius:7px;user-select:none;">
                              נייע תגובות זענען צוגעקומען
                              <a class="button" style="width:150px;margin:5px auto;display:block;" href="/forum/viewtopic.php?t=${topicId}&view=unread#unread">רילאוד</a>
                          </h3>`
            );
            setInterval(function () {
              document.title =
                document.title == title ? "\u26B9 " + title : title;
            }, 500);
          } else {
            setTimeout(checkNewResponse, interval);
          }
        })
        .catch(function (error) {
          interval *= 3;
          setTimeout(checkNewResponse, interval);
        });
    }
  };
  setTimeout(checkNewResponse, interval);
})();
