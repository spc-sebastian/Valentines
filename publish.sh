
#!/bin/bash

# Check if a repository URL was provided
if [ -z "$1" ]; then
    echo "Error: No repository URL provided."
    echo "Usage: ./publish.sh https://github.com/USERNAME/REPO_NAME.git"
    exit 1
fi

REPO_URL=$1

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "Initialized empty Git repository."
fi

# Add all files
git add .

# Commit
git commit -m "Initial commit: Valentine's surprise for Makayla 💖"

# Rename branch to main
git branch -M main

# Add remote (remove if it exists)
git remote remove origin 2>/dev/null
git remote add origin $REPO_URL

# Push
echo "Pushing to $REPO_URL..."
git push -u origin main

echo "--------------------------------------------------------"
echo "Done! Your code is now on GitHub."
echo "Wait a minute for GitHub Actions to deploy the site."
echo "Check the 'Actions' tab in your repository for progress."
echo "--------------------------------------------------------"
