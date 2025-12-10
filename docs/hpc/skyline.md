# Skyline

These are my quick notes and not the offical Skyline documentation. The commands below may or may not work for you. Please visit the official documentation website for any latest updates and instructions at [https://skyline.niaid.nih.gov/](https://skyline.niaid.nih.gov/).

## Access

### Submit Nodes

```bash
ai-hpcsubmit1.niaid.nih.gov
ai-hpcsubmit2.niaid.nih.gov
```

### Web ~ Thinlinc

```
https://hpcthinlinc.niaid.nih.gov/
```

## Running Jobs

### Claim an Interactive Node using `salloc`

```bash
salloc --time 2:00:00 --nodes 1 --ntasks 4 -p gpu --gres=gpu:1 --mem 8g

# or

salloc --ntasks 4

# then to launch bash terminal in the alloted interactive node

srun --pty bash

# or 

srun --ntasks 4 --pty bash
```

`--pty:` Allocates a pseudo-terminal for interactivity.

### Claim an Interactive Node using `srun`

The command below will allocate 16 cpu cores and 100gb of memory with a walltime of 1 day. 

```bash
srun --cpus-per-task 16 --mem 100gb --time 1-0:0:0 --pty bash
```