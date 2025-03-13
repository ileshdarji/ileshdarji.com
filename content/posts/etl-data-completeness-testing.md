---
title: "How to Perform Data Completeness Testing in ETL"
date: "2025-03-13"
description: "Learn how to verify data completeness in ETL testing using SQL queries and best practices."
tags: ["etl testing", "data validation", "sql", "data completeness", "automation"]
---

### **Introduction**
Data completeness testing in ETL ensures that all required data is successfully extracted, transformed, and loaded into the target system. This validation is critical to maintaining data accuracy and preventing data loss, which could impact reporting, analytics, and decision-making.

ETL processes often deal with large datasets from multiple sources, making completeness testing essential to confirm:
- No records are missing.
- Aggregated data values match between source and destination.
- All transformations are correctly applied without data loss.

---

## **Steps to Perform Data Completeness Testing**

### **1️⃣ Compare Record Counts**
A simple yet effective check is comparing the number of records in the source and target tables.
```sql
SELECT COUNT(*) FROM source_table;
SELECT COUNT(*) FROM target_table;
```
If the counts do not match, further investigation is required to determine the missing records.

### **2️⃣ Validate Sum of Numerical Columns**
Ensure that numeric column aggregates remain consistent across systems.
```sql
SELECT SUM(amount) FROM source_table;
SELECT SUM(amount) FROM target_table;
```
Discrepancies may indicate data truncation, incorrect transformations, or missing records.

### **3️⃣ Check for Missing Rows**
Use a `LEFT JOIN` to identify records that exist in the source but are missing in the target.
```sql
SELECT s.id FROM source_table s
LEFT JOIN target_table t ON s.id = t.id
WHERE t.id IS NULL;
```
If this query returns results, those records were not loaded correctly.

### **4️⃣ Ensure No Duplicate Records**
Check whether duplicate records exist in the target table due to incorrect ETL processes.
```sql
SELECT id, COUNT(*) FROM target_table
GROUP BY id HAVING COUNT(*) > 1;
```
If the count is greater than 1, investigate the ETL process to resolve duplicate loading.

---

## **Common Issues & How to Fix Them**

### **1. Mismatch in Record Counts**
- Verify if any filters were applied incorrectly during extraction.
- Check if records failed due to transformation errors.
- Review ETL logs for failures during the load process.

### **2. Aggregated Data Discrepancies**
- Ensure data types are correctly mapped.
- Check for decimal precision mismatches.
- Validate NULL handling rules between source and target.

### **3. Handling Incremental vs. Full Loads**
- For incremental loads, validate the **latest records only** using timestamps.
- Ensure ETL logic handles **historical data retention policies** correctly.

---

## **Conclusion**
Data completeness testing is a fundamental part of ETL validation, ensuring that all required records are correctly extracted and loaded. By using SQL queries and automated tools, teams can proactively detect and resolve data loss issues before they impact business decisions.

Next post: "How to Validate Data Transformations in ETL Testing."
