
const express = require('express');
const yahooFinance = require('yahoo-finance');
const { Stock, Trade } = require('../mongoDb/portfolioSchema');
const { calculateHoldings, calculateReturns, validStockIds } = require('../lib/Common')


const getPortfolio = async ({ customerId }) => {
    try {
        //getting the trade and stock of the particular user who is logged in 
        const trades = await Trade.find({ customer: customerId }).populate('stock') || {};
        return { status: true, trades }
        //res.json({ success: true, data: trades });
    } catch (error) {
        return { status: false, message: error.message }
    }
}

const getHoldings = async ({ customerId }) => {
    try {

        const trades = await Trade.find({ customer: customerId }).populate('stock');
        //calculating the hloding of the user
        const holdings = await calculateHoldings(trades) || {};
        return { status: true, holdings }
        //res.json({ success: true, data: holdings });
    } catch (error) {
        return { status: false, message: error.message }
    }
};

const getReturns = async ({ customerId }) => {
    try {
        //getting the over all trade of the user and calicukating its return
        const trades = await Trade.find({ customer: customerId }).populate('stock');;
        const returns = await calculateReturns(trades) || {};
        return { status: true, returns }
        // res.json({ success: true, data: returns });
    } catch (error) {
        return { status: false, message: error.message }
    }
}

const addTrade = async body => {
    try {
        const { stockId, type, quantity, price, customerId } = body;
        // Validate stockId list
        if (!validStockIds.includes(stockId)) {
            return{ status: false, message: 'Invalid stock ID' };
        }
        //getting the stock is there or not in out database if it is not there then we will add it in database 
        let stock = await Stock.findOne({ id: stockId });
        if (!stock) {
            stock = new Stock({ id: stockId });
            await stock.save();
        }
        //creating the trade and storing it 
        const trade = new Trade({ customer: customerId, stock: stock._id, type, quantity, price, date: new Date().getTime()});
        
        await trade.save();
        return { status: true, message: 'trade added to your account' };
    } catch (error) {
        return { status: false, message: error.message }
    }
};

//updating the trade basis on the _id
const updateTrade = async body => {
    try {
        const { tradeId, type, quantity, price, date } = body;
        await Trade.findByIdAndUpdate(tradeId, { type, quantity, price, date });
        return { status: true, message: 'trade updated successfully' };
    } catch (error) {
        return { status: false, message: error.message }
    }
};
//deleting the trade basis on the _id
const removeTrade = async body => {
    try {
        const { tradeId } = body;
        await Trade.findByIdAndDelete(tradeId);
        return { status: true, message: 'trade updated successfully' };
    } catch (error) {
        return { status: false, message: error.message }
    }
};

module.exports = { getPortfolio, getHoldings, getReturns, addTrade, updateTrade, removeTrade } 