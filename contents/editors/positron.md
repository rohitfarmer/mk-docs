---
comments: true
---

# Positron

## Run R in a conda env on a remote node

SSH to the HPC, start a screen session, and claim a compute/interactive node within the session. Then open Positron and establish the remote connection to the claimed compute node.

To use a conda environment on the compute node, update the remote settings (JSON) file - `cmd + shift + p` > `Preferences: Open Remote Settings (JSON)` - with the commands below:

```json
{
    "positron.r.interpreters.condaDiscovery": true,
    "positron.r.customBinaries": [
        "/path/to/miniforge3/envs/r43/bin/R"
    ]
}
```

Then run `cmd + shift + p` > `Developer: Reload Window`.