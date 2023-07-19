function make_scatterplot(promise_data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
  promise_data
    .then(
      function(data) {
        const cx = data.map(a => Number(a[cxfield]));
        const cy = data.map(a => Number(a[cyfield]));
        const yax = data.map(a => Number(a[yaxfield]) * parseFloat(yaxmultiplier));

        console.log(cx);
        console.log(cy);
        console.log(yax);

        var raderr_sized = [];
        var scatter = {};

        switch (cyfield) {
          case "magError":
            raderr_sized = scatterplot_magerror_calc(cx, cy, errmultiplier);
            scatter = d3_svg_select_data_enter(cx, yax, raderr_sized, canvas_width, canvas_height, "circle");
            xa_ticks = axis_ticks_num_calc(cx, xa_numticks);
            ya_ticks = axis_ticks_gap_calc(yax, xa_tickgap);

            d3_append_axis(scatter.svg, d3.axisBottom, scatter.xscale, scatter.margin.left, (canvas_height - scatter.margin.bottom), xa_ticks, '~s');

            d3_append_axis_label(scatter.svg, 'x', canvas_width/2, (canvas_height - scatter.margin.bottom + scatter.margin.label), 'Earthquake Magnitude');

            d3_append_axis(scatter.svg, d3.axisLeft, scatter.yscale, scatter.margin.left, scatter.margin.top, ya_ticks, '~s');

            d3_append_axis_label(scatter.svg, 'y', -(scatter.margin.top + (canvas_height/3)), (scatter.margin.left - scatter.margin.label-10),'Magnitude NST (# Seismic Stations)');
            break;

          case "depthError":
            raderr_sized = scatterplot_deptherror_calc(cx, cy, errmultiplier);
            scatter = d3_svg_select_data_enter(cx, yax, raderr_sized, canvas_width, canvas_height, "circle");
            xa_ticks = axis_ticks_gap_calc(cx, xa_tickgap);

            d3_append_axis(scatter.svg, d3.axisBottom, scatter.xscale, scatter.margin.left, (canvas_height - scatter.margin.bottom), xa_ticks, '~s');

            d3_append_axis_label(scatter.svg, 'x', canvas_width/2, (canvas_height - scatter.margin.bottom + scatter.margin.label), 'Earthquake Depth  (in km.)');
            break;

          case "horizontalError":
            raderr_sized = scatterplot_horizontalerror_calc(cx, cy, errmultiplier);
            scatter = d3_svg_select_data_enter(cx, yax, raderr_sized, canvas_width, canvas_height, "circle");
            xa_ticks = axis_depth_ticks_calc(cx, xa_tickgap);

            d3_append_axis(scatter.svg, d3.axisBottom, scatter.xscale, scatter.margin.left, (canvas_height - scatter.margin.bottom), xa_ticks, '~s');

            d3_append_axis_label(scatter.svg, 'x', canvas_width/2, (canvas_height - scatter.margin.bottom + scatter.margin.label), 'Earthquake Azimuthal Station Gap  (in degrees)');
            break;
          /*
          case "rms":
            raderr_sized = scatterplot_nstrms_calc(cx, cy, errmultiplier);
            break;
          */
        }

        d3_append_circles(scatter.chart, cx, scatter.xscale, yax, scatter.yscale, raderr_sized, scatter.rscale);
    });
}
