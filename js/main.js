function make_scatterplot(promise_data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
  promise_data
    .then(
      function(data) {
        /*
        const cx = data.map(a => Number(a[cxfield]));
        const cy = data.map(a => Number(a[cyfield]));
        const yax = data.map(a => Number(a[yaxfield]) * parseFloat(yaxmultiplier));

        console.log(cx);
        console.log(cy);
        console.log(yax);
        */

        var raderr_sized = [];
        var scatter = {};
        var cx = [];
        var cy = []
        var yax = [];
        var tooltip_callback = {};

        switch (cyfield) {
          case "magError":
            var d3obj = d3_svg_magError_setup(cyfield, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

            scatter = d3obj.scatter;
            raderr_sized = d3obj.raderr_sized;
            cx = d3obj.cx;
            yax = d3obj.yax;
            tooltip_callback = d3_html_tooltip_magError;

            d3_append_magError_annotation(scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);
            break;

          case "depthError":
            var d3obj = d3_svg_depthError_setup(cyfield, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);
            scatter = d3obj.scatter;
            raderr_sized = d3obj.raderr_sized;
            cx = d3obj.cx;
            yax = d3obj.yax;
            tooltip_callback = d3_html_tooltip_depthError;

            break;

          case "horizontalError":
            raderr_sized = scatterplot_horizontalerror_calc(cx, cy, errmultiplier);
            scatter = d3_svg_select_data_enter(cyfield, cx, yax, raderr_sized, canvas_width, canvas_height, "circle");
            xa_ticks = axis_ticks_gap_calc(cx, xa_tickgap);
            ya_ticks = axis_ticks_gap_calc(yax, xa_numticks)

            d3_append_axis(scatter.svg, d3.axisBottom, scatter.xscale, scatter.margin.left, (canvas_height - scatter.margin.bottom), xa_ticks, '~s');

            d3_append_axis_label(scatter.svg, 'x', canvas_width/2, (canvas_height - scatter.margin.bottom + scatter.margin.label), 'Earthquake Azimuthal Station Gap  (in degrees)');

            d3_append_axis(scatter.svg, d3.axisLeft, scatter.yscale, scatter.margin.left, scatter.margin.top, ya_ticks, '~s');

            d3_append_axis_label(scatter.svg, 'y', -(scatter.margin.top + (canvas_height/3)), (scatter.margin.left - scatter.margin.label-10),'NST (# Stations Measuring Location)');
            break;
        }

        d3_append_circles(scatter.chart, cx, scatter.xscale, yax, scatter.yscale, raderr_sized, scatter.rscale, scatter.color_map, data, tooltip_callback);
    });
}
