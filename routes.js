const AWS = require('aws-sdk');
const express = require('express');
const uuid = require('uuid');
const IS_OFFLINE = process.env.NODE_ENV !== 'production';
const MEALS_TABLE = process.env.TABLE;
const dynamoDb = IS_OFFLINE === true ?
    new AWS.DynamoDB.DocumentClient({
        region: 'us-east-1',
        endpoint: 'http://127.0.0.1:8080',
    }) :
    new AWS.DynamoDB.DocumentClient();

const router = express.Router();

router.get('/meals', (req, res) => {
    const params = {
        TableName: MEALS_TABLE
    };
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error fetching the meals' });
        }
        res.json(result.Items);
    });
});
