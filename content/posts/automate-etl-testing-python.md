---
title: "How to Automate ETL Testing Using Python and Pandas"
date: "2025-03-18"
description: "Learn how to automate ETL testing using Python and Pandas, including validation techniques and best practices."
tags: ["etl testing", "python", "pandas", "data validation", "automation"]
---

### **Introduction**
ETL testing is essential for ensuring data accuracy, consistency, and integrity in data pipelines. Performing these tests manually can be time-consuming and error-prone. **Automating ETL testing using Python and Pandas** helps streamline validation, detect anomalies, and improve efficiency.

This post covers:
- How to use **Python and Pandas** for ETL testing.
- Automating common validation checks.
- Writing reusable test scripts for large datasets.

---

## **1️⃣ Setting Up Your Environment**
### **Install Required Libraries**
Ensure you have Pandas installed:
```bash
pip install pandas
```
If you are working with SQL databases:
```bash
pip install sqlalchemy pymysql
```

### **Load Source and Target Data**
```python
import pandas as pd

source_data = pd.read_csv("source_data.csv")
target_data = pd.read_csv("target_data.csv")
```
If using a database:
```python
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://user:password@host/db")
source_data = pd.read_sql("SELECT * FROM source_table", engine)
target_data = pd.read_sql("SELECT * FROM target_table", engine)
```

---

## **2️⃣ Automating Data Completeness Validation**
### **Check Row Counts**
```python
assert len(source_data) == len(target_data), "Row count mismatch between source and target"
```

### **Check for Missing Values**
```python
missing_values = target_data.isnull().sum()
print("Missing values:")
print(missing_values[missing_values > 0])
```

---

## **3️⃣ Automating Data Integrity Checks**
### **Check for Duplicates**
```python
duplicates = target_data[target_data.duplicated()]
print("Duplicate records found:", len(duplicates))
```

### **Check Primary Key Integrity**
```python
assert source_data["id"].is_unique, "Source data contains duplicate primary keys"
assert target_data["id"].is_unique, "Target data contains duplicate primary keys"
```

---

## **4️⃣ Automating Data Transformation Validation**
### **Example: Check a Derived Column Calculation**
If the target column `discounted_price` should be `price * 0.9`, validate it:
```python
target_data["expected_discounted_price"] = target_data["price"] * 0.9
assert all(target_data["discounted_price"] == target_data["expected_discounted_price"]), "Transformation error detected"
```

### **Example: Compare Aggregated Values**
```python
source_total = source_data["revenue"].sum()
target_total = target_data["revenue"].sum()
assert source_total == target_total, "Revenue mismatch detected"
```

---

## **5️⃣ Automating Incremental Load Validation**
### **Check If New Records Are Loaded**
```python
new_records = source_data[~source_data["id"].isin(target_data["id"])]
print("New records that should be inserted:", len(new_records))
```

### **Check for Deleted Records**
```python
deleted_records = target_data[~target_data["id"].isin(source_data["id"])]
print("Records missing in source but present in target:", len(deleted_records))
```

---

## **Conclusion**
Automating ETL testing using Python and Pandas improves efficiency and ensures data accuracy. By writing reusable test scripts, you can:
- Validate **data completeness**.
- Ensure **data integrity**.
- Test **transformations and incremental loads**.

In the next post, we will discuss **"Building a Scalable ETL Test Automation Framework."**
