#!/bin/bash
set -e

# Debug: Print current directory
pwd

# Clean up and clone
rm -rf manifest-repo || true
git clone https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${MANIFEST_REPO_NAME}.git manifest-repo
cd manifest-repo

# Debug: Print repository contents
ls -la
echo "Checking if kubernetes directory exists:"
ls -la kubernetes || echo "kubernetes directory not found"

# Configure git
git config user.email "gemhar.rafis@gmail.com"
git config user.name "rafi-gemhar33"

# Debug: Print file content before change
echo "Content before change:"
cat kubernetes/deployment.yml || echo "deployment.yml not found"

# Make the change - handle both replaceImageTag and existing version numbers
sed -i -E "s/(gemharrafi\/react-app:)(replaceImageTag|[0-9]+)/\1${BUILD_NUMBER}/g" kubernetes/deployment.yml

# Debug: Print file content after change
echo "Content after change:"
cat kubernetes/deployment.yml || echo "deployment.yml not found"

# Debug: Check git status
git status

# Commit and push if there are changes
git add kubernetes/deployment.yml
git diff --cached --exit-code || {
    git commit -m "Update deployment image to version ${BUILD_NUMBER}"
    git push origin HEAD:main
}

cd ..
rm -rf manifest-repo