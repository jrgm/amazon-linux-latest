List the most recent Amazon Linux AMI by region/virtualization/storage

If someone can actually tell me the AWS API information to get this directly,
please do, but I cannot find one that is more direct than scraping
http://aws.amazon.com/amazon-linux-ami/.

  $ node . -h

  Usage: amazon-linux-latest [options]

  Options:


  Usage: index [options]

  Options:

    -h, --help                   output usage information
    -r, --region [region]        AWS region [region]
    -s, --storage [type]         Storage type [ebs, instance]
    -v, --virtualization [type]  Virtualization type [hvm, pv]
    -o, --output <type>          Output format [json, csv]


```
  $ node index.js -o csv -s ebs -v hvm

  name,region,virtualizationType,storageType
  ami-60b6c60a,us-east-1,hvm,ebs
  ami-f0091d91,us-west-2,hvm,ebs
  ami-d5ea86b5,us-west-1,hvm,ebs
  ami-bff32ccc,eu-west-1,hvm,ebs
  ami-bc5b48d0,eu-central-1,hvm,ebs
  ami-c9b572aa,ap-southeast-1,hvm,ebs
  ami-383c1956,ap-northeast-1,hvm,ebs
  ami-48d38c2b,ap-southeast-2,hvm,ebs
  ami-6817af04,sa-east-1,hvm,ebs
  ami-43a36a2e,cn-north-1,hvm,ebs
  ami-c2b5d7e1,us-gov-west-1,hvm,ebs
```
