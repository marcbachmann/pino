'use strict'

var bench = require('fastbench')
var pino = require('../')
var bunyan = require('bunyan')
var bole = require('bole')('bench')
var winston = require('winston')
var fs = require('fs')
var dest = fs.createWriteStream('/dev/null')
var plog = pino(dest)
delete require.cache[require.resolve('../')]
var plogExtreme = require('../')({extreme: true}, dest)
delete require.cache[require.resolve('../')]
var plogUnsafe = require('../')({safe: false}, dest)
delete require.cache[require.resolve('../')]
var plogUnsafeExtreme = require('../')({extreme: true, safe: false}, dest)

var deep = require('../package.json')
deep.deep = Object.assign({}, deep)
deep.deep.deep = Object.assign({}, deep.deep)
deep.deep.deep.deep = Object.assign({}, deep.deep.deep)

var max = 10
var blog = bunyan.createLogger({
  name: 'myapp',
  streams: [{
    level: 'trace',
    stream: dest
  }]
})

require('bole').output({
  level: 'info',
  stream: dest
})

winston.add(winston.transports.File, { filename: '/dev/null' })
winston.remove(winston.transports.Console)

var run = bench([
  function benchBunyanMulti (cb) {
    for (var i = 0; i < max; i++) {
      blog.info('hello', 'world')
    }
    setImmediate(cb)
  },
  function benchWinstonMulti (cb) {
    for (var i = 0; i < max; i++) {
      winston.info('hello', 'world')
    }
    setImmediate(cb)
  },
  function benchBoleMulti (cb) {
    for (var i = 0; i < max; i++) {
      bole.info('hello', 'world')
    }
    setImmediate(cb)
  },
  function benchPinoMulti (cb) {
    for (var i = 0; i < max; i++) {
      plog.info('hello', 'world')
    }
    setImmediate(cb)
  },
  function benchPinoExtremeMulti (cb) {
    for (var i = 0; i < max; i++) {
      plogExtreme.info('hello', 'world')
    }
    setImmediate(cb)
  },
  function benchBunyanInterpolate (cb) {
    for (var i = 0; i < max; i++) {
      blog.info('hello %s', 'world')
    }
    setImmediate(cb)
  },
  function benchWinstonInterpolate (cb) {
    for (var i = 0; i < max; i++) {
      winston.info('hello %s', 'world')
    }
    setImmediate(cb)
  },
  function benchBoleInterpolate (cb) {
    for (var i = 0; i < max; i++) {
      bole.info('hello %s', 'world')
    }
    setImmediate(cb)
  },
  function benchPinoInterpolate (cb) {
    for (var i = 0; i < max; i++) {
      plog.info('hello %s', 'world')
    }
    setImmediate(cb)
  },
  function benchPinoExtremeInterpolate (cb) {
    for (var i = 0; i < max; i++) {
      plogExtreme.info('hello %s', 'world')
    }
    setImmediate(cb)
  },
  function benchBunyanInterpolateAll (cb) {
    for (var i = 0; i < max; i++) {
      blog.info('hello %s %j %d', 'world', {obj: true}, 4)
    }
    setImmediate(cb)
  },
  function benchWinstonInterpolateAll (cb) {
    for (var i = 0; i < max; i++) {
      winston.info('hello %s %j %d', 'world', {obj: true}, 4)
    }
    setImmediate(cb)
  },
  function benchBoleInterpolateAll (cb) {
    for (var i = 0; i < max; i++) {
      bole.info('hello %s %j %d', 'world', {obj: true}, 4)
    }
    setImmediate(cb)
  },
  function benchPinoInterpolateAll (cb) {
    for (var i = 0; i < max; i++) {
      plog.info('hello %s %j %d', 'world', {obj: true}, 4)
    }
    setImmediate(cb)
  },
  function benchPinoExtremeInterpolateAll (cb) {
    for (var i = 0; i < max; i++) {
      plogExtreme.info('hello %s %j %d', 'world', {obj: true}, 4)
    }
    setImmediate(cb)
  },
  function benchPinoUnsafeInterpolateAll (cb) {
    for (var i = 0; i < max; i++) {
      plogUnsafe.info('hello %s %j %d', 'world', {obj: true}, 4)
    }
    setImmediate(cb)
  },
  function benchPinoUnsafeExtremeInterpolateAll (cb) {
    for (var i = 0; i < max; i++) {
      plogUnsafeExtreme.info('hello %s %j %d', 'world', {obj: true}, 4)
    }
    setImmediate(cb)
  },
  function benchBunyanInterpolateExtra (cb) {
    for (var i = 0; i < max; i++) {
      blog.info('hello %s %j %d', 'world', {obj: true}, 4, {another: 'obj'})
    }
    setImmediate(cb)
  },
  function benchWinstonInterpolateExtra (cb) {
    for (var i = 0; i < max; i++) {
      winston.info('hello %s %j %d', 'world', {obj: true}, 4, {another: 'obj'})
    }
    setImmediate(cb)
  },
  function benchBoleInterpolateExtra (cb) {
    for (var i = 0; i < max; i++) {
      bole.info('hello %s %j %d', 'world', {obj: true}, 4, {another: 'obj'})
    }
    setImmediate(cb)
  },
  function benchPinoInterpolateExtra (cb) {
    for (var i = 0; i < max; i++) {
      plog.info('hello %s %j %d', 'world', {obj: true}, 4, {another: 'obj'})
    }
    setImmediate(cb)
  },
  function benchPinoUnsafeInterpolateExtra (cb) {
    for (var i = 0; i < max; i++) {
      plogUnsafe.info('hello %s %j %d', 'world', {obj: true}, 4, {another: 'obj'})
    }
    setImmediate(cb)
  },
  function benchPinoExtremeInterpolateExtra (cb) {
    for (var i = 0; i < max; i++) {
      plogExtreme.info('hello %s %j %d', 'world', {obj: true}, 4, {another: 'obj'})
    }
    setImmediate(cb)
  },
  function benchPinoUnsafeExtremeInterpolateExtra (cb) {
    for (var i = 0; i < max; i++) {
      plogUnsafeExtreme.info('hello %s %j %d', 'world', {obj: true}, 4, {another: 'obj'})
    }
    setImmediate(cb)
  },
  function benchBunyanInterpolateDeep (cb) {
    for (var i = 0; i < max; i++) {
      blog.info('hello %j', deep)
    }
    setImmediate(cb)
  },
  function benchWinstonInterpolateDeep (cb) {
    for (var i = 0; i < max; i++) {
      winston.info('hello %j', deep)
    }
    setImmediate(cb)
  },
  function benchBoleInterpolateDeep (cb) {
    for (var i = 0; i < max; i++) {
      bole.info('hello %j', deep)
    }
    setImmediate(cb)
  },
  function benchPinoInterpolateDeep (cb) {
    for (var i = 0; i < max; i++) {
      plog.info('hello %j', deep)
    }
    setImmediate(cb)
  },
  function benchPinoUnsafeInterpolateDeep (cb) {
    for (var i = 0; i < max; i++) {
      plogUnsafe.info('hello %j', deep)
    }
    setImmediate(cb)
  },
  function benchPinoExtremeInterpolateDeep (cb) {
    for (var i = 0; i < max; i++) {
      plogExtreme.info('hello %j', deep)
    }
    setImmediate(cb)
  },
  function benchPinoUnsafeExtremeInterpolateDeep (cb) {
    for (var i = 0; i < max; i++) {
      plogUnsafeExtreme.info('hello %j', deep)
    }
    setImmediate(cb)
  }
], 10000)

run(run)
