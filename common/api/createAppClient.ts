import axios from 'axios';

export default function createAppClient() {
  return axios.create({
    baseURL:
      'http://load-loadb-J7NVSRJA7C8E-1060774176.eu-central-1.elb.amazonaws.com/nails',
  });
}
