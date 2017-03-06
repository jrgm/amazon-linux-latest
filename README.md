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
    -t, --hvmSubType [type]      Hvm Sub type [ssd, nat]
    -v, --virtualization [type]  Virtualization type [hvm, pv]
    -o, --output <type>          Output format [json, csv]


```
  $ node index.js -o csv -s ebs -v hvm

  name,region,virtualizationType,storageType,hvmSubType
  ami-8fcee4e5,us-east-1,hvm,ebs,ssd
  ami-a7f5dfcd,us-east-1,hvm,ebs,nat
  ami-63b25203,us-west-2,hvm,ebs,ssd
  ami-87af4fe7,us-west-2,hvm,ebs,nat
  ami-d1f482b1,us-west-1,hvm,ebs,ssd
  ami-9df482fd,us-west-1,hvm,ebs,nat
  ami-e1398992,eu-west-1,hvm,ebs,ssd
  ami-3836864b,eu-west-1,hvm,ebs,nat
  ami-d22932be,eu-central-1,hvm,ebs,ssd
  ami-17273c7b,eu-central-1,hvm,ebs,nat
  ami-0103cd62,ap-southeast-1,hvm,ebs,ssd
  ami-8404cae7,ap-southeast-1,hvm,ebs,nat
  ami-4d1fd123,ap-northeast-2,hvm,ebs,ssd
  ami-421fd12c,ap-northeast-2,hvm,ebs,nat
  ami-59bdb937,ap-northeast-1,hvm,ebs,ssd
  ami-f7a0a499,ap-northeast-1,hvm,ebs,nat
  ami-11032472,ap-southeast-2,hvm,ebs,ssd
  ami-4802252b,ap-southeast-2,hvm,ebs,nat
  ami-f0f4779c,sa-east-1,hvm,ebs,ssd
  ami-c7fb78ab,sa-east-1,hvm,ebs,nat
  ami-0637ff6b,cn-north-1,hvm,ebs,ssd
  ami-0537ff68,cn-north-1,hvm,ebs,nat
  ami-cde15dac,us-gov-west-1,hvm,ebs,ssd
  ami-48dd6129,us-gov-west-1,hvm,ebs,nat
```
