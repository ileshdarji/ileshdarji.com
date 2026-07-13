(function () {
  "use strict";

  var app = document.getElementById("search-app");
  if (!app) return;

  var form = app.querySelector(".search-form");
  var input = document.getElementById("search-input");
  var status = document.getElementById("search-status");
  var results = document.getElementById("search-results");
  var posts = [];
  var debounceTimer;

  function normalise(value) {
    return String(value || "").toLocaleLowerCase();
  }

  function preparePost(post) {
    var tags = Array.isArray(post.tags) ? post.tags : [];

    return {
      title: String(post.title || "Untitled post"),
      description: String(post.description || ""),
      tags: tags.map(String),
      content: String(post.content || ""),
      url: String(post.url || "#"),
      date: String(post.date || ""),
      searchable: {
        title: normalise(post.title),
        description: normalise(post.description),
        tags: normalise(tags.join(" ")),
        content: normalise(post.content)
      }
    };
  }

  function scorePost(post, query, terms) {
    var fields = post.searchable;
    var combined = [fields.title, fields.tags, fields.description, fields.content].join(" ");

    if (!terms.every(function (term) { return combined.indexOf(term) !== -1; })) {
      return 0;
    }

    var score = 0;
    terms.forEach(function (term) {
      if (fields.title.indexOf(term) !== -1) score += 12;
      if (fields.tags.indexOf(term) !== -1) score += 8;
      if (fields.description.indexOf(term) !== -1) score += 4;
      if (fields.content.indexOf(term) !== -1) score += 1;
    });

    if (fields.title.indexOf(query) !== -1) score += 20;
    if (fields.tags.indexOf(query) !== -1) score += 10;

    return score;
  }

  function makeExcerpt(post, terms) {
    var source = post.description || post.content;
    var lowerSource = normalise(source);
    var matchAt = -1;

    terms.some(function (term) {
      matchAt = lowerSource.indexOf(term);
      return matchAt !== -1;
    });

    if (matchAt === -1 || source === post.description) {
      return source.length > 220 ? source.slice(0, 217).trim() + "…" : source;
    }

    var start = Math.max(0, matchAt - 70);
    var end = Math.min(source.length, start + 220);
    var excerpt = source.slice(start, end).trim();

    return (start > 0 ? "…" : "") + excerpt + (end < source.length ? "…" : "");
  }

  function resultUrl(postUrl, query) {
    var url = new URL(postUrl, window.location.href);
    url.searchParams.set("from", "search");
    url.searchParams.set("q", query);
    return url.href;
  }

  function renderResult(match, terms, query) {
    var post = match.post;
    var item = document.createElement("li");
    var title = document.createElement("a");
    var meta = document.createElement("div");
    var date = document.createElement("time");
    var excerpt = document.createElement("p");

    item.className = "search-result";
    title.className = "search-result-title";
    title.href = resultUrl(post.url, query);
    title.textContent = post.title;

    meta.className = "search-result-meta";
    date.dateTime = post.date;
    date.textContent = post.date;
    meta.appendChild(date);

    if (post.tags.length) {
      var tagText = document.createElement("span");
      tagText.textContent = post.tags.join(" · ");
      meta.appendChild(tagText);
    }

    excerpt.className = "search-result-excerpt";
    excerpt.textContent = makeExcerpt(post, terms);

    item.appendChild(title);
    item.appendChild(meta);
    item.appendChild(excerpt);
    return item;
  }

  function updateUrl(query) {
    var url = new URL(window.location.href);
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", url);
  }

  function search() {
    var rawQuery = input.value.trim();
    var query = normalise(rawQuery).replace(/\s+/g, " ");
    var terms = query.split(" ").filter(Boolean);

    updateUrl(rawQuery);
    results.replaceChildren();

    if (query.length < 2) {
      status.textContent = rawQuery ? "Enter at least two characters." : "Enter at least two characters to search.";
      return;
    }

    var matches = posts
      .map(function (post) {
        return { post: post, score: scorePost(post, query, terms) };
      })
      .filter(function (match) { return match.score > 0; })
      .sort(function (a, b) {
        return b.score - a.score || b.post.date.localeCompare(a.post.date);
      });

    if (!matches.length) {
      status.textContent = "No posts found for “" + rawQuery + "”.";
      return;
    }

    status.textContent = matches.length + (matches.length === 1 ? " post found." : " posts found.");
    var fragment = document.createDocumentFragment();
    matches.forEach(function (match) {
      fragment.appendChild(renderResult(match, terms, rawQuery));
    });
    results.appendChild(fragment);
  }

  function scheduleSearch() {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(search, 120);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    window.clearTimeout(debounceTimer);
    search();
  });
  input.addEventListener("input", scheduleSearch);

  fetch(app.dataset.indexUrl, { headers: { Accept: "application/json" } })
    .then(function (response) {
      if (!response.ok) throw new Error("Could not load the search index.");
      return response.json();
    })
    .then(function (data) {
      if (!Array.isArray(data)) throw new Error("The search index is invalid.");
      posts = data.map(preparePost);
      input.disabled = false;
      input.placeholder = "Try Cypress, ETL, Playwright…";

      var initialQuery = new URL(window.location.href).searchParams.get("q") || "";
      input.value = initialQuery;
      if (initialQuery) search();
      else status.textContent = "Enter at least two characters to search " + posts.length + " posts.";
    })
    .catch(function () {
      status.textContent = "Search is temporarily unavailable. Please try again later.";
      input.placeholder = "Search unavailable";
    });
}());
