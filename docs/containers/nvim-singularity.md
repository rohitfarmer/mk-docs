# Run Neovim/VIM & Jupyter inside a Singularity Container for R Programming

**Video tutorial at: https://youtu.be/j63OKiLpUec**

## Build a Singularity Container
To build a Singularity container copy the lines below to a `Singularity.def` recipe/definition text file and then execute `sudo singularity build container.sif Singularity.def`. For more information on how to build a Singularity containers follow the instructions in the `README` of [https://github.com/rohitfarmer/singularity-defs](https://github.com/rohitfarmer/singularity-defs) or check out the documentation at [https://sylabs.io/](https://sylabs.io/).

```docker
BootStrap: docker
From: debian:buster

%labels
        APPLICATION_NAME Nvim-R in Singularity Container
        AUTHOR_NAME Rohit Farmer
        AUTHOR_EMAIL rohit.farmer@gmail.com
        YEAR 2020

%help
        This container is based on debian buster and contains R 3.5 and Python 3.6.

%environment
        PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin
        LANG=C.UTF-8 LC_ALL=C.UTF-8

%post

# Install Development Tools & Essential Packages
        cd /tmp

        apt-get -qq -y update

        export DEBIAN_FRONTEND=noninteractive
        apt-get -qq install -y --no-install-recommends tzdata apt-utils 

        ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime 
        dpkg-reconfigure --frontend noninteractive  tzdata

        apt-get -y update 
        apt-get install -y --no-install-recommends \
                autoconf \
                automake \
                build-essential \
                bzip2 \
                ca-certificates \
                cmake \
                gcc \
                g++ \
                gfortran \
                git \
                graphviz \
                libtool \
                libjpeg-dev \
                libpng-dev \
                libtiff-dev \
                libatlas-base-dev \
                libxml2-dev \
                libcairo2-dev \
                libeigen3-dev \
                libpcre3-dev \
                libssl-dev \
                libcurl4-openssl-dev \
                libboost-all-dev \
                libgtk2.0-dev \
                libreadline-dev \
                libbz2-dev \
                liblzma-dev \
                libzmq3-dev \
                libpcre++-dev \
                libpango1.0-dev \
                libopenblas-base \
                libopenblas-dev \
                liblapack-dev \
                libxt-dev \
                neovim \
                openjdk-11-jdk \
                python3 \
                python3-dev \
                python3-pip \
                python3-setuptools \
                r-base \
                r-base-dev \
                texlive \
                texlive-fonts-extra \
                texinfo \
                vim \
                wget \
                xvfb \
                xauth \
                xfonts-base \
                zip \
                zlib1g-dev


        export LANG=C.UTF-8 LC_ALL=C.UTF-8


# Install Jupyter notebook
        python3 -m pip --no-cache-dir install jupyter

        R --quiet --slave -e 'install.packages(c("IRkernel"), repos="https://cloud.r-project.org/")'

# Install Python client to Neovim
        python3 -m pip --no-cache-dir install pynvim

# Install R packages
        apt-get install -y --no-install-recommends \
            r-cran-tidyverse

# Cleanup
        apt-get -qq clean
        rm -rf /var/lib/apt/lists/* 
```

## Invoke a Shell inside the Container
To invoke a shell inside the container 

```bash
singularity shell container.sif
```
Now run `nvim` as you would normally run in a terminal.

## Execute a Jupyter notebook in the Container
To execute a Jupyter notebook inside the container first run
```bash
singularity exec container.sif R --quiet --slave -e 'IRkernel::installspec()'
```

NOTE: You only have to do it once to install `kernelspec`.

Now execute
```bash
singularity exec container.sif jupyter notebook --no-browser --ip=127.0.0.1 --port=8888
```

## Running on an HPC

1. SSH to the HPC.
1. Claim an interactive node.
1. Navigate to your project directory. Singularity container should be in your project directory.
1. Execute `singularity exec container.sif jupyter notebook --no-browser --ip='0.0.0.0'`
1. Keep the SSH session and Jupyter notebook session running. Copy the URL on your local browser.

NOTE: On some HPCs, you may have to initiate an additional SSH tunnel connecting your local machine to the interactive node on the HPC. In that case, ask your system administrator.

# How to use Neovim or VIM Editor as an IDE for R
For a detailed tutorial on how to use Neovim or VIM editor as an IDE for R please watch the video below. 

[![How to use Neovim or VIM Editor as an IDE for R](https://img.youtube.com/vi/nm45WagtV3w/0.jpg)](https://youtu.be/nm45WagtV3w)
