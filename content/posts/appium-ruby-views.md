---
title: "Switching Views Between NATIVE and WEBVIEW in Appium with Ruby"
date: "2017-05-28"
description: "Learn how to switch between NATIVE and WEBVIEW contexts in Appium using Ruby."
tags: ["appium", "ruby", "mobile testing", "automation"]
---

Today, we will discuss **how to switch between NATIVE and WEBVIEW contexts** using **Appium with Ruby**.

### **Understanding Views in Mobile Apps**
There are three types of apps on mobile devices:
- **Native Apps** – Built specifically for a platform using native SDKs.
- **Web Apps** – Accessed through a browser and do not require installation.
- **Hybrid Apps** – A combination of native and web apps, containing both native and web elements.

Hybrid apps, since they contain both **Native elements** and **Web elements**, require switching between views during automation testing.

---

## **Why Switch Views?**
To interact with:
✅ **Web elements** → Switch to `WEBVIEW`
✅ **Native elements** → Switch to `NATIVE-VIEW`

By default, an app launches in **NATIVE-VIEW**. To interact with **Web elements**, you need to switch to `WEBVIEW`, and vice versa.

---

## **How to Switch Between Views in Appium (Ruby)**
Appium provides built-in API calls to handle view switching seamlessly.

### **1️⃣ Check the Current Context**
To verify the current view:
```ruby
puts $driver.current_context  # Returns the current context (e.g., "NATIVE_APP")
```

### **2️⃣ Get Available Contexts**
To list all available views:
```ruby
puts $driver.available_contexts  # Returns an array of available contexts
```

Typically, `WEBVIEW` is **the last in order**. You can confirm this using:
```ruby
puts $driver.available_contexts.last  # Returns last available context (usually WEBVIEW)
```

### **3️⃣ Switch from NATIVE to WEBVIEW**
```ruby
$driver.set_context($driver.available_contexts.last)
```
After this switch, you should be able to interact with web elements.

### **4️⃣ Switch from WEBVIEW to NATIVE-VIEW**
```ruby
$driver.set_context($driver.available_contexts.first)
```
This will bring you back to interacting with native elements.

---

## **Important Notes**
📌 **Appium's documentation on Ruby contexts is not very clear**, so this guide simplifies it.  
📌 **WEBVIEW is always last** in the available contexts list.  
📌 **NATIVE-VIEW is always first** in the available contexts list.  

---

## **Final Thoughts**
I hope this guide helps you understand **how to switch between views in Appium using Ruby**. 

💡 **Have questions?** Drop a comment below, and I’ll be happy to help!

Happy scripting! 🚀
