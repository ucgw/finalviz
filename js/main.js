function make_scatterplot(promise_data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
  promise_data
    .then(
      function(data) {
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

            d3_append_magError_higherMagNst_annotation(scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

            d3_svg_append_legend(scatter.svg, data, scatter.color_map);
            break;

          case "depthError":
            var d3obj = d3_svg_depthError_setup(cyfield, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);
            scatter = d3obj.scatter;
            raderr_sized = d3obj.raderr_sized;
            cx = d3obj.cx;
            yax = d3obj.yax;
            tooltip_callback = d3_html_tooltip_depthError;

            d3_append_depthError_consistent10km_annotation(scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_depthError_pre1960_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_depthError_higherNst_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);
            d3_svg_append_legend(scatter.svg, data, scatter.color_map);
            break;
        }

        d3_append_circles(scatter.chart, cx, scatter.xscale, yax, scatter.yscale, raderr_sized, scatter.rscale, scatter.color_map, data, tooltip_callback);
    });
}
