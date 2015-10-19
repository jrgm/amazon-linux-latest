List the most recent Amazon Linux AMI by region/type.

If someone can actually tell me the AWS API information to get this directly,
please do, but I cannot find one that is more direct than scraping
http://aws.amazon.com/amazon-linux-ami/.

  Usage: index [options]

  Options:

    -h, --help                 output usage information
    -c, --channel [channel]    Release channel [release, beta, esr, aurora, nightly]
    -i, --install-dir <path>   Destination install directory
    -p, --platform [platform]  Operating system [linux-x86_64, linux-i686, mac, win32, win64]
    -l, --locale [name]        Locale

