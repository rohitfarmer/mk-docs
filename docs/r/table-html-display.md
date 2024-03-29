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

[More info](https://rstudio.github.io/DT/)

```r
library(DT)

dttbl <- dfl %>%
      datatable()
```