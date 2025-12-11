# Permissions and User management

## Change group ownership

The code below will associate a folder to a specific group.  This is helpful when you are associated with more than one groups and the default group assigned to a file you created is not for the intended group. 

```bash
chgrp -R new_group path/to/folder
# R for recursive
```

Ensure the group ownership and permissions of the target directory are properly set if multiple users in the gemini group need access. For example, to make all new files inherit the gemini group:

```bash
chmod g+s /path/to/folder
```

## Recursively change a folder's ownership
```bash
chown -R <owner>:<group> <directory>
```

## File permissions using chmod

The code below will give read, write, and execute permissions to all the group members. A minus sign after g e.g. `g-wx` will take away write and execute permissions. 
```bash
chmod -R g+rwx path/to_folder
# R is for recursive
```

## Add a new user
The command below will add a new user to a Linux system, create their home directory at `/home/newuser` and set the default shell to `/bin/bash`.

```bash
sudo useradd -m -s /bin/bash newuser
```

The command below set the password for the new user.
```bash
sudo passwd newuser
```

## List all the users that have a home directory

```bash
awk -F: '/\/home/ {print $1}' /etc/passwd
```

## Delete a user
The command below will delete a user without deleting their home directory.

```bash
sudo userdel newuser
```
 To delete the home directory as well.
 ```bash
 sudo userdel --remove newuser
 ```

## Login as another user
To login as a newly created user

``` bash
sudo -u newuser bash

# or

su newuser
```

## List all the groups that a user belong to

```bash
groups user
```

## Add an existing user to a group
```bash
sudo usermod -a -G groupname newuser
```

