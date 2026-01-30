# Getting Back to Python

This tutorial assumes you already learned Python once. You’re not starting from zero — you’re rebuilding fluency.


## Variables and Data Types: How Python Stores Information

Python is **dynamically typed**: variables point to objects, not fixed types.

```python
x = 10
x = "hello"   # same variable, new object
```

### Core built-in data types

| Type       | Purpose                  | Mutable |
| ---------- | ------------------------ | ------- |
| `int`      | Whole numbers            | ❌       |
| `float`    | Decimal numbers          | ❌       |
| `bool`     | True / False             | ❌       |
| `str`      | Text                     | ❌       |
| `list`     | Ordered collection       | ✅       |
| `tuple`    | Fixed ordered collection | ❌       |
| `dict`     | Key–value mapping        | ✅       |
| `set`      | Unique unordered values  | ✅       |
| `NoneType` | Represents “nothing”     | ❌       |

## Strings: Text Is a Sequence

```python
s = "python"
```

### Accessing characters

```python
s[0]     # 'p'
s[-1]    # 'n'
s[1:4]   # 'yth'
```

### Common operations

```python
s.upper()
s.lower()
s.replace("py", "Py")
" ".join(["hello", "world"])
```

**When to use strings**

* Any human-readable text
* File contents
* Identifiers, labels, names

Strings are **immutable** — every modification creates a new string.

## Lists: Ordered, Changeable Collections

```python
nums = [10, 20, 30]
```

### Accessing elements

```python
nums[0]        # 10
nums[-1]       # 30
nums[1:3]      # [20, 30]
```

### Modifying lists

```python
nums.append(40)
nums[1] = 25
nums.remove(10)
```

### Looping

```python
for n in nums:
    print(n)
```

**When to use lists**

* Ordered data
* When duplicates matter
* When you need to add/remove items

## Tuples: Fixed, Ordered Data

```python
point = (10, 20)
```

### Accessing

```python
point[0]
point[1]
```

Tuples cannot be changed:

```python
point[0] = 5  # error
```

**When to use tuples**

* Fixed-size data (coordinates, RGB values)
* When structure matters more than mutability
* As dictionary keys

## Dictionaries: Key–Value Data

```python
user = {
    "name": "Ada",
    "age": 32,
    "admin": True
}
```

### Accessing values

```python
user["name"]
user.get("email")        # safer, returns None
```

### Modifying

```python
user["age"] = 33
user["email"] = "ada@example.com"
```

### Looping

```python
for key, value in user.items():
    print(key, value)
```

**When to use dictionaries**

* Named data
* Structured records
* Fast lookups by key

Think of dicts as **Python’s basic data structure for real-world objects**.

## Sets: Unique, Unordered Values

```python
tags = {"python", "coding", "python"}
```

Result:

```python
{"python", "coding"}
```

### Operations

```python
tags.add("tutorial")
"a" in tags
```

### Set math

```python
a = {1, 2, 3}
b = {3, 4}

a & b    # intersection → {3}
a | b    # union → {1, 2, 3, 4}
a - b    # difference → {1, 2}
```

**When to use sets**

* Remove duplicates
* Membership tests
* Comparing collections


## Conditions: Making Decisions

```python
x = 10

if x > 5:
    print("big")
elif x == 5:
    print("exact")
else:
    print("small")
```

### Truthiness

```python
if []:
    print("won't run")

if "text":
    print("runs")
```

Falsy values:

* `0`
* `""`
* `[]`, `{}`, `set()`
* `None`
* `False`

## Loops: Repeating Work

### `for` loops

```python
for i in range(3):
    print(i)
```

```python
for key in user:
    print(key)
```

```python
for i, value in enumerate(nums):
    print(i, value)
```

### `while` loops

```python
count = 0
while count < 3:
    count += 1
```

Use `for` when possible; `while` when the end condition is unknown.

## Functions: Reusable Behavior

```python
def add(a, b):
    return a + b
```

### Parameters and return values

```python
def greet(name, excited=False):
    msg = f"Hello {name}"
    if excited:
        msg += "!"
    return msg
```

### Functions that modify data

```python
def normalize(nums):
    total = sum(nums)
    return [n / total for n in nums]
```

**When to write a function**

* You repeat code
* You want clarity
* You want to test logic in isolation

## Accessing Data Inside Data Structures

### Nested structures

```python
data = {
    "users": [
        {"name": "Ada", "age": 32},
        {"name": "Linus", "age": 54}
    ]
}
```

Access:

```python
data["users"][0]["name"]   # "Ada"
```

### Defensive access

```python
user.get("profile", {}).get("email")
```

## File Handling: Reading and Writing Data

### Reading a text file

```python
with open("input.txt", "r") as f:
    content = f.read()
```

### Line-by-line

```python
with open("input.txt") as f:
    for line in f:
        print(line.strip())
```

### Writing a file

```python
with open("output.txt", "w") as f:
    f.write("Hello\n")
```

### Appending

```python
with open("log.txt", "a") as f:
    f.write("New entry\n")
```

The `with` statement:

* Automatically closes files
* Prevents resource leaks
* Is the correct default

