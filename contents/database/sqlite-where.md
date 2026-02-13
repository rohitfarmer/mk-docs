---
comments: true
---

# SQLite Conditional and Logical Operators

In SQLite, **conditional operators** (sometimes also referred to as comparison operators or logical operators) are used in SQL statements to filter records or perform logical checks. Below is an overview of the most common conditional operators and expressions you will encounter in SQLite, along with brief explanations.

## 1. Comparison Operators

### = or ==  
Checks if two expressions are equal.

```sql
SELECT * 
FROM employees
WHERE department = 'Sales';
```

### != or <>  
Checks if two expressions are not equal.

```sql
SELECT * 
FROM employees
WHERE department != 'Sales';
```
In SQLite, `!=` and `<>` have the same meaning.

### < (Less than), > (Greater than), <= (Less than or equal to), >= (Greater than or equal to)  
Used for numerical or lexicographical comparison.

```sql
SELECT * 
FROM orders
WHERE order_total > 1000;
```

### **IS** / **IS NOT**  
Primarily used to compare with `NULL` or boolean-like values in SQLite.

```sql
SELECT *
FROM employees
WHERE manager_id IS NULL;
```
    
Although `=` can be used for most comparisons, `IS` more explicitly checks for identity (especially with `NULL`).


## 2. Logical Operators

### **AND**  
Combines multiple conditions. Returns true if *all* conditions are met.

```sql
SELECT *
FROM employees
WHERE department = 'Sales'
AND hire_date >= '2020-01-01';
```

### **OR**  
Combines multiple conditions. Returns true if *any* condition is met.

```sql
SELECT *
FROM employees
WHERE department = 'Sales'
OR department = 'Finance';
```

### **NOT**  
Negates a condition. Returns true if the condition is false.

```sql
SELECT *
FROM employees
WHERE NOT (department = 'Sales');
```

## 3. Special Operators

#### **IN / NOT IN**  
Checks if a value matches any value in a given list (or subquery result).

```sql
SELECT *
FROM employees
WHERE department IN ('Sales', 'Finance', 'Engineering');
```

`NOT IN` checks if a value is not in the given list.

#### **BETWEEN / NOT BETWEEN**  
Checks if a value is within a given range (inclusive).

```sql
SELECT *
FROM orders
WHERE order_date BETWEEN '2021-01-01' AND '2021-12-31';
```

`NOT BETWEEN` excludes the specified range.

#### **LIKE / GLOB**  
Used for pattern matching in strings. 

* **LIKE** supports simple wildcard patterns:
* `%` (percent) matches zero or more characters.
* `_` (underscore) matches exactly one character.
* **GLOB** uses Unix-like wildcard characters (`*`, `?`, `[`, and `]`), and is case sensitive by default.

```sql
SELECT *
FROM employees
WHERE name LIKE 'A%';  -- names starting with 'A'
```

#### **EXISTS**  
Checks if a subquery returns any rows. Returns true if the subquery contains at least one row.

```sql
SELECT *
FROM employees e
WHERE EXISTS (
SELECT 1
FROM orders o
WHERE o.employee_id = e.id
);
```

#### **CASE**  
Not an operator but rather an expression for conditional logic (similar to `if/else`):

```sql
SELECT 
CASE
    WHEN order_total >= 1000 THEN 'High'
    WHEN order_total >= 500  THEN 'Medium'
    ELSE 'Low'
END AS order_classification
FROM orders;
```

#### **REGEXP**  

* SQLite does not natively include a `REGEXP` operator by default. It can be enabled with an external function. If enabled, it performs regular expression pattern matching.
* Usage example (assuming `REGEXP` is enabled):
  
```sql
SELECT *
FROM employees
WHERE name REGEXP '^[A-Z][a-z]*$';
```

## 4. Using Conditions in Queries

You typically use these operators within:
- **WHERE** clause for filtering rows
- **HAVING** clause for filtering groups (with aggregate functions)
- **JOIN** conditions

```sql
SELECT employee_id, first_name, last_name
FROM employees
WHERE department = 'Sales'
  AND salary > 50000
  AND hire_date BETWEEN '2020-01-01' AND '2021-01-01';
```

This query returns all employees in the `Sales` department whose salary exceeds `50,000` and who were hired in the specified date range.


## Key Points and Tips

1. **Handling NULL values**  
   - Remember that `NULL` in SQL is neither equal nor unequal to other values. Use `IS NULL` or `IS NOT NULL` to check for `NULL`.
   - Comparisons using `= NULL` or `!= NULL` will not work as expected.

2. **Case Sensitivity**  
   - String comparisons can be case-insensitive depending on the collation settings. By default, `LIKE` is case-insensitive for ASCII characters. `GLOB` is case sensitive unless you apply certain collation modifiers.

3. **Performance Considerations**  
   - For large data sets, be mindful of how you combine logical operations and use indexes to speed up queries. For example, indexing a column can help queries with `WHERE` conditions on that column.

4. **Short-Circuit Evaluation**  
   - In many SQL engines, logical operators (AND/OR) evaluate conditions from left to right, short-circuiting when the result is known. However, relying on short-circuit behavior can be non-portable—so it’s better to write queries that don’t depend on order of evaluation.
