# NumPy in Practice

## Why NumPy exists (revisited, but concretely)

Python lists are great containers, but terrible calculators.

```python
lst = [1, 2, 3, 4]

[x * 2 for x in lst]   # works, but slow for big data
```

NumPy replaces **loops over numbers** with **vectorized operations** written in fast C.

```python
import numpy as np

a = np.array([1, 2, 3, 4])
a * 2
```

This single idea explains 90% of NumPy.

---

## Creating arrays (the right way)

### From Python data

```python
np.array([1, 2, 3])
np.array([[1, 2], [3, 4]])
```

All elements must be the **same type**.

```python
np.array([1, 2.5, 3])   # all floats
```

### Built-in constructors (very common)

```python
np.zeros(5)
np.ones((2, 3))
np.full((3, 3), 7)
```

### Ranges

```python
np.arange(0, 10, 2)
np.linspace(0, 1, 5)
```

Use:

* `arange` for integer steps
* `linspace` for exact spacing

## Understanding shape and dimensions

```python
a = np.array([[1, 2, 3],
              [4, 5, 6]])
```

```python
a.shape    # (2, 3)
a.ndim     # 2
a.size     # 6
```

Mental model:

* **shape** = rows × columns
* **ndim** = how many axes

## Indexing and slicing (core skill)

### 1D arrays

```python
a = np.array([10, 20, 30, 40, 50])

a[0]
a[-1]
a[1:4]
```

### 2D arrays

```python
a = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])
```

```python
a[0, 1]      # row 0, column 1
a[:, 0]      # first column
a[1, :]      # second row
a[0:2, 1:3]  # submatrix
```

This replaces nested loops cleanly.

## Vectorized math (where NumPy shines)

Every operation applies **element-wise**.

```python
a = np.array([1, 4, 9, 16])

np.sqrt(a)
a + 10
a * a
```

Even comparisons:

```python
a > 5
```

## Boolean masks (extremely important)

Boolean arrays let you **select and modify data**.

```python
temps = np.array([68, 72, 75, 60, 82])

hot = temps > 70
hot
```

Filter:

```python
temps[hot]
```

Modify:

```python
temps[temps < 65] = 65
temps
```

This replaces:

* conditionals inside loops
* temporary lists

## Broadcasting (how shapes interact)

Broadcasting lets NumPy combine arrays of different shapes.

```python
a = np.array([1, 2, 3])
a + 10
```

2D + 1D:

```python
m = np.array([[1, 2, 3],
              [4, 5, 6]])

m + np.array([10, 20, 30])
```

Rule:

> Dimensions must either match or be 1.

If broadcasting feels magical — that’s normal. Use it intentionally, not cleverly.

## Aggregations and statistics

```python
data = np.array([10, 20, 30, 40])

data.sum()
data.mean()
data.std()
```

On matrices:

```python
m.sum(axis=0)   # column-wise
m.sum(axis=1)   # row-wise
```

Axis = **what you collapse**.

## Reshaping data

```python
a = np.arange(12)

a.reshape(3, 4)
```

Automatic dimension:

```python
a.reshape(-1, 2)
```

Transpose:

```python
m.T
```

Flatten:

```python
m.flatten()
```

Reshaping is common in:

* ML pipelines
* image processing
* matrix math

## Practical example 1: normalize sensor data

```python
readings = np.array([120, 130, 125, 140, 135])

mean = readings.mean()
std = readings.std()

normalized = (readings - mean) / std
normalized
```

This would be **ugly and slow** with loops.

## Practical example 2: tabular data analysis

Imagine rows = days, columns = sensors.

```python
data = np.array([
    [20, 21, 19],
    [22, 23, 20],
    [21, 22, 20],
])
```

Daily average:

```python
data.mean(axis=1)
```

Sensor average:

```python
data.mean(axis=0)
```

Find hot days:

```python
data[data > 22]
```

## Reading and writing data

### Text files

```python
np.savetxt("data.txt", data)
loaded = np.loadtxt("data.txt")
```

### CSV

```python
np.genfromtxt("data.csv", delimiter=",", skip_header=1)
```

NumPy is strict; for messy data, pandas is better.

## NumPy arrays vs Python lists (decision guide)

Use **lists** when:

* Data is small
* Mixed types
* Dynamic resizing

Use **NumPy** when:

* Numeric data
* Fixed shape
* Performance matters