## Common Data File Types

### JSON (structured data)

```python
import json

with open("data.json") as f:
    data = json.load(f)

with open("out.json", "w") as f:
    json.dump(data, f, indent=2)
```

JSON maps naturally to:

* dict → object
* list → array

### CSV (tabular data)

```python
import csv

with open("data.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
```

---

## Choosing the Right Data Type

| Need            | Use     |
| --------------- | ------- |
| Ordered data    | `list`  |
| Fixed structure | `tuple` |
| Named fields    | `dict`  |
| Uniqueness      | `set`   |
| Text            | `str`   |
| Absence         | `None`  |

Rule of thumb:

> **If you’re naming things → use a dict.
> If you’re counting things → use a list or set.**

## Python Functions — The Essentials

### What is a function?

A function is a **named block of code** that:

* takes input
* does something
* returns output

```python
def add(a, b):
    return a + b
```

Use it:

```python
result = add(2, 3)
```

### Parameters and return values

```python
def square(x):
    return x * x
```

No `return` → returns `None`.

```python
def log(msg):
    print(msg)
```

### Default and keyword arguments

```python
def greet(name, excited=False):
    return f"Hello {name}!" if excited else f"Hello {name}"
```

```python
greet("Ada")
greet("Ada", excited=True)
```

### Functions and data structures

Functions usually take and return **lists or dicts**.

```python
def normalize(values):
    total = sum(values)
    return [v / total for v in values]
```

Good practice:

* Don’t modify inputs unless you mean to
* Return new data

### Returning multiple values

Python returns a tuple.

```python
def min_max(nums):
    return min(nums), max(nums)

low, high = min_max([1, 5, 9])
```

### Local variables and scope

```python
x = 10

def foo():
    x = 5
    return x
```

Inside ≠ outside.
Avoid using `global`.

### Functions calling functions

Small functions compose well.

```python
def square(x):
    return x * x

def sum_of_squares(nums):
    return sum(square(n) for n in nums)
```

### Basic error handling inside functions

```python
def parse_int(text):
    try:
        return int(text)
    except ValueError:
        return None
```

## Classes

### What is a class

A class groups **data (attributes)** and **behavior (methods)** together.

Think of a class as:

> A blueprint for creating objects.

```python
class Counter:
    pass
```

An object (instance) is created like this:

```python
c = Counter()
```

### Why classes exist

Use classes when:

* Data and functions naturally belong together
* You’re passing around the same group of values
* You want to model a real “thing”

If functions are verbs, classes are **nouns**.

### The `__init__` method

`__init__` runs when an object is created.

```python
class Counter:
    def __init__(self):
        self.value = 0
```

* `self` refers to the current object
* Attributes are attached to `self`

```python
c = Counter()
c.value    # 0
```

### Instance methods

Methods are functions that belong to a class.

```python
class Counter:
    def __init__(self):
        self.value = 0

    def increment(self):
        self.value += 1
```

Usage:

```python
c = Counter()
c.increment()
c.value
```

### Attributes vs local variables

```python
class Example:
    def set(self):
        x = 10          # local variable
        self.y = 20     # attribute
```

* `x` exists only inside the method
* `self.y` exists on the object

### Passing data into a class

```python
class User:
    def __init__(self, name, role):
        self.name = name
        self.role = role
```

```python
u = User("Ada", "admin")
u.name
u.role
```

---

## Methods that return values

```python
class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h
```

```python
r = Rectangle(3, 4)
r.area()
```

---

## Classes and data structures

Objects often **wrap dictionaries or lists**.

```python
class Cart:
    def __init__(self):
        self.items = []

    def add(self, name, price):
        self.items.append({"name": name, "price": price})

    def total(self):
        return sum(item["price"] for item in self.items)
```

---

## When NOT to use classes

Don’t use a class if:

* A function and dict are enough
* There’s no shared state
* You only need one operation

Many Python programs are mostly **functions + dicts**.

---

## A common beginner mistake

❌ Doing too much in one class

```python
class App:
    def load(self): ...
    def process(self): ...
    def email(self): ...
```

✅ Prefer small, focused classes

```python
class Loader: ...
class Processor: ...
```

---

## `__str__`: Make objects readable

```python
class User:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"User({self.name})"
```

```python
print(User("Ada"))
```

---

## Very light inheritance (optional)

Use inheritance only when there is a **true “is-a” relationship**.

```python
class Animal:
    def speak(self):
        return "sound"

class Dog(Animal):
    def speak(self):
        return "woof"
```

```python
Dog().speak()
```

If this feels unnecessary — skip it. Many Python codebases barely use inheritance.

---

## Classes vs functions — quick rule

| Use case                           | Prefer   |
| ---------------------------------- | -------- |
| One operation                      | Function |
| Multiple operations on shared data | Class    |
| Data with behavior                 | Class    |
| Stateless logic                    | Function |

## The shape of real class-based code

```python
class FileReader:
    def __init__(self, path):
        self.path = path

    def read_lines(self):
        with open(self.path) as f:
            return f.readlines()
```

```python
reader = FileReader("data.txt")
lines = reader.read_lines()
```





