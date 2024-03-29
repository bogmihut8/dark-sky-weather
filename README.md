# dark-sky-weather

### Description
> Application that allows the user to view the observed (in the past 30 days) or forecasted (in the future) daily weather conditions for a given location using the Dark Sky API.

### Flow
* When you first access it, the weather from your location and the current date will be displayed. 
* Selecting only a new location will display for the inital time and modifying just the date will display for the previous location.
* Having the location input empty will select your current location as default and having the date empty will use the current date

### How to run:
```
> git clone **project-git**
> cd **project-name**
> npm install
> cd frontend
> npm install
> cd ../
> npm run launch
```
- if you get the "Invalid Host Header" it is becuase of the proxy used for the backend and you need to run it like:
```
> DANGEROUSLY_DISABLE_HOST_CHECK=true npm run launch
```

### The technologies used were:
- HTML (JSX)
- CSS (SASS)
- JavaScript (ReactJS)
- state management (Redux)
- side effects middleware (Thunk)
- server-side api wrapper (NodeJS)

