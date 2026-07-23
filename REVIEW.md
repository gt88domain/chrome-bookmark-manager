# Review Notes

No account is required.

## Main reviewer flow

1. Load this repository as an unpacked extension
2. Click the toolbar icon to open the popup
3. Confirm Chrome bookmarks render in the `Bookmarks` tab
4. Click `Save Window` to save the current window as a session
5. Open `Sessions` and confirm the saved session appears
6. Open `Settings` and optionally enable `Save Private Page in right-click menu`
7. Right-click any page and use `Save Private Page`, then confirm the saved link appears in the `Private` tab after `Enable privacy mode` is on

## Optional reviewer checks

- Keyboard shortcuts can be reviewed in `chrome://extensions/shortcuts`
- Import/export uses local JSON only
- No sign-in or remote sync is required
- Chrome bookmarks remain the original source; private pages stay in extension storage unless exported
- Reminders are stored locally and reviewed in the extension

## Permissions summary

- `bookmarks`: read the existing Chrome bookmark tree
- `tabs`: save sessions and read current tab context
- `storage`: store local settings, reminders, sessions, private pages, and local captures
- `alarms`: trigger reminders at the scheduled time
- `contextMenus`: optional private-page and local-capture actions; private-page saving is off by default and local capture actions are on by default
- `downloads`: export JSON backups
- `favicon`: ask Chrome for site icons when available
- no `scripting`
