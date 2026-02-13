---
comments: true
---

# Local BLAST

## Install local BALST in a Conda environment

```bash
mamba install bioconda::blast
```

### Create a local BLAST database

```bash
makeblastdb -in algae.fasta -out algaedb -dbtype 'nucl' -hash_index
```

## Install rBLAST

[NCBI BLAST](https://bioconductor.org/packages/release/data/experiment/vignettes/systemPipeRdata/inst/doc/SPblast.html)
[GitHub repo](https://github.com/mhahsler/rBLAST)

```r
install.packages('rBLAST', repos = 'https://mhahsler.r-universe.dev')
```

### Search a local BLAST database using rBLAST

```r
library(rBLAST)
bl <- blast(db = file.path(bdb), type = "blastp") # Create an rBLAST object
bl_res <- predict(bl, AAStringSet(aa_seq)) # Pass the sequence to search as an XStringSet object
```