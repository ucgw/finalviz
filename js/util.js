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

function axis_mag_ticks_calc(xd, numticks) {
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

function axis_depth_ticks_calc(xd, tickgap) {
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
