#!/usr/bin/env node

const commander = require('commander')
const scraper = require('./lib')

function options() {
  commander
    .option('-R, --region [region]', 'AWS region')
    .option('-S, --storage [type]', 'Storage type [ebs, instance]',
            /^(ebs|instance)$/)
    .option('-V, --virtualization [type]', 'Virtualization type [hvm, pv]',
            /^(hvm|pv)$/)
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
    //console.log(JSON.stringify(amis, null, 2))
    printCSV(amis)
  })
}

run()
