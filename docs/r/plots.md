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

## Saving figures as SVG

```R
library(svglite)

svglite(filename = paste0(plot_file,".svg"), width = 6, height = 12)
draw(hmap, padding = unit(c(1, 1, 1, 1), "cm")) # Bottom, left, top, right
dev.off()
```

## Complex Heatmap
<a href="https://jokergoo.github.io/ComplexHeatmap-reference/book/" target="_blank">Complex heatmap complete reference book</a>

### Generate a data matrix for the heatmap
An example of generating a data matrix for heatmaps from a tibble. The code below generates two matrices, one for the estimates from a correlation test and the other for the p-values. Both matrices follow the same row and column name order. While creating the estimate matrix, I also generate a vector for row breaks. The `Heatmap` function shows how the two matrices and row break vector are used to create a heatmap using the estimates matrix for cell values, the p-values matrix to print `*` when significant, and the row breaks vector to horizontally group the cells. 

```R
est_mat <- dat %>% select(phylum,kingdom, cell_population, estimate) %>%
        spread(cell_population, estimate) %>%
        na.omit() %>%
        as.data.frame() %>%
        column_to_rownames(var = "phylum")
r_breaks <- est_mat$kingdom
est_mat <- est_mat %>%  select(-kingdom) %>%
                as.matrix()

p_mat <- dat %>% select(phylum, cell_population, p.value) %>%
        spread(cell_population, p.value) %>%
        na.omit() %>%
        as.data.frame() %>%
        column_to_rownames(var = "phylum") %>%
        as.matrix()

hmap <- ComplexHeatmap::Heatmap(est_mat, cluster_rows = TRUE, cluster_columns = FALSE,
                                heatmap_legend_param = list(title = "Rho"),
                                row_split = r_breaks, # split rows
                                row_title_rot = 0, # rotate row title to horizontal, default is vertical
                                cell_fun = function(j, i, x, y, width, height, fill) {
                                                                  if(p_mat[i, j] < 0.001){
                                                                    grid.text("**", x, y, gp = gpar(fontsize = 6))
                                                                  }else if(p_mat[i,j] > 0.001 & p_mat[i, j] < 0.05){
                                                                    grid.text("*", x, y, gp = gpar(fontsize = 6))
                                                                  }

                                                                },
                                column_names_gp = gpar(fontsize = 10),
                                row_names_gp = gpar(fontsize = 10))
```

### Put text in the cells
```R
hmap <- ComplexHeatmap::Heatmap(mat, cluster_rows = TRUE, cluster_columns = TRUE,
                                heatmap_legend_param = list(title = "Mean\nImportance"),
                                column_split = c_breaks, # split columns
                                row_split = r_breaks, # split rows 
                                row_title_rot = 0, # rotate row title to horizontal, default is vertical
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
draw(hmap, padding = unit(c(3.5, 1, 1, 1), "cm")) # Bottom, left, top, right
dev.off() 
```

## Violin plot
A violin plot is a hybrid of a box plot and a kernel density plot, which shows peaks in the data. It is used to visualize the distribution of numerical data. Unlike a box plot that can only show summary statistics, violin plots depict summary statistics and the density of each variable.

```R
gplt <- ggplot(gpd, aes(x = visit, y = tile_count)) +
          geom_violin() +
          geom_jitter(shape=16, position=position_jitter(0.2)) +
          facet_wrap(~genus, scales = "free_y") 
```