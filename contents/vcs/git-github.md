---
comments: true
---

# Git and GitHub

## Configure your Git username/email

You typically configure your global username and email address after installing Git. However, you can do so now if you missed that step or want to make changes. After you set your global configuration, repository-specific configuration is optional.

Git configuration works the same across Windows, macOS, and Linux.
To set your global username/email configuration:

```bash
# Set your username:
git config --global user.name "FIRST_NAME LAST_NAME"

# Set your email address:
git config --global user.email "MY_NAME@example.com"
```

To set repository-specific username/email configuration:

From the command line, change into the repository directory.

```bash
# Set your username:
git config user.name "FIRST_NAME LAST_NAME"

# Set your email address:
git config user.email "MY_NAME@example.com"
```

Verify your configuration by displaying your configuration file:
`cat .git/config`

## Branch
### Create a New Branch
```bash
git checkout -b new_branch
git push origin new_branch
```

### Check Branches
```bash
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

## Pull Requests
### Merge a Pull Request Locally
I tried merging a pull request for a repository that I was not part of. Basically, the owner asked me to clone his repo, merge the latest pull request locally on my computer, and test the updated code before he merges it in the main repository.

```bash
# Clone the repository
git clone git@github.com:wasade/exhaustive.git
cd exhaustive

# Fetch the pull request by its ID (the numbers after the # symbol) and simultaneously create a branch
git fetch origin pull/3/head:rf-test

# Switch to the new branch to see the changes
git switch rf-test 
# or
git checkout rf-test
# depending on the git version
```

## Git Submodule
### Add a Submodule
A Git submodule act as a repository within a repository. When I tried for the first time it asked me to add the submodule in the main folder of the top level repository. I do not know if it is possible to change it's location to a subfolder in the mail repo. There are commands to work with submodules while you are in the main repo. However, if you do not know them all just get inside the submodule repo and work on it like a normal Git repo.

```bash
git submodule add <link to the repo>
```

### Recursively Pull Git Submodule(s)
If you do a `git pull` in the main repository it will not pull the contents of the submodule repository. 

```bash
git pull --recurse-submodule
```

Set in configuration

```bash
git config submodule.recurse true
```

#### Pull and Merge Submodules from Remote Repo

```bash
git submodule update --remote --merge
```

### Clone a Repository with Submodules

```bash
git clone --recurse-submodules <repo link>
```

Here’s the clean way to *completely* remove a git submodule from a repo.

Assume the submodule lives at: `path/to/submodule`


### Remove a Submodule
#### 1. Deinitialize the submodule

This removes the submodule’s config and staging from Git:

```bash
git submodule deinit -f path/to/submodule
```

(This cleans up entries in `.git/config`.)

#### 2. Remove the submodule directory from the index

This tells Git “stop tracking this thing as a submodule” and schedules its folder for deletion in the next commit:

```bash
git rm -f path/to/submodule
```

This will:

* Remove the submodule entry from the index
* Remove the corresponding section from `.gitmodules`
* Mark the folder for deletion

Don’t worry, you can still recover it from history if needed.

#### 3. Remove the submodule’s internal git data

Git keeps the submodule’s data under `.git/modules/`:

```bash
rm -rf .git/modules/path/to/submodule
```

(If that path doesn’t exist, you can skip this step.)

#### 4. Commit the changes

```bash
git commit -m "Remove submodule path/to/submodule"
```

Now the submodule is fully removed from the parent repository.

#### Variant: keep the files but not as a submodule

If you want to *keep the directory contents* and just stop treating it as a submodule:

```bash
git submodule deinit -f path/to/submodule
git rm --cached path/to/submodule        # remove from index only
rm -rf .git/modules/path/to/submodule
```

Then manually re-add the directory as normal files (if needed):

```bash
# Make sure the files are still there; if not, restore them (e.g., from backup or previous checkout)
git add path/to/submodule
git commit -m "Convert submodule to regular directory"
```

## Download All GitHub Repositories Using `gh` CLI

### Install GitHub CLI 

On Debian/Ubuntu:

```bash
sudo apt install gh
```

On macOS:

```bash
brew install gh
```

### Authenticate

```bash
gh auth login
```

### Clone all Repositories

Change the username in the script below to your GitHub username name. 

```bash
gh repo list username --limit 1000 --json sshUrl -q '.[].sshUrl' | \
while read repo; do
    git clone "$repo"
done
```

### Pull all the Cloned Repositories

```bash
#!/usr/bin/env bash

set -euo pipefail

for dir in */; do
  # Only act on directories
  [ -d "$dir/.git" ] || continue

  echo "📦 Updating repo: $dir"
  (
    cd "$dir"
    git pull --ff-only
  )
done

echo "✅ All repositories processed."
```

