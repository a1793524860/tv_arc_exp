import MockAdapter from 'axios-mock-adapter';

const configureLogin = (mock : MockAdapter) => {

  mock.onPost('/insm/auth-access/auth/login').reply((config) => {
    const { data } = config;
    return [
      200,
      {
        body: {
          channel: data.get('channel'),
          'username': '大蛇丸',
          "jti": "074548c5-edc8-4947-8d1c-d5358ffedede",
          "jwt": "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbklkIjoidGVzdCIsImFnZW50Q29kZSI6IiIsImp3dCI6IiIsInZhbGlkRGF0ZSI6IiIsImNoYW5uZWwiOiIwMSIsIm9mZmljZSI6IiIsIm1vdG9yT25seSI6IiIsInBhc3N3b3JkIjoidGVzdCIsInJlZ2lzdGVySWQiOiIiLCJpc01vYmlsZVF1YWxpZmllZCI6IiIsInJlc3RyaWN0ZWQiOiIiLCJuYW1lIjoiIiwibWVkaWNhbElucyI6IiIsImVtYWlsIjoiIiwianRpIjoiMDc0NTQ4YzUtZWRjOC00OTQ3LThkMWMtZDUzNThmZmVkZWRlIiwiY2hhbm5lbENvZGUiOiIwMSIsInVzZXJuYW1lIjoidGVzdCJ9.ATAq_fnbR-BeriGUU5Pi0gW_hyqcgg6fDrfVYT0bK6itP2QNiaZ4UEy9xWg41GngoMkAXt49k3LoFhjazk5gqA",
          "loginId": data.get('username'),
          "agentCode": "",
          "channelCode": data.get('channel'),
          "email": "",
          "medicalIns": "",
          "motorOnly": "",
          "name": "",
          "office": "",
          "registerId": "",
          "restricted": "",
          "validDate": "",
          "isMobileQualified": ""
        }
      }
    ];
  });
}

export default configureLogin;
