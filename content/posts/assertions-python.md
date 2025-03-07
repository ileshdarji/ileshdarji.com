---
title: "Assertions in Python"
date: "2025-03-07"
description: "Learn how to use Python's built-in assert statement for debugging and improving code reliability."
---

Python’s built-in `assert` statement is **underrated** and deserves more attention than it gets. 

In this blog post, we will explore **how to use assertions in Python**, how they help **automatically detect errors**, and how they make your code **more reliable and easier to debug**.

## **What Are Assertions and Why Use Them?**

An `assert` statement in Python is used for **debugging purposes**. If the assertion condition evaluates to `True`, the program continues as normal. However, if the condition evaluates to `False`, an `AssertionError` is raised with an optional error message.

Let’s look at a **real-world example** where assertions can be useful.

## **Using Assertions in a Discount System**

Imagine you're building an **online store** in Python, and you need to apply discount coupons. Here’s a simple function called `apply_discount`:

```python
def apply_discount(product, discount):
    price = int(product["price"] * (1.0 - discount))
    assert 0 <= price <= product["price"], "Discounted price must be within valid range"
    return price
```

### **How Assertions Help Here**
The `assert` statement ensures that:
- The discounted price **never goes below £0**.
- The discount **never exceeds the original price**.

### **Example Usage**
Let’s define a **product** (a book called *Python Fundamentals*) and apply a **valid** discount:

```python
book = {'name': 'Python Fundamentals', 'price': 1900}  # Price in cents (£19.00)
print(apply_discount(book, 0.25))  # Applying a 25% discount
```
**Output:**
```
1425  # (£14.25 after discount)
```

### **Handling Invalid Discounts**
Now, let's see what happens when we try applying a **200% discount**, which would result in a negative price:

```python
apply_discount(book, 2.0)
```
**Output:**
```
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 3, in apply_discount
AssertionError: Discounted price must be within valid range
```

Since the discount violates our assertion condition, the program **throws an error** instead of silently producing incorrect results.

## **Why Use Assertions?**
✅ **Faster Debugging** – Assertions **automatically catch logic errors**, reducing debugging time.  
✅ **Better Maintainability** – Code with assertions is **self-documenting**, helping future developers understand constraints.  
✅ **Prevents Invalid States** – Ensures that program logic remains **within expected boundaries**.

## **Conclusion**
Assertions are a **powerful yet simple debugging tool** in Python. They help you enforce assumptions in your code, leading to **fewer bugs and a more maintainable codebase**.

Would you like to learn more about Python debugging techniques? Let me know in the comments! 🚀
