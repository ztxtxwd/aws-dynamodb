import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand
} from '@aws-sdk/client-dynamodb';
const md5 = require('md5');

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  },
  region: process.env.REGION
});

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { Item } = await client.send(
      new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          id: { S: req.body.id },
          cn: { S: req.body.cn }
        }
      })
    );

    return res.status(201).json(Item);
  }

  if (req.method === 'GET') {
    const { Item } = await client.send(
      new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: req.query.id }
        }
      })
    );

    return res.status(200).json(Item?Item.cn:{});
  }

  if (req.method === 'POST') {
    const { Attributes } = await client.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: req.body.id }
        },
        UpdateExpression: 'set cn = :c',
        ExpressionAttributeValues: {
          ':c': { S: req.body.cn }
        },
        ReturnValues: 'ALL_NEW'
      })
    );

    return res.status(200).json(Attributes);
  }

  if (req.method === 'DELETE') {
    await client.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: req.body.id }
        }
      })
    );

    return res.status(204).json({});
  }
}
