# Git — Complete Interview & Practical Reference

## 1. What is Git?

**Git** is a distributed version control system used to track and manage changes to a project over time.

It allows developers to:

- Track changes
- View and compare previous versions
- Revert or recover changes
- Work on separate features using branches
- Collaborate with other developers
- Synchronize local work with remote repositories

Git is **distributed** because each developer's local repository contains the project's history.

### Git vs GitHub

- **Git** → version control system
- **GitHub** → remote hosting/collaboration platform for Git repositories

---

# 2. Git Repository

A Git repository is a project together with Git's history and metadata.

When you run:

```bash
git init
```

Git creates a `.git` directory containing the repository's internal data.

---

# 3. Git's Three Main Areas

The most important Git mental model:

```text
Working Directory
       ↓ git add
Staging Area
       ↓ git commit
Local Repository
```

### Working Directory

The actual files you're currently working on.

### Staging Area

The changes you've selected for the **next commit**.

### Repository

The committed history of the project.

### Why staging exists

It lets you choose exactly which changes belong in the next commit.

---

# 4. Basic Terminal Commands

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

Show shell aliases.

---

# 5. Git Configuration

Set your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

View configuration:

```bash
git config --global --list
```

`--global` means the setting applies to your user account across repositories.

---

# 6. Creating / Getting a Repository

Initialize the current folder:

```bash
git init
```

Create a folder and initialize it:

```bash
git init my-project
```

Clone an existing remote repository:

```bash
git clone <repository-url>
```

Cloning gives you:

- Project files
- Git history
- A local Git repository
- Connection information for the remote

### Clone vs Fork

**Clone:**

```text
Remote repository → Your computer
```

**Fork:**

```text
Someone else's GitHub repository → Your GitHub account
```

---

# 7. Git Status

```bash
git status
```

Shows useful information such as:

- Current branch
- Untracked files
- Modified files
- Staged changes
- Whether you're ahead/behind a remote branch when configured

Use it constantly while working with Git.

---

# 8. Tracked vs Untracked

### Untracked

Git doesn't currently track the file.

```text
file.txt
→ Git doesn't know about it yet
```

### Tracked

Git already knows about the file.

A tracked file can still have:

- Unstaged changes
- Staged changes
- Committed changes

---

# 9. Staging and Committing

Stage a file:

```bash
git add file.txt
```

Stage changes:

```bash
git add .
```

Stage everything in the repository:

```bash
git add -A
```

Stage modifications/deletions of tracked files only:

```bash
git add -u
```

Commit staged changes:

```bash
git commit -m "Add user authentication"
```

### `git commit -am`

```bash
git commit -am "Update authentication"
```

Stages and commits **modified/deleted tracked files**.

It does **not** include new untracked files.

---

# 10. Important `git add` Difference

```text
git add .
```

Stage changes under the current path.

```text
git add -A
```

Stage all changes throughout the repository.

```text
git add -u
```

Stage modifications/deletions of tracked files only.

```text
git commit -am "message"
```

Stage + commit tracked modifications/deletions.

---

# 11. A File Can Be Both Staged and Unstaged

Example:

1. Modify `file.txt`
2. `git add file.txt`
3. Modify `file.txt` again

Now:

```text
Staging Area       → first modification
Working Directory  → first + second modification
```

Therefore the same file can simultaneously have:

- A staged version
- Additional unstaged changes

---

# 12. Viewing Differences

```bash
git diff
```

Shows:

```text
Working Directory ↔ Staging Area
```

In other words: **unstaged changes**.

```bash
git diff --staged
```

or:

```bash
git diff --cached
```

Shows:

```text
Staging Area ↔ HEAD
```

In other words: what is currently staged compared with the last commit.

```bash
git diff HEAD
```

Shows:

```text
Working Directory ↔ HEAD
```

So it includes both staged and unstaged changes.

### Mental model

If:

```text
HEAD = A
Staging = A + B
Working = A + B + C
```

Then:

```bash
git diff
```

→ C

```bash
git diff --staged
```

→ B

```bash
git diff HEAD
```

→ B + C

---

# 13. Comparing Commits / Branches

```bash
git diff A B
```

Compare two commits.

```bash
git diff main feature
```

Compare two branches.

```bash
git diff A B -- file.txt
```

Compare a specific file.

`origin/main` means your local **remote-tracking reference** for the remote's `main` branch; it is not the remote repository itself.

---

