# Linux System Monitoring

## Monitoring Processes (ps command)
More information at (https://www.tecmint.com/ps-command-examples-for-linux-process-monitoring/)  

`ps -eo user,pid,ppid,cmd,%mem,%cpu --sort=-%mem | head` # Top running processes by highest memory usage.  
`ps -eo user,pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head` # Top running processes by highest cpu usage.  
`kill -9 2583 2584` # Kill a process using its PID.  
