---
name: Project Rules
description: Critical rules for maintaining the project configuration and deployment.
---

# Project Critical Rules

## Database Credentials - DO NOT TOUCH

> [!WARNING]
> **NEVER** modify `api/config.php` or `api/db_env.php` to change database credentials manually.

### The Problem
Manually changing credentials in tracked files breaks the deployment for either the **Local** environment or the **Production** environment.

### The Correct Way
The system is designed to handle environments automatically:

1.  **Production (cPanel)**: Uses `api/db_env.php`. This file is **committed** to Git and contains the live server credentials. **DO NOT CHANGE THIS** unless the production password actually changes.

2.  **Local (Your Computer)**: Uses `api/db_credentials.php`.
    *   This file is **IGNORED** by Git.
    *   It lives only on your computer.
    *   If you have connection errors locally, edit **THIS FILE ONLY**.

### How to Fix connection errors?
*   **Locally**: Edit `api/db_credentials.php`.
*   **Production**: If the site is down, double-check `api/db_env.php` matches the cPanel MySQL user details, but do not replace it with `root`/`localhost` credentials.

## Deployment Workflow
Always follow this strict process:
1.  Make changes locally.
2.  `npm run build`
3.  `git add .`
4.  `git commit -m "message"`
5.  `git push`
6.  **On cPanel**: Go to Git Version Control -> Update from Remote -> Deploy HEAD Commit.
