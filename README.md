# My Bookmarks Manager

Open-source, local-first bookmark manager for Chrome. Save private pages, tab sessions, local captures, and reminders without overriding Chrome's default New Tab page.

This repository contains the standalone Chrome extension. The website and optional New Tab companion are maintained separately.

Project page: https://urls.ai/bookmark-manager

## What ships today

- Large popup UI for bookmarks, sessions, private pages, reminders, local captures, and settings
- Side panel UI using the same library model
- Chrome bookmark import from the live browser tree
- Private pages saved only inside the extension, outside Chrome bookmarks
- Import / export JSON for local backup and manual migration
- Current window session capture and reopen
- Reminder tab with local due times for tasks, purchases, and deadlines
- Sorting, duplicate hiding, and local pinning

## Local-first behavior

- Chrome bookmarks stay the original source for imported bookmarks
- Private pages, reminders, sessions, and local settings live in extension storage
- No account is required
- No server sync is required
- This main extension does not override Chrome's default New Tab page

## Load locally

1. Open `chrome://extensions`
2. Turn on `Developer mode`
3. Click `Load unpacked`
4. Select this repository folder

## Permissions

- `bookmarks`: read the Chrome bookmarks tree
- `tabs`: capture windows, sessions, and current tab context
- `storage`: keep local settings, reminders, sessions, private pages, and local captures
- `alarms`: trigger reminders at the scheduled time
- `contextMenus`: optional right-click entry for Save Private Page
- `downloads`: export JSON backups
- `favicon`: request site icons where Chrome provides them
- No `scripting` permission

## Optional companion

If you want a custom New Tab page, install the separate `urls.ai New Tab Companion` extension when it is available. Keeping it separate means this bookmark manager does not change Chrome's default New Tab page.

## Roadmap

- Optional richer YouTube title enrichment for local captures
- Optional companion install flow from the main extension
- Optional AI-ready JSON view imports without changing the original local source

## Data format

- Export format is JSON
- Current export filename: `urlsai-bookmarks-tab.json`
- Current schema stays compatible with the existing website import flow

## Open source packaging

- `LICENSE`: MIT
- `CHANGELOG.md`: manual release notes
- `screenshots/`: store GitHub or Chrome Web Store screenshots here
