---
comments: true
---

# Snakemake

A **Snakefile** is a DAG of **rules** that declare `input`, `output`, and how to make outputs (e.g., `shell`, `script`, `run`). Snakemake resolves dependencies and executes only what’s required, in parallel where possible.


## Minimal rule structure

```python
rule name:
    input: "path/to/in.txt"
    output: "path/to/out.txt"
    params: mem="4G"
    threads: 2
    resources: tmp=1
    shell:
        "some_command -i {input} -o {output} --threads {threads}"
```

* `{input}` and `{output}` are objects (can be lists/dicts).
* `params` is for non-file parameters (not tracked by Snakemake).
* `threads` and `resources` help scheduler & cluster integration.


## `rule all` (entrypoint)

Make a `rule all` describing the final targets so `snakemake` knows what to build:

```python
rule all:
    input:
        expand("results/{sample}.counts.txt", sample=["s1","s2","s3"])
```

## Wildcards and `expand`

Wildcards let rules be generic:

```python
rule map:
    input:
        "reads/{sample}.fastq.gz"
    output:
        "mapped/{sample}.bam"
    shell:
        "bwa mem ref.fa {input} | samtools view -b - > {output}"
```

Generate many filenames with `expand()` (often used in `rule all` and config parsing).


## Using `config` (`configfile`)
Keep parameters and sample lists externally:
`config.yaml`

```yaml
samples: ["s1","s2","s3"]
ref: "ref.fa"
trim_params: "--very-sensitive"
```

`Snakefile`:

```python
configfile: "config.yaml"

rule all:
    input: expand("results/{sample}.counts.txt", sample=config["samples"])
```

## `input`/`output` can be dicts & lists

```python
rule qc:
    input:
        reads="reads/{sample}.fastq.gz"
    output:
        report="qc/{sample}.html",
        summary="qc/{sample}.txt"
    shell:
        "fastqc {input.reads} -o qc/ && some_summary > {output.summary}"
```


## Local scripts vs `shell` vs `run`

* `shell:` is convenient for shell commands (string formatting).
* `script:` runs a script (e.g., `script: "scripts/transform.py"`). Useful when heavy Python logic belongs in a file.
* `run:` for inline Python (gives access to Python objects `input`, `output`, `wildcards`, etc.). Example:

```python
rule make_table:
    input: "data/{sample}.txt"
    output: "table/{sample}.tsv"
    run:
        with open(input[0]) as inf, open(output[0], "w") as outf:
            # python processing
            outf.write(inf.read())
```

## Conda / Containers / Modules

* `conda` per-rule:

```python
rule map:
    conda: "envs/bwa.yaml"
    shell: "bwa mem ... "
```

Run Snakemake with `--use-conda` to make this effective.

* `singularity:` similarly for per-rule container images (use `--use-singularity`).

* `module:` (if installed) to load environment modules (rare but supported).


## Common helper functions

* `glob_wildcards("reads/{sample}.fastq.gz")` -> get sample list from filenames.
* `os.path` & Python can be used in Snakefile for dynamic behavior.

Example:

```python
SAMPLES = glob_wildcards("reads/{sample}.fastq.gz").sample
```

## `expand` vs `format` vs f-strings

* `expand("dir/{sample}.txt", sample=SAMPLES)` for lists.
* `{wildcards.sample}` only inside f-strings or when building strings in `run:` / Python code.
* In `shell:` prefer to use Snakemake’s format placeholders `{input}`, `{params.x}`, etc.

## Logging, temp, protected

* `log`: track stdout/stderr; handy for debugging and reproducibility.

```python
rule example:
    input: "in"
    output: "out"
    log: "logs/example.log"
    shell: "cmd > {log} 2>&1"
```

* `temp()` marks intermediate files to be removed later.
* `protected()` marks files that should not be deleted by `--delete-temp-output`.

## Checkpoints (for dynamic downstream files)

Use when outputs depend on runtime-generated file lists (e.g., assembly that creates unknown filenames). Basic pattern:

