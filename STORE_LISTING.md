# Chrome Web Store Listing

Prepared for `My Bookmarks Manager - Open Source by Urls.ai`.

## Listing copy

### Name

`My Bookmarks Manager - Open Source by Urls.ai`

### Short description

`Open-source, local-first private bookmark manager for Chrome with private pages, tab sessions, and local captures.`

### Longer description

My Bookmarks Manager is an open-source, offline bookmark manager for Chrome. It keeps your existing Chrome bookmarks usable while giving you a compact local workspace for private pages, saved tab sessions, local captures, domain views, and reminders. No account or cloud sync is required.

Install it if you want to organize a large bookmark library without replacing Chrome's native bookmark tree, save a full window before closing it, or keep sensitive links separate from ordinary bookmarks. Your extension data stays on your device unless you explicitly export it.

Features:
- Browse bookmarks and sort Chrome bookmarks alphabetically, by date, or by recent use.
- Use bookmark sort and backup tools without changing the original Chrome bookmark tree.
- Group links by domain and keep local pins for quick access.
- Save sensitive links separately with Save Private Page.
- Save a full window and reopen its tabs later as a session.
- Right-click to save text, links, YouTube links, and image URLs locally.
- Create local reminders for auctions, purchases, deadlines, and follow-ups.

How to use:
1. Click the extension icon to open My Bookmarks Manager. It reads your existing Chrome bookmarks locally, so you can keep using Chrome's normal bookmark button as usual.
2. Use Save Window for the current tabs, Save Private Page for a sensitive link, or the right-click menu for a local capture.
3. Open Reminders to set a due time, then return to the popup to review or manage it.

The extension works offline after installation. Export JSON when you want a local backup or a Chrome bookmarks transfer to another compatible tool.

## Privacy / disclosure position

Suggested user-facing summary:

`No account, no remote sync, and no server-side bookmark storage. Chrome bookmarks are read locally. Private pages, reminders, sessions, local captures, and settings are stored in Chrome extension storage unless you export JSON yourself.`

If the dashboard asks whether data is sold or transferred:

- Sold: `No`
- Used for creditworthiness or lending: `No`
- Remote server processing by default: `No`

## Permission justifications

- `bookmarks`
  Read the user's existing Chrome bookmark tree so the popup can display and organize bookmarks.

- `tabs`
  Read current tab context for `Save Private Page` and capture the current window as a tab session.

- `storage`
  Store local settings, private pages, reminders, sessions, local captures, pin state, and view preferences inside Chrome.

- `alarms`
  Trigger reminders at the scheduled time without any server.

- `contextMenus`
  Optional right-click entry for `Save Private Page`.

- `downloads`
  Export JSON backups to a local file selected by the user.

- `favicon`
  Ask Chrome for site icons when available so bookmark rows are easier to scan.

No `scripting` permission. Reminders are shown in the extension UI only.

## Asset checklist

Based on current Chrome Web Store docs:

- Store icon: `128x128`
- Screenshots: at least `1`, up to `5`, each `1280x800`
- Small promo tile: `440x280` required
- Marquee promo tile: `1400x560` optional

Prepared files in the source repository:

Store artwork is submitted separately from the source repository so the install package stays small.

Notes from official docs:

- Promo images are not locale-specific.
- Small promo tile should stay readable when shrunk.
- Avoid clutter and excessive text.
- Keep branding consistent across icon, screenshots, and promo tiles.

## Asset direction for this extension

- Brand name: `My Bookmarks Manager`
- Icon system: green rounded square + striped `U`
- Screenshot focus:
  - Bookmarks view
  - Domain view
  - Private Pages
  - Sessions
  - Settings with `Card density`

- Core feature bullets for store art / screenshots:
  - `Private Pages`
  - `Tab Sessions`
  - `Domain Grouping`
  - `Social Accounts`
  - `Local-first`

## Reviewer notes

See [REVIEW.md](/Users/linyan/dev/url/.codex-main-merge/extensions/chrome-bookmark-manager/REVIEW.md).

## Submission checklist

- Zip the files in the repository root, excluding documentation and artwork
- Upload to Chrome Developer Dashboard
- Fill store name, short description, long description
- Upload `128x128` store icon
- Upload at least one `1280x800` screenshot
- Upload `440x280` small promo tile
- Upload `1400x560` marquee tile if used
- Add privacy policy URL if the dashboard requires it for the selected disclosures
- Re-check permission justifications and privacy disclosures before submit

## Sources

- Chrome Web Store listing guidance:
  https://developer.chrome.com/docs/webstore/best-listing
- Image requirements:
  https://developer.chrome.com/docs/webstore/images
- Dashboard listing fields:
  https://developer.chrome.com/docs/webstore/cws-dashboard-listing
- Publish flow:
  https://developer.chrome.com/docs/webstore/publish
