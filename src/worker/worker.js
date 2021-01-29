const path = require('path');
const { workerData } = require('worker_threads');
 
require('ts-node').register();   //now file will compile in typescript
require(path.resolve(__dirname, workerData.path));