```python
checkpoint assemble:
    input: ...
    output: "assembly/contigs.fasta"
    shell: "assembler -o {output}"

def get_contigs(wildcards):
    ck = checkpoints.assemble.get()
    assembly = ck.output[0]
    # inspect assembly to build next rule's inputs
    contigs = some_function_that_reads(assembly)
    return expand("mapped/{contig}.bam", contig=contigs)

rule map_to_contigs:
    input: get_contigs
    ...
```

Checkpoints allow Snakemake to pause, inspect outputs, and then resume building the graph.

## Rule order & `ruleorder`

If two rules produce the same filename pattern and you want one preferred:

```python
ruleorder: rule_strict > rule_loose
```

---

## Dry-run, DAG and visualization commands

* Dry-run: `snakemake -n` (no execution).
* Print DAG: `snakemake --dag | dot -Tpdf > dag.pdf`
* `snakemake --rulegraph` to show rule dependency graph.
* `snakemake --summary` shows planned jobs and runtime info.


## Running locally, multicore, cluster

* Local multicore: `snakemake -j 8`
* Keep going on errors: `--keep-going`
* Use conda: `--use-conda`
* Unlock after interruption: `snakemake --unlock`
* Submit to cluster (simple example):

```bash
snakemake -j 100 --cluster "sbatch -c {threads} -t 02:00:00 --mem={resources.mem}"
```

For robust cluster integration, use Snakemake profiles (e.g., for Slurm) — a best practice.


## Quick example workflow (trim -> align -> count)

`config.yaml`

```yaml
samples: ["s1","s2"]
threads: 4
ref: "ref.fa"
```

`Snakefile`

```python
configfile: "config.yaml"
SAMPLES = config["samples"]

rule all:
    input:
        expand("counts/{sample}.counts.txt", sample=SAMPLES)

rule trim:
    input:
        "raw/{sample}.fastq.gz"
    output:
        "trimmed/{sample}.trim.fastq.gz"
    threads: 1
    conda: "envs/trim.yaml"
    shell:
        "trimmomatic SE -threads {threads} {input} {output} SLIDINGWINDOW:4:20"

rule align:
    input:
        "trimmed/{sample}.trim.fastq.gz",
        ref=config["ref"]
    output:
        temp("bam/{sample}.bam")
    threads: config["threads"]
    conda: "envs/bwa.yaml"
    shell:
        "bwa mem -t {threads} {input[1]} {input[0]} | samtools view -b - > {output}"

rule sort_index:
    input: "bam/{sample}.bam"
    output:
        "bam/{sample}.sorted.bam",
        "bam/{sample}.sorted.bam.bai"
    threads: 2
    shell:
        "samtools sort -@ {threads} -o {output[0]} {input} && samtools index {output[0]}"

rule count:
    input:
        bam="bam/{sample}.sorted.bam"
    output:
        "counts/{sample}.counts.txt"
    shell:
        "featureCounts -a genes.gtf -o {output} {input.bam}"
```

Notes:

* `temp()` used for intermediate BAMs so they can be removed automatically.
* Per-rule conda envs declared; run Snakemake with `--use-conda`.


## More useful snippets

Get samples from filenames:

```python
SAMPLES = glob_wildcards("raw/{sample}.fastq.gz").sample
```

Multi-sample rule with paired inputs:

```python
rule qc_all:
    input: expand("qc/{sample}.html", sample=SAMPLES)
```

Use named inputs:

```python
rule example:
    input:
        r1="reads/{sample}_R1.fastq.gz",
        r2="reads/{sample}_R2.fastq.gz"
    shell:
        "cmd -1 {input.r1} -2 {input.r2}"
```

Use `resources` for cluster quotas:

```python
rule heavy:
    resources:
        mem_mb=8000,
        disk=100000
```

## Debugging checklist

* `snakemake -n -p` — dry-run with printed shell commands.
* Check `--reason` to see why a job is selected.
* Check `logs/` or `log:` files for stdout/stderr.
* Use `--rerun-incomplete` to resume partial jobs.
* If state seems corrupted: `snakemake --unlock` then run again.

## Best practices / style tips

