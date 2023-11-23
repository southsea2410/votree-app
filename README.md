# votree-web

# GIT WORKFLOW: 
===============
1. Fetch & merge change from the remote.
2. Create a branch to work on a project feature.
3. Develop feature on branch and commit.
4. Fetch & merge from the remote again.
5. Push your branch up to the remote for review.

# BASIC.
========

git init: create new git repository.
git status: check content of repository and staging area.
git add: add new files from working repository to staging area.
git diff: show the difference between working repository and staging area.
git commit: permanently store file changes from staging area in repository.
            --amend: update mistakes of commit (git add -> git commit --amend).
                    --no-edit: keep the same messages.

git log: show list of all previous commit.
    --oneline: show in one line mode.
    -S 'key-word': find all key-word in mess commit.
    --oneline --graph: ways branch and commit were created.

git branch: Show the branch you are on.
            'new-branch': create new branch.
            -d "branch-name": delete branch. (-D if content did not merged).

git checkout 'branch-name': switch to diff branch.

git merge 'branch-name': merge branch name to master branch.

git fetch: Up-to-date working repository.
    > git merge origin/master: merge from origin/master to master branch.

git remote -v: list git project's remote.
git remote set-url origin git@"link": add folder to exists repository.
git remote add origin https://github.com/Kha7734/...: Add origin folder to repository.

git rm branch-name: delete.
        --cache branch-name: delete from staging.
        -f branch-name: delete from working directory.

# 3 DIFFERENCE WAYS TO BACKTRACK IN GIT.
========================================

git checkout HEAD filename: Discards changes in working directory.
git reset HEAD filename: Unstages file changes in the staging area.
git reset commit_SHA: Reset to the previous commit in your commit history.

# STORE CURRENTLY WORK & CHANGE TO ANOTHER BRANCH.
==================================================

git stash: store work temporarily for later use in a hidden directory.
git stash pop: retrieve the code previously.