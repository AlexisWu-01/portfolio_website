# Portfolio Optimization with Stock Price Prediction
<!-- - [Executive Summary](#executive-summary)
- [Background](#background)
- [Data Resource](#data-resource)
- [Formulation](#formulation)
- [Results](#results)
- [Conclusions](#conclusions) -->

## Executive Summary:

In this project, we aim to provide a forward-looking tool for optimizing investment allocation for a given portfolio by utilizing the LSTM neural network to predict future stock prices and employing a Sharpe ratio maximization strategy to balance return requirements and risk aversion. This model takes into account a selection of prices from various industries including Apple, General Motors, Starbucks, and Tesla. These companies represent stocks from well-performing industries, allowing us to diversify some unsystematic risks. We extract data from Yahoo Finance for the past year to perform our modeling. The portfolio optimization model leverages the Monte Carlo method to generate random weight distribution for the 4 stocks, calculating the annualized return and standard deviation (volatility in finance) for each of the allocations, then choosing the maximum Sharpe ratio as the investment strategy. The LSTM neural network is used in the prediction process to forecast stock prices, achieving an explained variance score of 0.99 (where 1 is the best). By combining these two models, we can generate multi-stage portfolio optimization strategies.

## Background
### Finance perspective:
We use the closing prices of stocks as the measure of return. We employ annualized return, volatility, and Sharpe ratio for calculation. Here we used log daily return rather than arithmetic return, because the latter is not symmetric.
$$ \text{return} = ln(\frac{FV}{PV}) $$
$$ \text{standard deviation} = \sum w_i^2\sigma _i ^2 + 2\sum_{i\neq j}w_i w_j cov_{i,j}$$
$$ \text{sharpe ratio} = \frac{\text{return}}{\text{stdev}} $$

Sharpe ratio is to measure the return earned to volatility. It is a good measurement for investors to know how much excess return they are earning compared to the risk they take on the investment. If the ratio is smaller than 1, then the investment should be a bad decision as the risk grows faster than the return.

### Stakeholders and Needs:
#### Stakeholders
- Ammature investors seeking to adjust/ optimize their investment portfolio in stock market.
- Professional investors like mutual fund managers looking for some suggestions for in investment structure and even fund allocation.

#### Needs: 
- Easy operation: User do not need to tune the parameters by themselves.
- Reliability: It's real money.
- Availability : The results and suggestions should be easily understandable to users.

### Data Resource:
We pull historical stock data from Yahoo finance. In this model I chose 4 stocks:`Apple (APPL), General Motors (GM), Starbux (SBUX), Tesla (TSLA)` and used their `[High, Low, Open, Close, Volume, Adj Close, Trading Volumes]` in the past year (252 trading days) for both parts of the model.

For portfolio allocation optimization we used the closing price to measure daily return, volatility and the sharpe ratio. For closing price prediction we used all variables except for closing price as training features to predict closing price. Therefore the two models should be suitable for long-term investment and adjust the portfolio as multistage rather than quick selling operation in stock market.

Here is set of images of the closing prices in the past year of the four selected stocks.

![Closing Price of the Year](portfolio_img/closing_price.png)

## Formulation
### Portfolio Allocation Optimization
#### Optimization Problem
- sr: sharpe ratio
- ret: daily log return
- w1,w2,w3,w4: allocation weights on the 4 stocks of choice
- vol/ stdev: volatility/ standard deviation on daily returns

$$ \text{maximize sr}=\frac{\text{return}}{\sigma _{ret}} $$
$$ \text{s.t.}$$
$$ w1+w2+w3+w4=1  $$
$$ 0\leq w1,w2,w3,w4 \leq 1 $$
$$\text{daily return}=ln(\frac{\text{closing price on that day}}{\text{closing price on Day 0}})$$ 
$$ \text{standard deviation} = \sum w_i^2\sigma _i ^2 + 2\sum_{i\neq j}w_i w_j cov_{i,j}$$
$$cov_{i,j} = \frac{corr(ret_i,ret_j)}{\sigma_{ret_i}\times\sigma_{ret_j}}$$

#### Modeling Details
##### Data Exploration
- Histgram on daily returns

![Daily Return Histogram](portfolio_img/daily_histogram.png)

- Correlation of daily returns between different stocks
  
![Stocks Correlation](portfolio_img/correlation.png)
We can see that the 2 tech stocks - Apple and Tesla are the most correlated and it makes perfect sense.
#### Monte-Carlo Simulations on weights allocation generation
```
md_random_weights = (
    gr.Model('weights')
    
    >>gr.cp_vec_function(
        fun = lambda df: gr.df_make(
        s = df.w1+df.w2+df.w3+df.w4
        ),
        var = ['w1','w2','w3','w4'],
        out = ['s']
    )
    

    >> gr.cp_marginals(
        w1={"dist": "uniform", "loc": 0, "scale": 1},
        w2={"dist": "uniform", "loc": 0, "scale": 1},
        w3={"dist": "uniform", "loc": 0, "scale": 1},
        w4={"dist": "uniform", "loc": 0, "scale": 1},
    )
    
    >> gr.cp_copula_independence()
)
md_random_weights.printpretty()
```
```
model: weights

  inputs:
    var_det:
    var_rand:
      w1: (+0) uniform, {'loc': 0, 'scale': 1}
      w2: (+0) uniform, {'loc': 0, 'scale': 1}
      w3: (+0) uniform, {'loc': 0, 'scale': 1}
      w4: (+0) uniform, {'loc': 0, 'scale': 1}
    copula:
        Independence copula
  functions:
    f0: ['w1', 'w2', 'w3', 'w4'] -> ['s']
```

We used uniform distribution for the 4 random weights because we need uniform distribution to equally explore the best weight allocation.

Then we perform a monte carlo simulation with `n=1e4` to generate 4 random numbers and then transform them into percentage where they sum to 1.

Then for each set of weights, we calculate the annualized return, standard deviation and then the sharpe ratio. Then we can choose the exact set of combination where the maximum sharpe ration is achieved. 

We can also find the efficient frontier of this portfolio during the monte carlo process. (The highest feasible expected returns in the same portfolio given different risk level.)

![Efficient Frontier of Portfolio](portfolio_img/efficient_frontier.png)

The red dot is the maximum sharpe ration point and the effient frontier is the curve on the left boarder. The best sr we could give in the past year is about 2.8 which is indeed pretty good. 

#### Model Validation
I used scipy minimize optimizer `SLSQP` with the same boundaries and got the same result.

![Validation Result](portfolio_img/model_result.png)

#### Limitations 
- This model cannot account for portfolios with more than 4 assets due to the way of construction.
### Results
We could see the plot from different allocations shown above and the final numerically best result. Technically there could be multiple maximum sharpe ratio on the effiecient frontier jand when that happens, our investor would have to decide between proportionally higher return and lower risk. As we all thought tech stocks especially like apple and tesla should perform better, to out surprise we should put (about) half of money in General Motors in the past year to achieve highest sharpe ration.

### Stock Price Prediction
The stock price prediction does not involve uncertainity modeling but serve as a tool for gaining insights on future stock price. Therefore we are going brief on this part. 
#### Optimization Problem
$$ \text{minimize MSE between predicted and true closing price} $$
There aren't really constraints as we are using neural network.

#### Modeling Details
- Feature Engineering/ Data Preprocessing <br>
As in the data exploration part, there are correlation between stock prices, therefore we are using one model for stock price prediction.
To teach the model to distinguish differest stocks, we first tranform company name into labelencoders. Then we use the first 7 months in the past year for training and the recent 3 months for testing. We use MinMaxScaler to transform all data into range 0-1.

- Neural Network<br>
    We used a one-layer LSTM with 50 unites and `adam` optimizer.

- Results <br>
We can see from the below figure that the prediction is quite accurate.
We also achieved explained_variance_score of 0.995 out of 1. 

![Prediction Result](portfolio_img/ml_result.png)

- Limitations <br>
    - We could not utilize closing price from previous time due to the nature of neural network (the model could have learned to match closing price to the prediction only.)
    - Extra information of that day (High, low) is required for closing price prediction. For this part I should look more into financial knowledge to improve this part.
## Conclusions
Both models perform remarkably well based on our measurements, and they execute within a relatively short time. The model can offer direct output to amateur investors who might struggle with interpreting complex information in the financial market, and provide more detailed insights for professional users such as stock price prediction and the efficient frontier for a given portfolio. Users do not need to fine-tune parameters for models; they only need to select stocks of their choice. The limitation at this moment is that only 4-asset portfolios are supported. However, fewer assets are also acceptable by setting one column of the dataframe/weight to 0. This constraint is primarily code-wise; the construction of the model is not affected.



- What insights did you learn about designing for your chosen context and stakeholders? <br>
The design process highlighted that for my stakeholder, the output or the presentation of the suggestion is more important than the model itself because they are less concerned with the mathematical or coding aspects. The model, in this case, requires a solid understanding of financial background rather than just programming skills. Nevertheless, the Monte Carlo simulation is extremely useful in portfolio optimization, not just for Sharpe ratio maximization as demonstrated in this model.

- What design decisions would you make? <br>
1. I realized that interface interaction is more user-friendly compared to typing in this model application and plan on making changes accordingly.
2. Multiple optimization techniques should also be made available in the future, building on the current Monte Carlo simulation.
3. Ideally, I would like to include multi-stage investment suggestions, but this would require different input from the user, such as selling points and maximum risk tolerance.

