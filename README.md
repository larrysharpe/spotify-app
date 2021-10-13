# Spotify Challege App
### How to run
1. Install Docker
2. Clone this Repo
3. `cd postgres && docker-compose up`
4. `cd ../api && node server`
5. `cd ../frontend && yarn start`

### Frontend Explanation
<p>There are 3 search boxes</p>
<p>The first one searches Spotify's tracks by title to be added to the local DB</p>
<p>The next 2 search the local DB by ISRC or Artist</p>

### Demo
![](finaldemovideo.webm.mov)