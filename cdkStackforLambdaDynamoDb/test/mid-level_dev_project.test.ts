import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as MidLevelDevProject from '../lib/mid-level_dev_project-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new MidLevelDevProject.MidLevelDevProjectStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
