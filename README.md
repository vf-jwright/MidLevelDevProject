# MidLevelDevProject

![Kiku](MidLevelDevProject.png)

## Deployment
    1. [Deploy CDK Stack] - Lambda that converts phone numbers to vanity numbers and save the best 5 resulting vanity numbers and the caller's number in a DynamoDB table. (https://github.com/jrwright121/MidLevelDevProject/tree/main/cdkStackforLambdaDynamoDb)

    2. [Deploy Connect Contact Flow] - Amazon Connect contact flow that looks at the caller's phone number and says the 3 vanity possibilities that come back from the Lambda function (https://github.com/jrwright121/MidLevelDevProject/tree/main/connectContactFlow)

    3. [Writing and Documentation] (https://github.com/jrwright121/MidLevelDevProject/tree/main/writingDocumentation)
        * Record your reasons for implementing the solution the way you did, struggles you faced and problems you overcame.
        * What shortcuts did you take that would be a bad practice in production?
        * What would you have done with more time?
