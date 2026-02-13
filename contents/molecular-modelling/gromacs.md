---
comments: true
---

# Gromacs

**Note:** The steps in this document were written for Gromacs 4. 

## Steps to carry out an explicit solvent simulation

```bash
# Convert the structure from PDB to Gromacs format
pdb2gmx -ignh -f cts1.pdb

# Build the simulation box
editconf -bt octahedron -f conf.gro -o box.gro -c -d 1.0

genbox -cp box.gro -cs spc216.gro -o solvated.gro -p topol.top

# Fill the box with counter ions to neutralize the overall charge
grompp -f ions.mdp -c solvated.gro -p topol.top -o ions.tpr

genion -s ions.tpr -o ions.gro -p topol.top -pname NA -np 1 -nname CL -nn 8 -g ion.log -neutral

# Carry out energy minimization
grompp -f em.mdp -c ions.gro  -p topol.top -o em.tpr

mdrun -v -deffnm em

# Constant temperature equilibration
grompp -f nvt.mdp -c em.gro -p topol.top -o nvt.tpr

mdrun -v -deffnm nvt

# Constant pressure equilibration
grompp -f npt.mdp -c nvt.gro -t nvt.cpt -p topol.top -o npt.tpr

mdrun -v -deffnm npt

# Production MD run
grompp -f md.mdp -c npt.gro -t npt.cpt -p topol.top -o md.tpr

mdrun -v -deffnm md

```

## Restart Crash Run

```bash
g_mdrun -v -s run.tpr -cpi state.cpt -append
```

## Energy calculation

```bash
g_energy -f run.edr -o energy.xvg -b 0 -e 1000 -skip 5

g_energy -f md_0.edr -o md_0-energy.xvg -skip 5

# for 50 ns
g_energy -f md_2.edr -o md_2-energy.xvg -b 0 -e 50000 -skip 5
```

## Radius of Gyration

```bash
g_gyrate -f run.xtc -s run.tpr -o gyrate.xvg -b 0 -e 1000

g_gyrate -f md_0-fit.xtc -s em.tpr -o md_0-gyrate.xvg -ncskip 5
```

## RMSD Calculation

```bash
g_rms -s em.tpr -f run.xtc -o rmsd.xvg -b 0 -e 1000
```

## RMSF Calculation

```bash
g_rmsf -f run.xtc -s run.tpr -b 0 -e 10000 -o rmsf.xvg

# for residue

g_rmsf -s em.tpr -f run.xtc -o rmsf.xvg -b 0 -e 1000 -res
```

## Parallel Run

```bash
mpirun -np 5 /usr/bin/mdrun_mpi -v -deffnm run
```

## Extending finished run
```bash
tpbconv -s previous.tpr -extend timetoextendby -o next.tpr
mdrun -s next.tpr -cpi previous.cpt

# for 50ns
tpbconv -s md_2-ext.tpr -extend 50000 -o md_2-ext-150.tpr 
```

## Trajectory concatanate

```bash
trjcat -f *.trr -o fixed.trr 
```

## Box centering

```bash
trjconv -s em.tpr -f nvt.trr -o md_nojump.xtc -pbc nojump -boxcenter tric

trjconv -s md.tpr -f md.trr -o md_nojump.xtc -pbc nojump  -center

g_trjconv -s run_3.tpr -f run_3.trr -o run_3.xtc -pbc mol -ur compact -center
```

## Fit the tragectory to the initial structure to avoid PBC effects

```bash
trjconv -s run.tpr -f run.xtc -o run-fit.xtc -fit progressive

# For Complex (first fit one complex then the other)

trjconv -s md.tpr -f md.trr -o md_nojump.xtc -pbc nojump  -center

trjconv -s em.tpr -f md_0-protein.xtc -o md_0-acp-fit.xtc -fit progressive -n acpIndex.ndx 
```

## Making index file

```bash
make_ndx -f conf.gro -o index.ndx    

# Choose the group and then define the residues using && with the group number
```

## Measure distance between atoms overtime

```bash
g_dist -f md_2.xtc -s md_2.tpr -n dist.ndx -o dist_2_nointra.xvg
```

## Essential Dynamics Analysis

```bash
g_covar -s run.tpr -f run.xtc

# Choose option for backbone or for protein
# the output will be in eigenval.xvg and eigenvec.trr

xmgrace eigenval.xvg
# to visualize the number of modes contributing to the overall fluctuation

g_anaeig -extr extr_ev1.pdb -first 1 -last 1 -nframes 10 -s run.tpr -f run.xtc

pymol extr_ev1.pdb

# If we are interested in the time evolution of these collective coordinates during the simulation, we can project the trajectory onto these coordinates:
g_anaeig -proj -s run.tpr -f run.xtc

xmgrace proj.xvg
```

## trj_cavity v1

```bash
./trj_cavity -s em.tpr -f md_0-cat-fit.xtc -seed 45.750 50.943 30.368 -o md_0_cavity_max_dim5_ff1.3.pdb -ot md_0_cavity_max_dim5_ff1.3.xtc -ov md_0_volume_max_dim5_ff1.3.xvg -mode max -dim 5 -ff_path amber99sb-ildn.ff -ff_radius -spacing 1.3 -cutoff 9 -n index.ndx
```

## SASA calculation

```bash
 g_sas -s em.tpr -f md_2-cat-fit.xtc -n acyl.ndx -o md_2_sas_area.xvg -tv md_2_sas_volume.x
```

## Hydrogen Bond
```bash
g_hbond -f md_1-cat.xtc -s em.tpr -n index.ndx -num sol_hbnum.xvg -dist sol_hbdist.xvg
```

## Clustering

```bash
g_cluster -s em.tpr -f md_2-cat-fit-protein.xtc -o md_2-rmsd-clust.xpm -g md_2-cluster.log -sz md_2-clust-size.xvg -clid md_2-clust-id.xvg -cl md_2-clusters.pdb
```