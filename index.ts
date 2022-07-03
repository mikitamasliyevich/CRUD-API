import cluster from 'cluster';
import {server} from './src/server';
import { cpus } from 'os';
import process from 'process';
import 'dotenv/config'

const PORT = process.env.PORT || 3000;

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

 
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  console.log(`Worker ${process.pid} started`);
}