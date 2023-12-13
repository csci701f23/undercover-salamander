# Undercover Salamander
## Middlebury College, CSCI 701 (Senior Seminar, Fall 2023)

**Project workflows (defined in `.github/workflows`):**

1. `checks.yml`: A workflow that runs anytime a PR is opened, or a new commit is pushed to a branch with an open PR. The repository is configured to require all status checks to pass before merging a PR.

2. `merge.yml`: A workflow that runs when a commit is pushed to the `main` branch, like when a Pull Request is merged. When this workflow succeeds, a message will be sent to your project channel in Slack.

3. `issue.yml`: A workflow that will notify your project channel in Slack that a new Issue was created.

4. `pages.yml`: A workflow that runs anytime a PR to main is opened, or a new commit is pushed to a branch with an open PR. This workflow deploys the website to Github Pages.

**To compile and test:**
On install: npm install (to install dependencies)
To run on a local server: npm run dev
Go on localhost:3000 to see a running version of the server!

**To compile data:**
To process different station data, change the parameters on the last line in `data/NOAAToJSON.py`, where it calls "processAllStations(_)". The 4 parameters defined are:
* PRCP - rainfall
* SNOW - snowfall
* TMAX - maximum temperature
* TMIN - minimmum temperature

**To deploy:**
To compile the static pages to be deployed: npm run build
The website will be deployed to github pages on any PR to main - HOWEVER, in order to make sure the checks do not fail the job, the following steps must be followed BEFORE attempting to deploy:
1. Go to Settings
2. Click on the Environments tab on the sidebar
3. Click on the "github-pages" environment
4. Change the setting for "Deployment branches and tags" to "Selected branches and tags"
5. For whichever branch you want to allow the site to deploy from, add the name of that branch as a rule