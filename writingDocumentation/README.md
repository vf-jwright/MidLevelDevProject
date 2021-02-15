# Welcome to Voice Foundry Writing and Documention:
## MidLevelDevProject!
 * Record your reasons for implementing the solution the way you did, struggles you faced and problems you overcame.
 * What shortcuts did you take that would be a bad practice in production?
 * What would you have done with more time?
 
I chose to deploy my Lambda Function and DynamoDb table with [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html). This provided me a quick CICD method to deploying my architecture. It allowed me to provision AWS services with code, in the same language as the actual code (Lambda Function). It also allowed me to provide one project within gitHub without me having to store resources in S3. It would also allow me to attach new resources to the project if I wanted to change strategies (ex: DynamoDb partition keys, or add a Lambda Layer). Also using environment variables was extremely handy, like referencing DynamoDb table name from the stack level.  

For me the infrastructure and Connect Contact Flow were fairly straight forward architectures, so the logic behind the Lambda was what gave me the most road block. Specifically the recursive function in utils/getAllVanityWords.ts. It took me some time to wrap my head around building all the possible combinations as it progressed through the digits in the phone number. 

I took a major shortcut by not testing any of my code. This is something I would have done with more time. Also, I would have created a Lambda Layer for the spell checking node package I used (utils/spellCheckVanityWords.ts), which would have reduced the time to deploy each time considerably. In addition I would have liked to use a code pipeline for the Lambda Function. This would provide additional features for code deployment reliability. I haven't quite figured out how to do that from AWS CDK yet but will be looking into that soon. I noticed AWS just released Lambda Applications deployed with CDK (did not use this feature), but it has CodePipeline as a part of it's CICD process.
