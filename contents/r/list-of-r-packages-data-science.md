---
comments: true
---

# A Comprehensive List of R Packages for Data Science

## Data Wrangling

- [**tidyverse**](https://cran.r-project.org/web/packages/tidyverse/index.html): I believe this should be bundled with R now. Actually if you are not using it for data wrangling you are probably doing something wrong (or you are super old school). It comes with a bundle of rich tools such as dplyr (transform, filter, aggregate), tidyr (long / wide table conversion), [purrr](https://cran.r-project.org/web/packages/purrr/index.html) (functional programming package), tibble (supercharged dataframes), etc.
- [**janitor**](https://cran.r-project.org/web/packages/janitor/index.html): a great tool for data cleaning, works nicely with tidyverse.
- [**seplyr**](https://cran.r-project.org/web/packages/seplyr/index.html): a handy companion package for dplyr, adding some shortcuts such as group summary functions. You may always implement yourselves but here’s lazy person’s choice.
- **datastructures**: what’s missing in R is out-of-box data structures like hashset and hashmap. Rest assured, there’s always a package for it.

## Visualization

- [**ggplot2**](https://ggplot2.tidyverse.org/): The plotting package you should be using, period. Python has a [plotnine](https://github.com/has2k1/plotnine) binding as well. Sometimes you may question yourself why you need 10 lines of code to generate a line plot whereas you may just open the file in excel and make one, other times you will feel grateful that you can compose anything without banging your head to the screen. The learning curve is definitely steep if you are new, but well worth the investment.
- [**DataExplorer**](https://cran.r-project.org/web/packages/DataExplorer/index.html): An easy to use package to generate ggplot-verse plots of data diagnostics, such as missing data / feature, etc. I use some shortcut functions for quick data validations.
- [**ggrepel**](https://cran.r-project.org/web/packages/ggrepel/index.html): This is a drop-in replacement for geom_text, if you have a massive number of labels and don’t want all the texts to overlap. It may take a long time to run for large datasets but the results will be much more visually pleasant.
- [**ggfortify**](https://cran.r-project.org/web/packages/ggfortify/index.html): Diagnostics / visualization plots for various statistical models.
- [**sjPlot**](https://cran.r-project.org/web/packages/sjPlot/index.html): Comes with a slew of neat diagnostic plots for statistical modeling. I especially like it’s built on ggplot so you can easily to tweak the look and feel to be consistent with other ggplot-verse plots. [jtools](https://cran.r-project.org/web/packages/jtools/index.html) / [interplot](https://cran.r-project.org/web/packages/interplot/index.html) contains some nice functions to plot interaction effects. [ggdistribute](https://cran.r-project.org/web/packages/ggdistribute/index.html) contains functions to plot posterior distributions.
- [**coefplot**](https://cran.r-project.org/web/packages/coefplot/index.html): Automatically plot model coefficients with confidence intervals.
- [**dotwhisker**](https://cran.r-project.org/web/packages/dotwhisker/vignettes/dotwhisker-vignette.html): Yet another awesome coefficient plot package with ggplot2.
- [**gghighlight**](https://cran.r-project.org/web/packages/gghighlight/index.html): Very useful if you have multiple time series and would like to highlight a few while keeping the rest in the background.
- [**lvplot**](https://cran.r-project.org/web/packages/lvplot/index.html): An improved plot which works similar to boxplot but better at outliers and large datasets.
- [**stargazer**](https://cran.r-project.org/web/packages/stargazer/index.html): Generates html / latex tables from data frames which can be inserted into manuscripts. I use this to generate tables for Google docs whenever I want the table style to be more _classic_. Otherwise I go with sjPlot. There’s also [**gt**](https://gt.rstudio.com/)**.**
- [**ggthemes**](https://cran.r-project.org/web/packages/ggthemes/index.html), [**ggsci**](https://cran.r-project.org/web/packages/ggsci/vignettes/ggsci.html)**,** [**ggpubr**](https://cran.r-project.org/web/packages/ggpubr/index.html)**,** [**ggalt**](https://github.com/hrbrmstr/ggalt)**,** [**hrbrthemes**](https://github.com/hrbrmstr/hrbrthemes): publication ready themes and color templates for various journals. You may even get [xkcd](https://cran.r-project.org/web/packages/xkcd/index.html) styled plots. [**extrafont**](https://cran.r-project.org/web/packages/extrafont/index.html) allows you to use custom fonts in plots.
- [**waffle**](https://cran.r-project.org/web/packages/waffle/index.html): Infographics is not the always best option for data presentation but may be helpful for less data / tech savvy audience. Here’s [a blog post](https://www.r-bloggers.com/infographic-style-charts-using-the-r-waffle-package/) with some examples.
- [**corrplot**](https://cran.r-project.org/web/packages/corrplot/vignettes/corrplot-intro.html): One-stop-shop for plotting various correlations in various representations.
- [**alluvial**](https://cran.r-project.org/web/packages/alluvial/index.html), [**ggalluvial**](https://cran.r-project.org/web/packages/ggalluvial/index.html)**,** [**riverplot**](https://cran.r-project.org/web/packages/riverplot/index.html): ggplot packages to generate Sankey flowcharts. They are sometimes useful for visualizing complex flows, assuming your flow won’t be intertwined like noodles.
- [**pheatmap**](https://cran.r-project.org/web/packages/pheatmap/index.html)**,** [**ggdendro**](https://cran.r-project.org/web/packages/ggdendro/index.html)**:** Package to plot heatmaps.
- [**lattice**](https://cran.r-project.org/web/packages/lattice/index.html), [**plotrix**](https://cran.r-project.org/web/packages/plotrix/index.html)**,** [**gplots**](https://cran.r-project.org/web/packages/gplots/index.html)**,** [**plotly**](https://cran.r-project.org/web/packages/plotly/index.html): Various plotting functions not in the ggplot universe.
- [**ggmap**](https://cran.r-project.org/web/packages/ggmap/index.html)**,** [**mapview**](https://cran.r-project.org/web/packages/mapview/index.html), [**leaflet**](https://cran.r-project.org/web/packages/leaflet/index.html)**,** [**sp**](https://cran.r-project.org/web/packages/sp/index.html): Packages to generate geo-spatial visualizations functions.
- [**patchwork**](https://github.com/thomasp85/patchwork), [**gridExtra**](https://cran.r-project.org/web/packages/gridExtra/index.html): These packages work well for stitching multiple ggplots together. I personally prefer patchwork since the syntax is more natural and gg-ish.
- [**classifierplots**](https://cran.r-project.org/web/packages/classifierplots/classifierplots.pdf): Contains various neat diagnostics plots for classifiers.
- [**ggstatsplot**](https://github.com/IndrajeetPatil/ggstatsplot): A new package for automatic statistical plots.
- [**inspectdf**](https://github.com/alastairrushworth/inspectdf): A very nice function to explore categorical variables.
- [**effects**](https://cran.r-project.org/web/packages/effects/index.html): A really nice package to illustrate model effects.
- [**radarBoxplot**](https://cran.r-project.org/web/packages/radarBoxplot/index.html)**:** This plot library generates Radar typed plot (similar to those in-game statistics, and can be useful to compare multi-variate data)
- [**prettyB**](https://cran.r-project.org/web/packages/prettyB/index.html): Prettier base plotting packages, drop-in replacement
- [**ggPMX**](https://cran.r-project.org/web/packages/ggPMX/index.html): ‘ggplot’ based tools to Facilitate Diagnostic Plots for NLME Models
- [**ggchicklet**](https://github.com/hrbrmstr/ggchicklet): Interesting and useful package for horizontal stacked bars
- [**ggpointdensity**](https://cran.r-project.org/web/packages/ggpointdensity/index.html): density plot + scatter plot
- [**WVPlots**](https://github.com/WinVector/WVPlots): Some commonly used ggplots

## Natural Language Processing

- [**formattable**](https://cran.r-project.org/web/packages/formattable/index.html): Package to provide a nice suite of functions to facilitate formatting such as numbers, percentages, etc.
- [**scales**](https://cran.r-project.org/web/packages/scales/index.html): A new R package to to aid/prettify ggplot scales, which can be quite annoying and tedious to tweak. I rely this lib to generate log scale ticks ([example link](http://www.sthda.com/english/wiki/ggplot2-axis-scales-and-transformations)).
- [**stringr**](https://cran.r-project.org/web/packages/stringr/vignettes/stringr.html)**,** [**stringi**](https://cran.r-project.org/web/packages/stringi/index.html): A nice suite of string manipulation functions. String processing in R is generally not pleasant, and these are good to rescue.
- [**RKEA**](https://cran.r-project.org/web/packages/RKEA/index.html): An R interface for KEA (Key Phrase Extraction), this is a good partner lib for other more comprehensive NLP packages such as topicmodels.
- [**udpipe**](https://github.com/ufal/udpipe): Trainable tokenization pipelines.
- [**stringdist**](https://cran.r-project.org/web/packages/stringdist/index.html)**,** [**fuzzywuzzyR**](https://cran.r-project.org/web/packages/fuzzywuzzyR/index.html): Fuzzy/ approximate string matching and string distance functions.
- [**fuzzyjoin**](https://github.com/dgrtwo/fuzzyjoin)**: A**n interesting concept — this is an extension to the dply join methods to add fuzzy joins functions for tables. Can be handy but use with caution since the behavior may not be predictable.
- [**topicmodels**](https://cran.r-project.org/web/packages/topicmodels/index.html): A performant topic modeling package.
- [**formatR**](https://cran.r-project.org/web/packages/formatR/index.html): Can be used to batch format multiple R source codes if you are not using an IDE with built in auto-format function.
- [**lintr**](https://github.com/jimhester/lintr)**:** Code linting for R sources.
- [**SentimentAnalysis**](https://cran.r-project.org/web/packages/SentimentAnalysis/index.html): This is a similar package to python’s Vader, if you’d like to have a quick sentiment analysis with multiple methods.

## Statistical Learning

- [**modelr**](https://cran.r-project.org/web/packages/modelr/index.html): A streamlined modeling interface to normalize several commonly used modeling frameworks.
- [**broom**](https://cran.r-project.org/web/packages/broom/index.html): Very handy package to convert modeling objects into more consumable data frames for batch reporting, persistence or visualization.
- [**fmsb**](https://cran.r-project.org/web/packages/fmsb/index.html)**,** [**Mcomp**](https://cran.r-project.org/web/packages/Mcomp/index.html): This is the companion package to a book _Practices of Medical and Health Data Analysis using R_. The book is about 10 years old but some data are useful for trying out various statistical / ML methods. Mcomp contains some time series data to play with.
- [**Hmisc**](https://cran.r-project.org/web/packages/Hmisc/index.html)**,** [**rcompanion**](https://cran.r-project.org/web/packages/rcompanion/index.html)**,** [**e1071**](https://cran.r-project.org/web/packages/e1071/index.html)**:** Excellent utility packages for various statistical analysis, such as sample size / power calculation, computing pseudo R², various statistical tests, etc.
- [**vegan**](https://cran.r-project.org/web/packages/vegan/index.html): Statistical methods for ecologists.
- [**fit.models**](https://cran.r-project.org/web/packages/fit.models/index.html): This package is similar to _caret_ in such a way that it standardizes the interface for various parametric / nonparametric model fitting and comparisons.
- [**oem**](https://arxiv.org/abs/1801.09661): Apackage developed to specifically tackle big tall data (small p, very large N, an example is the [kaggle Talking Data](https://www.kaggle.com/c/talkingdata-adtracking-fraud-detection)) regression problems.
- [**BeSS**](https://cran.r-project.org/web/packages/BeSS/BeSS.pdf): Abest subset selection algorithm, can be used along with the standard AIC / BIC based model selection procedures.
- [**quantreg**](https://cran.r-project.org/web/packages/quantreg/index.html): Package w/ quantile regression functions.
- [**lavaan**](https://cran.r-project.org/web/packages/lavaan/index.html)**:** Latent variable analysis and structural equation modeling [[link](http://lavaan.ugent.be/)].
- [**lme4**](https://cran.r-project.org/web/packages/lme4/index.html): This package is great for fitting linear and generalized mixed-effects models.
- [**uplift**](https://cran.r-project.org/web/packages/uplift/index.html): Uplift modeling to optimize for the ROI of a particular treatment, but identifying the best subset of targets [[link](https://en.wikipedia.org/wiki/Uplift_modelling)].
- [**arm**](https://cran.r-project.org/web/packages/arm/index.html): Companion to the book _Data Analysis Using Regression and Multilevel/Hierarchical Models._ Contains handy methods for hierarchical modeling.
- [**smooth**](https://cran.r-project.org/web/packages/smooth/index.html): Curve smoothing and time series forecasting.
- [**extRemes**](https://cran.r-project.org/web/packages/extRemes/index.html): Package for extreme / long tail value statistics, [**lax**](https://cran.r-project.org/web/packages/lax/index.html): Loglikelihood Adjustment for Extreme Value Models
- [**MixtureInf**](https://cran.r-project.org/web/packages/MixtureInf/index.html): Maximum Likelihood Estimate (MLE) methods.
- [**SGB**](https://cran.r-project.org/web/packages/SGB/index.html): Simplicial Generalized Beta Regression
- [**PLNModels**](https://cran.r-project.org/web/packages/PLNmodels/index.html)**:** Poisson Lognoarmal Models
- [**multinomineq**](https://cran.r-project.org/web/packages/multinomineq/index.html): Bayesian Inference for Multinomial Models with Inequality Constraints
- [**rms**](https://cran.r-project.org/web/packages/rms/index.html): This is a companion package to Regression Modeling Strategies book, and offers a slew of methods for regression analysis.
- [**emmeans**](https://cran.r-project.org/web/packages/emmeans/index.html): The least square marginal means.
- [**cotram**](https://cran.r-project.org/web/packages/cotram/index.html): Count transormation models
- [**easystats**](https://github.com/easystats): Libraries make it easy to run statistical analysis
- [**parameters**](https://github.com/easystats/parameters): package that makes it super easy to extract parameters

## Casual Inference

- [**MatchIt**](https://cran.r-project.org/web/packages/MatchIt/index.html): A great package for propensity scoring matching. It has some quirks and data extraction from results may not be very intuitive.
- [**CausalImpact**](https://google.github.io/CausalImpact/): Google’s package for quick estimation, usually this is my first attempt to analyze any causal inference analysis.
- [**causaleffect**](https://cran.r-project.org/web/packages/causaleffect/index.html): Casual inferences. I haven’t checked this package in detail and it looks very promising.
- [**CompareCausalNetworks**](https://cran.r-project.org/web/packages/CompareCausalNetworks/index.html)**: T**his is the _caret_ for causal networks, a unified interface to tap into many causal network frameworks.
- [**rdd**](https://cran.r-project.org/web/packages/rdd/index.html): This package contains everything you need for [regression discontinuity analysis](https://en.wikipedia.org/wiki/Regression_discontinuity_design).
- [**mediation**](https://cran.r-project.org/web/packages/mediation/index.html): Apackage developed for [causal mediation analysis](https://www.mailman.columbia.edu/research/population-health-methods/causal-mediation). Uber has an excellent blog on such analysis [[link](https://eng.uber.com/mediation-modeling/)]. This frame work can estimate the average treatment effect w & w/o the presence of a proposed mediator.

## Meta Analysis

- [**meta**](https://cran.r-project.org/web/packages/meta/index.html), [**metafor**](https://cran.r-project.org/web/packages/metafor/index.html): Starting packages for basic meta analysis, such as fitting fixed / random effect models for binary / continuous outcomes.
- [**forestmodel**](https://cran.r-project.org/web/packages/forestmodel/index.html)**,** [**metaviz**](https://cran.rstudio.com/web/packages/metaviz/index.html): The built-in forest plotting functions for meta/metafor were not upgraded to ggplot universe yet. These packages do the facelifting and the resultant plots can be updated with ggplot functions such as changing captions, stitching with other plots, etc. I wrote a even better forest plot functions which I will share in another blog post.
- [**vcov**](https://cran.r-project.org/web/packages/vcov/index.html): Faster methods to extract variance — covariance matrices. This can be used in many contexts but can be handy for multvariate meta analysis.
- [**bayesmeta**](https://cran.r-project.org/web/packages/bayesmeta/index.html), [**CPBayes**](https://cran.r-project.org/web/packages/CPBayes/index.html)**,** [**bmeta**](https://cran.r-project.org/web/packages/bmeta/index.html): Certainly there will be Bayesian counterparts for meta analysis. I haven’t checked these in detail but probably will do more as I dig deeper into Bayesian inference.
- [**netmeta**](https://cran.r-project.org/web/packages/netmeta/netmeta.pdf): A package for network meta analysis. Network meta analysis is a methodology to combine multiple studies and infer treatment effects between groups which were never compared directly.
- [**baggr**](https://github.com/wwiecek/baggr): Hierarchical Bayesian Meta Analysis with Stan (can choose none, partial and full pooling)

## Hypothesis Testing

- [**diptest**](https://cran.r-project.org/web/packages/diptest/index.html): dip test of multi-modality / mixture distribution.
- [**normtest**](https://cran.r-project.org/web/packages/normtest/index.html): Contains many handy tests of normality, skewness, kurtosis, etc, using Monte Carlo simulations, a good addition to [**base::shapiro.test**](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/shapiro.test.html): Shapiro-Wilk test of Normality.
- [**seqtest**](https://cran.r-project.org/web/packages/seqtest/index.html)**,** [**SPRT**](https://cran.r-project.org/web/packages/SPRT/index.html)**,** [**ldbounds**](https://cran.r-project.org/web/packages/ldbounds/index.html)**,** [**gsDesign**](https://cran.r-project.org/web/packages/gsDesign/index.html)**:** These are the packages for sequential testing — computing bounds w/ various methods. I plan to write a comprehensive blog about this subject area.
- [**lmtest**](https://cran.r-project.org/web/packages/lmtest/index.html): Hypothesis testing for linear regression models.
- [**mhtboot**](https://cran.r-project.org/web/packages/mhtboot/index.html): Multiple hypothesis testing correction.
- [**wBoot**](https://cran.r-project.org/web/packages/wBoot/index.html): Bootstrap methods as alternatives to hypothesis testing.
- [**coin**](https://cran.r-project.org/web/packages/coin/index.html): Permutation test framework.
- [**resample**](https://cran.r-project.org/web/packages/resample/index.html)**:** Resampling methods which can be used along with many hypothesis testing frameworks.
- [**binom**](https://cran.r-project.org/web/packages/binom/index.html): Provide additional binomial confidence intervals since the standard estimation may not work well for rare events, heterogeneous p, etc.
- [**DescTools**](https://cran.r-project.org/web/packages/DescTools/index.html): Lazy person’s tools for descriptive statistics.
- [**tolerance**](https://cran.r-project.org/web/packages/tolerance/index.html)**:** To think about the hypothesis testing in a different way — given alpha and percentage of recovery, what’s the lower bound and upper bound of data we may recover from a particular probability distribution? This package does the trick for all the common distributions.
- [**BSDA**](https://cran.r-project.org/web/packages/BSDA/BSDA.pdf)**:** Companion for Book _Basic Statistics and Data Analysis_, contains many interesting datasets and auxiliary hypothesis testing functions (such as computing z-test from summary statistics v.s. raw data, although it’s pretty easy to roll your own).
- [**WRS2**](https://cran.r-project.org/web/packages/WRS2/index.html): A collection of robust statistical modeling / testing methods;
- [**bayesAB**](https://cran.r-project.org/web/packages/bayesAB/index.html): THE bayesian hypothesis testing package you want to use. This is an awesome package developed by [Frank Portman](http://fportman.com/blog/).
- [**rstanarm**](https://cran.r-project.org/web/packages/rstanarm/index.html)**:** Bayesian Applied Regression Modeling — can be used for Bayesian hypothesis testing in a modeling framework.
- [**hotelling**](https://cran.r-project.org/web/packages/Hotelling/index.html): A package for Hotelling’s T² test.
- [**BayesFactor**](https://cran.r-project.org/web/packages/BayesFactor/index.html): Compute Bayes Factor for common experiment designs.
- [**infer**](https://cran.r-project.org/web/packages/infer/index.html): Tidyverse way of inference package.
- [**pvaluefunctions**](https://cran.r-project.org/web/packages/pvaluefunctions/index.html): Creates confidence distributions and p-value functions
- [**Monte.Carlo.se**](https://cran.r-project.org/web/packages/Monte.Carlo.se/index.html): Monte Carlo standard errors
- [**bamlss**](https://cran.r-project.org/web/packages/bamlss/index.html): Bayesian Additive Models or Location, Scale and Shape
- [**BayesPostEst**](https://github.com/ShanaScogin/BayesPostEst): Bayes postestimation quantities after estimating Bayesian regression models with MCMC

## Power Analysis

- [**pwr**](https://cran.r-project.org/web/packages/pwr/index.html): Basic functions for power analysis. Compute any of _sample size_, _power_, _effect size_, _alpha_ from the 3 other parameters.
- [**samplesize**](https://cran.r-project.org/web/packages/samplesize/index.html): Similar to _pwr_ but can compute sample size for nonparametric Wilcoxon Test as well.
- [**powerAnalysis**](https://cran.r-project.org/web/packages/powerAnalysis/powerAnalysis.pdf): An older package also does the trick.
- [**simr**](https://cran.r-project.org/web/packages/simr/index.html): Using simulation based approach for power analysis
- [**effsize**](https://cran.r-project.org/web/packages/effsize/index.html)**,** [**compute.es**](https://cran.r-project.org/web/packages/compute.es/index.html): Very handy packages to compute various effect size measures (Cohen d, etc.).

## Factor/Survey Analysis

- [**survey**](https://cran.r-project.org/web/packages/survey/index.html): Name is very self-explanatory.
- [**SDaA**](https://cran.r-project.org/web/packages/SDaA/index.html): Sampling, Design and Analysis
- [**FactoMineR**](https://cran.r-project.org/web/packages/FactoMineR/index.html)**:** Multivariate factor analysis, with Multiple Correspondence Analysis (MCA)
- [**ade4**](https://cran.r-project.org/web/packages/ade4/index.html): Analysis of ecological data / environmental sciences w/ survey methods.
- [**Ca**](https://cran.r-project.org/web/packages/ca/index.html)**,** [**homals**](https://cran.r-project.org/web/packages/homals/index.html): Various correspondence analysis methods.

## Time Series Analysis

- [**jmotif**](https://cran.r-project.org/web/packages/jmotif/index.html): Provides a comprehensive suite of symbolic transformation functions such as SAX ([Symbolic Aggregation Approximation](https://jmotif.github.io/sax-vsm_site/morea/algorithm/SAX.html)) to convert continuous time-series data into discrete string sequences, which can then be fed into a variety of feature engineering functions
- [**seewave**](https://cran.r-project.org/web/packages/seewave/index.html): Package for sound analysis, also offers SAX transformations
- [**prophet**](https://cran.r-project.org/web/packages/prophet/index.html): Facebook’s time series analysis package, including forecasting and change point detection. Also comes in Python.
- [**imputeTS**](https://cran.r-project.org/web/packages/imputeTS/index.html)**:** Imputation methods designed specifically for time series data.
- [**anytime**](https://cran.r-project.org/web/packages/anytime/index.html)**,** [**timeDate**](https://cran.r-project.org/web/packages/timeDate/index.html)**,** [**lubridate**](https://cran.r-project.org/web/packages/lubridate/index.html)**,** [**hms**](https://cran.r-project.org/web/packages/hms/index.html): We all know time format conversion is a universal pain. These packages are there for the rescue.
- [**fma**](https://cran.r-project.org/web/packages/fma/index.html): Time series datasets you may play with.
- [**timereg**](https://cran.r-project.org/web/packages/timereg/index.html): Regression models for survival / time series data
- [**forecast**](https://cran.r-project.org/web/packages/forecast/index.html): Forecasting functions for ts / linear models.
- [**TSA**](https://cran.r-project.org/web/packages/TSA/index.html): General Time Series analysis accompanying the book _Time Series Analysis with Applications in R_
- [**astsa**](https://cran.r-project.org/web/packages/astsa/index.html): Applied statistical time series analysis.
- **spetral**.[**methods**](https://cran.r-project.org/web/packages/spectral.methods/index.html): Spectral decomposition of Time Series data
- [**pracma**](https://cran.r-project.org/web/packages/pracma/index.html): Practical Numeric Math Functions.
- [**changepoint**](https://cran.r-project.org/web/packages/changepoint/index.html)**,** [**cpm**](https://cran.r-project.org/web/packages/cpm/index.html): Methods for change point / anomaly detection.
- [**bcp**](https://cran.r-project.org/web/packages/bcp/index.html)**,** [**ecp**](https://cran.r-project.org/web/packages/ecp/index.html): Bayesian / Nonparametric methods for change point detection.
- [**TSClust**](https://cran.r-project.org/web/packages/TSclust/index.html)**,** [**dtwclust**](https://cran.r-project.org/web/packages/dtwclust/index.html): Specific methods developed for time series data clustering.
- [**anomalize**](https://github.com/business-science/anomalize): Automatic detection of anomalies in timeseries data

## Survival Analysis

- [**survival**](https://cran.r-project.org/web/packages/survival/index.html): Survival analysis toolkit. Contains everything you need to begin such as Cox Hazard models.

## Robust Statistics

- [**robust**](https://cran.r-project.org/web/packages/robust/index.html), [**robustbase**](https://cran.r-project.org/web/packages/robustbase/index.html): Robust methods to overcome univariate / multidimensional outliers and generate more stable models / estimates.

## Anomaly Detection

- [**twitter/AnomalyDetection**](https://github.com/twitter/AnomalyDetection): This package hasn’t been updated for years but seems still working. I would welcome recommendations on anomaly detection methods.

## Feature Engineering/Selection

- [**forcats**](https://cran.r-project.org/web/packages/forcats/index.html): Tools for categorical variable transformations.
- [**Boruta**](https://cran.r-project.org/web/packages/Boruta/index.html): Method for feature selection based on permutation of importance measures.
- [**MXM**](https://cran.r-project.org/web/packages/MXM/index.html): Feature selection methods w/ Bayesian networks.
- [**fscaret**](https://cran.r-project.org/web/packages/fscaret/index.html): Automated feature selection from caret.
- [**EFS**](https://cran.r-project.org/web/packages/EFS/index.html): Feature selection using ensemble methods.
- [**one_hot**](https://www.rdocumentation.org/packages/mltools/versions/0.3.5/topics/one_hot), [**onehot**](https://cran.r-project.org/web/packages/onehot/onehot.pdf): Handy shortcuts to onehot encoding of categorical variables.
- [**SelectBoost**](https://cran.r-project.org/web/packages/SelectBoost/SelectBoost.pdf): Select boost for feature selection.
- [**flashlight**](https://cran.r-project.org/web/packages/flashlight/index.html): package on exploration of features in blackboxy algo

## Distance Metrics

- [**proxy**](https://cran.r-project.org/web/packages/proxy/index.html): Distance functions can be scattered around many R packages with various function signatures, which makes it hard to hot-swap. This package normalizes distance definitions and make it convenient to define any custom distance function.
- [**parallelDist**](https://cran.r-project.org/web/packages/parallelDist/index.html): Compute distance matrix on very large datasets (>5000 rows) can very time consuming on a local machine; this package allows to compute distances in parallel which can dramatically reduce computation time, tested up to 20X speed boost.
- [**philentropy**](https://cran.r-project.org/web/packages/philentropy/index.html): Similarity distances between probability functions.
- [**wCorr**](https://cran.r-project.org/web/packages/wCorr/wCorr.pdf)**,** [**weights**](https://cran.r-project.org/web/packages/weights/index.html): Weighted statistics such as correlations.
- [**distances**](https://cran.r-project.org/web/packages/distances/index.html): Various distance metrics which can be used for ML / stat modeling.
- [**gower**](https://cran.r-project.org/web/packages/gower/index.html): Gower’s distance between records, often used in survey analysis with mixed numeric / categorical responses.

## Dimension Reduction

- [**Rtsne**](https://cran.r-project.org/web/packages/Rtsne/index.html)**,** [**tsne**](https://cran.r-project.org/web/packages/tsne/index.html): T-sne implementation in R.
- [**gmodels**](https://cran.r-project.org/web/packages/gmodels/index.html): fast.prcomp: A fast version of PCA.
- [**umap**](https://cran.r-project.org/web/packages/umap/index.html): With tutorial [here](https://cran.r-project.org/web/packages/umap/vignettes/umap.html), dimension reduction methodology.
- [**smacof**](https://cran.r-project.org/web/packages/smacof/index.html): A comprehensive package for Multi-dimensional scaling, as a nice addition to [**MASS::isoMDS**](https://stat.ethz.ch/R-manual/R-devel/library/MASS/html/isoMDS.html)
- [**largeViz**](https://github.com/elbamos/largeVis): Large data visualization with dimension reduction.
- [**RDRToolbox**](https://bioconductor.org/packages/release/bioc/html/RDRToolbox.html): Dimension reduction w/ isomap and LLE with a unified framework.

## Unsupervised Learning / Clustering

- [**mclust**](https://cran.r-project.org/web/packages/mclust/index.html): Model Based clustering approach using Gaussian Mixtures. It automatically decides the optimal number of clusters based on maximum likelihood. Here’s a [starter’s tutorial](https://cran.r-project.org/web/packages/mclust/vignettes/mclust.html).
- [**fastcluster**](https://cran.r-project.org/web/packages/fastcluster/index.html): A drop in method to replace the built in hierarchical clustering with massive performance boost. Clustering on thousands of data points take less than a couple of seconds.
- [**flashClust**](https://cran.r-project.org/web/packages/flashClust/index.html): Another implementation of fast hierarchical clustering.
- [**NMF**](https://cran.r-project.org/web/packages/NMF/index.html): Package of non-negative matrix factorization. This is a very useful technique to find compressed versions of smaller matrices which can be multiplied to approximate the source matrix, while holding all values positive (additive). Frequently used in clustering / image processing. [[Nature Paper](https://www.nature.com/articles/44565)]
- [**cluster**](https://cran.r-project.org/web/packages/cluster/index.html)**,** [**fpc**](https://cran.r-project.org/web/packages/fpc/index.html)**,** [**clue**](https://cran.r-project.org/web/packages/clue/index.html): A suite of methods for cluster analysis and validation.
- [**pvclust**](https://cran.r-project.org/web/packages/pvclust/index.html): Using bootstrap to estimate the uncertainty in hierarchical clustering and search optimal cuts.
- [**fastICA**](https://cran.r-project.org/web/packages/fastICA/index.html): Fast method for independent component analysis (ICA). A good [Quora post](https://www.quora.com/What-is-the-difference-between-PCA-and-ICA) explains the difference between PCA and ICA.
- [**EMCluster**](https://cran.r-project.org/web/packages/EMCluster/index.html): Model based clustering w/ finite mixture Gaussian Distribution. In short words, it assumes the data was generated from a multivariate Gaussian distribution and tries to estimate the optimal number of clusters and cluster membership w/ EM algorithm.
- [**clues**](https://cran.r-project.org/web/packages/clues/index.html)**,** [**clusterSim**](https://cran.r-project.org/web/packages/clusterSim/index.html): Automatic clustering methods to identify number of clusters, with diagnostics plots.
- [**RSKC**](https://cran.r-project.org/web/packages/RSKC/index.html): Robust K-means clustering algo for sparse data.
- [**dendextend**](https://cran.r-project.org/web/packages/dendextend/vignettes/introduction.html): Advanced dendrogram drawing methods.
- factoextra
- [**NbClust**](https://cran.r-project.org/web/packages/NbClust/index.html): A really nice package to identify the optimal number of clusters — can provide ~ 30 metrics simultaneously.
- [**clValid**](https://www.rdocumentation.org/packages/clValid/versions/0.6-6): Compute a variety of cluster quality metrics, such as [Dunn index](https://en.wikipedia.org/wiki/Dunn_index).
- [**clustertend**](https://cran.r-project.org/web/packages/clustertend/index.html): Hopkin’s cluster tendency — you may apply clustering algorithm to any dataset but it doesn’t mean the result is meaningful. Specifically, the data need to contain some sort of clustering structure and Hopkin’s index is a good measure with permutation tests.
- [**dbscan**](https://cran.r-project.org/web/packages/dbscan/index.html): Density based clustering methods [[wiki](https://en.wikipedia.org/wiki/DBSCAN)], may be able to solve when traditional distance based methods fail to work.
- [**cluMix**](https://cran.r-project.org/web/packages/CluMix/index.html)**:** Clustering subjects with mixed data types, distances can be computed using gower’s distance. Alternatively, you may use [gower](https://cran.r-project.org/web/packages/gower/vignettes/intro.html) to compute the distance and then feed to preferred clustering algorithms.
- [**apcluster**](https://cran.r-project.org/web/packages/apcluster/index.html): Affinity propagation clustering — similar to label propagation, the closeness are passed via similarity networks.
- [**OTclust**](https://cran.r-project.org/web/packages/OTclust/index.html): Mean Parition, Uncertainty Assessment and Cluster Validations
- [**Spectrum**](https://cran.r-project.org/web/packages/Spectrum/index.html): Fast spectrum clustering algorithm

## Semi-Supervised Learning

- [**SSL**](https://cran.r-project.org/web/packages/SSL/index.html)**,** [**RSSL**](https://arxiv.org/abs/1612.07993): These packages provide semi-supervised learning methods using partially labeled data.

## Supervised Learning (General Machine Learning) / Deep Learning

- [**caret**](https://cran.r-project.org/web/packages/caret/index.html): The R equivalent to scikit learn: feature processing, train / test split, cross validation, model performance metrics … you name it.
- [**mlbench**](https://cran.r-project.org/web/packages/mlbench/index.html): ML benchmark datasets and functions.
- [**xgboost**](https://cran.r-project.org/web/packages/xgboost/index.html): The well-known Kaggle winning algorithm. As a matter of fact this is almost the universal choice for high performance production level models. Fast, easy to use, easy to deploy.
- [**modelr**](https://cran.r-project.org/web/packages/modelr/index.html): An initiative to make modeling syntax more interoperable with the tidyverse.
- [**recipes**](https://cran.r-project.org/web/packages/recipes/index.html): Auxiliary packages for design matrices.
- [**mlr**](https://cran.r-project.org/web/packages/mlr/index.html): Similar to caret, this is a universal framework for model training.
- [**h2o**](https://cran.r-project.org/web/packages/h2o/index.html)**,** [**mltools**](https://cran.r-project.org/web/packages/mltools/index.html): A distributed machine learning framework, with a community version and a commercial version that includes a AutoML implementation.
- [**rstudio/keras**](https://keras.rstudio.com/): Keras implementation in R, go Deep Learning!
- [**fastglm**](https://github.com/jaredhuling/fastglm), [**speedglm**](https://cran.r-project.org/web/packages/speedglm/speedglm.pdf): faster version of GLM libraries.
- [**iml**](https://cran.r-project.org/web/packages/iml/index.html): interpretable machine learning: [Book](https://christophm.github.io/interpretable-ml-book/agnostic.html)
- [**tidymodels**](https://github.com/tidymodels/tidymodels): tidymodels: a collection of tidyverse style machine learning / statistical modeling package.
- [**SHAPforxgboost**](https://cran.r-project.org/web/packages/SHAPforxgboost/index.html): shap values diagnostics for xgboost

## Class Imbalance

- [**smotefamily**](https://cran.r-project.org/web/packages/smotefamily/index.html)**:** Synthetic oversampling methods for class imbalance problems.
- [**MatchIt**](https://cran.r-project.org/web/packages/MatchIt/MatchIt.pdf): Mentioned in causal inference, I feel this package also worthy of another nomination here to generate samples with balanced covariates.
- [**upclass**](https://cran.r-project.org/web/packages/upclass/index.html): Recently archived by CRAN, this is another package to synthesize minority samples.

## Graph Analysis

- [**igraph**](https://cran.r-project.org/web/packages/igraph/index.html): The most comprehensive graph library for R — summary statistics, distances, community structure, clustering, visualization layout algos — you name it! Must have.
- [**qgraph**](https://cran.r-project.org/web/packages/qgraph/index.html): Contains various methods for graph data viz.
- **network**: a companion package for igraph
- **tidygraph**: A tidyverse based visualization package
- **ggraph**: ggplot based network viz
- **visNetwork:** some way to visualize networks
- **networkD3:** D3 based networks

## Optimization

- [**BB**](https://cran.r-project.org/web/packages/BB/index.html): Solving large systems of linear and nonlinear equations. Very fast and handy.

## Imputations

- [**VIM**](https://cran.r-project.org/web/packages/VIM/VIM.pdf): Visualization and Imputation of missing values. Swiss-knife package.
- [**mice**](https://cran.r-project.org/web/packages/mice/mice.pdf)**,** [**Amelia**](https://cran.r-project.org/web/packages/Amelia/Amelia.pdf): Methods for multivariate imputation. The idea is to borrow as much _neighbor_ data as possible to improve imputation accuracy.
- [**missForest**](https://stat.ethz.ch/education/semesters/ss2012/ams/paper/missForest_1.2.pdf): One of the model based approach — we can use missing value as the response variable and fit a model with the rest of variables, and hence make imputations.
- [**mi**](https://github.com/cran/mi)**,** [**mitools**](https://github.com/cran/mitools): Some older packages for missing value imputation.

## Simulations

- [**randomizeR**](https://cran.r-project.org/web/packages/randomizeR/index.html): Randomization for clinical trials.
- [**MonteCarlo**](https://www.r-bloggers.com/introducing-the-montecarlo-package/): Name explains it, a package for MonteCarlo simulation.

## Bioinformatics

- [**paircompviz**](http://bioconductor.org/packages/release/bioc/html/paircompviz.html)**:** A bioconductor package for visualizing multiple testing comparisons.
- [**msa**](https://bioconductor.org/packages/release/bioc/html/msa.html): Multiple sequence alignment procedures for DNA/RNA/Protein sequence alignment. The transition matrix maybe redefined for custom sequence typed data.
- [**Biostrings**](http://bioconductor.org/packages/release/bioc/html/Biostrings.html)**:** Efficient library for Biological Strings, it may be extended to custom character sets.

## DataSets

- [**gender**](https://cran.r-project.org/web/packages/gender/index.html): Guesstimate gender from _English_ names, producing probabilities
- [**babynames**](https://cran.r-project.org/web/packages/babynames/index.html): U.S. babynames over years from census data. I used this package to understand time-varying name popularity when I was trying to name my daughter
- [**gcookbook**](https://cran.r-project.org/web/packages/gcookbook/index.html): This package contains data for the book [_R Graphics Cookbook_](http://shop.oreilly.com/product/0636920023135.do)_;_ I found it useful for testing visualization tools and it came with a few handy utility functions out-of-the-box.
- [**wbstats**](https://cran.r-project.org/web/packages/wbstats/index.html): This packages offers programmatic access to World Bank Data, such as GDP, income, crime rate, education, demographics, at various geo-granularity
- [**wdi**](https://www.r-project.org/nosvn/pandoc/WDI.html): easy to use worldbank data

## Developer Tools

- [**wrapr**](https://cran.r-project.org/web/packages/wrapr/index.html): this package can be used to debug pipe **(%>%)** functions
- [**validate**](https://cran.r-project.org/web/packages/validate/index.html): this package comes with a rich set of functions to validate function arguments, can be used in the backend of web services such as [_plumber_](https://www.rplumber.io/)

## Dashboard / Interactive Viz

- [**R/Shiny**](https://cran.r-project.org/web/packages/shiny/index.html): I am not a big fan of shiny but it’s a handy alternative to Tableu for creating quick interactive data visualization dashboards.
- [**htmlwidgets**](https://cran.r-project.org/web/packages/htmlwidgets/index.html): A great companion to shiny, providing many interactive tools to visualize tabular / time-series / geo-spatial data
- [**dygraphs**](https://www.htmlwidgets.org/showcase_dygraphs.html): One of the best package to visualize time-series data interactively; you may plot multiple series simultaneously and decorate a variety of annotations
- [**DataTables(DT)**](https://www.htmlwidgets.org/showcase_datatables.html): A simple wrapper to convert a R dataframe into an interactive data table with sorting and filtering capabilities
- [**leaflet**](https://www.htmlwidgets.org/showcase_leaflet.html): Best package to visualize geo-spatial data although I found the integration into Jupyter notebook can be quite clumsy
- [**golem**](https://cran.r-project.org/web/packages/golem/index.html): Robust shiny applications framework

## Parallel Computing

- [**foreach**](https://cran.r-project.org/web/packages/foreach/index.html): Arguably the much more robust version of for loops, supports a couple of parallel processing frameworks with (**_%dopar%)_** syntax. I found it less performant than [mclapply from parallel](https://stat.ethz.ch/R-manual/R-devel/library/parallel/html/mclapply.html) but I like its error handling and flexibility.
- **mclapply**: My Go-to function now for single box parallelization if the output can be condensed in list/arrays.
- **parallel, snow**: Various parallel backends can be used in mclapply / foreach.

## IO

- [**readr**](https://cran.r-project.org/web/packages/readr/index.html): If you are still using the built in read.csv … don’t. This package is so much superior and easy to use. Can’t live without.
- [**readxl**](https://readxl.tidyverse.org/): Even i don’t have memory of last time that I worked on an Excel file (everything is Google Sheets now), knowing there’s someway to read directly from Excel is great, especially when that file contains multiple sheets.
- [**jsonlite**](https://cran.r-project.org/web/packages/jsonlite/index.html): No need to explain, you need someway to parse JSON
- [**xml2**](https://cran.r-project.org/web/packages/xml2/index.html): Though XML is becoming a thing of the past, knowing it’s still supported offers me a peace of mind.
- [**rDrop**](https://github.com/karthik/rDrop): Conveniently read file directly from Dropbox.

## Utility/Web Service

- [**pryr**](https://github.com/hadley/pryr): Methods to peek under the hood of R objections and functions.
- [**devtools**](https://cran.r-project.org/web/packages/devtools/index.html): Developer tools if you are into R development.
- [**plumber**](https://cran.r-project.org/web/packages/plumber/index.html), [**httr**](https://cran.r-project.org/web/packages/httr/index.html): Packages for setting up http services and sending http requests.
- [**glue**](https://cran.r-project.org/web/packages/glue/index.html): A very handy tool to format string with multiple variables (equivalent to python’s string.format), I found it super handy for generating SQLs or debugging messages
- [**memo**](https://cran.r-project.org/web/packages/memo/index.html): An awesome implementation of lru cache, works great with http service such as plumber
- [**reticulate**](https://cran.r-project.org/web/packages/reticulate/index.html): Allows R to directly access python libraries and objects, if you are dual-wielding!
- [**roxygen2**](https://cran.r-project.org/web/packages/roxygen2/index.html): Generate R docs from inline annotations.
- **testthat**: Unit testing package for R
- [**knitr**](https://yihui.name/knitr/)**,** [**bookdown**](https://bookdown.org/yihui/bookdown/): Create HTML reports from R markdowns.
- [**packrat**](https://cran.r-project.org/web/packages/packrat/index.html): A R dependency management system.
- [**IRdisplay**](https://cran.r-project.org/web/packages/IRdisplay/IRdisplay.pdf): Used to display images / text in Jupyter with R kernel

## Other Resources

- Automated Exploratory Data Analysis: this [github repo](https://github.com/mstaniak/autoEDA-resources) lists many tools to expedite data exploration process.

## Reference

- [Originally published at Medium](https://medium.com/data-science/a-comprehensive-list-of-handy-r-packages-e85dad294b3d)