# SQLite

SQLite (often pronounced "sequel-light") is a lightweight, self-contained, serverless database engine widely used in applications that need a simple yet powerful way to store and query data. Unlike traditional client-server databases (e.g., PostgreSQL, MySQL), SQLite doesn’t require a separate database server process. Instead, it reads and writes directly to ordinary files on the filesystem.

**For general command line help**  
<a href="https://sqlite.org/cli.html" target="_blank">https://sqlite.org/cli.html</a>

**Note:** By convention SQL commands are written in capital case to distinguish them from the table elements and data. 

## Dot commands

In the SQLite interactive shell (the command-line interface), many commands are provided as dot commands (sometimes called meta-commands). They do not follow standard SQL syntax and are specific to the SQLite shell. Dot commands let you perform common operations such as listing tables, importing data, configuring output modes, and much more.

### 1. Basic Commands

| Command          | Description                                                                                                       |
|------------------|-------------------------------------------------------------------------------------------------------------------|
| **`.help`**      | Shows a list of all available dot commands with brief explanations.                                               |
| **`.exit`**      | Exits the SQLite shell (same as `.quit`).                                                                         |
| **`.quit`**      | Exits the SQLite shell (same as `.exit`).                                                                         |
| **`.databases`** | Lists attached databases. You will typically see `main` for your primary database and `temp` for temporary data.  |
| **`.show`**      | Displays the current configuration settings of the SQLite shell (e.g., mode, separator, etc.).                    |
| **`.mode`**      | Sets the mode for displaying the results of queries (e.g., `column`, `list`, `csv`, `json`).                      |
| **`.headers`**   | Toggles the display of column headers in query output (e.g., `.headers on` or `.headers off`).                    |
| **`.nullvalue`** | Defines what string to use when a NULL value appears in query results.                                            |
| **`.timer`**     | Toggles a display of how long each query takes to execute (e.g., `.timer on` or `.timer off`).                    |
| **`.clear`**     | To clear the terminal.                                                                                            |

### 2. Exploring Database Structure

| Command                 | Description                                                                                                                 |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| **`.tables`**           | Lists all the tables in the **main** database (and any attached databases).                                                 |
| **`.schema`**           | Shows the SQL used to create database objects (tables, views, indexes). By default, shows **all** objects in the database.  |
| **`.schema table_name`**| Shows the SQL for a specific table (or view, index, etc.).                                                                  |
| **`.indexes table_name`** | Lists all the indexes for a specific table.                                                                               |
| **`.analyze`**          | Runs the `ANALYZE` command on the database to collect statistics that can help the query planner.                           |
| **`.explain`**          | Toggles output mode into EXPLAIN or EXPLAIN QUERY PLAN mode for subsequent SQL commands.                                    |

**Examples**  
```sql
.tables
.schema my_table
.indexes my_table
```
### 3. Working with Data (Import/Export)

| Command                  | Description                                                                                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`.import file table`** | Imports data from a specified file into a table.                                                                                                                     |
| **`.export`** (legacy)   | In older versions of SQLite, `.export` was sometimes used; generally, you’ll use `.mode` and then redirect to a file to save query results.                          |
| **`.output file`**       | Directs all subsequent query results to the specified file instead of the console.                                                                                   |
| **`.once file`**         | Same as `.output` but only for the next single query. After that query, output returns to the console automatically.                                                 |
| **`.dump`**              | Outputs SQL statements that, if run, would recreate the database (including tables, indexes, and the data itself). You can direct this output to a file via `.output`. |
| **`.load``               | Loads an extension from a shared library (used for loading SQLite extensions).                                                                                      |

**Examples**  
```sql
-- Importing CSV data into a table named 'my_table':
.mode csv
.import /path/to/data.csv my_table

