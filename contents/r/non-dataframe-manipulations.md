---
comments: true
---

# Non Data Frame Related Manipulations


## Generate all possible combinations of elements from two vectors

This will return a dataframe with the specified columns. Each row will contain a unique combination of the two columns. 
```r
expand.grid("subject" = all_subj, "species" = all_species, stringsAsFactors = FALSE)
```