---
comments: true
---

# Linux Package Management

## Apt

*To update and install packages.*  
`sudo apt-get update`  
`sudo apt-get upgrade`  
`sudo apt-get install`  
`sudo apt-get install vsftpd=2.3.5-3ubuntu1` # Install specific version of the package.  
`sudo apt-get remove vsftpd` # Remove package without removing configuration.  
`sudo apt-get purge vsftpd` # Completely remove package along with its configuration.  
`sudo apt-get remove --purge vsftpd` # Can combine both remove and purge.  
`sudo apt-get clean` # Delete downloaded .deb files.  
`sudo apt-get autoclean` # Delete all .deb files.  
`sudo apt-get check` # Check for broken dependencies.  

### Apt Cache
*To query apt package list.*  
`apt-cache pkgnames` # List all available packages.  
`apt-cache search vsftpd` # Search for a particular package.  
`apt-cache pkgnames vsftpd` # List all the packages starting with a particular name.  
`apt-cache show netcat` # Check package information.  
`apt-cache showpkg vsftpd` # Check dependencies of a particular package.  

## Install Using DPKG
`sudo dpkg -i package_with_unsatisfied_dependencies.deb`  
`sudo apt-get -f install`  

## Unattended Auto Upgrade
`sudo apt-get install unattended-upgrades`  
`sudo dpkg-reconfigure unattended-upgrades`  
https://help.ubuntu.com/lts/serverguide/automatic-updates.html  