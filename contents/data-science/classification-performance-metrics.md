---
comments: true
---

# Classification Model Performance Metric

## Precision and Recall

Precision and recall are two fundamental metrics used to evaluate the performance of classification models in machine learning, especially in scenarios where the distribution of classes is imbalanced or the cost of false positives and false negatives varies significantly. Understanding these metrics intuitively helps in assessing the trade-offs between identifying relevant instances and minimizing irrelevant or incorrect identifications.

### Precision (Positive Predictive Value)

**Formal Definition:** Precision is the ratio of true positives (relevant instances correctly identified) to the sum of true positives and false positives (irrelevant instances incorrectly identified as relevant). It answers the question, "Of all the instances the model identified as positive, how many are actually positive?"

The formula for precision is:

$$
Precision=\frac{TP}{TP+FP}
$$​

Where:

- $TP$ is the number of true positives, i.e., the instances correctly identified as positive,
- $FP$ is the number of false positives, i.e., the instances incorrectly identified as positive.

A high precision indicates that the model is reliable in its positive classifications, making it particularly important in scenarios where the cost of a false positive is high, such as in spam detection where legitimate emails mistakenly classified as spam (false positives) are undesirable.

#### Example R code

```R
library(yardstick)

prec <- precision(data, truth, estimate)
# data = a dataframe # truth = The column identifier for the true class results (that is a `factor`) # estimate = The column identifier for the predicted class results (that is also `factor`)
```

**Intuitive Explanation:** Imagine you're fishing with a net that's designed to catch a specific type of fish. Precision measures how good your net is at catching only the type of fish you want. Every time you pull the net out of the water, you check how many of the caught fish are the type you're after. If you catch 100 fish and 90 of them are the type you wanted, your precision is 90%. The higher the precision, the better you are at catching only the fish you want, but you might be missing out on many others because you're focused on minimizing what you catch that you don't want.

### Recall (Sensitivity)

**Formal Definition:** Recall is the ratio of true positives to the sum of true positives and false negatives (relevant instances incorrectly identified as irrelevant). It answers the question, "Of all the actual positive instances, how many did the model identify?"

The formula for recall is:

$$
Recall=\frac{TP}{TP+FN}
$$​

Where:

- $FN$ is the number of false negatives, i.e., the instances incorrectly identified as negative.

A high recall indicates that the model is capable of identifying a large proportion of the positive instances, which is crucial in cases where missing a positive instance is costly, such as in disease screening where failing to identify a sick patient (a false negative) can have serious consequences.

#### Example R code
```R
library(yardstick)

prec <- recall(data, truth, estimate)
# data = a dataframe # truth = The column identifier for the true class results (that is a `factor`) # estimate = The column identifier for the predicted class results (that is also `factor`)
```

**Intuitive Explanation:** Using the fishing analogy, recall measures how good your net is at catching all instances of the fish you're after in the entire lake. If there are 100 of your desired fish in the lake and your net catches 80 of them, your recall is 80%. A high recall means you're good at catching most of the fish you want, but you might also catch a lot of other fish you don't want (since you're not focusing on precision).

### Relationship Between Precision and Recall

The relationship between precision and recall is often a trade-off. Improving precision typically reduces recall and vice versa. This trade-off is because as you become more stringent in your criteria to improve precision (catching only the fish you want), you might leave behind more of the fish you're interested in (reducing recall). Conversely, if you cast a wider net to catch more of your desired fish (improving recall), you're likely to catch more of what you don't want, reducing precision.

In machine learning, this trade-off is navigated using various techniques, such as adjusting the threshold of a classifier, to find an optimal balance that suits the specific requirements of the application. The F1 score is one such metric used to find a balance, as it is the harmonic mean of precision and recall, encouraging models to balance the two metrics rather than optimizing one at the expense of the other.

## Balanced Accuracy

Balanced accuracy in machine learning is a metric used to evaluate the performance of classification models, particularly in situations where the classes are imbalanced. Imbalanced classes occur when the number of instances in each class is not roughly equal, leading to a scenario where a model might predict the majority class for all instances and still achieve high accuracy. This is misleading because the model's ability to correctly predict the minority class instances, which are often of greater interest, might be very poor.

Balanced accuracy addresses this issue by calculating the average of recall obtained on each class. Recall, also known as sensitivity, measures the ability of the model to correctly identify all relevant instances for a given class. In the context of a binary classification problem, the formula for balanced accuracy can be expressed as:

$$
Balanced Accuracy = \frac{1}{2}\lgroup\frac{TP}{TP + FN} + \frac{TN}{TN + FP}\rgroup
$$

Where:

- $TP$ is the number of true positives (correctly predicted positive instances),
- $TN$ is the number of true negatives (correctly predicted negative instances),
- $FP$ is the number of false positives (incorrectly predicted as positive),
- $FN$ is the number of false negatives (incorrectly predicted as negative).

For multi-class classification problems, the balanced accuracy is generalized as the average of recall obtained on each class, which accounts for the performance of the model across all classes equally, irrespective of their size.

