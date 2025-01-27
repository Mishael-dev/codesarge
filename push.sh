#!/bin/bash

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git and try again."
    exit 1
fi

# Initialize a new Git repository
echo "Initializing a new Git repository..."
git init

# Rename the default branch to 'main'
echo "Renaming branch to 'main'..."
git branch -m main

# Add all files to the staging area
echo "Adding all files to the staging area..."
git add .

# Prompt for a commit message
read -p "Enter your commit message: " commit_message

# Make the initial commit
echo "Creating the initial commit..."
git commit -m "$commit_message"

# Add the remote repository
echo "Adding the remote repository..."
git remote add origin git@github.com:Mishael-dev/codesarge.git

# Push changes to the remote 'main' branch
echo "Pushing changes to the remote repository..."
git push -u origin main --force

echo "Repository successfully initialized and pushed to GitHub."
