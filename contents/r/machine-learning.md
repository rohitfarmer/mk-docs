# Machine Learning

## Create a Formula from a String
In the most basic case, use as.formula():

This returns a string:
```R
"y ~ x1 + x2"
> [1] "y ~ x1 + x2"
```

This returns a formula:
```R
as.formula("y ~ x1 + x2")
#> y ~ x1 + x2
#> <environment: 0x3361710>
```
Here is an example of how it might be used:
These are the variable names:
```R
measurevar <- "y"
groupvars  <- c("x1","x2","x3")
```
This creates the appropriate string:
```R
paste(measurevar, paste(groupvars, collapse=" + "), sep=" ~ ")
> [1] "y ~ x1 + x2 + x3"
```
This returns the formula:
```R
as.formula(paste(measurevar, paste(groupvars, collapse=" + "), sep=" ~ "))
> y ~ x1 + x2 + x3
> <environment: 0x3361710>
```