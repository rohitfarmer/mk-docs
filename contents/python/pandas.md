---
comments: true
---

# Pandas in Practice 

Pandas is the go-to Python library for **working with tabular data** (think spreadsheets, CSVs, SQL tables). If NumPy is “arrays,” pandas is “tables with labels,” plus a ton of tools for cleaning, reshaping, and summarizing data.


## Setup and the core objects

```python
import pandas as pd
import numpy as np
```

Pandas has two main data structures:

### `Series` (1D labeled array)

```python
s = pd.Series([10, 20, 30], index=["a", "b", "c"])
s
```

### `DataFrame` (2D table with rows and columns)

```python
df = pd.DataFrame({
    "name": ["Ada", "Linus", "Grace"],
    "age": [32, 54, 40],
    "role": ["admin", "user", "admin"]
})
df
```

## Reading data (CSV is the most common)

### Read a CSV

```python
df = pd.read_csv("data.csv")
```

Common options:

```python
df = pd.read_csv("data.csv",
                 na_values=["", "NA", "null"],
                 parse_dates=["date"],
                 dtype={"id": "string"})
```

### Quick inspection

```python
df.head()
df.tail()
df.shape
df.columns
df.dtypes
df.info()
df.describe(numeric_only=True)
```

## 2. Selecting data: columns, rows, and cells

### Columns

```python
df["age"]          # Series
df[["name", "age"]]  # DataFrame
```

### Rows by position: `.iloc`

```python
df.iloc[0]        # first row
df.iloc[0:3]      # rows 0..2
df.iloc[0, 1]     # cell (row 0, col 1)
```

### Rows by label: `.loc`

If your index has labels (or you set one), use `.loc`:

```python
df2 = df.set_index("name")
df2.loc["Ada"]
df2.loc["Ada", "age"]
```

**Rule of thumb**

* Use `.iloc` when you mean “by position”
* Use `.loc` when you mean “by label”

## Filtering rows (the daily work)

### Boolean filter

```python
df[df["role"] == "admin"]
df[df["age"] >= 40]
```

### Multiple conditions (use `&` and parentheses)

```python
df[(df["role"] == "admin") & (df["age"] >= 35)]
```

### Membership

```python
df[df["role"].isin(["admin", "manager"])]
```

### String contains (handle missing with `na=False`)

```python
df[df["name"].str.contains("a", case=False, na=False)]
```

## Creating and updating columns

### Simple derived column

```python
df["age_plus_10"] = df["age"] + 10
```

### Conditional column (vectorized)

```python
df["is_admin"] = df["role"] == "admin"
```

### More complex: `np.where`

```python
df["tier"] = np.where(df["age"] >= 40, "senior", "junior")
```

### Best practice: `.assign()` (nice for pipelines)

```python
df = df.assign(
    is_admin=df["role"].eq("admin"),
    age_group=pd.cut(df["age"], bins=[0, 35, 50, 120], labels=["young", "mid", "older"])
)
```

## Handling missing data (`NaN`)

### Detect missing

```python
df.isna().sum()
```

### Drop missing (use carefully)

```python
df.dropna()                 # drop rows with any missing
df.dropna(subset=["age"])   # drop only if age missing
```

### Fill missing

```python
df["age"] = df["age"].fillna(df["age"].median())
df["role"] = df["role"].fillna("unknown")
```

## Sorting

```python
df.sort_values("age")
df.sort_values(["role", "age"], ascending=[True, False])
```

## Groupby (the “power feature”)

Groupby is how you do “pivot table”-style summaries.

### Example dataset

```python
sales = pd.DataFrame({
    "date": pd.to_datetime(["2026-01-01","2026-01-01","2026-01-02","2026-01-02"]),
    "store": ["A","B","A","B"],
    "item": ["apple","apple","banana","apple"],
    "units": [10, 5, 7, 3],
    "price": [1.0, 1.0, 2.0, 1.0]
})
sales["revenue"] = sales["units"] * sales["price"]
sales
```

### Total revenue by store

```python
sales.groupby("store")["revenue"].sum()
```

### Multiple aggregations

```python
sales.groupby("store").agg(
    total_units=("units", "sum"),
    total_revenue=("revenue", "sum"),
    avg_units=("units", "mean")
)
```

### Group by multiple columns

```python
sales.groupby(["store", "item"])["revenue"].sum()
```

## Reshaping: pivot, melt, wide vs long

### Pivot (long → wide)

```python
pivot = sales.pivot_table(index="date", columns="store", values="revenue", aggfunc="sum")
pivot
```

### Melt (wide → long)

```python
long_again = pivot.reset_index().melt(id_vars="date", var_name="store", value_name="revenue")
long_again
```

**Rule of thumb**

* Many analyses + plotting prefer **long format**
* Many reports prefer **wide format**

## Joining data (like SQL)

### Example: customer table + orders table

```python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "name": ["Ada", "Linus", "Grace"]
})

orders = pd.DataFrame({
    "order_id": [101, 102, 103],
    "customer_id": [1, 1, 3],
    "total": [50.0, 20.0, 99.0]
})
```

### Merge (join)

```python
merged = orders.merge(customers, on="customer_id", how="left")
merged
```

Join types:

* `how="inner"`: only matching keys
* `how="left"`: keep all left rows
* `how="right"`, `how="outer"` similarly

## Working with dates (very common)

```python
sales["date"].dt.year
sales["date"].dt.month
sales["date"].dt.day_name()
```

Filter by date:

```python
sales[sales["date"] >= "2026-01-02"]
```

Resampling time series:

```python
daily = sales.set_index("date").resample("D")["revenue"].sum()
daily
```

## Practical example: cleaning a messy CSV

Imagine a CSV with:

* weird column names
* missing values
* strings that should be numbers

Here’s a “typical cleanup pipeline”:

```python
df = pd.read_csv("messy.csv")

df.columns = (
    df.columns
      .str.strip()
      .str.lower()
      .str.replace(" ", "_")
)

# Convert numeric columns safely
df["price"] = pd.to_numeric(df["price"], errors="coerce")
df["units"] = pd.to_numeric(df["units"], errors="coerce")

# Handle missing
df["units"] = df["units"].fillna(0).astype(int)
df["price"] = df["price"].fillna(df["price"].median())

# Create derived metric
df["revenue"] = df["units"] * df["price"]

# Summary
summary = df.groupby("category").agg(
    total_units=("units", "sum"),
    total_revenue=("revenue", "sum")
).sort_values("total_revenue", ascending=False)

summary
```

This is very “real pandas.”

## Saving output

### CSV

```python
df.to_csv("cleaned.csv", index=False)
```

### Excel

```python
df.to_excel("report.xlsx", index=False)
```

### Parquet (fast, compact; great for big data)

```python
df.to_parquet("data.parquet", index=False)
```

---

## Pandas vs NumPy: when to use which

Use **NumPy** when:

* pure numeric arrays
* heavy math
* performance-critical inner loops

Use **pandas** when:

* labeled columns
* missing values
* joins/groupby/pivots
* messy real-world datasets

A lot of the time:

* pandas is the “data plumbing”
* NumPy is the “math engine”

## Common pandas mistakes

* Using Python loops over rows (`for i, row in df.iterrows()`) instead of vectorized ops
* Forgetting parentheses with `&` / `|`
* Modifying a slice and getting `SettingWithCopyWarning` (use `.loc` explicitly)
* Confusing `.loc` vs `.iloc`

If you see yourself looping rows, pause and ask:

> “Can I do this with a column operation, `.map`, `.merge`, or `groupby`?”
