const d3              = require('d3');
// const coords          = require('./lib/coords.js');
// const starAppearance  = require('./lib/star-appearance.js');

const plotWidth       = 960;
const plotHeight      = 1160; 

const sky = d3
  .select('main')
  .append('svg')
  .attr('width', plotWidth)
  .attr('height', plotHeight);

// const projection = d3.geo
//   .stereographic()
//   .clipAngle(125)
//   .scale(300)
//   .translate([plotWidth /2 , plotHeight / 2])
//   .precision(.1);
// 
// const path = d3.geo.path().projection(projection);  

// let AziScale = d3.scale.linear().domain([0, plotWidth]).range([-180, 180]);
// let AltScale = d3.scale.linear().domain([0, plotHeight]).range([-90, 90]);

// function initialize() {
//   loadData()
//     .then((data) => {
//       buildGraph(data);
//     })
//     .catch(() => {
//       console.log('oops');
//     });
// }
//   
// function loadData() {
//   return new Promise((resolve, reject) => {
//     d3.csv('./data/devData.csv', 
//       (row) => {
//         if (row.mag < 7) {
//           let returnObj = {
//             id:     row.id,
//             proper: row.proper ? row.proper : null,
//             ra:     +row.ra,
//             dec:    +row.dec,
//             mag:    +row.mag
//           };
//           console.log(returnObj);
//           return returnObj;
//         } else {
//           return null;
//         }
//       }, 
//       (rows) => {
//         if (rows) {
//           hygData = rows;
//           resolve(rows);
//         } else {
//           console.error('ERROR LOADING DATA.');
//           reject();
//         }
//       });
//   });
// }
// 
// function buildGraph(hygData) {
//   
//   
//   nightSky.selectAll('.star')
//     .data(hygData)
//     .enter()
//     .append('circle', '.star')
//     .attr('cx', (d) => {
//       return projection([d.ra, d.dec])[0];
//     })
//     .attr('cy', (d) => {
//       return projection([d.ra, d.dec])[1];
//     })
//     .attr('r', (d) => {
//       return 1;
//     });
//     
// }

  
initialize();
