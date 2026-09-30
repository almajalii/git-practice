# Git Commands — Interview Notes

## 1. Repository Setup

### Initialize a repository

```bash
git init
```

Initializes the current folder as a Git repository.

```bash
git init my-project
```

Creates a new folder and initializes it as a Git repository.

---

## 2. Git Configuration

### View global configuration

```bash
git config --global --list
```

### Set username

```bash
git config --global user.name "Your Name"
```

### Set email

```bash
git config --global user.email "you@example.com"
```

`--global` means the setting applies to your user account across repositories.

---

# 3. Basic Terminal Commands

```bash
pwd
```

Show current directory.

```bash
ls
```

List files.

```bash
ls -al
```

List files including hidden files.

```bash
cd folder
```

Move into a folder.

```bash
cd ..
```

Move to the parent folder.

```bash
mkdir folder
```

Create a folder.

```bash
touch file.txt
```

Create an empty file.

```bash
cat file.txt
```

Display file contents.

```bash
alias
```

View shell aliases.

---

# 4. Clone & Fork

### Clone

```bash
git clone <repository-url>
```

Copies a remote repository to your local computer, including its Git history.

**Mental model:**

```text
Remote repository → Local computer
```

### Fork

Forking is a **GitHub feature**, not a Git command.

```text
Someone else's GitHub repo
          ↓
Your GitHub account
```

You can then clone your fork to your computer.

---

# 5. Git Status

```bash
git status
```

Shows the current state of the repository, including:

- Current branch
- Untracked files
- Modified files
- Staged changes
- Working tree status
- Sometimes remote/upstream information

Use it constantly when working with Git.

---

# 6. Git's Three Main Areas

```text
Working Directory
       ↓
   git add
       ↓
Staging Area
       ↓
  git commit
       ↓
Repository / History
```

### Working Directory

The files currently on your computer.

### Staging Area

Changes selected for the next commit.

### Repository

The committed Git history.

---

# 7. Tracking Files

### See tracked files

```bash
git ls-files
```

Lists files currently tracked by Git.

### Untracked file

Git doesn't know about the file yet.

```text
file.txt → untracked
```

### Track/stage a file

```bash
git add file.txt
```

Adds the file/change to the staging area.

---

# 8. Staging Changes

### Stage a specific file

```bash
git add file.txt
```

Stages changes to that file.

### Stage changes under the current path

```bash
git add .
```

Stages changes under the current directory/path.

### Stage everything in the repository

```bash
git add -A
```

Stages all new, modified, and deleted files in the repository.

### Stage modifications/deletions to tracked files

```bash
git add -u
```

Does **not** stage new untracked files.

---

# 9. Commit

### Create a commit

```bash
git commit -m "message"
```

Creates a commit from the changes currently in the staging area.

Example:

```bash
git commit -m "Add login form"
```

### Commit tracked modifications directly

```bash
git commit -am "message"
```

Stages and commits modifications/deletions to **already tracked files**.

It does **not** include new untracked files.

---

# 10. Git Diff

## Unstaged changes

```bash
git diff
```

Compares:

```text
Working Directory ↔ Staging Area
```

Shows changes that have **not been staged**.

---

## Staged changes

```bash
git diff --staged
```

Also:

```bash
git diff --cached
```

Compares:

```text
Staging Area ↔ HEAD
```

Shows what will be included in the next commit.

---

## All changes since the last commit

```bash
git diff HEAD
```

Compares:

```text
Working Directory ↔ HEAD
```

Shows both staged and unstaged changes since the last commit.

### Mental model

If:

```text
HEAD:       A
Staging:    A + B
Working:    A + B + C
```

Then:

```text
git diff
```

→ `C`

```text
git diff --staged
```

→ `B`

```text
git diff HEAD
```

→ `B + C`

---

## Compare two commits

```bash
git diff <commit1> <commit2>
```

Shows the differences between two commits.

Example:

```bash
git diff 4ca3310 abc1234
```

### Compare branches

```bash
git diff main feature
```

Shows differences between the two branches.

### Compare a specific file

```bash
git diff main feature -- file.txt
```

---

# 11. Restore / Undo Changes

## Discard unstaged changes

```bash
git restore file.txt
```

Restores the working-directory version to the staged/HEAD version.

⚠️ This discards the unstaged changes.

Example:

```text
HEAD:       A
Staging:    A + B
Working:    A + B + C
```

After:

```bash
git restore file.txt
```

You get:

```text
HEAD:       A
Staging:    A + B
Working:    A + B
```

So **B stays staged** and **C is discarded**.

---

## Unstage a file

```bash
git restore --staged file.txt
```

Removes the changes from the staging area but **keeps the actual changes in your working directory**.

Example:

```text
Before:

HEAD:       A
Staging:    A + B
Working:    A + B
```

After:

```bash
git restore --staged file.txt
```

```text
HEAD:       A
Staging:    A
Working:    A + B
```

The change wasn't deleted—it was simply unstaged.

### Older/common alternative

```bash
git reset HEAD file.txt
```

Often used for the same purpose: unstage the file while keeping the working-directory changes.

---

# 12. Remove Files

### Delete file + stage deletion

```bash
git rm file.txt
```

Removes the file from your computer and stages its deletion.

### Delete file only

```bash
rm file.txt
```

This is a shell command, not a Git command.

The deletion can then be staged with:

```bash
git add -A
```

### Stop tracking but keep local file

```bash
git rm --cached file.txt
```

Removes the file from Git's tracking/index but keeps it on your computer.

Commonly useful when a file should no longer be tracked.

---

# 13. Move / Rename Files

```bash
git mv old-name.txt new-name.txt
```

Moves or renames a file and stages the change.

`mv` by itself is a shell command:

```bash
mv old-name.txt new-name.txt
```

You would then stage the change separately.

---

# 14. Git History

### View commit history

```bash
git log
```

Shows commit history.

### Compact history

```bash
git log --oneline
```

Shows commits in a short format.

### History for a specific file

```bash
git log -- file.txt
```

Shows commits affecting that file.

### Follow a file through renames

```bash
git log --follow -- file.txt
```

Continues following the file even if it was renamed.

---

# 15. Inspect a Commit

```bash
git show <commit-id>
```

Shows information about a specific commit, including its changes/diff.

Example:

```bash
git show 4ca3310
```

---

# 16. Git Aliases

Create a shortcut:

```bash
git config --global alias.co checkout
```

Then:

```bash
git co
```

instead of:

```bash
git checkout
```

An alias is just a shortcut—it doesn't create new Git functionality.

---

# 17. .gitignore

`.gitignore` tells Git which files/patterns should normally be ignored.

Example:

```gitignore
node_modules/
.env
*.log
dist/
```

Common things to ignore:

- `node_modules`
- Environment files
- Logs
- Build output

### Important

`.gitignore` mainly affects **untracked files**.

If a file is already tracked, simply adding it to `.gitignore` does not make Git stop tracking it.

To stop tracking while keeping it locally:

```bash
git rm --cached file.txt
```

---

# 18. Pull & Push

### Pull

```bash
git pull
```

Gets changes from the remote repository and integrates them into your local branch.

```text
Remote → Local
```

### Push

```bash
git push
```

Sends your local commits to the remote repository.

```text
Local → Remote
```

A common workflow when working with others:

```bash
git pull
# make changes
git add .
git commit -m "message"
git push
```

---

# 19. Commit IDs

Every commit has a unique identifier (SHA/hash).

Example:

```text
4ca3310
```

You can use the commit ID with commands such as:

```bash
git show 4ca3310
git diff 4ca3310 abc1234
```

---

# 20. Branch Basics

A branch is a separate line of development.

Conceptually:

```text
main
  ●──●──●
         \
          ●──● feature
```

A branch lets you work on changes separately from another branch.

---

# 21. The Most Important Mental Model

Always picture Git like this:

```text
                 git add
Working ───────────────────→ Staging
                                │
                                │ git commit
                                ↓
                              HEAD
                           (history)
```

And the comparison commands:

```text
git diff
Working ↔ Staging

git diff --staged
Staging ↔ HEAD

git diff HEAD
Working ↔ HEAD
```

---

# 22. High-Priority Commands to Memorize

For a junior frontend interview, these are the commands I'd want you to be able to use without thinking:

```bash
git clone <url>

git status

git add <file>
git add .
git add -A
git add -u

git commit -m "message"
git commit -am "message"

git pull
git push

git diff
git diff --staged
git diff HEAD

git restore <file>
git restore --staged <file>

git log
git log --oneline
git show <commit>

git rm <file>
git rm --cached <file>

git mv <old> <new>

git branch
git switch <branch>
```

The **branch/switch commands at the bottom are ones we'll cover properly next**, so don't worry if you haven't practiced them yet.
