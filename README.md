# Devops Project

This project demonstrates the implementation of a modern DevOps pipeline for a React application, incorporating industry-standard practices for continuous integration, containerization, and orchestration. The primary goal is to establish an automated, scalable, and maintainable deployment process that encompasses the entire software development lifecycle.

## Application repo:
https://github.com/rafi-gemhar33/simple-node-js-react-npm-app-2


## Manifest repo:
https://github.com/rafi-gemhar33/simple-node-js-manisfest


## Shutdown and startup procedures for both VMs.
### VM-1 (Jenkins & SonarQube VM) Shutdown:
```bash
# Stop SonarQube container
docker stop sonarqube

# Stop Jenkins
sudo systemctl stop jenkins

# Stop Docker
sudo systemctl stop docker

# You can now safely stop the VM from Azure portal
```

### VM-2 (ArgoCD/Minikube VM) Shutdown:
```bash
# Kill port forwarding processes
sudo killall socat

# Stop minikube
minikube stop

# You can now safely stop the VM from Azure portal
```

## Demo Startup guide:
### VM-1 (Jenkins & SonarQube VM):

```bash
# 1. Start VM from Azure portal

# 2. Start Docker
sudo systemctl start docker
sudo systemctl status docker  # Verify it's running

# 3. Start Jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins  # Verify it's running

# 4. Start SonarQube
docker start sonarqube
docker ps  # Verify sonarqube is running

# 5. Verify services are accessible
# Jenkins: http://YOUR_VM1_IP:8080
# SonarQube: http://YOUR_VM1_IP:9000
```

### VM-2 (ArgoCD/Minikube VM):

```bash
# 1. Start VM from Azure portal

# 2. Start minikube
minikube start

# 3. Verify kubernetes services
kubectl get pods -A
kubectl get svc -A

# 4. Set up port forwarding for ArgoCD and React app
sudo socat TCP-LISTEN:30009,fork TCP:$(minikube ip):30009 &  # ArgoCD HTTP
sudo socat TCP-LISTEN:30010,fork TCP:$(minikube ip):30010 &  # ArgoCD HTTPS
sudo socat TCP-LISTEN:30007,fork TCP:$(minikube ip):30007 &  # React app

# 5. Verify services are accessible
# ArgoCD UI: http://YOUR_VM2_IP:30009
# React App: http://YOUR_VM2_IP:30007
```

YOUR_VM1_IP:  20.187.54.124
YOUR_VM2_IP:  51.141.187.106