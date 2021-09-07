import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export default class MyTables extends cdk.Construct {
  readonly list: {
    [key: string]: dynamodb.Table;
  } = {};

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    this.list.users = new dynamodb.Table(this, 'users-table', {
      partitionKey: {
        name: "email",
        type: dynamodb.AttributeType.STRING
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    this.list.products = new dynamodb.Table(this, 'products-table', {
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
  }
}