const d3              = require('d3');
const topojson        = require('topojson');
// const coords          = require('./lib/coords.js');
// const starAppearance  = require('./lib/star-appearance.js');

const plotWidth       = 960;
const plotHeight      = 500; 
const sky             = d3.select('main')
                        .append('svg')
                        .attr('width', plotWidth)
                        .attr('height', plotHeight);
  
const projection      = d3.geo.gnomonic()
                        .scale(300)
                        .translate([plotWidth / 2, plotHeight / 2])
                        .clipAngle(90)
                        .precision(.1);

const path            = d3.geo.path()
                          .projection(projection)
                          .pointRadius(1);

const stars           = sky.append('g')
                        .attr('d', path);

const background      = sky.append('rect')
                        .attr('height', plotHeight)
                        .attr('width', plotWidth)
                        .attr('class', 'background');


////////////////////////////////////////////////
// SCALES
////////////////////////////////////////////////
const Alt = d3.scale
              .linear()
              .domain([0, plotHeight])
              .range([-90, 90]);
const Azi = d3.scale
              .linear()
              .domain([0, plotWidth])
              .range([-180, 180]);


sky.on('mousemove', function() {
  let mouseCoords = d3.mouse(this);
  projection.rotate([Azi(mouseCoords[0]), Alt(mouseCoords[1])]);
  sky.selectAll('path').attr('d', path);
  // sky.selectAll('.star').attr('transform', function(d) {
  //   let starCoords = [d.ra, d.dec];
  //   return `translate(${projection(starCoords)})`;
  // });
});
////////////////////////////////////////////////
// GRAB MAP DATA
////////////////////////////////////////////////
d3.json('data/countries.geo.json', (err, world) => {
  if (err) {
    return console.error('ERROR LOADING WORLD JSON: ', err);
  }
  // console.log(world);
  sky.selectAll('.subunit')
    .data(world.features)
    .enter()
    .append('path')
    .attr('class', (d) => {
      return `subunit ${d.id}`;
    })
    .attr('d', path);
});

d3.csv('data/hygdata_v3.csv')
.row((d) => {
  let mag = +d.mag;
  if (mag > 7 || d.proper === 'Sol') {
    // console.log(`removed ${mag}`);
    return null;
  } else {
    // console.log(`let through ${mag}`);
    let long  = (+d.ra * 15) - 180;
    let lat   = +d.dec;
    let row = {
      geometry: {
        coordinates: [long, lat], 
        type: 'Point'
      },
      properties: {
        mag,
        id:     d.id,
        proper: d.proper ? d.proper : null,
        ra:     +d.ra,
        dec:    +d.dec
      },
      type: 'Feature'
    };
    return row;
  }
})
.get((err, rows) => {
  if (err) {
    return console.error('ERROR LOADING STARS: ', err);
  }
  console.log(rows);
  // Converting to geojson 
  let visibleStars = rows.filter((row) => {
    return row !== null;
  });
  let starData = {
    type: 'FeatureCollection'
  };
  starData.features = visibleStars;
  
  ////////////////////////////////////////////////
  // GRAB STAR DATA
  ////////////////////////////////////////////////
  sky.selectAll('.star')
    .data(starData.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('class', 'star');
  
  // .attr('transform', (d) => {
  //   // let coords = [d.dec, d.ra];
  //   let coords = [d.dec, d.ra];
  //   // return `translate(${d.dec}, ${d.ra})`
  //   return `translate(${projection(coords)})`;
  // })
  // .attr('cx', (d) => {
  //   return d.dec;
  // })
  // .attr('cy', (d) => {
  //   return d.ra;
  // })
  // .attr('r', (d) => {
  //   return 1;
  // });
  
  
  
  
});