# 14. Undoing Changes

### Unstage a change

```bash
git restore --staged file.txt
```

This:

- Removes the change from staging
- Keeps the working-directory change
- Keeps the file tracked

Older/common alternative:

```bash
git reset HEAD file.txt
```

### Discard an unstaged change

```bash
git restore file.txt
```

This restores the file to the staged/HEAD version depending on its state.

### Easy distinction

```text
Unstage = "Don't include this change in my next commit."

Untrack = "Git, stop tracking this file."
```

---

# 15. Removing / Moving Files

Delete a file and stage the deletion:

```bash
git rm file.txt
```

Stop tracking a file but keep it locally:

```bash
git rm --cached file.txt
```

Move/rename a file:

```bash
git mv old.txt new.txt
```

Shell deletion:

```bash
rm file.txt
```

Recursive forced directory deletion:

```bash
rm -rf folder
```

`rm -rf` is a shell command, not a Git command.

---

# 16. Git History

View history:

```bash
git log
```

Compact history:

```bash
git log --oneline
```

History for a file:

```bash
git log -- file.txt
```

Follow a file through renames:

```bash
git log --follow -- file.txt
```

Inspect a commit:

```bash
git show <commit-id>
```

Every commit has a unique identifier (SHA).

---

# 17. `.gitignore`

`.gitignore` contains patterns for files Git should ignore.

Common examples:

```gitignore
node_modules/
.env
*.log
dist/
```

Important:

`.gitignore` mainly affects files that aren't already tracked.

If a file is already tracked, adding it to `.gitignore` does not automatically stop tracking it.

Use:

```bash
git rm --cached file.txt
```

to stop tracking it while keeping it locally.

---

# 18. Branches

A branch is a separate line of development.

A useful technical mental model:

> A branch is a movable reference/pointer to a commit.

Example:

```text
A ── B        main
      \
       C ── D feature
```

The `feature` branch contains the history leading to B **plus** its own commits C and D.

Creating a branch does not copy the whole project.

---

# 19. Branch Commands

List local branches:

```bash
git branch
```

List local and remote-tracking branches:

```bash
git branch -a
```

Create a branch:

```bash
git branch feature
```

Create and switch:

```bash
git switch -c feature
```

Switch branches:

```bash
git switch feature
```

Older equivalent:

```bash
git checkout feature
```

Rename current branch:

```bash
git branch -m new-name
```

Rename another branch:

```bash
git branch -m old-name new-name
```

Delete a local branch:

```bash
git branch -d feature
```

---

# 20. Merging

The command:

```bash
git merge feature
```

means:

> Merge `feature` INTO the branch I'm currently on.

Therefore, to merge feature into main:

```bash
git switch main
git merge feature
```

### Fast-forward merge

If main hasn't advanced since feature was created:

```text
A ── B ── C
          ↑
       feature

main → B
```

Merging can simply move the main pointer forward:

```text
A ── B ── C
          ↑
     main + feature
```

No merge commit is necessary.

### Diverged branches

If both branches have new commits:

```text
A ── B ── C       main
      \
       D ── E     feature
```

Git may create a merge commit:

```text
A ── B ── C ── M
      \       /
       D ── E
```

---

# 21. Merge Conflicts

A conflict occurs when Git cannot automatically determine how to combine changes.

Typical workflow:

```bash
git merge feature
```

Resolve the conflicting files manually.

Then:

```bash
git add .
```

Then complete the merge:

```bash
git commit
```

To cancel an in-progress merge:

```bash
git merge --abort
```

---

# 22. Stashing

Stashing temporarily stores uncommitted work so you can have a clean working directory.

```bash
git stash
```

Include untracked files:

```bash
git stash -u
```

Create a named stash:

```bash
git stash push -m "unfinished booking feature"
```

List stashes:

```bash
git stash list
```

Show a stash summary:

```bash
git stash show stash@{0}
```

Show its actual diff:

```bash
git stash show -p stash@{0}
```

Apply a stash but keep it in the stash list:

```bash
git stash apply stash@{0}
```

Apply a stash and remove it from the stash list:

```bash
git stash pop stash@{0}
```

Delete a stash without applying it:

```bash
git stash drop stash@{0}
```

### Mental model

```text
stash = put unfinished work aside
list  = show saved stashes
apply = restore + keep
pop   = restore + remove
drop  = delete without restoring
```

Stash is **not the same as discarding changes**. The work is stored.

---

