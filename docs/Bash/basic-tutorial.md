# A Tutorial on Shell Scripting

Below is a step-by-step tutorial on Bash shell scripting. It starts with basic concepts and gradually moves on to more advanced topics and best practices. By the end, you should have a solid understanding of how to create and run scripts in a Linux/Unix environment, and how to write shell scripts to automate tasks.

---

## 1. What is a Shell and What is Bash?

1. **Shell**: In Unix-like operating systems, a shell is a command-line interface that allows you to interact with the operating system by typing commands. It interprets the commands you type and runs programs accordingly.

2. **Bash**: Bash stands for “Bourne-Again SHell.” It is one of the most common, feature-rich, and user-friendly shells. Most Linux distributions and macOS come with Bash (or a variant) as the default shell.

Bash scripting refers to writing a series of commands into an executable file that the Bash shell can interpret. This enables you to automate repetitive tasks, run batch jobs, manage systems, and build powerful command-line “apps.”

---

## 2. Creating and Running Your First Script

1. **Create a new file**. You can use any text editor (e.g., `nano`, `vim`, or `gedit`). For example:
   ```bash
   nano hello.sh
   ```
2. **Add the shebang line**. The shebang `#!/bin/bash` tells the system which interpreter should run the script. So, your script could be:
   ```bash
   #!/bin/bash
   echo "Hello, World!"
   ```
3. **Make the script executable**. You need to set executable permission:
   ```bash
   chmod +x hello.sh
   ```
4. **Run the script**. Run it in your terminal:
   ```bash
   ./hello.sh
   ```
   You should see `Hello, World!` displayed on the screen.

---

## 3. Basic Bash Script Structure

A typical Bash script has the following structure:
```bash
#!/bin/bash

# Comments describing the script’s purpose
# Author, date, version, etc. (optional but recommended)

# 1. Define variables
# 2. Use shell built-ins, commands, and control structures
# 3. Return (exit) an appropriate status code
```

**Key points**:
- Start every script with `#!/bin/bash` or your preferred shell’s path.
- Use comments (`#`) to describe code, increase readability, and clarify logic.
- Keep the script as simple and modular as possible.

---

## 4. Variables and Parameters

### 4.1. Defining Variables

You can define variables without a type; by default, they are strings, but they can be treated as numbers when needed.

```bash
#!/bin/bash

my_string="Hello"
my_number=42

echo $my_string
echo $my_number
```

- No spaces around `=` when defining variables.
- Access variables with `$variable_name` (or `${variable_name}` when more explicit syntax is needed).

### 4.2. Environment Variables

Environment variables like `HOME`, `PATH`, and `USER` are automatically defined by the system. You can access them as with any variable:

```bash
echo "Home directory: $HOME"
echo "Current user: $USER"
```

### 4.3. Command Line Arguments

Command line arguments are variables accessed by position:
- `$0`: The name of the script
- `$1`, `$2`, ...: The arguments passed to the script
- `$#`: The number of arguments
- `$@`: All arguments as a list

**Example**:
```bash
#!/bin/bash

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "Number of arguments: $#"
echo "All arguments: $@"
```

If you run `./my_script.sh arg1 arg2`, you will see the assigned values for each positional parameter.

---

## 5. Working with User Input

Sometimes, you’ll want to prompt the user for input rather than passing arguments on the command line. You can do this using the `read` command:

```bash
#!/bin/bash

echo "Enter your name:"
read user_name
echo "Hello, $user_name!"
```

- `-p` option allows you to specify a prompt inline:
  ```bash
  read -p "Enter your name: " user_name
  ```

- `-s` option hides user input (useful for passwords):
  ```bash
  read -s -p "Enter your password: " user_pass
  ```

---

## 6. Conditional Statements

Bash supports `if-then-else`, `elif` (else-if), and `case` statements.

### 6.1. `if` Statements

```bash
if [ condition ]; then
  # commands
elif [ other_condition ]; then
  # commands
else
  # commands
fi
```

When checking conditions, you can use:
- `-z` to check if a string is empty
- `-n` to check if a string is not empty
- `-eq`, `-ne`, `-lt`, `-le`, `-gt`, `-ge` for numeric comparisons
- `==`, `!=` for string comparisons (within `[[ ]]`)

**Example**:
```bash
#!/bin/bash

# Check if a number is positive, negative, or zero

read -p "Enter a number: " num

if [ $num -gt 0 ]; then
  echo "Positive"
elif [ $num -lt 0 ]; then
  echo "Negative"
else
  echo "Zero"
fi
```

> **Tip**: Use `[[ ... ]]` over `[ ... ]` for more reliable scripting (e.g., easier string handling, pattern matching).

### 6.2. `case` Statements

A `case` statement is often cleaner than multiple `if-elif` statements:

```bash
#!/bin/bash

read -p "Enter a letter (a/b/c): " letter

case $letter in
  a)
    echo "You entered 'a'"
    ;;
  b)
    echo "You entered 'b'"
    ;;
  c)
    echo "You entered 'c'"
    ;;
  *)
    echo "Unknown letter"
    ;;
esac
```

---

## 7. Loops

### 7.1. `for` Loops

Bash has multiple ways to write a `for` loop:

**Iterate over a list**:
```bash
#!/bin/bash

for fruit in apple banana cherry
do
  echo "Fruit: $fruit"
done
```

**Traditional C-style loop** (requires `(( ))`):
```bash
#!/bin/bash

for (( i=0; i<5; i++ ))
do
  echo "i = $i"
done
```

### 7.2. `while` Loops

`while` loops iterate as long as a condition is true:

```bash
#!/bin/bash

count=1
while [ $count -le 5 ]
do
  echo "Count = $count"
  ((count++))  # increment the counter
done
```

