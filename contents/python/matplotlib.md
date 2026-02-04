# Matplotlib in Practice

Matplotlib is Python’s **foundational plotting library**. Most other plotting libraries (seaborn, pandas plotting, etc.) are built on top of it.

## What Matplotlib is (and what it isn’t)

Matplotlib:

* Produces **static plots** (PNG, PDF, SVG)
* Gives you **full control** over plots
* Works directly with **NumPy arrays** and **pandas Series/DataFrames**

Matplotlib is not:

* Automatically “pretty”
* Declarative (you build plots step by step)
* Interactive by default (that’s a separate layer)

Think of Matplotlib as a **drawing API for data**.

## The core mental model (very important)

Matplotlib has a **hierarchy**:

```bash
Figure
 └── Axes
      ├── Lines
      ├── Bars
      ├── Text
      └── Ticks
```

* **Figure** → the whole image (canvas)
* **Axes** → a single plot (x/y area)
* You draw *on* Axes

Most confusion comes from mixing these up.

## Importing Matplotlib (standard way)

```python
import matplotlib.pyplot as plt
```

This `plt` interface is a **state machine** that keeps track of the “current” figure and axes.

## Your first plot (line plot)

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0, 10)
y = x ** 2

plt.plot(x, y)
plt.show()
```

What happened:

* `plt.plot()` created a figure + axes (implicitly)
* `plt.show()` displayed it

This is the **quick-and-dirty** approach.

## The explicit (recommended) approach

```python
fig, ax = plt.subplots()

ax.plot(x, y)
plt.show()
```

Why this is better:

* You explicitly control **where things are drawn**
* Required for multiple plots, customization, reuse

Rule of thumb:

> Use `fig, ax = plt.subplots()` for anything non-trivial.

## Labeling your plot (always do this)

```python
fig, ax = plt.subplots()

ax.plot(x, y)
ax.set_title("y = x²")
ax.set_xlabel("x")
ax.set_ylabel("y")

plt.show()
```

A plot without labels is unfinished.

## Styling lines

```python
ax.plot(x, y,
        color="red",
        linestyle="--",
        linewidth=2,
        marker="o")
```

Common options:

* `color`
* `linestyle` (`-`, `--`, `:`)
* `linewidth`
* `marker`

## Multiple lines on the same axes

```python
fig, ax = plt.subplots()

ax.plot(x, x, label="y = x")
ax.plot(x, x**2, label="y = x²")
ax.plot(x, x**3, label="y = x³")

ax.legend()
plt.show()
```

Legend works by matching `label=`.

## Scatter plots (x vs y points)

```python
rng = np.random.default_rng(0)
x = rng.normal(size=100)
y = rng.normal(size=100)

fig, ax = plt.subplots()
ax.scatter(x, y)
plt.show()
```

With color and size:

```python
ax.scatter(x, y, c=y, s=50, alpha=0.7)
```

## Bar plots (categorical data)

```python
categories = ["A", "B", "C"]
values = [10, 15, 7]

fig, ax = plt.subplots()
ax.bar(categories, values)
plt.show()
```

Horizontal bars:

```python
ax.barh(categories, values)
```

## Histograms (distributions)

```python
data = rng.normal(size=1000)

fig, ax = plt.subplots()
ax.hist(data, bins=30)
plt.show()
```

Common options:

* `bins`
* `density=True`
* `alpha`

## Plotting pandas data (very common)

Matplotlib works directly with pandas.

```python
import pandas as pd

df = pd.DataFrame({
    "day": ["Mon", "Tue", "Wed", "Thu", "Fri"],
    "sales": [10, 12, 9, 14, 15]
})
```

```python
fig, ax = plt.subplots()
ax.plot(df["day"], df["sales"])
plt.show()
```

Or via pandas’ wrapper:

```python
df.plot(x="day", y="sales")
plt.show()
```

(Still Matplotlib underneath.)

## Multiple subplots (one figure, many axes)

```python
fig, axes = plt.subplots(2, 2)

axes[0, 0].plot(x, x)
axes[0, 1].plot(x, x**2)
axes[1, 0].plot(x, x**3)
axes[1, 1].plot(x, np.sqrt(x))

plt.tight_layout()
plt.show()
```

Key points:

* `axes` is an array
* Index it like NumPy

## Controlling figure size and resolution

```python
fig, ax = plt.subplots(figsize=(8, 4), dpi=100)
```

Important for:

* Publications
* PDFs
* Presentations

## Axis limits and scales

```python
ax.set_xlim(0, 10)
ax.set_ylim(0, 100)
```

Log scale:

```python
ax.set_yscale("log")
```

## Ticks and formatting

```python
ax.set_xticks([0, 5, 10])
ax.set_xticklabels(["start", "middle", "end"])
```

Rotate labels:

```python
plt.setp(ax.get_xticklabels(), rotation=45)
```

## Annotations and text

```python
ax.text(5, 50, "Important point")
```

Arrow annotation:

```python
ax.annotate("Peak",
            xy=(7, 49),
            xytext=(4, 70),
            arrowprops=dict(arrowstyle="->"))
```

## Saving figures (very important)

```python
fig.savefig("plot.png", dpi=300, bbox_inches="tight")
fig.savefig("plot.pdf")
```

Always save **before** `plt.show()` in scripts.

## A realistic end-to-end example

```python
import pandas as pd
import matplotlib.pyplot as plt

sales = pd.DataFrame({
    "date": pd.date_range("2026-01-01", periods=7),
    "units": [10, 12, 9, 14, 15, 11, 13]
})

fig, ax = plt.subplots(figsize=(8, 4))

ax.plot(sales["date"], sales["units"], marker="o")
ax.set_title("Daily Sales")
ax.set_xlabel("Date")
ax.set_ylabel("Units Sold")

plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

This pattern covers **most real-world plots**.

## Common Matplotlib mistakes

* Mixing `plt.plot()` and `ax.plot()` randomly
* Forgetting labels and legends
* Overusing defaults
* Fighting Matplotlib instead of learning the hierarchy
* Using loops when vectorized plotting works

## The most important mindset shift

Matplotlib is **imperative**:

> “Draw this, then draw that, then adjust this.”

