import * as uuid from 'uuid';
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ExecuteStatementCommand
} from '@aws-sdk/client-dynamodb';

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
        TableName: process.env.TABLE_NAME_LIB,
        Item: {
          id: { S: uuid.v4() },
          content: { S: req.body.content }
        }
      })
    );

    return res.status(201).json({});
  }

  if (req.method === 'GET') {
    // const { Item } = await client.send(
    //   new GetItemCommand({
    //     TableName: process.env.TABLE_NAME_LIB,
    //     Key: {
    //       id: { S: req.query.id }
    //     }
    //   })
    // );
    const params = {
      Statement: "SELECT id,content from " + process.env.TABLE_NAME_LIB,
      // Parameters: [{ N: 1 }],
      Limit:1
    };
    try {
      const { Items }=await client.send(new ExecuteStatementCommand(params));
      await client.send(
        new DeleteItemCommand({
          TableName: process.env.TABLE_NAME_LIB,
          Key: {
            id: { S: Items[0].id.S }
          }
        })
      );
      if(Items[0].content.S==''||Items[0].content.S=='<empty/>'){
        console.log("收到一个空值")
        await handler(req, res)
      }else{
        return res.status(200).json(Items[0].content);
      }
    } catch (err) {
      console.error(err);
    }

    return res.status(200).json([]);
  }

  if (req.method === 'POST') {
    const { Attributes } = await client.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME_LIB,
        Key: {
          id: { S: req.body.id }
        },
        UpdateExpression: 'set content = :c',
        ExpressionAttributeValues: {
          ':c': { S: req.body.content }
        },
        ReturnValues: 'ALL_NEW'
      })
    );

    return res.status(200).json(Attributes);
  }

  if (req.method === 'DELETE') {
    await client.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME_LIB,
        Key: {
          id: { S: req.body.id }
        }
      })
    );

    return res.status(204).json({});
  }
}
