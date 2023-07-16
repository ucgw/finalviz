function make_scatterplot(promise_data, yaxfield, cxfield, cyfield, xform_xrange, xform_yrange, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
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
            xa_ticks = axis_mag_ticks_calc(cx, xa_numticks);

            d3_append_axis(scatter.svg, d3.axisBottom, scatter.xscale, scatter.margin.left, (canvas_height - scatter.margin.bottom), xa_ticks, '~s');

            d3_append_axis_label(scatter.svg, 'x', canvas_width/2, (canvas_height - scatter.margin.bottom + scatter.margin.label), 'Earthquake Magnitude');
            break;

          case "depthError":
            raderr_sized = scatterplot_deptherror_calc(cx, cy, errmultiplier);
            xa_ticks = axis_depth_ticks_calc(cx, xa_tickgap);

            d3_append_axis(scatter.svg, d3.axisBottom, xform_xrange, canvas_height-(xform_yrange-50), [cxlower, cxupper], [0, canvas_height], xa_ticks, '~s');

            d3_append_axis_label(scatter.svg, 'x', xform_xrange+150, xform_yrange+xform_xrange, 590, 'Earthquake Depth (in km.)');
            break;

          case "horizontalError":
            raderr_sized = scatterplot_horizontalerror_calc(cx, cy, errmultiplier);

            xa_ticks = axis_depth_ticks_calc(cx, xa_tickgap);

            d3_append_axis(scatter.svg, d3.axisBottom, xform_xrange, canvas_height-(xform_yrange-50), [cxlower, cxupper], [0, canvas_height], xa_ticks, '~s');
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
