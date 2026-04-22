---
comments: true
---

# Gromacs

**Note:** The steps in this document were originally written for Gromacs 4, but I am slowly adapting them to the latest version.

## Steps to carry out an explicit solvent simulation

### Convert the structure from PDB to Gromacs format
```bash
gmx pdb2gmx -ignh -f input-structure.pdb
```
Choose the forcefield and the water model.

### Generate the simulation box and fill it with water
```bash
gmx editconf -bt octahedron -f conf.gro -o box.gro -c -d 1.0

gmx solvate -cp box.gro -cs spc216.gro -o solvated.gro -p topol.top
```

### Fill the box with counter ions to neutralize the overall charge
```bash
gmx grompp -f ions.mdp -c solvated.gro -p topol.top -o ions.tpr

gmx genion -s ions.tpr -o ions.gro -p topol.top -pname NA -nname CL -neutral
```
When prompted, choose group 13 "SOL" for embedding ions. You do not want to replace parts of your protein with ions.

### Energy minimization
```bash
gmx grompp -f em.mdp -c ions.gro  -p topol.top -o em.tpr

gmx mdrun -v -deffnm em
```

### Constant temperature equilibration

```bash
gmx grompp -f nvt.mdp -c em.gro -r em.gro -p topol.top -o nvt.tpr

gmx mdrun -v -deffnm nvt
```

### Constant pressure equilibration
```bash
gmx grompp -f npt.mdp -c nvt.gro -r nvt.gro -t nvt.cpt -p topol.top -o npt.tpr

gmx mdrun -v -deffnm npt
```

### Production MD run
```bash
gmx grompp -f md.mdp -c npt.gro -t npt.cpt -p topol.top -o md_0_10.tpr

gmx mdrun -v -deffnm md
```

## Restart Crash Run

```bash
gmx mdrun -v -deffnm md -cpi md.cpt -append
```

## Energy Calculation

Use the `.edr` file from any stage of the simulation to calculate the change in energy.

```bash
gmx energy -f run.edr -o energy.xvg -b 0 -e 1000 -skip 5

gmx energy -f md_0.edr -o md_0-energy.xvg -skip 5

# for 50 ns
gmx energy -f md_2.edr -o md_2-energy.xvg -b 0 -e 50000 -skip 5
```

Choose the number for `potential energy` followed by `0` to write the output xvg file and exit.

## Temperature Calculation

Use the `.edr` file from any stage of the simulation to calculate the change in temperature.

```bash
gmx energy -f nvt.edr -o temperature.xvg
```

Choose the number for `temperature` followed by `0` to write the output xvg file and exit.

## Pressure Calculation

Use the `.edr` file from any stage of the simulation to calculate the change in pressure.

```bash
gmx energy -f npt.edr -o pressure.xvg
```

Choose the number for `pressure` followed by `0` to write the output xvg file and exit.

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
gmx trjconv -s md_0_10.tpr -f md_0_10.xtc -o md_0_10_noPBC.xtc -pbc mol -center

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

## MDP Files

### ions.mdp

```
; ions.mdp - used as input into grompp to generate ions.tpr
; Parameters describing what to do, when to stop and what to save
integrator  = steep         ; Algorithm (steep = steepest descent minimization)
emtol       = 1000.0        ; Stop minimization when the maximum force < 1000.0 kJ/mol/nm
emstep      = 0.01          ; Minimization step size
nsteps      = 50000         ; Maximum number of (minimization) steps to perform

; Parameters describing how to find the neighbors of each atom and how to calculate the interactions
nstlist         = 1         ; Frequency to update the neighbor list and long range forces
cutoff-scheme	= Verlet    ; Buffered neighbor searching 
ns_type         = grid      ; Method to determine neighbor list (simple, grid)
coulombtype     = cutoff    ; Treatment of long range electrostatic interactions
rcoulomb        = 1.0       ; Short-range electrostatic cut-off
rvdw            = 1.0       ; Short-range Van der Waals cut-off
pbc             = xyz       ; Periodic Boundary Conditions in all 3 dimensions
```

