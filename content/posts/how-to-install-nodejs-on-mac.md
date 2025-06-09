+++
title = "How to Install Nodejs on Mac"
date = 2025-06-09
tags = ["Node.js", "Mac", "Installation Guide", "JavaScript", "PlaywrightSetup", "Playwright"]
description = "A step-by-step guide to installing Node.js on macOS — ideal for beginners setting up Playwright or other JavaScript tools."
draft = false
+++

If you're new to automation or just setting up Playwright on your machine, Node.js is the very first requirement. Here's a simple, no-nonsense guide to help you get Node.js running on your Mac.

---

## ✅ Step 1: Check if Node.js is Already Installed

Open **Terminal** (⌘ + Space → search "Terminal") and run:

```bash
node -v
```

If you see something like:

```bash
v18.4.0
```

...great! Node.js is already installed. If not, continue below 👇

---

## ✅ Step 2: Install Node.js (Recommended via Official Installer)

1. Go to the official Node.js website:  
   👉 [https://nodejs.org](https://nodejs.org)

2. **Download the LTS version** (Recommended for most users). As of this writing, that's **v18.18.0+**

3. Run the installer and follow the prompts.
   - Keep the default settings.
   - It will install both `node` and `npm` (Node Package Manager).

---

## ✅ Step 3: Confirm Installation

After installation, open Terminal again and run:

```bash
node -v
npm -v
```

You should now see version numbers for both Node and npm:

```bash
v18.18.0
9.8.1
```

---

## 🔄 Optional: Install via Homebrew

If you’re using [Homebrew](https://brew.sh/), you can also install Node.js with:

```bash
brew install node
```

But if you're a beginner, the official installer method is simpler and safer.

---

## 🎉 You’re Done!

Node.js is now ready to go! You can continue setting up Playwright or any other tools that depend on it.

If you’re following along with my YouTube video, head back there now — you’re ready for the next step.
