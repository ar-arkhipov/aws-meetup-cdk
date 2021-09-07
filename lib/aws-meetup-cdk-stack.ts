import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as agw from '@aws-cdk/aws-apigateway';
import MyTables from './my-tables';

export class AwsMeetupCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const tables = new MyTables(this, 'my-tables');

    const crudLambda = new lambda.Function(this, 'crud-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('code/crud'),
      environment: {
        USERS_TABLE: tables.list.users.tableName,
        PRODUCTS_TABLE: tables.list.products.tableName
      }
    });

    Object.values(tables.list).forEach((table) => {
      table.grantReadWriteData(crudLambda);
    });

    const api = new agw.LambdaRestApi(this, 'api', {
      handler: crudLambda
    })
  }
}
