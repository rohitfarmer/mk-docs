# SQLite
**For general command line help**  
<a href="https://sqlite.org/cli.html" target="_blank">https://sqlite.org/cli.html</a>

## Open/attach a database
```sql
sqlite3 database.db
```

### Show tables
```sql
.tables
```

## Select
### Select everything from a table and order by desc
```sql
SELECT * FROM tweetscapture ORDER BY Date DESC;
SELECT * FROM tweetscapture ORDER BY date DESC LIMIT 1;
```

### Count entries in a table
```sql
SELECT Count(*) FROM tweetscapture;
```

### Calculate length of string in a column
```sql
SELECT Text, length(Text) FROM tweetscapture;
```

### Python loop to iterate row wise in a database
```sql
for row in c.execute('SELECT * FROM stocks ORDER BY price'):
        print(row)
```