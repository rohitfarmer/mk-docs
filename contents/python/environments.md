---
comments: true
---

# Python Virtual Environments

Create isolated python environment per project with all the packages needed for that particular project. Commands copied from [https://realpython.com/python-virtual-environments-a-primer/](https://realpython.com/python-virtual-environments-a-primer/).

## Using the base module venv
## Create the environment
```
python3 -m venv venv (name) --upgrade-deps
```

**Note**: Naming your virtual environment folder `venv` is just a convention. Sticking to this convention can help you reliably exclude your virtual environment from version control using a `.gitignore` file.

**Note:** `--upgrade-deps` upgrades the `pip` and `setuptools` version while creating the environment. 

You can choose a description name for the prompt rather than changing the name of the environment folder itself. 
```
$ python3 -m venv venv --prompt="dev-env"
$ source venv/bin/activate
(dev-env) $
```

### Create an environment while allowing access to system site-packages
```
python3 -m venv venv --system-site-packages
```

### Create an environment while clearing and replacing the exisiting environment
```
python3 -m venv venv --clear
```

## Activate the environment
```
source venv/bin/activate
```

**Note:** You don’t need to activate your virtual environment to use it. You can work with your virtual environment without activating it by passing the absolute path of the Python executable inside your virtual environment. `$ /home/name/path/to/venv/bin/python`

## Install packages to the environment
```
(venv) $ python -m pip install <package-name>
```

**Note:** Because you always need an existing Python installation to create your virtual environment, venv opts to reuse the existing standard library modules to avoid the overhead of copying them into your new virtual environment. This intentional decision speeds up the creation of virtual environments and makes them more lightweight, as described in the motivation for PEP 405.


## Deactivate the environment
```
(venv) $ deactivate
```

## Pin your dependencies
To make your virtual environment reproducible export the installed dependencies within an environment to a requirements.txt file.
```
(venv) $ python -m pip freeze > requirements.txt
```

To install the requirements to a new environment
```
python -m pip install -r requirements.txt
```