### em.mdp

```
; minim.mdp - used as input into grompp to generate em.tpr
; Parameters describing what to do, when to stop and what to save
integrator  = steep         ; Algorithm (steep = steepest descent minimization)
emtol       = 1000.0        ; Stop minimization when the maximum force < 1000.0 kJ/mol/nm
emstep      = 0.01          ; Minimization step size
nsteps      = 50000         ; Maximum number of (minimization) steps to perform

; Parameters describing how to find the neighbors of each atom and how to calculate the interactions
nstlist         = 1         ; Frequency to update the neighbor list and long range forces
cutoff-scheme   = Verlet    ; Buffered neighbor searching
ns_type         = grid      ; Method to determine neighbor list (simple, grid)
coulombtype     = PME       ; Treatment of long range electrostatic interactions
rcoulomb        = 1.0       ; Short-range electrostatic cut-off
rvdw            = 1.0       ; Short-range Van der Waals cut-off
pbc             = xyz       ; Periodic Boundary Conditions in all 3 dimensions
```

### nvt.mdp

```
title                   = NVT equilibration 
define                  = -DPOSRES  ; position restrain the protein
; Run parameters
integrator              = md        ; leap-frog integrator
nsteps                  = 50000     ; 2 * 50000 = 100 ps
dt                      = 0.002     ; 2 fs
; Output control
nstxout                 = 2500      ; save coordinates every 5.0 ps
nstvout                 = 2500      ; save velocities every 5.0 ps
nstenergy               = 2500      ; save energies every 5.0 ps
nstlog                  = 2500      ; update log file every 5.0 ps
; Bond parameters
continuation            = no        ; first dynamics run
constraint_algorithm    = lincs     ; holonomic constraints 
constraints             = h-bonds   ; bonds involving H are constrained
lincs_iter              = 1         ; accuracy of LINCS
lincs_order             = 4         ; also related to accuracy
; Nonbonded settings 
cutoff-scheme           = Verlet    ; Buffered neighbor searching
ns_type                 = grid      ; search neighboring grid cells
nstlist                 = 10        ; 20 fs, largely irrelevant with Verlet
; vdW
rvdw                    = 1.2       ; short-range van der Waals cutoff (in nm)
rvdw-switch             = 1.0
vdw-modifier            = force-switch
DispCorr                = No        ; per CHARMM FF convention 
; Electrostatics
rcoulomb                = 1.2       ; short-range electrostatic cutoff (in nm)
coulombtype             = PME       ; Particle Mesh Ewald for long-range electrostatics
pme_order               = 4         ; cubic interpolation
fourierspacing          = 0.16      ; grid spacing for FFT
; Temperature coupling is on
tcoupl                  = V-rescale ; stochastic Bussi thermostat 
tc-grps                 = System 
tau_t                   = 1.0       ; value of tau (ps)
ref_t                   = 298       ; temperature (K) 
; Pressure coupling is off
pcoupl                  = no        ; no pressure coupling in NVT
; Periodic boundary conditions
pbc                     = xyz       ; 3-D PBC
; Velocity generation
gen_vel                 = yes       ; assign velocities from Maxwell distribution
gen_temp                = 298       ; temperature for Maxwell distribution
gen_seed                = -1        ; generate a random seed
```

