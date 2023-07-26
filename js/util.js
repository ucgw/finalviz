async function read_chart_data() {
  return await d3.csv("https://ucgw.github.io/data/mag6plus_charts.csv");
}

async function read_record_data() {
  return await d3.csv("https://ucgw.github.io/data/mag6plus_records.csv");
}

function percentage_diff_calc(x, y, scale) {
  let x_sized = [];
  let multiplier = 1.0;

  if (scale) {
    multiplier = parseFloat(scale);
  }

  for (var i=0; i < x.length; i++) {
    let cxnew = y[i] / x[i] * 100 * multiplier;
    x_sized.push(cxnew.toFixed(2));
  }

  console.log(x_sized);

  return x_sized;
}

function sum_dp_square_calc(x, y, scale) {
  /*
   * idea here is that rms is calculated using:
   *
   * rms = SQRT(1/n * SUM(xi^2))
   *
   * from this, we can get notions of scale of data
   * points by squaring rms and multiplying by the number
   * of data points in the set.
   *
   * i.e.
   *
   * n * rms^2 = SUM(xi^2)
   *
   * input param x == n
   * input param y == rms
   */

  let x_sized = [];
  let multiplier = 1.0;

  if (scale) {
    multiplier = parseFloat(scale);
  }

  for (var i=0; i < x.length; i++) {
    let cxnew = (x[i] * (y[i]**2) * multiplier);
    x_sized.push(cxnew.toFixed(2));
  }

  console.log(x_sized);

  return x_sized;
}

function scatterplot_deptherror_calc(x, y, scale) {
  return percentage_diff_calc(x, y, scale);
}

function scatterplot_magerror_calc(x, y, scale) {
  return percentage_diff_calc(x, y, scale);
}

function scatterplot_horizontalerror_calc(x, y, scale) {
  return scatterplot_deptherror_calc(x, y, scale);
}

function scatterplot_nstrms_calc(x, y, scale) {
  return sum_dp_square_calc(x, y, scale);
}

function axis_ticks_num_calc(xd, numticks) {
  let unique = xd.filter((x, i) => {
                 return xd.indexOf(x) === i;
               });
  let tickfreq = Math.ceil(unique.length / Number(numticks));

  let ticks = unique.sort().filter((x, i) => {
           return i % tickfreq === 0;
         });

  console.log(ticks);
  return ticks;
}

function axis_ticks_gap_calc(xd, tickgap) {
  let xd_min = Math.min(...xd); 
  let xd_max = Math.max(...xd);

  let tickgap_multiplier = 0;
  let tick_lower = xd_min - tickgap;
  let tick_upper = xd_max % tickgap;

  while (tick_lower > tickgap) {
    tick_lower = tick_lower - tickgap;
    tickgap_multiplier++;
  }
  xd_min = tickgap * tickgap_multiplier;

  while (tick_upper != 0) {
    xd_max = xd_max + 1;
    tick_upper = xd_max % tickgap;
  }

  console.log("min x-axis: "+xd_min);
  console.log("max x-axis: "+xd_max);

  ticks = [];

  for (; xd_min < xd_max; xd_min += tickgap) {
    ticks.push(xd_min);
  }

  return ticks;
}

function d3_svg_clear_create(svgid) {
  d3.select("svg#"+svgid).remove();
  d3.select("body").insert("svg")
                   .attr("id", svgid)
                   .attr("transform", "translate(-5,-165)")
}

function d3_svg_get_cx_cy_yax(data, cxfield, cyfield, yaxfield, yaxmultiplier) {
  var cx = data.map(a => Number(a[cxfield]));
  var cy = data.map(a => Number(a[cyfield]));
  var yax = data.map(a => Number(a[yaxfield]) * parseFloat(yaxmultiplier));

  return { cx, cy, yax };
}


function d3_svg_magError_setup(svgid, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {

  d3_svg_clear_create(svgid);
  datamaps = d3_svg_get_cx_cy_yax(data, cxfield, cyfield, yaxfield, yaxmultiplier);

  var cx = datamaps.cx;
  var cy = datamaps.cy;
  var yax = datamaps.yax;
  var raderr_sized = scatterplot_magerror_calc(cx, cy, errmultiplier);

  var scatter = d3_svg_select_data_enter(svgid, cx, yax, raderr_sized, canvas_width, canvas_height, "circle");
  var xa_ticks = axis_ticks_num_calc(cx, xa_numticks);
  var ya_ticks = axis_ticks_gap_calc(yax, xa_tickgap);

  d3_append_axis(scatter.svg, d3.axisBottom, scatter.xscale, scatter.margin.left, (canvas_height - scatter.margin.bottom), xa_ticks, '~s');

  d3_append_axis_label(scatter.svg, 'x', canvas_width/2, (canvas_height - scatter.margin.bottom + scatter.margin.label), 'Earthquake Magnitude');

  d3_append_axis(scatter.svg, d3.axisLeft, scatter.yscale, scatter.margin.left, scatter.margin.top, ya_ticks, '~s');

  d3_append_axis_label(scatter.svg, 'y', -(scatter.margin.top + (canvas_height/3)), (scatter.margin.left - scatter.margin.label-10),'Magnitude NST (# Stations Measuring Magnitude)');

  return { scatter, raderr_sized, cx, yax };
}

function d3_svg_depthError_setup(svgid, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {

  d3_svg_clear_create(svgid);
  datamaps = d3_svg_get_cx_cy_yax(data, cxfield, cyfield, yaxfield, yaxmultiplier);

  var cx = datamaps.cx;
  var cy = datamaps.cy;
  var yax = datamaps.yax;
  var raderr_sized = scatterplot_deptherror_calc(cx, cy, errmultiplier);

  var scatter = d3_svg_select_data_enter(svgid, cx, yax, raderr_sized, canvas_width, canvas_height, "circle");
  var xa_ticks = axis_ticks_gap_calc(cx, xa_numticks);
  var ya_ticks = axis_ticks_gap_calc(yax, xa_tickgap)

  d3_append_axis(scatter.svg, d3.axisBottom, scatter.xscale, scatter.margin.left, (canvas_height - scatter.margin.bottom), xa_ticks, '~s');

  d3_append_axis_label(scatter.svg, 'x', canvas_width/2, (canvas_height - scatter.margin.bottom + scatter.margin.label), 'Earthquake Depth  (in km <100km)');

  d3_append_axis(scatter.svg, d3.axisLeft, scatter.yscale, scatter.margin.left, scatter.margin.top, ya_ticks, '~s');

  d3_append_axis_label(scatter.svg, 'y', -(scatter.margin.top + (canvas_height/3)), (scatter.margin.left - scatter.margin.label-10),'NST (# Stations Measuring Location)');

  return { scatter, raderr_sized, cx, yax };
}

function openNav() {
  document.getElementById("sidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
