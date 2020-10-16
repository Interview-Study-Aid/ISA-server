const {DocumentClient} = require('aws-sdk/clients/dynamodb');

const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  }),
};

const ddb = new DocumentClient(config);

/////////////////////////
it('should insert user and get him from user table', async () => {
    await ddb
      .put({TableName: 'UserTable', Item: {userName: 'userName', userPassword: 'userPassword'}})
      .promise();
    const res = await ddb.get({TableName: 'UserTable', Key: {userName: 'userName',userPassword: 'userPassword'}}).promise();
  
    expect(res.Item).toEqual({
        userName: 'userName',
      userPassword: 'userPassword',
    });
  });

////////////////////////////////////
  it('should insert item into notes table', async () => {
    await ddb
      .put({TableName: 'NotesTable', Item:{
         userId:"userId",
        questionId: "questionID",
        note: "note"
    }})
      .promise();
    //   console.log('hereeeeeeeeeeeeeeeeeeeeee')
    // const res = await ddb.query( {TableName: "NotesTable",
    //     KeyConditionExpression: "#id = :id",
    //     ExpressionAttributeNames:{
    //         "#id": "userId"
    //     },
    //     ExpressionAttributeValues: {
    //         userId: "userId",
    //     }}).promise();


    console.log(res)
  
    // expect(res.note).toEqual({
    //     note: "note",
    // });
  });