### npt.md
```
title                   = NPT equilibration 
define                  = -DPOSRES  ; position restrain the protein
; Run parameters
integrator              = md        ; leap-frog integrator
nsteps                  = 250000    ; 2 * 250000 = 500 ps
dt                      = 0.002     ; 2 fs
; Output control
nstxout                 = 500       ; save coordinates every 1.0 ps
nstvout                 = 500       ; save velocities every 1.0 ps
nstenergy               = 500       ; save energies every 1.0 ps
nstlog                  = 500       ; update log file every 1.0 ps
; Bond parameters
continuation            = yes       ; Restarting after NVT 
constraint_algorithm    = lincs     ; holonomic constraints 
constraints             = h-bonds   ; bonds involving H are constrained
lincs_iter              = 1         ; accuracy of LINCS
lincs_order             = 4         ; also related to accuracy
; Nonbonded settings 
cutoff-scheme           = Verlet    ; Buffered neighbor searching
ns_type                 = grid      ; search neighboring grid cells
nstlist                 = 10        ; 20 fs, largely irrelevant with Verlet scheme
; vdW
rvdw                    = 1.2       ; short-range van der Waals cutoff (in nm)
rvdw-switch             = 1.0
vdw-modifier            = force-switch
DispCorr                = No
; Electrostatics
rcoulomb                = 1.2       ; short-range electrostatic cutoff (in nm)
coulombtype             = PME       ; Particle Mesh Ewald for long-range electrostatics
pme_order               = 4         ; cubic interpolation
fourierspacing          = 0.16      ; grid spacing for FFT
; Temperature coupling is on
tcoupl                  = V-rescale ; stochastic Bussi thermostat
tc-grps                 = System 
tau_t                   = 1.0
ref_t                   = 298 
; Pressure coupling is on
pcoupl                  = C-rescale 
pcoupltype              = isotropic             ; uniform scaling of box vectors
tau_p                   = 5.0                   ; time constant, in ps
ref_p                   = 1.0                   ; reference pressure, in bar
compressibility         = 4.5e-5                ; isothermal compressibility of water, bar^-1
refcoord_scaling        = com
; Periodic boundary conditions
pbc                     = xyz       ; 3-D PBC
; Velocity generation
gen_vel                 = no        ; Velocity generation is off 
```

### md.mdp
```
title                   = MD run 
; Run parameters
integrator              = md        ; leap-frog integrator
nsteps                  = 5000000   ; 2 * 2500000 = 10000 ps (10 ns)
dt                      = 0.002     ; 2 fs
; Output control
nstxout                 = 0         ; suppress bulky .trr file by specifying 
nstvout                 = 0         ; 0 for output frequency of nstxout,
nstfout                 = 0         ; nstvout, and nstfout
nstenergy               = 5000      ; save energies every 10.0 ps
nstlog                  = 5000      ; update log file every 10.0 ps
nstxout-compressed      = 5000      ; save compressed coordinates every 10.0 ps
compressed-x-grps       = System    ; save the whole system
; Bond parameters
continuation            = yes       ; Restarting after NPT 
constraint_algorithm    = lincs     ; holonomic constraints 
constraints             = h-bonds   ; bonds involving H are constrained
lincs_iter              = 1         ; accuracy of LINCS
lincs_order             = 4         ; also related to accuracy
; Nonbonded settings 
cutoff-scheme           = Verlet    ; Buffered neighbor searching
ns_type                 = grid      ; search neighboring grid cells
nstlist                 = 10        ; 20 fs, largely irrelevant with Verlet scheme
; vdW
rvdw                    = 1.2       ; short-range van der Waals cutoff (in nm)
rvdw-switch             = 1.0
vdw-modifier            = force-switch
DispCorr                = No
; Electrostatics
rcoulomb                = 1.2       ; short-range electrostatic cutoff (in nm)
coulombtype             = PME       ; Particle Mesh Ewald for long-range electrostatics
pme_order               = 4         ; cubic interpolation
fourierspacing          = 0.16      ; grid spacing for FFT
; Temperature coupling is on
tcoupl                  = V-rescale             ; modified Berendsen thermostat
tc-grps                 = System 
tau_t                   = 1.0
ref_t                   = 298 
; Pressure coupling is on
pcoupl                  = C-rescale 
pcoupltype              = isotropic             ; uniform scaling of box vectors
tau_p                   = 5.0                   ; time constant, in ps
ref_p                   = 1.0                   ; reference pressure, in bar
compressibility         = 4.5e-5                ; isothermal compressibility of water, bar^-1
; Periodic boundary conditions
pbc                     = xyz       ; 3-D PBC
; Velocity generation
gen_vel                 = no        ; Velocity generation is off 
```