# Plots
## Colorblind-friendly palette
```{r}
# The palette with grey:
cbPalette <- c("#999999", "#E69F00", "#56B4E9", "#009E73", "#F0E442", "#0072B2", "#D55E00", "#CC79A7")

# The palette with black:
cbbPalette <- c("#000000", "#E69F00", "#56B4E9", "#009E73", "#F0E442", "#0072B2", "#D55E00", "#CC79A7")

# To use for fills, add
  scale_fill_manual(values=cbPalette)

# To use for line and point colors, add
  scale_colour_manual(values=cbPalette)
```

Main article: http://www.cookbook-r.com/Graphs/Colors_(ggplot2)/

## Complex Heatmaps
### Put Text in the Cells
```R
hmap <- ComplexHeatmap::Heatmap(mat, cluster_rows = TRUE, cluster_columns = TRUE,
                                heatmap_legend_param = list(title = "Mean\nImportance"),
                                column_split = c_breaks,
                                cell_fun = function(j, i, x, y, width, height, fill) {
                                  if(mat_decision[i, j] == "Confirmed"){
                                    grid.text("C", x, y, gp = gpar(fontsize = 6))
                                  }else if(mat_decision[i, j] == "Tentative"){
                                    grid.text("T", x, y, gp = gpar(fontsize = 6))
                                  }
                                  
                                },
                                column_names_gp = gpar(fontsize = 10),
                                row_names_gp = gpar(fontsize = 10)
)

# Save the plot
plot_file <- file.path("figures", "heatpmap.png")
png(filename = plot_file, width = 12 * 300, height = 14 * 300, res = 300)
raw(hmap_1, padding = unit(c(3.5, 1, 1, 1), "cm")) # Bottom, left, top, right
dev.off() 
```