# 23. Tags

A tag is a fixed label/reference attached to a specific commit.

Tags are commonly used for releases:

```text
v1.0
v2.0
v3.0
```

Create a lightweight tag on the current commit:

```bash
git tag v1.0
```

Important:

> `git tag v1.0` tags the **current commit immediately**. It does not wait for a future commit.

Tag a specific commit:

```bash
git tag v1.0 <commit-id>
```

Create an annotated tag:

```bash
git tag -a v1.0 -m "Release version 1.0"
```

List tags:

```bash
git tag
```

or:

```bash
git tag --list
```

Inspect a tag:

```bash
git show v1.0
```

Compare tags:

```bash
git diff v1.0 v2.0
```

Delete local tag:

```bash
git tag -d v1.0
```

Push one tag:

```bash
git push origin v1.0
```

Push all tags:

```bash
git push origin --tags
```

Delete a remote tag:

```bash
git push origin --delete v1.0
```

Move a tag:

```bash
git tag -f v1.0 <commit-id>
```

---

# 24. Reset

`git reset` moves the current branch/HEAD to another commit.

Three important modes:

```text
--soft
--mixed
--hard
```

Suppose:

```text
A ── B ── C
          ↑
         HEAD
```

and we reset to B.

### Soft

```bash
git reset --soft B
```

Result:

```text
HEAD       → B
Staging    → C's state
Working    → C's state
```

**Soft = move HEAD only.**

The staged and working files remain as they were.

### Mixed

```bash
git reset --mixed B
```

or simply:

```bash
git reset B
```

because mixed is the default.

Result:

```text
HEAD       → B
Staging    → B
Working    → C's state
```

The files remain unchanged, but the staging area is reset to B.

Therefore, the changes introduced by C now appear as **unstaged working-directory changes**.

### Hard

```bash
git reset --hard B
```

Result:

```text
HEAD       → B
Staging    → B
Working    → B
```

Everything is made to match B.

Uncommitted changes can be discarded.

### Memorize this

| Reset     | HEAD | Staging | Working Directory |
| --------- | ---- | ------- | ----------------- |
| `--soft`  | B    | C       | C                 |
| `--mixed` | B    | B       | C                 |
| `--hard`  | B    | B       | B                 |

Don't think of reset as literally moving files between staging and working directory.

Think:

> **Soft = move HEAD**
>
> **Mixed = move HEAD + reset staging**
>
> **Hard = move HEAD + reset staging + reset files**

---

# 25. HEAD~1 vs HEAD@{1}

```bash
HEAD~1
```

means:

> One commit before the current HEAD in the commit history.

```bash
HEAD~2
```

means:

> Two commits before the current HEAD.

Example:

```bash
git reset HEAD~1
```

moves the current branch back one commit.

### Reflog notation

```bash
HEAD@{1}
```

means:

> The previous position of HEAD according to the reflog.

These are different concepts:

```text
HEAD~1   → previous commit in the commit graph

HEAD@{1} → previous HEAD position in the reflog
```

---

# 26. Reflog

```bash
git reflog
```

Shows movements of HEAD and other reference updates.

It can help recover from operations such as an accidental reset.

Example:

```bash
git reflog
```

Then you might find a previous HEAD position and recover it with something like:

```bash
git reset --hard HEAD@{1}
```

Be careful with destructive commands such as `reset --hard`.

---

# 27. Rebase

Rebase takes the commits unique to your current branch and **replays them on top of another branch/commit**.

Suppose:

```text
A ── B ── C        master
      \
       X ── Y      feature
```

Feature was based on B, but master continued to C.

While on feature:

```bash
git rebase master
```

Git essentially:

1. Takes feature's unique commits X and Y.
2. Moves feature to the latest master commit C.
3. Replays X and Y on top of C.

Result:

```text
A ── B ── C ── X' ── Y'
                    ↑
                 feature
```

The original X and Y are recreated as X' and Y'.

Therefore their commit IDs change.

### Important

Rebase changes the history of the rebased branch.

It does **not** change `master` in this example.

After rebasing:

```bash
git switch master
git merge feature
```

The merge can now often be a fast-forward:

```text
A ── B ── C ── X' ── Y'
                    ↑
               main + feature
```

### Merge vs Rebase

**Merge:**

- Preserves existing commit history
- Combines branch histories
- May create a merge commit

**Rebase:**

- Replays commits on top of another base
- Rewrites those commits
- Can produce a linear history

