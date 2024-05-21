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

Alternatively if you do not want to make a `.condarc` file you can create an environment at any location using `--prefix` and then create a sym link to it at `~/.conda/envs/`. ***Creating a sym link is my preferred method***

```bash
mamba create --prefix=r43

# It will create a subfolder `r43` in the current working directory or the directory specified in .condarc. Here the prefix is non standard location for the environment. 
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

## Export an environment

**Note:** activate the desired environment first before executing the commands below. Re-running this command will overwrite any previously generated file.

### Export all the packages/software installed in an active environment to a YAML file

```bash
conda env export > environment.yaml
```

### Exporting an environment file across platforms

If you want to make your environment file work across platforms, you can use the `conda env export --from-history` flag. This will only include packages that you’ve explicitly asked for, as opposed to including every package in your environment. This is helpful as it will resolve the dependencies based on the operating system while still installing the top level programs that you have explicitly specified. 

```bash
conda env export --from-history > environment.yaml
```

Example output

```bash
name: phip
channels:
  - conda-forge
dependencies:
  - r=4.3
  - r-tidyverse
  - r-arrow
  - r-domc
  - r-biocmanager
  - r-devtools
  - ca-certificates
  - openssl
  - bioconda::fastp
  - bioconda::fastx_toolkit
  - bioconda::trimmomatic
  - python=3.9
  - bioconda::bowtie2
```

## Restoring an environment
Conda keeps a history of all the changes made to your environment, so you can easily "roll back" to a previous version. To list the history of each change to the current environment: `conda list --revisions`

To restore environment to a previous revision: `conda install --revision=REVNUM` or `conda install --rev REVNUM`.

**Note:** Replace `REVNUM` with the revision number.

**Example:** If you want to restore your environment to revision 8, run `conda install --rev 8`.

## Removing an environment
To remove an environment, in your terminal window, run:

```bash
conda remove --name myenv --all
```

You may instead use `conda env remove --name myenv`.

To verify that the environment was removed, in your terminal window, run:

```bash
conda info --envs
```

The environments list that displays should not show the removed environment.