* Keep config separate (`config.yaml`) for environment-specific params.
* Use per-rule conda `envs/*.yaml` for reproducible environments, and run with `--use-conda`.
* Keep rules small and single-responsibility (easier to test and reuse).
* Use `log:` for every shell command you expect may fail — then you’ll have stderr/stdout captured automatically.
* Use `temp()` for big intermediates to avoid disk bloat.
* Prefer `script:` or `run:` for heavy logic; keep shell commands simple.
* Write unit tests for rules? You can create a tiny test dataset and a `--cores 1` run to validate an end-to-end on the smallest scale.

## Handy command-line cheat sheet

* Dry-run (no execution): `snakemake -n`
* Run with 8 cores: `snakemake -j 8`
* Use conda envs: `snakemake --use-conda`
* Use singularity containers: `snakemake --use-singularity`
* Show rule graph (png/pdf): `snakemake --rulegraph | dot -Tpdf > rulegraph.pdf`
* Show dag: `snakemake --dag | dot -Tpdf > dag.pdf`
* Unlock working directory after crash: `snakemake --unlock`
* Continue despite errors: `snakemake --keep-going`
* Force re-run a rule (ignore outputs): `snakemake -R rule_name`
* Force re-run all (ignore cached timestamps): `snakemake -R all` or `--forceall`
* Print shell commands in dry-run: `snakemake -n -p`
* Submit jobs to cluster (example):
  `snakemake -j 100 --cluster "sbatch -c {threads} -t 02:00:00 --mem={resources.mem_mb}"`

## When things get fancy

* **Workflows / modules**: `include: "other/Snakefile"` and Snakemake modules (useful for sharing pieces).
* **Profiles**: Use community or organization profiles for consistent cluster submission (e.g., slurm profiles).
* **Checkpoint**: for dynamic downstream targets (see section 12).
* **Resources**: fine-grain control for quotas on shared clusters.

## Quick reminders

* `input` = files you need, `output` = files you create. Rule identity = output patterns.
* `rule all` = your "targets".
* `expand()` and `glob_wildcards()` are your friends for sample handling.
* Use `log`, `temp`, `protected` to handle files well.
* Use `--use-conda` + per-rule `conda:` for reproducible environments.
* `-n` (dry-run) and `-p` (print commands) are the first things to try when something is odd.


Great — let’s extend the refresher with:

1. **How to use Singularity containers**
2. **How Singularity and Conda interact**
3. **How to execute R scripts cleanly inside Snakemake**

This assumes you're already comfortable with standard rules and `--use-conda`.


## Extended

### Using Singularity Containers in Snakemake

Snakemake supports per-rule container images via:

```python
rule example:
    input: "in.txt"
    output: "out.txt"
    singularity: "docker://biocontainers/samtools:v1.17.0_cv1"
    shell:
        "samtools view -b {input} > {output}"
```

Then execute with:

```bash
snakemake --use-singularity -j 4
```

**Notes**

* You can use:

  * `docker://image:tag`
  * `library://`
  * `shub://`
  * local `.sif` files
* Snakemake automatically pulls and caches images.
* Works on HPC systems where Singularity (or Apptainer) is available.


### Combining Singularity + Conda

You generally have **three patterns**:

#### Pattern A — Conda only (most common)

```python
rule align:
    conda: "envs/bwa.yaml"
    shell: "bwa mem ..."
```

Run with:

```bash
snakemake --use-conda
```

Best for:

* Reproducible environments
* Lightweight setups
* Shared clusters

#### Pattern B — Singularity only (fully containerized)

```python
rule align:
    singularity: "docker://biocontainers/bwa:v0.7.17_cv1"
    shell: "bwa mem ..."
```

Run with:

```bash
snakemake --use-singularity
```

Best for:

* Strict reproducibility
* Complex toolchains
* HPCs that prefer containers

#### Pattern C — Singularity + Conda (advanced, less common)

Snakemake can create Conda environments *inside* containers.

```python
rule example:
    conda: "envs/env.yaml"
    singularity: "docker://continuumio/miniconda3"
    shell:
        "python script.py"
```

Run with:

```bash
snakemake --use-conda --use-singularity
```

When is this useful?

