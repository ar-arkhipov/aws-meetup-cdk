import * as cdk from '@aws-cdk/core';
import { Artifact } from '@aws-cdk/aws-codepipeline';
import { GitHubSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';

import { PipelineStage } from './pipeline-stage';

export class PipelineStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const sourceArtifact = new Artifact();
        const cloudAssemblyArtifact = new Artifact();

        const pipeline = new CdkPipeline(this, 'master-pipeline', {
          pipelineName: 'master-pipeline',
          crossAccountKeys: false,
          cloudAssemblyArtifact,

          sourceAction: new GitHubSourceAction({
            actionName: 'GitHub',
            output: sourceArtifact,
            oauthToken: cdk.SecretValue.secretsManager('github-token'),
            owner: "ar-arkhipov",
            repo: 'aws-meetup-cdk',
            branch: 'master'
          }),

          synthAction: SimpleSynthAction.standardNpmSynth({
            sourceArtifact,
            cloudAssemblyArtifact
          })
        });

        const stage = new PipelineStage(this, 'prod');
        pipeline.addApplicationStage(stage, { manualApprovals: true })
    }
}