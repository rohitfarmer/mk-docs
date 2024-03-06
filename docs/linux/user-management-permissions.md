# User management

## Add a new user
The command below will add a new user to a Linux system, create their home directory at `/home/newuser` and set the default shell to `/bin/bash`.

```bash
sudo useradd -m -s /bin/bash newuser
```

The command below set the password for the new user.
```bash
sudo passwd newuser
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
```
sudo -u newuser bash
```

## Add an existing user to a group
```bash
sudo usermod -a -G groupname newuser
```