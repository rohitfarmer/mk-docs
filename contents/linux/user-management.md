---
comments: true
---

# User management

[User Management in Linux](https://www.geeksforgeeks.org/linux-unix/user-management-in-linux/)

![Linux user IDs](https://media.geeksforgeeks.org/wp-content/uploads/20250730100822742759/linux_user_ids.webp)

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

