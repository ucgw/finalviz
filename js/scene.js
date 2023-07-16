function d3_svg_select_data_enter(xdata, ydata, rdata, width, height, shape) {
  var margin = { left: 100, bottom: 100, top: 100, right: 100, label: 50 };
  var mwidth = width - margin.left - margin.right;
  var mheight = height - margin.bottom - margin.top;

  let cxlower = Math.floor(Math.min(...xdata)) - 1;
  let cxupper = Math.ceil(Math.max(...xdata)) + 1;
  let yxlower = Math.floor(Math.min(...ydata)) - 1;
  let yxupper = Math.ceil(Math.max(...ydata)) + 1;
  let rlower = Math.floor(Math.min(...rdata)) - 1;
  let rupper = Math.ceil(Math.max(...rdata)) + 1;

  var svg = d3.select("svg")
              .attr("width", (width + margin.left + margin.right))
              .attr("height", (height + margin.bottom + margin.top));

  var xscale = d3.scaleLog()
                 .base(10)
                 .domain([cxlower, cxupper])
                 .range([0, mwidth]);

  var yscale = d3.scaleLinear()
                 .domain([yxupper, yxlower])
                 .range([mheight, 0]);

  var rscale = d3.scaleLog()
                 .base(10)
                 .domain([rlower, rupper])
                 .range([0, 18])

  var chart = svg.append("g")
              .attr("transform", "translate("+margin.left+","+margin.top+")")
              .selectAll(shape)
              .data(xdata)
              .enter();

  return { svg, xscale, yscale, rscale, margin, chart };
}

function d3_append_circles(chart, cx, xscale, cy, yscale, r, rscale) {
  chart.append("circle")
       .attr("cx", function(d,i) { return xscale(cx[i]); })
       .attr("cy", function(d,i) { return yscale(cy[i]); })
       .attr("r", function(d,i) { return rscale(r[i]); })
       //.on("mouseover", showTooltip)
       //.on("mouseout", removeTooltip);
}

function d3_append_axis_label(svg, axis, xdim, ydim, text) {
  if (axis === "x") {
    svg.append("text")
       .attr("class", "x label")
       .attr("text-anchor", "middle")
       .attr("x", xdim)
       .attr("y", ydim)
       .text(text);
  } else if (axis === "y") {
    svg.append("text")
       .attr("class", "y label")
       .attr("text-anchor", "middle")
       .attr("x", xdim)
       .attr("y", ydim)
       .text(text);
  }
}

function d3_append_axis(svg, atype, ascale, width, height, xt, tformat) {
  let axis = atype(ascale);

  axis.tickValues(xt);
  axis.tickFormat(d3.format(tformat));

  let axis_g = svg.append("g")
         .attr("transform", "translate("+width+","+height+")")
         .attr("fill", "none")
         .attr("font-size", "18")
         .attr("font-family", "sans-serif")
         .attr("text-anchor", "middle");

  axis_g.call(axis);
}
