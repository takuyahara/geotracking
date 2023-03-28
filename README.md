<h1 align="center">GeoTracker</h1>

<p align="center">
    <strong>Receives geographic event and adds to Google Calendar.</strong>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/version-1-brightgreen" alt="version" />
    <img src="https://img.shields.io/badge/platform-google--apps--script-blue" alt="platform" />
</p>

### Create Google Sheets and project

Follow the instruction to initialize project.

1. Run the following command and when asked log in to your Google account and open project.

```bash
/workspaces/geotracking/src/reset $ make init
```

2. You are looking at project page and `reset.gs` is shown. Run `resetSheet()` and see container to verify that the sheet is ready.

3. Run the following command. Reload project page and be sure that codes have entiry replaced and deployment version 1 is deployed.

```bash
/workspaces/geotracking/src/geotracking $ make init
```

### Snippet for future use

```bash
$ echo "Get next deploy version"
$ echo $(($(clasp deployments | awk '{ print $3 }' | grep ^@[1-9][0-9]*$ | sed -e 's/^@//' | sort -nr | head -n 1) + 1))
```
