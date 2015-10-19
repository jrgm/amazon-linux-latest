#!/usr/bin/env node
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const commander = require('commander')
const scraper = require('./lib')

function options() {
  commander
    .option('-R, --region [region]', 'AWS region', 'all')
    .option('-S, --storage [type]', 'Storage type [ebs, instance]',
            /^(ebs|instance)$/, 'ebs')
    .option('-V, --virtualization [type]', 'Virtualization type [hvm, pv]',
            /^(hvm|pv)$/, 'hvm')
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
      if (commander.region !== 'all' && elt.region !== commander.region) {
        return
      }
      if (elt.storageType !== commander.storage) {
        return
      }
      if (elt.virtualizationType !== commander.virtualization) {
        return
      }
      return true
    })
    //console.log(JSON.stringify(amis, null, 2))
    printCSV(amis)
  })
}

run()
