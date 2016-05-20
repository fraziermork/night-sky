# night-sky
This is a planetarium built with d3.js to show the positions of stars in the night sky. I built this project as an exercise to learn d3. 

MVP Goals:
* Build a simple planetarium that shows the locations of stars
* Allow users to look around the night sky at their location with their mouse

Stretch Goals:
* Draw the horizon on the view
* Have looking straight up be the zenith, not the north star
* Allow users to zoom in and out and change brightness scaling accordingly
* Include ways to see constellations
* Allow users to see more info when they click on a star
* Allow users to scan through the sky over time
* Show the location of the sun, moon, ISS, planets, asteroids, NEOs, etc. 
* Allow users to see real images of that region -- need an API for this
* Allow users to see which country the star is over

## Initial research:

I am modeling the data using a [stereographic projection](https://en.wikipedia.org/wiki/Stereographic_projection) using [d3.](http://bl.ocks.org/mbostock/3763057) 


[I am using data found at the HYG database](https://github.com/fraziermork/HYG-Database)

[This](http://www.convertalot.com/celestial_horizon_co-ordinates_calculator.html) and [this](http://www.geoastro.de/elevaz/basics/index.htm) and [this](http://www.stargazing.net/kepler/altaz.html) explain how to convert from latitude and longitude and RA/Dec to azimuth and altitude, the coordinates used for an earth-based observer.

[There is a live version of approximately what I am trying to build here](http://www.worldwidetelescope.org/)

## Project architecture:

Will need functions to:

* convert from Right Ascension and Declination at jan 2000 to Altitude and Azimuth
* determine the Right Ascension and Declination bounds of their view based on LatLng and current time.
* convert from visual mag brightness/size
* convert color index to a surface temperature to a base hex color to display, before brightness adjustments

Will need axes for:
* The user's altitude and azimuth (for click events)
* The celestial declination and RA (for the )

## Documentation:
