#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipelineStack } from '../cicd/pipeline-stack';

const app = new cdk.App();
new PipelineStack(app, 'PipelineStack', {});
