# Locus

## Modules
```bash
# To search a module
module avail R 

# To load a module
module load R

# To unldoad a module
module unload R
```

## Batch Job Submit Script

```bash
#!/bin/sh

# Job Name
#$ -N test

# Execute the script from the Current Working Directory
#$ -cwd

# Merge the output of the script, and any error messages generated to one file
#$ -j y

# Send the output of the script to a directory called 'UGE-output' in the current working directory (cwd)
# **NOTE: Be sure to create this directory before submitting your job, UGE scheduler will NOT create this**
# **directory for you**
#$ -o UGE-output/

# Tell the job your memory requirements
#$ -l mem_free=10G,h_vmem=12G

# Send mail when the job is submitted, and when the job completes
#$ -m be

#  Specify an email address to use
#$ -M your_address@niaid.nih.gov

<<Stuff To Run>>

```

## Qstat

```bash
qstat -u user_name
```

## Qdel
```bash
qdel job_id
```

## GPGPU Nodes
Locus has ten GPGPU nodes with the following specifications:

```bash
8 x NVIDIA Tesla Kepler K80 GPUs per node
12 CPUs (Intel(R) Xeon(R) CPU E5-2620 v3 @ 2.40GHz) per node
15 GB of memory per GPU (120G total per node)
These nodes are : ai-hpcgpu01, ai-hpcgpu02, ai-hpcgpu03, ai-hpcgpu04, ai-hpcgpu05, ai-hpcgpu07, ai-hpcgpu09, ai-hpcgpu11, ai-hpcgpu12, and ai-hpcgpu13.
```

Locus also has two GPGPU nodes with the following specifications:
```bash
8 x NVIDIA Tesla v100 GPUs per node
56 CPUs (Intel(R) Xeon(R) Gold 6258R CPU @ 2.70GHz) per node
190 GB of memory per GPU (1520G total per node)
These nodes are : ai-hpcgpu15 and ai-hpcgpu16.
```
Jobs which request GPUs are assigned GPUs on the first node available. If your job requires one type of GPU or the other, you can request a specific node type using the keywords 'kepler' or 'v100'. Using these keywords is optional, and will prevent your job from running on the wrong type of GPU.

For example, this command requests 4 Kepler GPUs on the first available Kepler GPU node:
```bash
$ qsub -l ngpus=4,kepler my_gpu_script.sh
while this command requests 2 v100 GPUs on the first available V100 GPU nodes:
```
```bash
$ qsub -l ngpus=4,v100 my_gpu_script.sh
and this command requests 1 GPU on the first available GPU node, regardless of GPU type:
```

```bash
$ qsub -l ngpus=1 my_gpu_script.sh
```

## Monitoring Your Jobs Interactively
You can use the `node-mon node_name` command from `/usr/local/bin/node-mon` to interactively monitor a specific node: it will start the "htop" utility on a specified node. For example,


`node-mon ai-hpcn001`  
You can also check GPU nodes for the available GPU resources via the "gpu-mon gpu_node_name" command from the same location as above to see the load on gpu devices: it will run the "nvidia-smi" utility on a specified node. For example,

`gpu-mon ai-hpcgpu01`  
You can also try to monitor the GPU resources interactively with "watch" command, for example,

`watch -d "gpu-mon ai-hpcgpu01"`  
To quit watch screen press ctrl+c 