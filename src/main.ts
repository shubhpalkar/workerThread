import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Worker, MessageChannel } from 'worker_threads';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port1, port2 } = new MessageChannel();
  // const sharedArrayBuffer = new SharedArrayBuffer(3);


  const worker = new Worker('./src/worker/worker.js', {
    workerData: {
      value: 15,
      path: './worker.ts'
    }
  });

  port1.on('message', (result) => {
    console.log(result);
  })

  // const array = new Uint8Array(sharedArrayBuffer);
  // array[0] = 11;
  // array[1] = 12;
  // array[2] = 13;
  // array[3] = 14;
  // array[4] = 15;
  

  // worker.postMessage({ port: port2, value: array }, [port2]);

  worker.postMessage ({port: port2, value: 20}, [port2]); //sending messagePort using transferList


  // port2.postMessage ({port: port2, value: 20}); //using postMessage

  worker.on ('message', (result) => { //using woker
    console.log (result);
  })

 
  await app.listen(3000);
}
bootstrap();
