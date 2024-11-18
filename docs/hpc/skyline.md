# Skyline

[Skyline documentation](https://skyline.niaid.nih.gov/)

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

### Claim an Interactive Node

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

