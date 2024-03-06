# Git and GitHub

## Configure your Git username/email

You typically configure your global username and email address after installing Git. However, you can do so now if you missed that step or want to make changes. After you set your global configuration, repository-specific configuration is optional.

Git configuration works the same across Windows, macOS, and Linux.
To set your global username/email configuration:

```
# Set your username:
git config --global user.name "FIRST_NAME LAST_NAME"

# Set your email address:
git config --global user.email "MY_NAME@example.com"
```

To set repository-specific username/email configuration:

From the command line, change into the repository directory.

```
# Set your username:
git config user.name "FIRST_NAME LAST_NAME"

# Set your email address:
git config user.email "MY_NAME@example.com"
```

Verify your configuration by displaying your configuration file:
`cat .git/config`

## Branch
### Create a New Branch
```
git checkout -b new_branch
git push origin new_branch
```

### Check Branches
```
git branch -a 	# List all local and remote branches.
git branch -r 	# List remote branches.
git branch 		# List local branches.
git branch --show-current # Show current branch.
```

### Delete a Branch
To delete a local branch in Git, after merge.  
`git branch -d <branch-name>`

To delete a remote branch, after merge.  
`git push --delete <remote name> <branch name>`

*Note: Git will not allow to delete a branch if it's not merged to the main/master. It can be overridden by:*
`git branch -D <branch-name>`

## Git Submodule
### Add a Submodule
A Git submodule act as a repository within a repository. When I tried for the first time it asked me to add the submodule in the main folder of the top level repository. I do not know if it is possible to change it's location to a subfolder in the mail repo. There are commands to work with submodules while you are in the main repo. However, if you do not know them all just get inside the submodule repo and work on it like a normal Git repo.
```
git submodule add <link to the repo>
```

### Recursively Pull Git Submodule(s)
If you do a `git pull` in the main repository it will not pull the contents of the submodule repository. 
```
git pull --recurse-submodule
```