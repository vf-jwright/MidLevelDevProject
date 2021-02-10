#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MidLevelDevProjectStack } from '../lib/mid-level_dev_project-stack';

const app = new cdk.App();
new MidLevelDevProjectStack(app, 'MidLevelDevProjectStack');