Balanced accuracy is particularly useful because it provides a more fair evaluation of model performance across all classes, making it a valuable metric in fields like medical diagnosis, fraud detection, and any domain where the cost of false negatives is high or the class distribution is significantly skewed.

### Example R code to calculate balanced accuracy

```R
library(yardstick)

ba <- bal_accuracy(data, truth, estimate)
# data = a dataframe
# truth = The column identifier for the true class results (that is a `factor`)
# estimate = The column identifier for the predicted class results (that is also `factor`)
```

## F1 Score

The F1 score in machine learning is a metric used to evaluate the performance of classification models, particularly in situations where the balance between precision and recall is important. It is especially useful in cases where the classes are imbalanced or when the cost of false positives and false negatives is high. The F1 score is the harmonic mean of precision and recall, providing a single measure that balances both concerns.

Precision and recall are defined as follows:

- **Precision** (also known as positive predictive value) measures the accuracy of the positive predictions made by the model, i.e., the proportion of positive identifications that were actually correct. It is defined as the number of true positives divided by the sum of true positives and false positives.
- **Recall** (also known as sensitivity) measures the ability of the model to identify all relevant instances correctly, i.e., the proportion of actual positives that were identified correctly. It is defined as the number of true positives divided by the sum of true positives and false negatives.

The formula for the F1 score is:

$$
F1 = 2 \times \lgroup\frac{precision \times recall}{precision + recall}\rgroup
$$

This formula can also be expressed in terms of true positives ($TP$), false positives ($FP$), and false negatives ($FN$) as:

$$
F1 = 2 \times \lgroup\frac{TP}{2TP+FP+FN}\rgroup
$$

The F1 score ranges from 0 to 1, where 1 indicates perfect precision and recall, and 0 indicates the worst. An F1 score might be more informative than accuracy, especially in cases with an uneven class distribution. A high F1 score suggests that the classifier has a good balance between precision and recall and that it performs well across both positive and negative instances. It's particularly valuable when the costs of false positives and false negatives are critical to consider in the model evaluation.

### Example R code to calculate F1 score
```R
library(yardstick)

f1 <- f_meas(data, truth, estimate)
# data = a dataframe
# truth = The column identifier for the true class results (that is a `factor`)
# estimate = The column identifier for the predicted class results (that is also `factor`)
```

## Matthews Correlation Coefficient
The Matthews Correlation Coefficient (MCC) is a metric used in machine learning to evaluate the quality of binary classifications. It provides a high-level overview of the performance of a classification model, taking into account true and false positives and negatives. Unlike simpler metrics like accuracy, the MCC is often regarded as a balanced measure that can be used even when the classes are of very different sizes.

The MCC is essentially a correlation coefficient between the observed and predicted classifications; it returns a value between -1 and +1. A coefficient of +1 represents a perfect prediction, 0 indicates no better than random prediction, and -1 indicates total disagreement between prediction and observation. The formula for the MCC is:

$$
MCC=\frac{(TP×TN)−(FP×FN)}{\sqrt{(TP+FP)×(TP+FN)×(TN+FP)×(TN+FN)}}
$$

Where:

- $TP$ is the number of true positives,
- $TN$ is the number of true negatives,
- $FP$ is the number of false positives,
- $FN$ is the number of false negatives.

### Why Use MCC in Machine Learning?

1. **Balanced Evaluation:** The MCC takes into account all four values of the confusion matrix $(TP, TN, FP, FN)$, making it a balanced measure that is suitable for evaluating binary classification problems with imbalanced datasets. It does not get artificially high when the model simply predicts the majority class.
    
2. **Interpretability:** The value of the MCC directly corresponds to the quality of the classification. A score near +1 indicates a model that performs well across all categories, while a score near -1 indicates a model that is performing poorly. A score around 0 suggests a model that is no better than random chance, which is straightforward for interpretation.
    
3. **Comprehensive:** Unlike precision, recall, or F1 score, which may need to be considered together to get a full picture of a model's performance, the MCC provides a single metric that incorporates all aspects of the classification performance.
    

### Usage in Machine Learning

- **Model Evaluation:** MCC is particularly useful when comparing models in binary classification tasks, especially in domains where the cost of different types of errors (false positives vs. false negatives) is significantly different, such as in medical diagnosis or fraud detection.
- **Feature Selection:** It can help in selecting features by evaluating how changes in the feature set affect the overall classification performance in a balanced way.
- **Threshold Tuning:** MCC can be used to find the optimal threshold for converting probabilistic predictions into binary classifications by maximizing the MCC score across different threshold values.

Overall, the Matthews Correlation Coefficient is a powerful tool for evaluating binary classification models, providing insights into their performance that are not captured by more simplistic metrics.

### Example R code to calculate MCC
```R
library(yardstick)

mcc_res <- mcc(data, truth, estimate)
# data = a dataframe
# truth = The column identifier for the true class results (that is a `factor`)
# estimate = The column identifier for the predicted class results (that is also `factor`)
```