* You want OS isolation (container)
* But still want Snakemake-managed per-rule conda environments
* Common in reproducible pipelines distributed to collaborators

#### Important HPC tip

If using Singularity on clusters:

```bash
snakemake \
  --use-singularity \
  --singularity-args "--bind /scratch"
```

Use `--bind` to mount directories properly.

#### Best Practice Recommendation

If you’re designing a workflow:

| Scenario                      | Recommendation        |
| ----------------------------- | --------------------- |
| Personal dev / small cluster  | Conda                 |
| Published workflow            | Containers            |
| Strict reproducibility needed | Singularity           |
| Mixed HPC environment         | Profile + Singularity |

In practice, many modern workflows use:

* **Containers for stable release**
* **Conda for development**

### Executing R Scripts in Snakemake

There are three clean ways.

#### Option A — Use `shell:` to call Rscript

Simple and common:

```python
rule de_analysis:
    input:
        counts="counts/{sample}.txt"
    output:
        "results/{sample}_DE.txt"
    conda:
        "envs/r.yaml"
    shell:
        "Rscript scripts/de_analysis.R {input.counts} {output}"
```

Inside `de_analysis.R`:

```r
args <- commandArgs(trailingOnly=TRUE)
input_file <- args[1]
output_file <- args[2]

data <- read.table(input_file, header=TRUE)
write.table(data, file=output_file)
```

Run with:

```bash
snakemake --use-conda
```

---

#### Option B — Use `script:` (Cleaner integration)

Snakemake passes objects automatically.

```python
rule de_analysis:
    input:
        counts="counts/{sample}.txt"
    output:
        "results/{sample}_DE.txt"
    conda:
        "envs/r.yaml"
    script:
        "scripts/de_analysis.R"
```

Inside `de_analysis.R`:

```r
# Snakemake object available automatically
counts_file <- snakemake@input[["counts"]]
output_file <- snakemake@output[[1]]

data <- read.table(counts_file, header=TRUE)
write.table(data, file=output_file)
```

**Why this is nice**

* No manual argument parsing
* Cleaner
* Access to:

  * `snakemake@input`
  * `snakemake@output`
  * `snakemake@params`
  * `snakemake@threads`
  * `snakemake@config`
  * `snakemake@wildcards`

This is usually the preferred method.


### Example Conda environment for R

`envs/r.yaml`

```yaml
name: r_env
channels:
  - conda-forge
  - bioconda
dependencies:
  - r-base=4.3
  - r-data.table
  - r-tidyverse
```

### R + Singularity Example

```python
rule de_analysis:
    input:
        "counts/{sample}.txt"
    output:
        "results/{sample}_DE.txt"
    singularity:
        "docker://rocker/tidyverse:4.3"
    script:
        "scripts/de_analysis.R"
```

Run with:

```bash
snakemake --use-singularity
```

### Passing Threads to R

In Snakefile:

```python
rule heavy_r:
    threads: 8
    script: "scripts/heavy.R"
```

In R:

```r
threads <- snakemake@threads
library(parallel)
cl <- makeCluster(threads)
```

### Recommended Workflow Structure

```
project/
│
├── Snakefile
├── config.yaml
├── envs/
│   ├── r.yaml
│   └── bwa.yaml
├── scripts/
│   ├── de_analysis.R
│   └── transform.py
├── raw/
├── results/
└── logs/
```

### Debugging Containers and R

Common issues:

####  Container cannot see files

Use:

```bash
--singularity-args "--bind /path/to/data"
```

#### R packages missing

* Check conda env
* Make sure `--use-conda`
* Or confirm container includes required packages

#### Snakemake object missing in R

You must use `script:` (not `shell:`).

### Quick Execution Cheat Sheet

Conda only:

```bash
snakemake -j 8 --use-conda
```

Singularity only:

```bash
snakemake -j 8 --use-singularity
```

Both:

```bash
snakemake -j 8 --use-conda --use-singularity
```

Slurm example:

```bash
snakemake -j 100 \
  --use-singularity \
  --cluster "sbatch -c {threads} --mem={resources.mem_mb}"
```
