---
comments: true
---

# Display Tables in HTML Reports

## Using kableExtra
The code below uses `kableExtra` package to generate a condensed table with stripped rows which highlight on mouse hover. 

[For more information on `kableExtra` options](https://haozhu233.github.io/kableExtra/awesome_table_in_html.html).

```r
library(kableExtra)

ktbl <- df %>%
      kbl() %>% 
      kable_styling(bootstrap_options = c("striped", "hover", "condensed"))
```

## Using DT datatable

- [More info](https://rstudio.github.io/DT/)
- [Clickable hyperlinks](https://rpubs.com/erblast/369527)

```r
library(DT)

dttbl <- dfl %>%
         datatable(escape = FALSE, # Escape = FALSE to show clickable hyperlinks in cells.
                   rownames = FALSE, # to remove rownames
                   filter = 'top', # to add filter option for each column
                   extensions = 'Buttons', # to add buttons to copy and download data as CSV and Excel files
                   options = list(dom = 'Blfrtip', buttons = c('copy', 'csv', 'excel'))
                  )    
```