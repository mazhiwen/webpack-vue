const configs = {

  contextPath: './',
  testObj: {

  },
  API: {
    proxy: {
      prefix: '/proxyAPI/',
    },
    development: {
      prefix: 'http://localhost:3000/',
    },
    integration: {
      prefix: 'https://japi-fat.company.com/company-anti-fraud/api/',
    },
    production: {
      prefix: 'https://channels.company.com/judex/api/',
    },
  },
};
export default configs;
