#!/usr/bin/env node

const commander = require('commander')
const scraper = require('./lib')

function options() {
  commander
    .option('-R, --region [region]', 'AWS region [region]',
            function(arg) {
              var re = /^(?:us|eu|ap|cn)-(?:east|west|central|northeast|southeast|gov)-[12]$/
              if (!re.exec(arg)) {
                throw new Error('Invalid region option value: ' + arg)
              }
              return arg
            })
    .option('-S, --storage [type]', 'Storage type [ebs, instance]',
            function(arg) {
              var re = /^(ebs|instance)$/
              if (!re.exec(arg)) {
                throw new Error('Invalid storage option value: ' + arg)
              }
              return arg
            })
    .option('-V, --virtualization [type]', 'Virtualization type [hvm, pv]',
            function(arg) {
              var re = /^(hvm|pv)$/
              if (!re.exec(arg)) {
                throw new Error('Invalid virtualization option value: ' + arg)
              }
              return arg
            })
    .option('-O, --output <type>', 'Output format [json, csv]',
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
    'storageType'
  ]
  console.log(keys.join(','))
  list.forEach(function(elt) {
    keys.forEach(function(key, idx) {
      process.stdout.write(elt[key])
      if (idx === 3) {
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
