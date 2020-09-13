exports.get = async (client,key,table,attributes,) => {
  
  const dbRequest = {
    Key: key,
    TableName: table
  }

  if (attributes){
      dbRequest['AttributesToGet'] = attributes
  }

  return client.get(dbRequest).promise()
}

exports.queryByOneKey = (client,hashKey,limit,table) => {

  const params = {	  
  TableName: table,
          KeyConditionExpression: "#hashKey = :hashKey",
            ExpressionAttributeNames:{
                "#hashKey": "hashKey"                 
            },
            ExpressionAttributeValues: {
                ":hashKey": hashKey
            },              
  }

  if (limit){
    params['Limit'] = limit
  }

  return  client.query(params).promise()
}

exports.query = (client,hashKey,sortKey,limit,table) => {

const params = {	  
  TableName: table,
  KeyConditionExpression: "#hashKey = :hashKey and #sortKey = :sortKey",
  ExpressionAttributeNames:{
    "#hashKey": "hashKey",
    "#sortKey": "sortKey",

          },
          ExpressionAttributeValues: {
              ":hashKey": hashKey,
              ":sortKey": sortKey,
          },            
}

if (limit){
  params['Limit'] = limit
}

return  client.query(params).promise()
}

exports.queryByIndex = (client,hashKey,indexKey,indexValue,index,table) => {

//  console.log(client,hashKey,indexKey,indexValue,index,table)

const params = {	  
  TableName: table,
  IndexName: index,
  
          KeyConditionExpression: "#hashKey = :hashKey and #index = :index",
            ExpressionAttributeNames:{
                "#hashKey": "hashKey",
                "#index": indexKey,

            },
            ExpressionAttributeValues: {
                ":hashKey": hashKey,
                ":index": indexValue
            },

            ScanIndexForward: false, 
            
  }
return  client.query(params).promise()
}



exports.put = (client,body,table) => {

const dbRequest = {	  
      TableName: table,
      
      Item : body
        
  }
return  client.put(dbRequest).promise()
}

exports.delete = async (client,key,table) => {

const dbRequest = {
  Key: key,
  TableName: table
}

return client.delete(dbRequest).promise()
}


exports.scan = async (client,indexName,table) => {

const params = {
  TableName: table
}

if (indexName) {
  params['IndexName'] = indexName
}

return client.scan(params).promise()
}



