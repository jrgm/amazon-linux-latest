#!/usr/bin/env node

const commander = require('commander')
const scraper = require('./lib')

function options() {
  commander
    .option('-r, --region [region]', 'AWS region [region]',
            function(arg) {
              var re = /^(?:us|eu|ap|cn)-(?:east|west|central|northeast|southeast|gov)-[12]$/
              if (!re.exec(arg)) {
                throw new Error('Invalid region option value: ' + arg)
              }
              return arg
            })
    .option('-s, --storage [type]', 'Storage type [ebs, instance]',
            function(arg) {
              var re = /^(ebs|instance)$/
              if (!re.exec(arg)) {
                throw new Error('Invalid storage option value: ' + arg)
              }
              return arg
            })
    .option('-t, --hvmSubType [type]', 'Storage type [ssd, nat]',
            function(arg) {
              var re = /^(ssd|nat)$/
              if (!re.exec(arg)) {
                throw new Error('Invalid hvmSubtype value: ' + arg)
              }
              return arg
            })
    .option('-v, --virtualization [type]', 'Virtualization type [hvm, pv]',
            function(arg) {
              var re = /^(hvm|pv)$/
              if (!re.exec(arg)) {
                throw new Error('Invalid virtualization option value: ' + arg)
              }
              return arg
            })
    .option('-o, --output <type>', 'Output format [json, csv]',
            function(arg) {
              var re = /^(json|csv)$/
              if (!re.exec(arg)) {
                throw new Error('Invalid output option value: ' + arg)
              }
              return arg
            }, 'json')
    .parse(process.argv);
}

function printCSV(list) {
  var keys = [
    'name',
    'region',
    'virtualizationType',
    'storageType',
    'hvmSubType'
  ]

  console.log(keys.join(','))

  list.forEach(function(elt) {
    keys.forEach(function(key, idx) {
      var value = elt[key] || 'n/x'
      process.stdout.write(value)
      if (idx === keys.length - 1) {
        process.stdout.write('\n')
      } else {
        process.stdout.write(',')
      }
    })
  })
}

function run() {
  options()

  scraper(function(err, amis) {
    if (err) {
      return console.error(err)
    }

    amis = amis.filter(function(elt) {
      if (commander.region && elt.region !== commander.region) {
        return false
      }
      if (commander.storage && elt.storageType !== commander.storage) {
        return false
      }
      if (commander.hvmSubType && elt.hvmSubType !== commander.hvmSubType) {
        return false
      }
      if (commander.virtualization && elt.virtualizationType !== commander.virtualization) {
        return false
      }
      return true
    })

    if (commander.output === 'json') {
      console.log(JSON.stringify(amis, null, 2))
    } else if (commander.output === 'csv') {
      printCSV(amis)
    }
  })
}

run()
