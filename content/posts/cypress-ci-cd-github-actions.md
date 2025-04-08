+++
title = "Running Cypress Tests in CI/CD with GitHub Actions"
date = 2024-10-08
tags = ["Cypress", "CI/CD", "GitHub Actions", "Automation", "Testing"]
description = "Learn how to integrate Cypress into a GitHub Actions CI/CD pipeline for automatic testing on every push or pull request."
draft = false
+++

Integrating Cypress tests into your CI/CD pipeline ensures automated test execution for every commit, push, or pull request. GitHub Actions is a free, easy-to-configure platform to do just that.

---

## 🧰 Prerequisites

- Cypress tests already created and working locally
- Your project hosted on GitHub
- `cypress` listed as a dev dependency in `package.json`

---

## 🗂️ Step 1: Create the GitHub Actions Workflow

Inside your project, create a file:

```
.github/workflows/cypress.yml
```

Add the following content:

```yaml
name: Cypress Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run Cypress tests
        run: npx cypress run
```

---

## 🧪 Step 2: Push to GitHub

Once this file is pushed to your repository, GitHub will automatically trigger Cypress tests on every push or pull request.

You’ll see test results under the **Actions** tab of your repo.

---

## 💡 Optional: Add Cypress Dashboard Recording

To get richer insights like screenshots and video recordings:

1. Create an account at [Cypress Dashboard](https://dashboard.cypress.io)
2. Set up your project ID and record key
3. Update your run step like this:

```yaml
- name: Run Cypress tests with Dashboard
  run: npx cypress run --record --key ${{ secrets.CYPRESS_RECORD_KEY }}
```

Add the record key in your GitHub repo’s secrets as `CYPRESS_RECORD_KEY`.

---

## ✅ Benefits

- Ensures stability by catching bugs early
- Makes test results visible to the whole team
- Speeds up QA feedback cycle

---

## 🚀 Final Thoughts

Running Cypress tests in GitHub Actions is one of the easiest ways to set up automated end-to-end testing. Just commit your workflow file and go — CI/CD magic begins!

---

**Next in Series:** [Extending Cypress with Plugins: Unlock Extra Power](/posts/extending-cypress-with-plugins/)
