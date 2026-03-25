---
comments: true
---

# Next Generation Sequencing Methods

## Illumina Sequencing

Illumina sequencing is a high-throughput DNA sequencing technology based on a method known as **sequencing by synthesis**, in which the sequence of a DNA molecule is determined by detecting the identity of nucleotides as they are incorporated into a growing complementary strand. It relies on cyclic incorporation of fluorescently labeled, reversibly terminated nucleotides, allowing each base addition to be recorded one at a time across millions of DNA fragments in parallel. This approach enables highly accurate, massively parallel sequencing of short DNA reads, making it one of the most widely used platforms for genomic, transcriptomic, and epigenomic analysis.

### Fragmenting the DNA and Adding Adapters

DNA, in its native form, is extremely long—far longer than what this technology can read in a single pass. To make it manageable, it is broken into many short fragments. This also enables parallel processing, since each fragment can be read independently. Fragmentation is typically done by physically shearing the DNA (using sonication or acoustic energy) or by enzymatically cutting it into smaller pieces. Typical Illumina library fragment sizes are ~200–500 base pairs, with **~300–400 bp** being very common for standard sequencing workflows.

Short, known DNA sequences (**called adapters**) are added to both ends of every fragment. These adapters do not carry biological information of interest; instead, they act as standardized attachment points. Because every fragment now has the same adapter sequences, they can all interact with the sequencing system in a uniform way.

![](https://upload.wikimedia.org/wikipedia/commons/7/7b/DNA_Processing_Preparation.png)
/// caption
Double-stranded DNA is fragmented by transposomes, which simultaneously cut the DNA and add adapter sequences. The resulting fragments are then end-repaired to produce library molecules containing adapters, indices, primer binding sites, and terminal sequences on both ends.
///

### Attaching Fragments to the Flow Cell

The fragments are introduced to a glass surface called a **flow cell**. This surface is coated with short DNA sequences that are complementary to the adapters. Through normal base-pairing interactions (hybridization), each fragment binds to the surface via its adapters.

The flow cell is not just a passive surface—it is engineered with microscopic channels that allow sequencing reagents to flow evenly across it during each step of the process. It is also divided into separate lanes, which act like independent compartments. Each lane can hold a different sample or library, allowing multiple samples to be sequenced at the same time while keeping their data separate. This design supports high-throughput processing and efficient use of the instrument.

At this stage, each fragment is still a **single DNA molecule** fixed at a specific location on the flow cell. On its own, it produces far **too little signal** to be detected, which is why the next step—amplification—is necessary.

![](https://upload.wikimedia.org/wikipedia/commons/5/54/Oligonucleotide_chains_in_Flow_Cell.png)
/// caption
Millions of oligonucleotides are immobilized on the surface of each flow cell lane, providing binding sites for adapter-ligated DNA fragments.
///

### Cluster Generation (Signal Amplification)

Each bound DNA fragment is locally amplified into a cluster of identical copies. The fragment bends over and hybridizes to nearby surface-bound sequences, allowing it to be copied. Repeating this process many times produces a **dense cluster of identical DNA strands**, all originating from the same initial fragment and all located in a small physical area.

This step is crucial because it **amplifies the signal**. *Instead of trying to detect a single molecule, the system now observes thousands of identical copies acting in synchrony, producing a signal strong enough to measure optically.*

![](https://upload.wikimedia.org/wikipedia/commons/6/65/Cluster_Generation.png)
/// caption
DNA fragments bind to the flow cell via complementary adapter sequences. Each fragment bends to hybridize with a nearby oligo, forming a bridge, and is copied by polymerase. The strands then separate and repeat this process (bridge amplification), generating a dense cluster of identical forward and reverse DNA strands at a single location.
///

### Sequencing by Synthesis (Base Incorporation)

Sequencing begins by building a new DNA strand along each template strand. This follows the natural rules of DNA replication: each base added is complementary to the template (A pairs with T, C with G).

The nucleotides used here are specially modified. Each of the four bases carries a **distinct fluorescent label** (a specific color) and a **reversible blocking group**. The blocking group ensures that only one base can be added at a time, which is essential for accurately tracking the sequence.

During each cycle, one nucleotide is incorporated into each growing strand.

![](https://upload.wikimedia.org/wikipedia/commons/5/51/Sequence_By_Synthesis.png)
/// caption
Fluorescently labeled nucleotides are incorporated one at a time into the growing DNA strand, with each base emitting a distinct signal upon excitation. These signals are recorded and used to determine the sequence through base calling.
///

### Imaging and Base Identification

After a single base is added, the flow cell is imaged. Each cluster emits a fluorescent signal corresponding to the base that was just incorporated. Because all DNA strands within a cluster are identical and synchronized, they all incorporate the same base in that cycle, producing a uniform color signal.

This allows the system to determine which base (A, C, G, or T) was added at that specific position for every cluster.

### Removing the Block and Repeating the Cycle

Once imaging is complete, the fluorescent label and the blocking group are **chemically removed**. This restores the ability of the DNA strand to accept another nucleotide.

The cycle then repeats: a new base is added, the flow cell is imaged, and the block is removed again. By repeating this process over many cycles, the sequence is read one base at a time.

### Data Output and Sequence Reconstruction

Over successive cycles, each cluster produces a sequence of color signals. These signals are translated into a string of DNA bases, representing the sequence of the original fragment.

Because millions of clusters are sequenced simultaneously, the result is a massive collection of short DNA sequences, often called **"reads."** These reads can then be aligned to a reference genome or assembled computationally to reconstruct longer sequences, depending on the goal of the experiment.

### Big Picture

Illumina sequencing works by slowing DNA replication down into discrete, observable steps. Fragmentation makes the DNA manageable, adapters standardize how fragments are handled, clustering amplifies the signal, and reversible chemistry allows one base to be read at a time. The entire process turns DNA synthesis into something that can be watched, recorded, and translated into sequence information.

### Additional Notes

**Fragment size** is the total length of the DNA piece in your library (e.g., ~300–400 bp), determined during library prep by fragmentation and size selection.

**Read size (read length)** is how many bases the sequencer reads from each fragment. This is set by the sequencing run parameters (e.g., 150 bp reads, or 2×150 bp for paired-end sequencing).

Here’s how they relate:

* In **single-end sequencing**, only one end of the fragment is read (e.g., 150 bp), even if the fragment itself is longer.
* In **paired-end sequencing**, both ends are read. For example, in a 2×150 bp run, you get 150 bp from one end and 150 bp from the other.

So if your fragment is ~300 bp and you run 2×150 bp sequencing, you can (in ideal cases) cover nearly the entire fragment from both ends, sometimes with overlap in the middle.

**How each is determined:**

* Fragment size → controlled during library preparation (fragmentation + size selection).
* Read size → set on the sequencing instrument (number of cycles you choose to run).

A useful rule of thumb: fragment size is usually chosen to be slightly longer than the total read length (especially for paired-end runs) to ensure good coverage without excessive overlap.

### YouTube Videos

<iframe width="100%" height="415" src="https://www.youtube.com/embed/fCd6B5HRaZ8?si=LKzLn5DkNfCzWMrQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


<iframe width="100%" height="415" src="https://www.youtube.com/embed/WKAUtJQ69n8?si=hY1s8aaw21Wib7Tj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>