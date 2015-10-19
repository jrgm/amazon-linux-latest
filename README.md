List the most recent Amazon Linux AMI by region/virtualization/storage

If someone can actually tell me the AWS API information to get this directly,
please do, but I cannot find one that is more direct than scraping
http://aws.amazon.com/amazon-linux-ami/.

  $ node . -h

  Usage: amazon-linux-latest [options]

  Options:

    -h, --help                   output usage information
    -R, --region [region]        AWS region [region]
    -S, --storage [type]         Storage type [ebs, instance]
    -V, --virtualization [type]  Virtualization type [hvm, pv]
    -O, --output <type>          Output format [json, csv]


  $ node index.js --virtualization hvm --storage ebs --output csv

  name,region,virtualizationType,storageType
  ami-e3106686,us-east-1,hvm,ebs
  ami-9ff7e8af,us-west-2,hvm,ebs
  ami-cd3aff89,us-west-1,hvm,ebs
  ami-69b9941e,eu-west-1,hvm,ebs
  ami-daaeaec7,eu-central-1,hvm,ebs
  ami-52978200,ap-southeast-1,hvm,ebs
  ami-9a2fb89a,ap-northeast-1,hvm,ebs
  ami-c11856fb,ap-southeast-2,hvm,ebs
  ami-3b0c9926,sa-east-1,hvm,ebs
  ami-6cb22e55,cn-north-1,hvm,ebs
  ami-ad34568e,us-gov-west-1,hvm,ebs
