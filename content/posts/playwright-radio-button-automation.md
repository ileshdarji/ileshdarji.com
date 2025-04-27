+++
date = 2025-04-27
draft = true
title = 'Playwright Radio Button Automation: Handling Custom Radio Buttons the Right Way'
description = 'Learn how to correctly automate custom radio buttons in Playwright, using dynamic label clicking and real-world best practices. Solve strict mode violations and flaky tests with robust strategies.'
tags = ['playwright', 'playwright automation', 'qa automation', 'radio button automation', 'selenium vs playwright', 'sdet', 'automation best practices']
+++

In this post, I’ll walk you through a real-world **Playwright automation** challenge I encountered while automating a web form — and how I solved it elegantly to create stable, non-flaky tests.

---

## The Problem: Automating Radio Buttons with Playwright

While automating the [DemoQA Practice Form](https://demoqa.com/automation-practice-form), I encountered a challenge when trying to automate gender selection using Playwright:

- The form contains radio buttons for Gender (Male, Female, Other).
- I initially tried using Playwright's `getByLabel('Male')` combined with `.check()` to select the "Male" radio button.
- However, Playwright threw a **strict mode violation** error: multiple elements matched the label, or the action timed out.
- Even using `{ exact: true }` with `getByLabel` did not solve the issue.

Here’s a simplified version of the HTML structure I was working with:

```html
<input type="radio" id="gender-radio-1" value="Male" name="gender" />
<label for="gender-radio-1">Male</label>

<input type="radio" id="gender-radio-2" value="Female" name="gender" />
<label for="gender-radio-2">Female</label>

<input type="radio" id="gender-radio-3" value="Other" name="gender" />
<label for="gender-radio-3">Other</label>
```

At first glance, the HTML looked straightforward. But here's what was actually happening:

- The `<input>` elements were **hidden under styled labels**.
- Clicking the input directly was **not possible**.
- Clicking the associated label was **necessary**, but not as straightforward when using `getByLabel()` in Playwright.

---

## The Solution: Dynamic Label Interaction for Custom Radio Buttons

After careful debugging and DOM inspection, I found that:

- The right approach was to **click the label** associated with the input rather than the input itself.
- Each label was connected to its respective input through the `for` attribute matching the input's `id`.
- This allowed me to reliably click the label and select the correct radio button.

Here’s the dynamic mapping solution I implemented inside my Playwright Page Object Model (POM):

```ts
async selectGender(gender: string) {
  const genderIdMap: Record<string, string> = {
    'Male': 'gender-radio-1',
    'Female': 'gender-radio-2',
    'Other': 'gender-radio-3'
  };

  const genderId = genderIdMap[gender];
  await this.page.locator(`label[for="${genderId}"]`).click();
}
```

Problem solved.  
No flaky behavior.  
Realistic user simulation.

---

## How `selectGender()` Was Used in Practice

The `selectGender()` method wasn't just written in isolation — it was used as part of a complete dynamic form filling strategy.  
I integrated it into a broader `fillForm()` method that accepts a data object and populates the form accordingly:

```ts
async fillForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobile: string;
  picturePath: string;
  currentAddress: string;
}) {
  await this.fillFirstName(data.firstName);
  await this.fillLastName(data.lastName);
  await this.fillEmail(data.email);
  await this.selectGender(data.gender); // ← Using selectGender dynamically
  await this.fillMobile(data.mobile);
  await this.uploadPicture(data.picturePath);
  await this.fillCurrentAddress(data.currentAddress);
}
```

And inside my Playwright test, the usage looked clean and highly readable:

```ts
test('Fill out the form and submit with valid data', async ({ page }) => {
  const practiceFormPage = new PracticeFormPage(page);
  await practiceFormPage.goto();

  const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    mobile: '1234567890',
    picturePath: 'tests/assets/sample-file.png',
    currentAddress: '123 Main St, City, Country',
  };

  await practiceFormPage.fillForm(testData);
  await practiceFormPage.submitForm();

  expect(await practiceFormPage.checkSuccessModal()).toBeTruthy();
});
```

This pattern not only keeps the tests clean but also ensures high reusability and easy maintenance across different test scenarios.

---

## Best Practices for Playwright Radio Button Automation

When dealing with custom radio buttons and Playwright automation:

- **Inspect the DOM carefully:** Always check whether inputs are interactable or hidden behind custom labels.
- **Prefer clicking labels for custom radios and checkboxes:** Styled UI components often block direct input interaction.
- **Use dynamic mappings:** Map business-facing values like `"Male"`, `"Female"`, `"Other"` to internal technical attributes.
- **Wait for elements to be visible:** Ensure the page is ready before trying to interact with elements.
- **Avoid unnecessary hard waits:** Trust Playwright’s auto-waiting, and add explicit waits only when needed.
- **Follow Page Object Model (POM) architecture:** Keep your code organized, scalable, and easy to maintain.

---

## Final Thought: Think Like a User, Not Like the DOM

Even powerful automation frameworks like Playwright require an understanding of real-world web structures.  
When automating web forms, it's critical to **think like the end user**: click what users would click, not necessarily what the DOM presents.

Handling custom radio buttons in Playwright became easy once I aligned my automation approach with how a real user interacts with the UI.

---

Ready to level up your Playwright and QA automation skills? [Subscribe](#subscribe) for practical engineering tips, real-world testing solutions, and no-fluff insights delivered straight to your inbox.
