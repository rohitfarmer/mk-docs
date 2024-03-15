# R Environments Using Mamba

Mamba is a package manager similar to Conda, but it's much faster. I am using it to create environments for R, especially for the HPC.

## Setup

By default mamba/conda create environments in the home directory at `~/.conda/envs`. On the HPC since the space in the home directory is limited create a folder `conda-envs` at a suitable location to store all the environments. 

Before we can utilize this new environment location we have to let conda know by adding it to `.condarc` file in your home directory. 

```bash
envs_dirs: [/hpcdata/vrc/vrc1_data/douek_lab/farmerr2/conda-envs]
```

## Create an environment and install R

To create an environment at the default location or at the location specified in the `.condarc` file.
```bash
mamba create -n env-name
```

Alternatively if you do not want to make a `.condarc` file you can create an environment at any location using `--prefix` and then create a sym link to it at `~/.conda/envs/`.

```bash
mamba create --prefix=r43

# It will create a subfolder `r43`. Here the prefix is non standard location for the environment. 
```

## Activate an environment

```bash
conda activate env-name
or
mamba activate env-name
```

or

```bash
# From the environment folder location
source activate r43/
```

## Install R in the activated environment

**Note:** You do not need to be in the environment file folder. The environment needs to be active to install it. 

```bash
mamba install r=4.3
```

### Install popular R packages

```bash
mamba install r-tidyverse r-arrow r-doMC r-biocmanager r-devtools
```