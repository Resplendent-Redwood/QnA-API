import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
 stages: [
   { duration: '15s', target: 200 },
   { duration: '15s', target: 400 },
   { duration: '15s', target: 100 },
 ]
};

export default function () {
  http.get('http://localhost:8000/qa/');
  sleep(0.5);
}
