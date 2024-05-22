# Virtual Environments Using Conda and Mamba

Mamba is a package manager similar to Conda, but it's much faster. I use it to install R and Python packages in a conda environments.

## Setup

By default mamba/conda create environments in the home directory at `~/.conda/envs`. And since the space in the home directory on an HPC is often limited I create a folder `conda-envs` on a larger disk quota location to store all the environments. I do the same for storing caches as mentioned in the [managing conda cache section](#managing-conda-cache) below.

Before we can utilize the new environment location we have to let conda know by adding it to `.condarc` file in your home directory. 

```bash
envs_dirs: [/hpcdata/vrc/vrc1_data/douek_lab/farmerr2/conda-envs]
```

**Note:** I tried putting the envs directory in `.condarc` file, and when I activated the environment then instead of just showing the name of the environment at the prompt it showed me the entire path to the envs folder. There could be something wrong with my shell setup. So, I decided not to include `envs_dirs` in `.condarc` file, but to create a symlink from the desired location to `~/.conda/envs/` folder at the time of environment creation, as mentioned in [create an environment section](#create-an-environment).

### Managing Conda Cache 
The default location for Conda to cache files is the user's home directory, which can rapidly fill and cause issues. This behavior can be changed by setting the `pkgs_dirs` entry in the `.condarc` file or setting the `CONDA_PKGS_DIRS` environment variable. 

First, to see the current cache directory, issue: `conda info`

The package cache entry will display the current package cache directories. The config file entry displays the location of the user `.condarc` file. Editing/creating the `pkgs_dirs` entry in the `.condarc` file will change the cache directory:

```bash
# Open the user .condarc file. By default it is located at $HOME/.condarc.
vim /path/to/.condarc

# Edit the file to include the pkgs_dirs entry with desired cache directory:
pkgs_dirs:
  - /path/to/desired/cache/directory

# Use conda info to confirm change:
conda info
```

Another method to adjust the cache directory is by setting the `CONDA_PKGS_DIRS` environment variable. To do this, issue:

```bash
# Export the variable:
export CONDA_PKGS_DIRS=/path/to/desired/cache/directory

# Confirm change with conda info:
conda info
```

### Clean conda cache

```bash
conda clean --all
```

### Create an environment

To create an environment at the default location or at the location specified in the `.condarc` file.
```bash
mamba create -n env-name
```

Alternatively if you do not want to make a `.condarc` file you can create an environment at any location using `--prefix` and then create a sym link to it at `~/.conda/envs/`. ***Creating a sym link is my preferred method***

```bash
mamba create --prefix=r43

# It will create a subfolder `r43` in the current working directory or the directory specified in .condarc. Here the prefix is non standard location for the environment. 
```

### Activate an environment

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

## Install packages/software in an activated environment

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