---
comments: true
---

# Building a Singularity Container for Machine Learning, Data Science, & Chemistry

## Learning Objectives
1. Build a Linux based Singularity container. 
   * First build a writable sandbox with essential elements.
   * Inspect the container. 
   * Install additional software. 
   * Convert the sandbox to a read-only SquashFS container image. 
1. Install software & packages from multiple sources.
   * Using `apt-get` package management system.
   * Compiling from source code.
   * Using `Python pip`.
   * Using `install.packages()` function in R.
1. Software highlight.
   * Jupyter notebook.
   * Tensorflow GPU version.
   * OpenMPI.
   * Popular datascience packages in Python and R.
   * Chemistry/chemoinformatics software: RDkit, OpenBabel, Pybel, & Mordred.
1. Test the container.
   * Test the GPU version of Tensorflow.

## Core Container Build

First we will build a writable Singularity sandbox with the essential software, languages, and developmental libraries. To build a writable sandbox copy the recipe below to a `container.def` text file and then execute:   

`sudo singularity build --sandbox container/ container.def`

**Recipe/Definition File**
```
BootStrap: docker
From: ubuntu:bionic

%labels
    APPLICATION_NAME Data Science and Chemistry
    AUTHOR_NAME Rohit Farmer
    AUTHOR_EMAIL rohit.farmer@gmail.com
    YEAR 2021

%help
    Container for data science and chemistry with packages from Python 3 & R 3.6. 
    It also includes CUDA and MPI for Tensorflow GPU and parallel processing respectively. 

%environment
    # Set system locale
    PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin
    RDBASE=/usr/local/share/rdkit
    CUDA=/usr/local/cuda/lib64:/usr/local/cuda-10.1/lib64:/usr/local/cuda-10.2/lib64
    LD_LIBRARY_PATH=/.singularity.d/libs:$RDBASE/lib:$CUDA
    PYTHONPATH=modules:$RDBASE:/usr/local/share/rdkit/rdkit:/usr/local/lib/python3.6/dist-packages/
    LANG=C.UTF-8 LC_ALL=C.UTF-8
    
%post
    # Change to tmp directory to download temporary files.
    cd /tmp

    # Install essential software, languages and libraries. 
    apt-get -qq -y update
    
    export DEBIAN_FRONTEND=noninteractive
    apt-get -qq install -y --no-install-recommends tzdata apt-utils 

    ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime 
    dpkg-reconfigure --frontend noninteractive  tzdata
    
    apt-get -qq -y update 
    apt-get -qq install -y --no-install-recommends \
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
        gnupg2 \
        libtool \
        libjpeg-dev \
        libpng-dev \
        libtiff-dev \
        libatlas-base-dev \
        libxml2-dev \
        zlib1g-dev \
        libcairo2-dev \
        libeigen3-dev \
        libcupti-dev \
        libpcre3-dev \
        libssl-dev \
        libcurl4-openssl-dev \
        libboost-all-dev \
        libboost-dev \
        libboost-system-dev \
        libboost-thread-dev \
        libboost-serialization-dev \
        libboost-regex-dev \
        libgtk2.0-dev \
        libreadline-dev \
        libbz2-dev \
        liblzma-dev \
        libpcre++-dev \
        libpango1.0-dev \
        libmariadb-client-lgpl-dev \
        libopenblas-dev \
        liblapack-dev \
        libxt-dev \
        neovim \
        openjdk-8-jdk \
        python \
        python-pip \
        python-dev \
        python3-dev \
        python3-pip \
        python3-wheel \
        swig \
        texlive \
        texlive-fonts-extra \
        texinfo \
        vim \
        wget \
        xvfb \
        xauth \
        xfonts-base \
        zip

    export LANG=C.UTF-8 LC_ALL=C.UTF-8

# Add NVIDIA package repositories.
    wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-repo-ubuntu1804_10.1.243-1_amd64.deb
    apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub
    dpkg -i cuda-repo-ubuntu1804_10.1.243-1_amd64.deb
    apt-get update
    wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb
    apt-get -qq install -y --no-install-recommends ./nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb
    apt-get update

# Install NVIDIA driver (optional)
    # apt-get install --no-install-recommends nvidia-driver-430

# Install development and runtime libraries.
    apt-get install -y --no-install-recommends \
        cuda-10-1 \
        libcudnn7=7.6.4.38-1+cuda10.1  \
        libcudnn7-dev=7.6.4.38-1+cuda10.1

# Install TensorRT. Requires that libcudnn7 is installed above.
    apt-get install -y --no-install-recommends libnvinfer6=6.0.1-1+cuda10.1 \
        libnvinfer-dev=6.0.1-1+cuda10.1 \
        libnvinfer-plugin6=6.0.1-1+cuda10.1

# Update python pip.
    python3 -m pip --no-cache-dir install --upgrade pip
    python3 -m pip --no-cache-dir install setuptools --upgrade
    python -m pip --no-cache-dir install setuptools --upgrade

# Install R 3.6.
    echo "deb https://cloud.r-project.org/bin/linux/ubuntu bionic-cran35/" >> /etc/apt/sources.list
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
    apt-get update
    apt-get install -y --no-install-recommends r-base
    apt-get install -y --no-install-recommends r-base-dev

# Install Jupyter notebook with Python and R support.
    python3 -m pip --no-cache-dir install jupyter
    R --quiet --slave -e 'install.packages(c("IRkernel"), repos="https://cloud.r-project.org/")'

# Install MPI (match the version with the cluster).
    mkdir -p /tmp/mpi
    cd /tmp/mpi
    wget -O openmpi-2.1.0.tar.bz2 https://www.open-mpi.org/software/ompi/v2.1/downloads/openmpi-2.1.0.tar.bz2
    tar -xjf openmpi-2.1.0.tar.bz2
    cd openmpi-2.1.0
    ./configure --prefix=/usr/local --with-cuda
    make -j $(nproc)
    make install
    ldconfig

# Cleanup
    apt-get -qq clean
    rm -rf /var/lib/apt/lists/*
    rm -rf /tmp/mpi
```
## Inspect Container