-- Exporting a table to an SQL file:
.output backup.sql
.dump
.output stdout  -- revert output to console
```

### 4. Scripting & Advanced Usage

| Command                | Description                                                                                                                          |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **`.read file`**       | Reads (executes) SQL commands from the specified file. This is useful for running large SQL scripts.                                |
| **`.save file`**       | Saves (creates a backup of) the current database to a new file. If the database is empty, it will effectively rename the database.  |
| **`.restore file`**    | Restores the database from a backup file.                                                                                           |
| **`.clone newfile.db`**| Creates a new database file (`newfile.db`) and clones the existing schema and data into it.                                         |

**Examples**  
```sql
.read setup_tables.sql      -- Execute SQL commands from a file
.save backup_database.db    -- Creates a backup copy of the current DB in 'backup_database.db'
.restore backup_database.db -- Restores the database from that backup file
.clone cloned_database.db   -- Creates a new DB file with a copy of the current schema + data
```

### 5. Output Formatting

Dot commands give you significant control over how query results are displayed:

| Command                          | Description                                                                      |
|----------------------------------|----------------------------------------------------------------------------------|
| **`.mode MODE`**                 | Sets the mode for displaying query results. Common modes include `column`, `csv`, `tabs`, `json`, `html`, `line`, `markdown`, `box`, etc. |
| **`.headers on/off`**           | Toggles column headers in query results.                                         |
| **`.width x y z ...`**          | Sets column widths for `column` mode. Each value corresponds to each column’s width.  |
| **`.separator`** (in older docs) | Changes the column separator character (mainly used in `list` or CSV mode).       |
| **`.nullvalue string`**          | Defines how NULL values are displayed.                                            |

**Example**  
```sql
.headers on
.mode column
.width 20 30
.nullvalue [NULL]
SELECT * FROM employees;
```

### Quick Reference

1. **List Tables**  
   ```sql
   .tables
   ```
2. **Show Table Schema**  
   ```sql
   .schema table_name
   ```
3. **Export Entire DB**  
   ```sql
   .output backup.sql
   .dump
   .output stdout
   ```
4. **Import CSV**  
   ```sql
   .mode csv
   .import file.csv table_name
   ```
5. **Exit Shell**  
   ```sql
   .exit
   ```
6. **Help**  
   ```sql
   .help
   ```

## Select

* [SELECT command flowchart](https://www.sqlite.org/lang_select.html)

```sql
SELECT columnName FROM tableName;
SELECT columnName1,columnName2 FROM tableName;
```

### Limit
The `LIMIT` clause is used to place an upper bound on the number of rows returned by the entire `SELECT` statement. It is used at the end of the statement. 

*Note:* You should always use the LIMIT clause with the  ORDER BY clause. Because you want to get a number of rows in a specified order, not in an unspecified order.

* [Tutorial on LIMIT](https://www.sqlitetutorial.net/sqlite-limit/)

```sql
SELECT * FROM tableName LIMIT rowCount;
SELECT columnList FROM tableName LIMIT rowCount;
```

#### Offset
If you want to get the first 10 rows starting from the 10th row of the result set, you use `OFFSET` keyword.

```sql
SELECT * FROM tableName LIMIT 10 OFFSET 10;
```

### Order
If a `SELECT` statement that returns more than one row does not have an `ORDER BY` clause, the order in which the rows are returned is **undefined**. If you don’t specify the `ASC` or `DESC` keyword, SQLite sorts the result set using the **`ASC` option by default**. If you want to sort the result set by multiple columns, you **use a comma (,) to separate two columns**. The `ORDER BY` clause sorts rows using columns or expressions from **left to right**. SQLite allows you to sort the result set using columns that do not appear in the select list of the `SELECT` clause

* [Tutorial on ORDER BY](https://www.sqlitetutorial.net/sqlite-order-by/)


#### Select everything from a table and order by desc
```sql
SELECT * FROM tableName ORDER BY columnName DESC;
```

#### Select everything from a table and order by desc and limit the output
```sql
SELECT * FROM tableName ORDER BY columnName DESC LIMIT 5;
```

### Count
#### Count total entries in a table
```sql
SELECT count(*) FROM tablename;
```

### Distinct (unique)
The `DISTINCT` clause is an optional clause of the  `SELECT` statement. The `DISTINCT` clause allows you to remove the duplicate rows in the result set.

* [Tutorial on DISTINCT](https://www.sqlitetutorial.net/sqlite-distinct/)

```sql
SELECT DISTINCT columnName FROM tableName;
```

#### Count total number of distinct (unique) entries in a particular column
```sql
SELECT count(DISTINCT columnName) FROM tableName;
```

### Condition
The `WHERE` clause is an optional clause of the `SELECT` statement. It appears after the `FROM` clause and before the `ORDER BY` clause if any.

**Note:** Besides the `SELECT` statement, you can use the `WHERE` clause in the `UPDATE` and `DELETE` statements.

* [Notes on conditional and logical operators used with WHERE](sqlite-where.md)
* [Tutorial on WHERE](https://www.sqlitetutorial.net/sqlite-where/)

```sql
SELECT columnName FROM tableName WHERE condition;
```

#### Display unique entries in a column while meeting a condition in another column

```sql
SELECT DISTINCT columnName1 FROM tableName WHERE columnName2 = condition;
```

## String functions
#### Calculate length of string in a column
```sql
SELECT columnName, length(columName) FROM tableName;
```

### Python loop to iterate row wise in a database
```sql
for row in c.execute('SELECT * FROM stocks ORDER BY price'):
        print(row)
```