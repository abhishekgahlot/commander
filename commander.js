const util = require('util');
const exec = util.promisify(require('child_process').exec);

class Commander{
  constructor(command) {
    this.sysCommand = command;
  }
  
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  async startProcess() {
    const uuid = this.uuidv4();
    const { stdout, stderr } = exec(`${this.sysCommand} > processes/${uuid} &`);
    return uuid;
  }
}

module.exports = Commander;