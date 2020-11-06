This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform).

# Welcome to the Readme for Group 5 in IN5320

This app functionality lets the user display groups in views:

- Index cases
- Contact cases
- Both cases together
- Completed Contacts cases
- Completed Index cases

In addition the user can choose a date or a range of dates to filter the view.
If todays date is included in the range, all cases in that range + cases with a status of overdue will be shown.
If todays date is not included, only the cases with duedate in the range will be shown. This allows the user to plan ahead.

The user can directly go from all cases to the trackerCapture app

All index cases has a button which open opp a modal with all contact cases for that specific index case, for easy work flow.

The application is made responsive to fit everything from a large screens down to tablets and smaller screens.

## Members of this group

- carlmagl
- filipcl
- jacobko
- sigvartbj

## Available Scripts

In the project directory, you can run:

### `yarn start`

Before running yarn start, remember to run "npm install".
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
