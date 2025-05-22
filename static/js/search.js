let lunrIndex, pagesIndex;

async function loadIndex() {
  const res = await fetch('/index.json');
  pagesIndex = await res.json();
  lunrIndex = lunr(function () {
    this.ref('permalink');
    this.field('title');
    this.field('summary');
    this.field('content');

    pagesIndex.forEach(doc => this.add(doc));
  });
}

function runSearch() {
  const query = document.getElementById('search-input').value.trim();
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (!query || !lunrIndex) return;

  const results = lunrIndex.search(query);

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach(result => {
    const page = pagesIndex.find(p => p.permalink === result.ref);
    const el = document.createElement('div');
    el.innerHTML = `<p><a href="${page.permalink}"><strong>${page.title}</strong></a><br>${page.summary || ''}</p>`;
    resultsContainer.appendChild(el);
  });
}

window.onload = loadIndex;