### Interview definition

> Rebase rewrites a branch's commits by replaying them on top of another branch/commit, usually to create a cleaner linear history.

---

# 28. Rebase Conflicts

Start:

```bash
git rebase master
```

If there is a conflict:

1. Resolve the conflicting files manually.
2. Stage the resolved files:

```bash
git add .
```

3. Continue:

```bash
git rebase --continue
```

If you want to cancel the rebase:

```bash
git rebase --abort
```

`--abort` returns the repository to the state it had before the rebase started.

---

# 29. Fetch vs Pull

### `git fetch`

```bash
git fetch
```

Downloads information about changes from the remote without integrating those changes into your current branch.

Mental model:

> **Fetch = "Tell me what changed remotely."**

Your local files/current branch are not automatically merged or rebased.

### `git pull`

```bash
git pull
```

Generally:

```text
git fetch
+
git merge
```

It downloads remote changes and integrates them into your current branch.

Mental model:

> **Pull = "Get the remote changes and integrate them."**

### `git pull --rebase`

```bash
git pull --rebase
```

Generally:

```text
git fetch
+
rebase your local commits on top of the updated remote branch
```

This can avoid creating unnecessary merge commits and maintain a more linear history.

---

# 30. Push

Send local commits to a remote repository:

```bash
git push
```

Typical first push when setting the upstream:

```bash
git push -u origin main
```

After the upstream is configured, usually:

```bash
git push
```

---

# 31. Pull Before Push

If the remote may have changed, you often synchronize first:

```bash
git pull
```

or, depending on the team's workflow:

```bash
git pull --rebase
```

Then:

```bash
git push
```

The exact workflow depends on the team's Git conventions.

---

# 32. Aliases

Git aliases are shortcuts.

Example:

```bash
git config --global alias.co checkout
```

Then:

```bash
git co
```

is an alias for:

```bash
git checkout
```

An alias doesn't create new Git functionality; it is simply a shortcut.

---

# 33. High-Priority Commands for a Junior Interview

Know these especially well:

```bash
git clone
git status
git add
git commit
git push
git pull
git fetch
git branch
git switch
git merge
git diff
git restore
git stash
git log
.gitignore
```

Know the concepts behind:

```text
Working Directory
Staging Area
Repository
HEAD
Branches
Remote vs local
Merge
Rebase
```

Good to understand but less likely to be central:

```bash
git reset
git reflog
git tag
git rm
git mv
git show
git log --follow
```

---

# 34. Core Mental Model

If you remember nothing else, remember:

```text
                 git add              git commit
Working Directory ───────→ Staging ───────────→ Repository
       ↑                       ↑                    ↑
       │                       │                    │
    git restore         restore --staged       git reset
```

And:

```text
branch = line of development / movable reference

merge = combine histories

rebase = replay your commits on a new base

stash = temporarily store unfinished work

tag = fixed label for a commit

reset = move HEAD and optionally reset staging/files

reflog = record of reference/HEAD movements

fetch = download remote information

pull = fetch + integrate

push = send local commits to remote
```

---

# 35. Interview-Level Summary

If asked **"What is Git?"**

> Git is a distributed version control system used to track changes, manage versions, and collaborate on software projects.

If asked **"What is staging?"**

> The staging area contains the changes selected for the next commit.

If asked **"What's the difference between Git and GitHub?"**

> Git is the version control system; GitHub is a platform for hosting and collaborating on Git repositories.

If asked **"What's the difference between merge and rebase?"**

> Merge combines existing branch histories and may create a merge commit. Rebase replays one branch's commits on top of another base, rewriting those commits and typically producing a linear history.

If asked **"What's the difference between fetch and pull?"**

> Fetch downloads information about remote changes without integrating them into the current branch. Pull fetches and then integrates the changes, normally through merge or, with `--rebase`, through rebase.

If asked **"What's the difference between soft, mixed, and hard reset?"**

> Soft moves HEAD only. Mixed moves HEAD and resets the staging area while keeping the working files. Hard moves HEAD, resets staging, and resets the working files to the target commit.

If asked **"What is stash?"**

> Stash temporarily stores uncommitted work so you can get a clean working directory and restore the work later.

If asked **"What is a branch?"**

> A branch is a separate line of development and can be thought of as a movable reference to a commit.

If asked **"What is a tag?"**

> A tag is a fixed label pointing to a specific commit, commonly used to identify releases.
