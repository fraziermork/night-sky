const d3              = require('d3');
const topojson        = require('topojson');
// const coords          = require('./lib/coords.js');
// const starAppearance  = require('./lib/star-appearance.js');

const plotWidth       = 960;
const plotHeight      = 500; 

const sky = d3
  .select('main')
  .append('svg')
  .attr('width', plotWidth)
  .attr('height', plotHeight);
  
const background  = sky.append('rect')
                      .attr('height', plotHeight)
                      .attr('width', plotWidth)
                      .attr('class', 'background');

const projection  = d3.geo.stereographic()
                      .scale(300)
                      .translate([plotWidth / 2, plotHeight / 2])
                      .clipAngle(125)
                      .precision(.1);

const path = d3.geo.path().projection(projection);

const Alt = d3.scale
              .linear()
              .domain([0, plotHeight])
              .range([-90, 90]);
const Azi = d3.scale
              .linear()
              .domain([0, plotWidth])
              .range([-180, 180]);

sky.on('mousemove', function() {
  let coords = d3.mouse(this);
  projection.rotate([Azi(coords[0]), Alt(coords[1])]);
  sky.selectAll('path').attr('d', path);
});

d3.json('data/countries.geo.json', (err, world) => {
  if (err) {
    return console.error('ERROR LOADING WORLD JSON: ', err);
  }
  console.log(world);
  
  
  sky.selectAll('.subunit')
    .data(world.features)
    .enter()
    .append('path')
    .attr('class', (d) => {
      return `subunit ${d.id}`;
    })
    .attr('d', path);
  
  
});
