# Docker Cookbook

## Listing
### List all the running containers
```
# Shows both runnning and stopped containers
docker ps -a
```

## Deleting
### Delete Docker images
```
docker rmi image
```

### List all the downloaded/created Docker images
```
docker image ls
```

## Running
### Run an image interactively
```
# Runs the latest version
docker run -ti --rm rocker/r-ver R

# Runs the specified version
docker run -ti --rm rocker/r-ver:4.1.2 R

# ti flag is to run interactively
# rm to remove the container once the session is closed
```

### Run RStudio server 
```
docker run -d --name rstudio -p 80:8787 rocker/rstudio
```