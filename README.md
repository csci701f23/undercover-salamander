# Undercover Salamander
## United States Climate Trends Mapped Throughout Time

### Abstract
Visualizing how weather patterns have changed over time can be an essential tool for understanding climate change and encouraging modifications to daily life. Our project leverages  data from NOAA’s weather station database to analyze changes in minimum and maximum temperature, precipitation, and snowfall in the United States since 1940. Through visualizations, we illustrate the evolving weather patterns, highlighting the urgency of the impacts of climate change. For instance, comparing 1942 to 2020, Charleston, South Carolina experienced a notable increase in average daily rainfall from 27.245mm to 47.429mm. Similar trends can be seen in temperature and snowfall which reinforce our understanding of the correlation between weather and climate change. Our project aims to bridge the gap between data-driven insights and public awareness, fostering an environment where people are working together to address issues posed by climate change.


### How to Build, Run, and Deploy

**To compile and test:**

On install: npm install (to install dependencies)

To run on a local server: npm run dev

Go on localhost:3000 to see a running version of the server!

**To compile data:**

To process different station data, change the parameters on the last line in `data/NOAAToJSON.py`, where it calls "main(_)". The 4 parameters defined are:
* PRCP - rainfall
* SNOW - snowfall
* TMAX - maximum temperature
* TMIN - minimmum temperature

**To deploy:**

To compile the static pages to be deployed: npm run build

The website will be deployed to github pages on any PR to main - HOWEVER, in order to make sure the checks do not fail the job, the following steps must be followed BEFORE attempting to deploy (before you can create a pull request to main):
1. Go to Settings
2. Click on the Environments tab on the sidebar
3. Click on the "github-pages" environment
4. Change the setting for "Deployment branches and tags" to "Selected branches and tags"
5. For whichever branch you want to allow the site to deploy from, add the name of that branch as a rule


### Examples and How to Use

Our project is hosted on a website that is accessible on any device. Once users open up the website, they can navigate by scrolling down, or clicking on the different tabs at the top of the page labeled “Home”, “Visualizations”, “Why This Matters”, and  “About Us”. In the visualizations section, users can choose a weather element from the tabs above the map and view a simulation from 1940-2022. Controls at the bottom of the map allow the user to speed up, slow down, pause or jump to a specific year on the map using the scroll bar. A color key is provided for interpretation. Hovering over a county reveals details like the county name, state, and the weather element’s value for the selected year. As the user switches between elements the maps will change to show the data associated with the given section.

Below the visualization section, users can explore the importance of our project. Clicking on the links provides additional information on climate change and actionable steps.  


### Project workflows (defined in `.github/workflows`):

1. `checks.yml`: A workflow that runs anytime a PR is opened, or a new commit is pushed to a branch with an open PR. The repository is configured to require all status checks to pass before merging a PR.

2. `merge.yml`: A workflow that runs when a commit is pushed to the `main` branch, like when a Pull Request is merged. When this workflow succeeds, a message will be sent to your project channel in Slack.

3. `issue.yml`: A workflow that will notify your project channel in Slack that a new Issue was created.

4. `pages.yml`: A workflow that runs anytime a PR to main is opened, or a new commit is pushed to a branch with an open PR. This workflow deploys the website to Github Pages.


### License:
Full license under `LICENSE.txt`

Copyright (c) <2023>, <Jeff Blake, Lauren Clarke, Cece Zieglerr>

All rights reserved.
