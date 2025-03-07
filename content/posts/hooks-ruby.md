---
title: "What is Hooks.rb in Ruby Test Automation?"
date: "2024-03-18"
description: "Learn how to use hooks in Ruby for Cucumber test automation."
tags: ["ruby", "cucumber", "test automation", "hooks"]
---

In Ruby test automation using **Cucumber**, **hooks** allow us to execute code at various points in the **Cucumber lifecycle**. Hooks are typically placed in the `env.rb` file or any Ruby file within the `support/` directory.

They help in setting up **preconditions** before a scenario runs and **cleaning up resources** after a scenario completes.

## **Scenario Hooks in Cucumber**

The most common scenario-level hooks are:
- `Before` – Executes **before every scenario**.
- `After` – Executes **after every scenario**.

### **Using the `Before` Hook**

```ruby
Before do
    puts "********************************"
    puts "       Before Hook           "
    puts "********************************"
end
```

#### **What Does This Do?**
The `Before` hook executes **before each scenario**. When running your test suite, you will see the following output before every scenario:

```
********************************
       Before Hook           
********************************
```

### **Practical Use Case**
A common use of `Before` is to **initialize a browser instance** for UI testing:

```ruby
Before do
    @browser = browser  # Define which browser to use
end
```

This ensures that each test starts with a **fresh browser session**.

---

### **Using the `After` Hook**

```ruby
After do
    puts "********************************"
    puts "       After Hook            "
    puts "********************************"
end
```

#### **What Does This Do?**
The `After` hook executes **after each scenario**. When running your test suite, you will see the following output after every scenario:

```
********************************
       After Hook           
********************************
```

### **Practical Use Case**
A common use of `After` is to **clean up resources**, such as closing the browser or capturing screenshots of failing scenarios:

```ruby
After do |scenario|
    if scenario.failed?
        screenshot_name = "screenshot_#{scenario.name.gsub(' ', '_')}.png"
        @browser.screenshot.save screenshot_name
        puts "Screenshot saved: #{screenshot_name}"
    end
    @browser.quit
end
```

This ensures that:
✅ The browser **closes** after every scenario.  
✅ Screenshots are **captured for failing tests**.  

---

## **Conclusion**
Hooks in **Ruby Cucumber automation** are **powerful** for setting up and cleaning up test scenarios. Using `Before` and `After` hooks efficiently helps improve **test maintainability and reliability**.

Would you like to see more advanced hook examples? Let me know! 🚀