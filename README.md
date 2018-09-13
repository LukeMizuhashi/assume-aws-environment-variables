# assume-aws-environment-variables

Sets a few of the AWS environment variables listed [here][2] with credentials from an assumed role. Useful when you need to use [Claudia.js][1] to administer AWS resources via a role assumed in one account by a user in an other account.

To use it, make sure you have a `~/.aws/credentials` or `~/.aws/config` file on your local machine with your user's credentials in it, download this repo, `npm install` it, and run the following from the repo root:

```bash
$ node src/main.js arn:aws:iam::[ Some AWS Account ID ]:role/[ some role that exists in that account ] > name-of-bash-script-youll-run-later.sh
```

`[ Some AWS Account ID ]` is the AWS Account ID of the account in which you want to work. ( vis. If you're using Claudia to administer AWS API Gateway settings, this is the ID of the account in which that API will be created. )

`[ some role that exists in that account ]` is the role that you will assume in that account.

Then, `source ./name-of-bash-script-youre-running-now.sh` in the environment where you want to set your newly acquired, temporary credentials.

If all goes well, `claudia create ...` will create resources in the account that belongs to `[ Some AWS Account ID ]`.

If you start getting expired-token errors, clear your environment variables and run `src/main.js` again.

   [1]: https://claudiajs.com/
   [2]: https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html
   