### 7.3. `until` Loops

`until` loops are like `while`, but they continue until a condition is true:

```bash
#!/bin/bash

count=1
until [ $count -gt 5 ]
do
  echo "Count = $count"
  ((count++))
done
```

---

## 8. Functions in Bash

Functions let you organize your script into reusable blocks of code.

```bash
#!/bin/bash

# Function definition
function greet {
  local name=$1
  echo "Hello, $name!"
}

# Using the function
greet "Alice"
greet "Bob"
```

- You can define a function either with `function name { ... }` or `name() { ... }`.
- Use `local` to limit a variable’s scope to within the function.
- Functions can return status codes using `return`, and you can retrieve output with command substitution (e.g., `value=$(my_function)`).

---

## 9. Command Substitution and Arithmetic

### 9.1. Command Substitution

You can capture the output of a command to a variable using backticks `` `command` `` or `$(command)`:

```bash
#!/bin/bash

current_date=$(date +%Y-%m-%d)
echo "Today's date is $current_date"
```

`$( ... )` is preferred for clarity and nesting capability.

### 9.2. Arithmetic

Bash supports arithmetic expansion in the form of `$(( expression ))`:

```bash
a=5
b=3
sum=$(( a + b ))
echo "Sum: $sum"  # Outputs "Sum: 8"
```

---

## 10. Working with Files and Directories

### 10.1. Checking File Existence and Permissions

You can use test operators (inside `[ ]` or `[[ ]]`) to check file properties:

- `-e file`: file exists
- `-f file`: file is a regular file
- `-d file`: file is a directory
- `-r file`: file is readable
- `-w file`: file is writable
- `-x file`: file is executable

**Example**:
```bash
#!/bin/bash

file="data.txt"
if [ -e "$file" ]; then
  echo "$file exists."
else
  echo "$file does not exist."
fi
```

### 10.2. Reading Files in a Loop

You can read a file line-by-line:

```bash
#!/bin/bash

while IFS= read -r line
do
  echo "Line: $line"
done < "input.txt"
```
- `IFS=` sets the “Internal Field Separator” to an empty value, preserving leading/trailing whitespace.

---

## 11. Redirecting Output and Using Pipes

- **Redirection**:
  - `>` overwrites a file.
  - `>>` appends to a file.
  - `2>` redirects error messages to a file.
  - `&>` redirects both standard output and errors.

- **Pipes**: Use the pipe operator `|` to send the output of one command to another:
  ```bash
  ls -l | grep ".txt"
  ```

---

## 12. Error Handling and Debugging

### 12.1. Exit Status

- Each command in Bash returns an exit status code (`0` for success, non-zero for error).
- You can check the exit status of the last command using `$?`.

Example:
```bash
#!/bin/bash

some_command
if [ $? -ne 0 ]; then
  echo "some_command failed!"
  exit 1
fi
echo "some_command succeeded!"
```

### 12.2. `set` Options

You can enable certain shell options to improve error handling:

- `set -e`: Exit immediately if a command exits with a non-zero status.
- `set -u`: Treat unset variables as an error and exit immediately.
- `set -x`: Print commands and their arguments as they are executed (useful for debugging).
- `set -o pipefail`: Causes a pipeline to return the exit status of the last command that had a non-zero exit status.

You can combine them:
```bash
#!/bin/bash
set -euo pipefail
```

---

## 13. Best Practices

1. **Use meaningful variable names**. This makes scripts more readable.
2. **Quote variables**. In most cases, use `"$variable"` to prevent word splitting, especially with file paths that might contain spaces.
3. **Use comments**. Explain why you do something rather than what you’re doing (the code itself is the “what”).
4. **Check exit statuses** of critical commands to handle errors robustly.
5. **Modularize**. Use functions to group related tasks.
6. **ShellCheck**. Consider using [ShellCheck](https://github.com/koalaman/shellcheck) (if available) to lint your scripts and detect common pitfalls and mistakes.

---

## 14. Example: A Simple Backup Script

Below is a simple backup script that demonstrates many of the concepts covered:

```bash
#!/bin/bash
# A simple backup script to copy a directory to a backup folder with a timestamp

set -euo pipefail

SOURCE_DIR="$1"
BACKUP_DIR="$2"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Check if the source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: Source directory $SOURCE_DIR does not exist." >&2
  exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Construct the backup destination path
DESTINATION="$BACKUP_DIR/$(basename "$SOURCE_DIR")-$TIMESTAMP"

# Perform the backup using cp -r
cp -r "$SOURCE_DIR" "$DESTINATION"

echo "Backup of $SOURCE_DIR completed at $DESTINATION"
exit 0
```

**How to run it**:

```bash
chmod +x backup.sh
./backup.sh /path/to/source /path/to/backupdir
```

1. Takes command line arguments for the source and backup directories.
2. Checks if the source directory exists.
3. Creates the backup directory if it doesn’t exist.
4. Copies (recursively) the source directory into a timestamped folder.
5. Prints a success message.

---

## Conclusion

Bash shell scripting is a powerful way to automate tasks and manage your Linux/Unix systems more efficiently. In this tutorial, we covered:

1. Creating and running scripts (shebang, permissions)
2. Variables, environment variables, and command-line arguments
3. User input handling
4. Conditionals (`if`, `case`)
5. Loops (`for`, `while`, `until`)
6. Functions
7. File operations
8. Redirection and pipes
9. Error handling and debugging
10. Best practices

With these foundational skills, you can build a variety of tools – from simple automation scripts to more complex system management scripts and utility programs. Experiment, explore the Bash manual pages (e.g., `man bash`), and consider additional resources such as the advanced features in Bash scripting to continue learning.

Happy scripting!