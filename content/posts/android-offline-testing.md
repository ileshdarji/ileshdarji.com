---
title: "How to Test an Android App in Offline Mode Using Appium with Ruby"
date: "2017-12-12"
description: "Learn how to test Android apps in offline mode using Appium with Ruby by toggling flight mode, mobile data, and WiFi."
tags: ["appium", "ruby", "mobile testing", "offline mode", "automation"]
---

There are many occasions where an app requires **testing in offline mode**, meaning the device has **no internet connection**—whether mobile data or WiFi. In this post, we will discuss **how to put an Android device into offline mode using Appium**.

### **What Does Offline Mode Mean?**
When we say **offline mode**, it typically means enabling **flight mode (airplane mode)** on the device.

### **How to Toggle Offline Mode in Appium?**
`Appium` with the `ruby_lib` supports **API calls** to toggle:

✅ Flight mode  
✅ Mobile data  
✅ WiFi  

📌 **Note:** These commands **only work for Android devices**. You can find the official Appium documentation [here](https://appium.io/docs/en/latest/quickstart/test-rb/).

---

## **Getting the Current Network Status**
To check the current network status, use:
```ruby
$driver.get_network_connection
```
This command returns an integer value representing the network state:

| Value | Network State |
|--------|----------------------------|
| 0      | Airplane mode (no network) |
| 1      | WiFi only                  |
| 2      | Mobile data only           |
| 4      | Airplane mode with WiFi    |
| 6      | Mobile data + WiFi         |

---

## **Setting the Network Connection**
To **change the network mode**, use:
```ruby
$driver.set_network_connection(6)
```
Here, **6** enables both **WiFi and Mobile Data**.

If you want to enable only **Airplane Mode**, set it to **0**:
```ruby
$driver.set_network_connection(0)
```

📌 **Refer to the table above** for more options.

---

## **Conclusion**
Using Appium, we can easily test Android apps in **offline mode** by toggling **network settings programmatically**. This is helpful for testing **network-dependent features** like **caching, error handling, and retry mechanisms**.

Happy scripting! 😊
