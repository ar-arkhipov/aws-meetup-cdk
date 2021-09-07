import * as cdk from '@aws-cdk/core';
import { AwsMeetupCdkStack } from '../lib/aws-meetup-cdk-stack';

export class PipelineStage extends cdk.Stage {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props);

        new AwsMeetupCdkStack(this, 'my-stack');
    }
}