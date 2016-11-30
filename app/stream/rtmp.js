const child = require('child_process');
const EventEmitter = require('events');
const spawn = child.spawn;

class Player extends EventEmitter {

  constructor(url) {
    super();
    this.url = url;
    this.streaming = false;
    this.metadata = {};
  }

  spawn() {
    this.ps = spawn('ffplay', [this.url]);

    this.ps.stdout.on('data', (data) => {
      this.emit('stdout', data.toString());
    });

    this.ps.stderr.on('data', (data) => {
      this.emit('stderr', data.toString());
    });
  }

  destroy() {
    this.ps.kill();
  }

  logHasMetadata(log) {
    return log.match(/Metadata\:/);
  }

  parseMetadata(log) {
    var logObj = {};

    log = log.match(/[^\r\n]+/g);

    log = log.filter((line) => {
      return line.match(/.+\:\ .+/);
    });

    log = log.map((line) => {
      return line.split(/\:\ /);
    });

    log.forEach((line) => {
      logObj[line[0].trim()] = line.slice(1).join('').trim();
    });

    console.log(logObj);

    this.emit('metaObject', logObj);
  }

};

module.exports = Player;

// rtmp://localhost:1935/myapp/foo
