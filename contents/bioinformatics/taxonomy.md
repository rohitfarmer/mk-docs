# Fetch Taxonomic Information from the NCBI Taxonomy Database
There are more than one way to this in R with different packages. 

## Via Internet
## Taxize 
Taxize can fetch the information from multiple taxonomy databases through its unified interface. However, it requires an active internet connection throughout the runtime and database API keys. Below is a function that takes the names of the organisms of interest and parsed the information into a tibble. 

More information: [https://books.ropensci.org/taxize/](https://books.ropensci.org/taxize/)

```R
library(tidyverse)
library(taxize)
names_to_tax_online <- function(orgnames, verbose = FALSE){
        df_out <- tibble()
        for(i in 1:length(orgnames)){
                tax <- orgnames[i]
                cat(i, tax, "\n")
                tax_record <- try(classification(tax, db = "ncbi", max_tries = 10))

                if (inherits(tax_record, "try-error")) {
                        if(verbose) cat("Error:", i, ":", tax, "\n")      
                } else {  
                        if(class(tax_record[[1]]) == "data.frame"){
                                df_out <- bind_rows(df_out, tibble("query_org_name" = tax, tax_record[[1]]))
                        }
                }
        }
        return(df_out)
}
```

## Via Local Database
## Taxonomizr
Taxonomizr only works with the NCBI accessions and tax IDs. It first downloads the NCBI taxonomy database and stores it locally as an SQLite database. Queries are carried out against the SQLite database. This method is fast and doesn't require continuous internet connect or API keys. 

More information: [https://cran.r-project.org/web/packages/taxonomizr/index.html](https://cran.r-project.org/web/packages/taxonomizr/index.html)

```R
library(taxonomizr)

# Download and prepare a local copy of the NCBI Taxonomy database in SQLite format
prepareDatabase(file.path("results", "taxo.sqlite"), getAccessions = FALSE) # Set getAccessions=FALSE if you don't need accession-to-taxid mapping

# Get the tax IDs in a vector
taxids <- unique(dat_with_ncbitaxid$ncbi_tax_id)  # Example tax IDs: human and E. coli

# Search the tax IDs in the SQLite database and return the results in a matrix.
lineage_df <- getTaxonomy(taxids, file.path("results", "taxo.sqlite"))

```