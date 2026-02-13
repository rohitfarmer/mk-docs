---
comments: true
---


# Jupyter Over Tunneling

## For HPC

*Note: The procedure below will run the jupyter notebook on an interactive node in an HPC.*

1. Ssh to hpc.    
2. Claim an interactive node with qrsh (or something similar).   
3. Note the node name.  
4. Run jupyter on the claimed node by `jupyter notebook --no-browser --ip='0.0.0.0'` or create an alias in your bashrc for a shortcut `alias jup='jupyter notebook --no-browser --ip='0.0.0.0''`.  
5. On your own computer start another ssh session with tunnelling using the node name as noted above `ssh user@host -L8888:nodeName:8888 -N`. *You will not see any message this time, but if it's not throwing any error then it's probably running just fine.*  
6. To avoid writing the code in line 5 everytime you tunnel you can use the shell script below.

I name it as `jupssh`.  
```bash
#!/bin/sh

# Check if the arugment is passed.
if [[ $# -eq 0 ]];
then
    echo 'Usage: jupssh <node name>'
    exit 1
fi

ssh user@host -L8888:$1:8888 -N
```
7. Copy the URL that jupyter daemon generated in the step 4 and paste it in the browser on your own computer. URL should look something similar to `http://(nodeName or 127.0.0.1):8888/?token=3f7c3a8949b3fa1961c63653873fea075a93a29bffe373b5`