To get a list of the labels defined for the container `singularity inspect --labels container/`

To print the container's help section `singularity inspect --helpfile container/`

To show container’s environment `singularity inspect --environment container/`

To retrieve the definition file used to build the container `singularity inspect --deffile container/`

## Install Data Science and Chemistry Packages
Once the core writable sandbox is built we will install the additional data science and chemistry packages.  

To do that execute:  
`sudo singularity shell --writable container/`

Then execute the following lines in the shell environment. 
```
# Install Python packages.
    python3 -m pip --no-cache-dir install numpy pandas h5py pyarrow sklearn statsmodels matplotlib seaborn plotly 

# Install Tensorflow.
    python3 -m pip --no-cache-dir install tensorflow==2.2.0 

# Install R packages.
    R --quiet --slave -e 'install.packages("tidyverse", version = "1.3.0", repos="https://cloud.r-project.org/")'
    R --quiet --slave -e 'install.packages("tidymodels", version = "0.1.0", repos="https://cloud.r-project.org/")'
    R --quiet --slave -e 'install.packages(c("lme4", "glmnet", "yaml", "jsonlite", "rlang"), repos="https://cloud.r-project.org/")'

# Install RDKit
    export RDBASE=/usr/local/share/rdkit
    export LD_LIBRARY_PATH="$RDBASE/lib:$LD_LIBRARY_PATH"
    export PYTHONPATH="$RDBASE:$PYTHONPATH"
    mkdir -p /tmp/rdkit
    cd /tmp/rdkit
    wget https://github.com/rdkit/rdkit/archive/2020_03_3.tar.gz
    tar zxf 2020_03_3.tar.gz
    mv rdkit-2020_03_3 $RDBASE
    mkdir $RDBASE/build
    cd $RDBASE/build
    cmake -DPYTHON_EXECUTABLE=/usr/bin/python3 ..
    make -j $(nproc)
    make install

    ln -s /usr/local/share/rdkit/rdkit /usr/local/lib/python3.6/dist-packages/

# Install OpenBabel.
    apt-get -qq -y update
    apt-get -qq install -y --no-install-recommends openbabel python-openbabel

# Install Mordred Molecular Descriptor Calculator.
    python3 -m pip --no-cache-dir install mordred

# Cleanup
    rm -rf /tmp/rdkit
```

## Convert a Writable Sandbox to a Read Only Compressed Container
Once you are satisfied that you have installed all the required packages you can convert the writable sandbox to a read only squashfs filesystem. Squashfs is a compressed read-only file system for Linux.

`sudo singularity build container.sif container/`

## Install Kernel Spces for Jupyter Notebook for R

Kernel specs are installed from outside the container in the host's home environment.  

`singularity exec container.sif R --quiet --slave -e 'IRkernel::installspec()'`  

NOTE: You only have to do it once per host to install `kernelspec`.

# Test Script(s)
## Tensorflow GPU

```python
import tensorflow as tf

tf.debugging.set_log_device_placement(True)
gpus = tf.config.list_physical_devices('GPU')

if gpus:
    with tf.device('/GPU:0'):
        tf.random.set_seed(123)
        a = tf.random.normal([10000,20000], 0, 1, tf.float32, seed=1)
        b = tf.random.normal([20000,10000], 0, 1, tf.float32, seed=1)
        c = tf.matmul(a, b)
        print(c)
else:
    print("No GPUs found.")

print("Num GPUs:", len(gpus))
```

To execute the script `singularity exec --nv container.sif python3 tf_gpu.py`

To monitor NVIDIA GPU usage `nvidia-smi`