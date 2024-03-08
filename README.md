# Randomized Daily Linguistic Exercise

This is a random daily word guessing game which is better than similar games because you start with a random guess, thus reducing the incentive to always start each game the same way.


[**Try out the demo!**](https://storyyeller.github.io/randle)

## Build and run

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd randle
$> npm install
$> npm run start
```

### To build/run docker container:

```bash
$> docker build -t game .
$> docker run -d -p 3000:3000 game
```

Open [http://localhost:3000](http://localhost:3000) in browser.
