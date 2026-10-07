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

## Clear interpreter cache and rediscover interpreters

If you see this error, epsecially in a remote session:

```bash
R 4.5.3 failed to start up (exit code -1)

The kernel exited before a connection could be established

thread 'main' (860840) panicked at crates/ark/src/start.rs:46:21:
Can't set up `R_HOME`: The `R_HOME` path '/Users/farmerr2/bin/miniforge3/lib/R' does not exist.
stack backtrace:
note: Some details are omitted, run with `RUST_BACKTRACE=full` for a verbose backtrace.
```

```
cmd + shift + p Interpreter: Clear Interpreter Cache
cmd + shift + P Interpreter: Discover All Interpreters
```