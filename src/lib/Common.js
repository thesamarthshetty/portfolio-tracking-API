const { counter } = require('../mongoDb/Schema');

const authSequenceIncrementer = async (key) => {
    try {
        const sequenceCount = await counter.findOneAndUpdate(
            { key: key },
            { $inc: { value: 1 } },
            { new: true, upsert: true } // Create a new document if it doesn't exist
        );

        return sequenceCount?.value || 1;
    } catch (error) {
        console.error("Error in authSequenceIncrementer:", error);
        throw error;
    }
}

const calculateHoldings= async(trades)=> {
    const holdings = {};
    //looping through each trade 
    trades.forEach(trade => {
        //getting stockId
        const stockId = trade.stock.id;

        //check if the stockId is already there if its not there we will append it initally value as 0
        if (!holdings[stockId]) holdings[stockId] = { quantity: 0, totalCost: 0, avgPrice: 0 };
        // we bill update the quantity,totalCost,avgPrice  on the basis of buy or sell
        if (trade.type === 'buy') {
            holdings[stockId].quantity += trade.quantity;
            holdings[stockId].totalCost += trade.quantity * trade.price;
            holdings[stockId].avgPrice = holdings[stockId].totalCost / holdings[stockId].quantity;
        } else if (trade.type === 'sell') {
            holdings[stockId].quantity -= trade.quantity;
            holdings[stockId].totalCost -= trade.quantity * holdings[stockId].avgPrice;
            holdings[stockId].avgPrice = holdings[stockId].totalCost / holdings[stockId].quantity;
        }
    });
    return holdings;
}

const calculateReturns = async(trades)=> {
    const holdings = await calculateHoldings(trades);
    let initialInvestment = 0;
    let finalValue = 0;
    for (const stockId in holdings) {
        // sum up the initial investment
        initialInvestment += holdings[stockId].totalCost;
         // calculate the final value assuming a fixed final price of 100
        finalValue += holdings[stockId].quantity * 100; 
    }
    //caliculating cumulative return percentage
    return ((finalValue - initialInvestment) / initialInvestment) * 100;
}

const validStockIds = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];

module.exports = { authSequenceIncrementer, calculateHoldings, calculateReturns, validStockIds };
