# Data Frame Manipulation

## Gather and Spread
Gather is to convert a table from wide to long-form by putting column names in a single column titled with a chosen “key” and all the values from those columns to an adjacent column title with a chosen “value”. If there are columns that should be kept the way they are then use -Name of the column of -c(vector with column names).
```R
Df <- gather(data, key = “Markers”, value = “Expression”, -CellPopulation)
```

```R
  mate <- dplyr::select(comb_dat, cell_population, stim_type, estimate) %>%
    spread(key = stim_type, value = estimate) %>%
    column_to_rownames(var = "cell_population") %>%
    as.matrix()
```
**Examples**  
Select columns from a dataframe and coerce the data to a matrix. Also, group the data and perform min-max scaling per group.
```R
cytof_mat <- cytof_m_ranks$attribute_stats %>%
  mutate(cell_population = paste0(cell_population, " CYTOF")) %>%
  dplyr::select(cell_population, state_marker, meanImp) %>%
  dplyr::group_by(cell_population) %>%
  mutate(min_max = (meanImp - min(meanImp)) /(max(meanImp)-min(meanImp))) %>%
  dplyr::select(cell_population, state_marker, min_max) %>%
  spread(key = state_marker, value = min_max) %>% 
  column_to_rownames(var = "cell_population") %>%
  as.matrix()
```

## Mutate
### Mutate at
The example below formats and round off values to six decimal places in all the columns specified by vars(). You do not need to select columns to use mutate_at(). It performs the operation on the specified columns keeping the rest of the data as it is.
```R
manual_dat %>%  mutate_at(vars(all_of(markers)), ~ as.numeric(format(round(., 6))))
```

In a dataframe conditionally replace values in all numeric columns. This was helpful in creating the p.value matrix with * for values < 0.05 for ComplexHeatmaps.
```R
mutate(across(where(is.numeric), ~ifelse(. < 0.05, "*", "")))
```

### Coalesce
Replace NA values in the second column with values from the first column
```R
my_tibble_updated <- my_tibble %>%
  mutate(col2 = coalesce(col2, col1))
```
## Separate
Separate values of a column by a delimiter and add additional columns with the separated values. 

```R
df %>% separate(subject_visit, into = c("subject", "visit"), sep = "_")

```


