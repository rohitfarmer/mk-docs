---
comments: true
---

# Parallel Processing
## doMC
```r
library(doMC)
cores <- detectCores(all.tests = FALSE, logical = FALSE)
registerDoMC(cores)

foreach(i=1:3, .combine=rbind) %dopar% {
  sqrt(i)
 }
```