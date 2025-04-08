+++
title = "Mocking API Responses with cy.intercept() in Cypress"
date = 2024-09-08
tags = ["Cypress", "Intercept", "Mocking", "Automation", "Testing"]
description = "Learn how to mock API responses in Cypress using cy.intercept to make your tests faster, more stable, and independent of backend services."
draft = false
+++

Mocking API responses is one of the most powerful features of Cypress, and `cy.intercept()` makes it incredibly easy. By intercepting HTTP requests, you can control how your frontend behaves under different conditions—without needing access to the backend or database.

---

## 🧠 Why Use `cy.intercept()`?

- 🚀 Speeds up tests by avoiding real network calls
- 💥 Simulates error scenarios like 404 or 500 responses
- 🔄 Decouples frontend tests from backend availability
- 🧪 Enables testing edge cases and rare conditions

---

## ⚙️ Basic Usage

```javascript
cy.intercept('GET', '/api/products', { fixture: 'products.json' })
```

This intercepts all GET requests to `/api/products` and returns data from the `products.json` fixture.

---

## 🛠️ With Aliases and Waiting

```javascript
cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as('getProducts')

cy.visit('/shop')
cy.wait('@getProducts') // ensures request completes before asserting
```

This ensures that the UI has finished loading before continuing with assertions.

---

## 🧪 Example: Stubbing an Error Response

```javascript
cy.intercept('GET', '/api/products', {
  statusCode: 500,
  body: { error: 'Internal Server Error' }
}).as('getProductsError')

cy.visit('/shop')
cy.wait('@getProductsError')
cy.contains('Something went wrong')
```

---

## 🔍 Advanced Matching

```javascript
cy.intercept({
  method: 'POST',
  url: '/api/login',
  body: { username: 'admin' }
}, {
  statusCode: 200,
  body: { token: 'mocked_token' }
}).as('loginSuccess')
```

You can match requests based on method, headers, body, or even use wildcard URLs.

---

## ✅ Best Practices

- Use `cy.intercept()` instead of `cy.server()` (deprecated).
- Always use `.as()` and `cy.wait()` when dealing with async flows.
- Store your mock data in `cypress/fixtures` for cleaner organization.

---

## 🚀 Final Thoughts

Mocking APIs with `cy.intercept()` allows you to test faster, simulate real-world scenarios, and isolate frontend behavior from backend systems. It’s a must-know feature for any serious Cypress user.

---

**Next in Series:** [Running Cypress Tests in CI/CD with GitHub Actions](/posts/cypress-ci-cd-github-actions/)
