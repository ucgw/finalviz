async function read_chart_data() {
  return await d3.csv("https://ucgw.github.io/data/mag6plus_charts.csv");
}

async function read_record_data() {
  return await d3.csv("https://ucgw.github.io/data/mag6plus_records.csv");
}

// a quick debug function for the csv data
// read in
function log_promise_data(promise_data) {
  promise_data
    .then(function(data) { console.log(data); });
}

function d3_svg_select_data_enter(data, width, height, tx, ty, shape) {
  var svg = d3.select("svg")
              .attr("width", width)
              .attr("height", height);

  return svg.append("g")
            .attr("transform", "translate("+tx+","+ty+")")
            .selectAll(shape)
            .data(data)
            .enter();
}

function d3_append_circles(chart, cx, cxdom, cxrange, cy, cydom,cyrange, r, rrange) {
  let cxln = d3.scaleLog()
               .base(10)
               .domain(cxdom)
               .range(cxrange);
  let cyln = d3.scaleLinear()
               .domain(cydom)
               .range(cyrange);
  let rln = d3.scaleLinear()
              .domain(r)
              .range(rrange);

  chart.append("circle")
       .attr("cx", function(d,i) { return cxln(cx[i]); })
       .attr("cy", function(d,i) { return cy[i]; })
       .attr("r", function(d,i) { return r[i]; })
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

function scatterplot_nstrms_calc(x, y, scale) {
  return sum_dp_square_calc(x, y, scale);
}

function make_scatterplot(promise_data, yaxfield, cxfield, cyfield, xform_xrange, xform_yrange, canvas_width, canvas_height, downsize, logscale, yaxmultiplier, errmultiplier) {
  promise_data
    .then(
      function(data) {
        const cx = data.map(a => Number(a[cxfield]));
        const cy = data.map(a => Number(a[cyfield]));
        const yax = data.map(a => Number(a[yaxfield]) * parseFloat(yaxmultiplier));

        console.log(cx);
        console.log(cy);
        console.log(yax);

        let cxlower = Math.floor(Math.min(...cx)) - 1;
        let cxupper = Math.ceil(Math.max(...cx)) + 1;
        let yaxlower = Math.floor(Math.min(...cy)) - 1;
        let yaxupper = Math.floor(Math.max(...cy)) + 1;

        //var raderr_sized = scatterplot_deptherror_calc(cx, cy, errmultiplier);
        //var raderr_sized = scatterplot_magerror_calc(cx, cy, errmultiplier);
        var raderr_sized = scatterplot_nstrms_calc(cx, cy, errmultiplier);

        let scatter = d3_svg_select_data_enter(cx, canvas_width, canvas_height, xform_xrange, xform_yrange, "circle");

        d3_append_circles(scatter, cx, [cxlower, cxupper], [0, canvas_height], yax, [yaxupper, yaxlower],[0, canvas_height], raderr_sized, [0, canvas_height]);
    });
}
