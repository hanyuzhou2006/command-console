const log4js = require('log4js');
const fs = require('fs');
const EventEmitter = require('events');

const logger = log4js.getLogger();
logger.level = process.env.loglevel || 'debug';
const SSH = require('ssh2').Client;

class Process extends EventEmitter {
  async init() {
    const conn = new SSH();
    this.conn = conn;
    const self = this;
    return new Promise((resolve, reject) => {
      conn.on('ready', () => {
        conn.shell((err, stream) => {
          self.stream = stream;
          if (err) reject(err);
          stream.on('close', () => {
            logger.debug('stream close');
            conn.end();
          });
          stream.stdout.on('data', (data) => {
            self.emit('stdout', data);
          });
          stream.stderr.on('data', (data) => {
            self.emit('stderr', data);
          });
          resolve();
        });
      }).connect({
        username: 'root',
        privateKey: fs.readFileSync('/root/.ssh/id_rsa'),
      });
    });
  }

  write(cmd) {
    this.stream.write(cmd);
  }

  end() {
    this.conn.end();
  }
}

module.exports = Process;
