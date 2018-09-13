const { execSync } = require('child_process');
const EOL = require('os').EOL;
const AWS = require('aws-sdk');
const roleArn = process.argv[2];
const durationSeconds = process.argv[3] || 3600;
const roleSessionName = process.argv[4] || "hack";
const params = {
  DurationSeconds: durationSeconds,
  RoleArn: roleArn,
  RoleSessionName: roleSessionName,
};

execSync("unset AWS_ACCESS_KEY_ID");
execSync("unset AWS_SECRET_ACCESS_KEY");
execSync("unset AWS_SESSION_TOKEN");

const sts = new AWS.STS();
sts.assumeRole(params).promise()
  .then((response) => {
    console.log(
      [
        '#!/bin/bash',
        "unset AWS_ACCESS_KEY_ID;",
        "unset AWS_SECRET_ACCESS_KEY;",
        "unset AWS_SESSION_TOKEN;",
        `export AWS_SECRET_ACCESS_KEY=${response.Credentials.SecretAccessKey};`,
        `export AWS_ACCESS_KEY_ID=${response.Credentials.AccessKeyId};`,
        `export AWS_SESSION_TOKEN=${response.Credentials.SessionToken};`,
      ].join(EOL)
    );
  })
  .catch((error) => {
    console.error(error);
  })
;

