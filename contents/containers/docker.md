---
comments: true
---

# Docker Tutorial

This tutorial will guide you through the basics of Docker, covering installation on both Mac and Linux, core concepts, and essential commands to get you building and running containers.

## Introduction

### What is Docker?

Docker is a platform that allows you to package, distribute, and run applications in isolated environments called containers. Think of containers as lightweight virtual machines. They share the host OS kernel but have their own filesystem, processes, network, and resource limitations.  This allows for consistent execution across different environments (development, testing, production) and simplifies deployment.

### Why use Docker?

* **Consistency:**  "Works on my machine" is a common developer problem. Docker solves this by ensuring the same environment for development, testing, and production.
* **Portability:** Easily move applications between different machines and environments.
* **Isolation:** Containers isolate applications, preventing conflicts and increasing security.
* **Resource Efficiency:** Containers are lightweight compared to virtual machines, using fewer resources.
* **Faster Deployment:** Build, ship, and run applications quickly.

### Resources for Further Learning:

* **Official Docker Documentation:** [https://docs.docker.com/](https://docs.docker.com/)
* **Docker Hub:** [https://hub.docker.com/](https://hub.docker.com/)
* **Docker Tutorial for Beginners:** [https://www.freecodecamp.org/news/docker-tutorial-for-beginners-getting-started-with-containers/](https://www.freecodecamp.org/news/docker-tutorial-for-beginners-getting-started-with-containers/)

## Installation

### A. Mac Installation

1. **Download Docker Desktop for Mac:** Go to [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) and download the appropriate installer for your Mac's architecture (Intel or Apple Silicon).
2. **Installation:** Double-click the downloaded `.dmg` file and follow the on-screen instructions. You'll likely need to grant permissions and enter your administrator password.
3. **Start Docker Desktop:** After installation, Docker Desktop should launch automatically.  If not, find it in your Applications folder and start it.
4. **Verification:** Open a terminal and run `docker --version`. You should see the Docker version information.  You may also need to log into Docker Hub (a public registry for images) if prompted.

### B. Linux Installation (Ubuntu/Debian)

1. **Update Package List:**
```bash
sudo apt update
```

2. **Install Docker:**
```bash
sudo apt install docker.io docker-compose docker-buildx
```
(You might need to add the Docker repository first.  See the official Docker documentation for detailed instructions specific to your distribution: [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/))

3. **Start Docker Service:**
```bash
sudo systemctl start docker
```

4. **Enable Docker on Boot:**
```bash
sudo systemctl enable docker
```

5. **Add User to Docker Group:** This allows you to run Docker commands without `sudo`.
```bash
sudo usermod -aG docker $USER
newgrp docker  # Apply the group change to your current session
```

6. **Verification:** Open a terminal and run `docker --version`. You should see the Docker version information.

## Core Concepts

* **Images:** Read-only templates containing the application code, libraries, tools, dependencies, and other files needed to run an application. Think of them like blueprints.
* **Containers:**  Runnable instances of an image. They are isolated, executable packages that include everything needed to run a piece of software.  Think of them as the actual machines built from the blueprints.
* **Docker Hub:**  A public registry for storing and sharing Docker images.  (Like GitHub for code).  You can pull pre-built images from Docker Hub or push your own.
* **Dockerfile:** A text file containing instructions for building a Docker image.


## Essential Docker Commands

### Searching for Images

```bash
docker search <keyword>
```
Example: `docker search ubuntu`  This will show images related to Ubuntu on Docker Hub.

### Pulling Images

```bash
docker pull <image_name>:<tag>
```
Example: `docker pull ubuntu:latest`  This downloads the latest Ubuntu image from Docker Hub.  `latest` is the default tag; you can specify a version (e.g., `ubuntu:20.04`).

### Listing Images

```bash
docker images
```
This displays all locally stored Docker images.

### Running Containers

```bash
docker run --rm <image_name>:<tag>
```
Example: `docker run ubuntu:latest` This starts a new container based on the Ubuntu image.  You'll typically be dropped into a shell within the container. `--rm` deletes the container (not the image) after the container exits.

### Running Containers in Detached Mode (Background)

```bash
docker run -d <image_name>:<tag>
```
The `-d` flag runs the container in the background.

### Run an Image Interactively

```bash
docker run -ti --rm rocker/r-ver R
```

Run a container in emulation mode. For example running an amd64 (Linux) based container on an arm64 machine (MacOS). 

```bash
docker run --platform=linux/amd64 --rm -it czid czid --help
```

### Listing Running Containers

```bash
docker ps
```
This displays currently running containers.

### Listing All Containers (Running & Stopped)

```bash
docker ps -a
```

### List all the Downloaded/Created Docker Images

```bash
docker image ls
```

### Stopping a Container

```bash
docker stop <container_id>
```
Find the `container_id` from `docker ps`.

### Removing a Container

```bash
docker rm <container_id>
```
You need to stop the container before removing it.

### Removing an Image

```bash
docker rmi <image_id>
```
Find the `image_id` from `docker images`. You can't remove an image if it's being used by a container, even if the conainer is stopped. So, first remove the container using `docker rm` then delete the image. 

### Port Mapping (Publishing Ports)

```bash
docker run -p <host_port>:<container_port> <image_name>:<tag>
```
This maps a port on your host machine to a port inside the container. For example, `-p 8080:80` maps port 8080 on your host to port 80 inside the container.

### Volume Mounting (Persisting Data)

```bash
docker run -v <host_path>:<container_path> <image_name>:<tag>
```
This mounts a directory on your host machine to a directory inside the container.  Changes made to the directory inside the container will be reflected on your host, and vice-versa. Useful for data persistence.

### Creating Your First `Dockerfile`

Let's create a simple `Dockerfile` for a Python application.

1. **Create a directory for your application:**

```bash
mkdir my-python-app
cd my-python-app
```

2. **Create a Python script (app.py):**

```python
print("Hello, Docker!")
```

3. **Create a `Dockerfile` in the same directory:**

```dockerfile
# Base image (Python 3.9)
FROM python:3.9-slim-buster  

# Set the working directory inside the container
WORKDIR /app  

# Copy the Python script to the container
COPY app.py .  

# Command to run when the container starts
CMD ["python", "app.py"]  
```

4. **Build the Image:**

```bash
docker build -t my-python-app .
```
The `-t` flag tags the image with a name (`my-python-app`). The `.` indicates that the Dockerfile is in the current directory.

Specify the build platform. For example, if you are building the container on MacOS/Windows, but it's intended to run on a Linux machine.

```bash
docker build --platform=linux/amd64 -t czid .
```

5. **Run the Container:**

```bash
docker run my-python-app
```
You should see "Hello, Docker!" printed in the terminal.

## Examples

### Run R Studio server 
```
docker run -d --name rstudio -p 80:8787 rocker/rstudio
```

## Push Containers to Docker Hub

Tag and push the container to push to a Docker Hub repository.

Note: change the tag based on the release.

```bash
docker tag czid rohitfarmer/czid:20260114
docker push rohitfarmer/czid:20260114
```

Pull the container from Docker Hub and create a Singularity container.

```bash
singularity pull 2026-01-14-czid.sif docker://rohitfarmer/czid:20260114
```

## TL;DR

### Docker Build vs. Docker Compose

**`docker build`**

* **Purpose:** `docker build` is used to create Docker *images* from a `Dockerfile`.  It's the fundamental command for packaging your application and its dependencies into a self-contained, reproducible unit.
* **Scope:**  Focuses on building a *single* image. The `Dockerfile` contains instructions for how to assemble the image, layer by layer.
* **Input:** Takes a `Dockerfile` and a *context* (usually a directory).  The context contains the files that the `Dockerfile` needs to build the image.
* **Output:** A Docker image (identified by an image ID and potentially a tag).
* **Complexity:** Best for relatively simple applications or when you only need to build and manage a single image.
* **Example:**  `docker build -t my-app .` (Builds an image tagged `my-app` using the `Dockerfile` in the current directory).

**`docker compose`**

* **Purpose:** `docker compose` is used to define and manage *multi-container* Docker applications. It allows you to orchestrate multiple related services (each running in its own container) as a single unit.
* **Scope:**  Manages an entire application stack – multiple containers, their networks, volumes, and dependencies.
* **Input:** Takes a `docker-compose.yml` (or `docker-compose.yaml`) file.  This file defines the services that make up your application, how they're built (if needed), how they're linked together, and how they're exposed to the outside world.
* **Output:**  Starts, stops, and manages the entire application stack defined in the `docker-compose.yml` file.
* **Complexity:** Ideal for complex applications composed of multiple interacting services (e.g., a web application with a database, a message queue, and a caching service).  It simplifies the process of deploying and managing these interconnected services.
* **Example:**  `docker compose up` (Starts all the services defined in the `docker-compose.yml` file).

**Here's an analogy to help illustrate:**

* **`docker build` is like building a single Lego brick.** You follow the instructions (Dockerfile) to create that one brick.
* **`docker compose` is like building a Lego castle.** You have multiple bricks (images), and `docker compose` helps you assemble them all together according to a blueprint (docker-compose.yml) to create the complete structure.

**Here's a table summarizing the key differences:**

| Feature        | `docker build`                 | `docker compose`                |
|----------------|--------------------------------|--------------------------------|
| **Purpose**     | Build a single Docker image     | Orchestrate multi-container apps|
| **Input**       | `Dockerfile`                    | `docker-compose.yml`           |
| **Scope**       | Single image                     | Multiple containers/services  |
| **Complexity** | Simple applications            | Complex applications          |
| **Output**      | Docker image                    | Running application stack     |


**Do they work together?**

Yes!  Often, you'll use both. 

1. You'll use `docker build` to create the images for each service in your application.
2.  Then, you'll use `docker compose` to define how those images are used to create and connect the containers that make up your application.

In your `docker-compose.yml`, you can specify that a service should be built from a `Dockerfile` using the `build` directive. This means `docker compose` will internally use `docker build` as part of its process.

**In short:**

* Use `docker build` to create individual images.
* Use `docker compose` to define and manage applications composed of multiple containers built from those images.

### Docker File Template

Here's a Dockerfile template that strikes a balance between being comprehensive enough for most projects.

```dockerfile
# Use an official base image.  Choose based on your language/framework.
FROM ubuntu:latest

# Maintainer information (optional)
MAINTAINER Your Name <your.email@example.com>

# Install system dependencies. Update before installing.
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 python3-pip \
    curl \
    wget \
    git \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy application requirements (e.g., requirements.txt for Python)
COPY requirements.txt .

# Install application dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY . .

# Expose the port your application listens on
EXPOSE 8000

# Define the command to run when the container starts
CMD ["python3", "app.py"]
```

**Explanation of each section:**

1. **`FROM ubuntu:latest`**
   * **Purpose:** Specifies the base image for your Docker image.  This is the starting point.
   * **`ubuntu:latest`**:  Uses the latest version of the Ubuntu image from Docker Hub.  You would change this to the appropriate base image for your application (e.g., `python:3.9-slim-buster`, `node:16`, `openjdk:11`).  Choosing a "slim" or "alpine" base image can reduce the image size, but may require more manual dependency installation.

2. **`MAINTAINER Your Name <your.email@example.com>`**
   * **Purpose:**  Provides contact information for the maintainer of the image. This is optional but good practice.  (Deprecated in favor of `LABEL maintainer="..."`)

3. **`RUN apt-get update && apt-get install -y --no-install-recommends ...`**
   * **Purpose:**  Executes commands *during the image build process*.  This is where you install system-level dependencies needed by your application.
   * **`apt-get update`**: Updates the package lists for upgrades and new packages.
   * **`apt-get install -y --no-install-recommends ...`**: Installs the specified packages.
      * `-y`:  Automatically answers "yes" to any prompts during installation.
      * `--no-install-recommends`: Avoids installing recommended (but not strictly required) packages, reducing image size.
   * **`&&`**: Chains multiple commands together.  This is more efficient because it creates fewer layers in the image.
   * **`rm -rf /var/lib/apt/lists/*`**:  Cleans up the APT package lists after installation.  This significantly reduces the image size.

4. **`WORKDIR /app`**
   * **Purpose:** Sets the working directory inside the container. All subsequent `RUN`, `COPY`, `ADD`, `CMD`, and `ENTRYPOINT` instructions will be executed relative to this directory.
   * **`/app`**:  A common convention is to use `/app` as the working directory.

5. **`COPY requirements.txt .`**
   * **Purpose:** Copies files from your host machine (the build context) to the container's filesystem.
   * **`requirements.txt`**:  The name of your dependency file (e.g., `requirements.txt` for Python, `package.json` for Node.js).  Copying this *before* copying the application code allows Docker to cache the dependency installation step. If your application code changes but your dependencies don't, Docker can reuse the cached layer, making builds faster.
   * **`.`**: The destination directory within the container (the current working directory, `/app`).

6. **`RUN pip3 install --no-cache-dir -r requirements.txt`**
   * **Purpose:** Installs the application's dependencies within the container.
   * **`pip3 install --no-cache-dir -r requirements.txt`**: Uses `pip` to install the dependencies listed in `requirements.txt`.
      * `--no-cache-dir`:  Disables the caching of downloaded packages, reducing image size.

7. **`COPY . .`**
   * **Purpose:** Copies all the files and directories from the build context (your project directory) to the working directory (`/app`) in the container.  Be careful with this.  Don't copy unnecessary files (e.g., `.git` directory, large media files) to keep the image size down. Use a `.dockerignore` file (see below) to exclude files.

8. **`EXPOSE 8000`**
   * **Purpose:**  Informs Docker that the container listens on the specified network ports at runtime.  This is metadata, and doesn't actually publish the port. You still need to use the `-p` flag when running the container to map the port to the host.

9. **`CMD ["python3", "app.py"]`**
   * **Purpose:** Specifies the command to run when the container starts. This is the main process that will keep the container running.
   * **`["python3", "app.py"]`**:  The command to execute. This is the preferred way to specify the command because it avoids shell invocation and potential issues with signal handling.

**Important considerations:**

* **`.dockerignore` file:** Create a `.dockerignore` file in the same directory as your `Dockerfile` to exclude files and directories from being copied to the image. This reduces the image size and improves build performance.  Common things to ignore:  `.git`, `node_modules`, `venv`, `__pycache__`, log files, etc.

* **Image size:** Keep your image size as small as possible by:
    * Using a minimal base image (e.g., alpine).
    * Removing unnecessary files and directories.
    * Using multi-stage builds (advanced).

* **Caching:**  Order your `Dockerfile` instructions carefully to leverage Docker's caching mechanism.  Put frequently changing instructions later in the file.

* **Security:** Be mindful of security best practices when building your images.  Avoid running processes as root, and keep your base images up to date.

### Difference Between a Container and an Image

#### Docker Image

*   **Think of it as a blueprint or a template.**  An image is a read-only template with instructions for creating a Docker container.  It contains the application code, runtime, system tools, system libraries, settings, and everything else needed to run a piece of software.
*   **Layered Filesystem:** Docker images are built from a series of read-only layers. Each layer represents an instruction in the `Dockerfile` (the file that defines how to build the image). This layering makes images efficient – changes only require rebuilding the affected layers, and layers can be shared between images.
*   **Immutable:** Images themselves don't change.  They are like snapshots.  Once built, an image remains constant.
*   **Stored in a Registry:** Images are typically stored in a Docker registry (like Docker Hub, a private registry, or cloud provider registries).  This allows you to share and distribute your applications easily.
*   **Example:**  Imagine you want to run a web application based on Ubuntu, with Node.js and your application code installed. The image would contain the Ubuntu operating system, the Node.js runtime, your application's source code, and any necessary dependencies.

#### Docker Container

*   **Think of it as a running instance of an image.** A container is a runnable instance of a Docker image.  You can start, stop, and delete containers.
*   **Mutable (with a writable layer):**  When you run an image, Docker creates a container.  The container adds a thin, writable layer *on top* of the read-only image layers.  Any changes you make inside the container (e.g., creating files, modifying configurations) are written to this writable layer.
*   **Isolated:** Containers provide a level of isolation from the host operating system and from other containers. This means they have their own process space, file system, and network interfaces. This isolation contributes to security and portability.
*   **Ephemeral (typically):** While the writable layer persists for the lifetime of the container, containers are often designed to be disposable.  If a container is stopped and deleted, the changes in the writable layer are lost (unless you use volumes – see below).
*   **Example:**  You take the image described above (Ubuntu + Node.js + your app) and "run" it.  This creates a container. The container is now a running process that's executing your Node.js application.

**Here's a simple analogy:**

*   **Image:** A class in object-oriented programming.  It's a definition of what something *is*.
*   **Container:** An object created from that class.  It's a specific *instance* of the definition, and it's running and doing something.

**Key Differences Summarized in a Table:**

| Feature         | Docker Image                 | Docker Container              |
|-----------------|------------------------------|-------------------------------|
| **Nature**      | Read-only template           | Runnable instance of an image |
| **State**       | Static, immutable            | Dynamic, mutable             |
| **Storage**     | Stored in a registry         | Runs on the host OS           |
| **Creation**    | Built from a `Dockerfile`     | Created from an image         |
| **Purpose**     | Packaging application & deps| Running the application       |
| **Layers**      | Multiple read-only layers   | Read-only layers + writable layer |


**Volumes (Important Note):**

Docker volumes provide a way to persist data generated by a container even after the container is stopped or deleted.  Volumes are not part of the container's writable layer; they are stored separately on the host machine or in a managed storage service.  This is essential for data that needs to survive the container's lifecycle (e.g., databases, user uploads).

**In a typical workflow:**

1.  **You build a Docker image:**  Using a `Dockerfile`, you define how to create an image with your application and its dependencies.
2.  **You run the image to create a container:**  `docker run <image_name>` starts a new container based on that image.
3.  **The container runs your application.**
4.  **You can have multiple containers running from the same image:** Each container is isolated from the others.
5.  **When the container is no longer needed, you can stop and remove it.**
