+++
title = "Advanced cy.intercept() Patterns for Stubbing and Spying APIs"
date = 2025-01-25
tags = ["Cypress", "cy.intercept", "API Mocking", "Spying", "Stubbing"]
description = "Go beyond basic usage and learn advanced patterns for using cy.intercept() to mock, stub, and spy on API calls in Cypress tests."
draft = false
+++

The `cy.intercept()` command in Cypress is powerful — but most tutorials stop at simple request stubbing. In real-world apps, APIs are dynamic, paginated, and unpredictable.

Let’s look at **advanced patterns** that help you fully control and observe API traffic using `cy.intercept()`.

---

## 🔁 Pattern 1: Mock Paginated API Responses

When testing "Load More" or infinite scroll, you often need to return different data per page.

```js
let page = 1;
cy.intercept('GET', '/api/posts*', (req) => {
  req.reply({ fixture: `posts-page-${page}.json` });
  page++;
}).as('getPosts');
```

---

## 🧪 Pattern 2: Spy on Requests and Assert Payloads

Use `.intercept()` with `req.continue()` to observe and assert real network traffic.

```js
cy.intercept('POST', '/api/comments', (req) => {
  expect(req.body).to.have.property('text', 'Nice article!');
  req.continue();
}).as('postComment');
```

---

## 💥 Pattern 3: Simulate API Failures or Delays

Test how your UI handles failure gracefully.

```js
cy.intercept('GET', '/api/dashboard', {
  statusCode: 500,
  body: { error: 'Internal Server Error' },
  delayMs: 2000
}).as('getDashboard');
```

---

## 🧬 Pattern 4: Conditional Responses Based on Request Body

Sometimes your app sends different payloads, and you want to return different mocks.

```js
cy.intercept('POST', '/api/login', (req) => {
  if (req.body.username === 'admin') {
    req.reply({ token: 'admin-token' });
  } else {
    req.reply({ statusCode: 401 });
  }
});
```

---

## 🪝 Pattern 5: Modify Requests on the Fly

Need to force in test data?

```js
cy.intercept('POST', '/api/orders', (req) => {
  req.body.items.push({ id: 'bonus-item' });
  req.continue();
});
```

---

## 🧠 Best Practices

- Use `req.reply()` to control responses, and `req.continue()` to let them pass through
- Always alias intercepted requests with `.as('alias')` for easier waiting
- Use fixtures for reusability and version control of mocked data
- Combine with `cy.wait('@alias')` to assert call behavior

---

## 🚀 Final Thoughts

`cy.intercept()` is more than just a stubber — it's your gateway to full API control in test environments. These advanced patterns let you simulate real-world edge cases, spy on behavior, and validate data at the network layer.

---

🔗 **Next in Series:** [Cypress Testing Library for Stable Selectors](/posts/cypress-testing-library-stable-selectors/)
