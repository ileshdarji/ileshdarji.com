---
title: "Contact Me"
layout: "page/contact"
description: "Get in touch with Ilesh Darji for automation testing, Python development, and ETL projects."
hideDate: true
---

<p>I’d love to hear from you — whether it's about working together, collaborating, or general questions. Drop me a message below!</p>

<div style="border: 1px solid #333; padding: 2rem; max-width: 600px; margin: 2rem auto; background-color: #f9f9f9;">
<form name="contact" netlify method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/contact-thank-you/">
  <input type="hidden" name="form-name" value="contact">
  <input type="hidden" name="_email-template" value="Name: {{ name }}<br>Email: {{ email }}<br>Subject: {{ subject }}<br>Message:<br>{{ message }}">

  <input type="hidden" name="form-name" value="contact">
  <p style="display:none;">
    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
  </p>

  <div style="margin-bottom: 1.5rem;">
    <label for="name" style="font-weight: bold;">Name:</label><br/>
    <input type="text" id="name" name="name" placeholder="Your Name" style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 0px;" required>
  </div>

  <div style="margin-bottom: 1.5rem;">
    <label for="email" style="font-weight: bold;">Email:</label><br/>
    <input type="email" id="email" name="email" placeholder="your@email.com" style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 0px;" required>
  </div>

  <div style="margin-bottom: 1.5rem;">
    <label for="subject" style="font-weight: bold;">Subject:</label><br/>
    <select id="subject" name="subject" style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 0px;" required>
      <option value="">--Please choose an option--</option>
      <option value="Hire Me">Hire Me</option>
      <option value="Collaboration">Collaboration</option>
      <option value="General Query">General Query</option>
    </select>
  </div>

  <div style="margin-bottom: 1.5rem;">
    <label for="message" style="font-weight: bold;">Message:</label><br/>
    <textarea id="message" name="message" rows="6" placeholder="Type your message here..." style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 0px;" required></textarea>
  </div>

  <div style="text-align: center;">
    <button type="submit" style="background-color: #000; color: #fff; padding: 0.75rem 2rem; border: 2px solid #000; border-radius: 0px; font-weight: bold; cursor: pointer;">
      Send Message
    </button>
  </div>
</form>
</div>

<p class="text-center text-sm mt-6">
Or connect with me directly:<br>
<a href="mailto:ilesh@ileshdarji.com">ilesh@ileshdarji.com</a> | 
<a href="https://www.linkedin.com/in/ileshdarji" target="_blank">LinkedIn</a> | 
<a href="https://github.com/ileshdarji" target="_blank">GitHub</a>
</p>