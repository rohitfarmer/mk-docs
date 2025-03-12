# SQLite

**For general command line help**  
<a href="https://sqlite.org/cli.html" target="_blank">https://sqlite.org/cli.html</a>

**Note:** By convention SQL commands are written in capital case to distinguish them from the table elements and data. 

## Access shell commands
To clear the terminal
```sql
.shell clear
```

## Open/attach a database
```sql
sqlite3 database.db
```

### Show tables
```sql
.tables
```

### Display the table schema
```sql
.schema tableName
```

## Select

* [SELECT command flowchart](https://www.sqlite.org/lang_select.html)

### Limit
The LIMIT clause is used to place an upper bound on the number of rows returned by the entire SELECT statement.

#### Select everything from a table and limit the output
```sql
SELECT * FROM main LIMIT 5;
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
#### Count total number of distinct (unique) entries in a particular column
The `DISTINCT` clause is an optional clause of the  `SELECT` statement. The `DISTINCT` clause allows you to remove the duplicate rows in the result set.

```sql
SELECT DISTINCT columnName FROM tableName;

SELECT count(DISTINCT columnName) FROM tableName;
```

### Condition
The `WHERE` clause is an optional clause of the `SELECT` statement. It appears after the `FROM` clause as the following statement.

**Note:** Besides the `SELECT` statement, you can use the `WHERE` clause in the `UPDATE` and `DELETE` statements.

#### General format
```sql
SELECT columnName FROM tableName WHERE condition;
```

#### Display unique entries in a column while meeting a condition in another column

```sql
SELECT DISTINCT columnName1 FROM tableName WHERE columnName2 = condition;
```

### String functions
#### Calculate length of string in a column
```sql
SELECT columnName, length(columName) FROM tableName;
```

### Python loop to iterate row wise in a database
```sql
for row in c.execute('SELECT * FROM stocks ORDER BY price'):
        print(row)
```