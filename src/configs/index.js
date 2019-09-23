const configs = {

  contextPath: './',
  testObj: {

  },
  API: {
    development: {
      iamPrefix: 'https://saas-dev.company.com/',
      prefix: 'http://localhost:3000/',
    },
    integration: {
      iamPrefix: 'https://saas-fat.company.com/',
      prefix: 'https://japi-fat.company.com/company-anti-fraud/api/',
    },
    'pre-production': {
      iamPrefix: 'https://saas-uat.company.com/',
      prefix: 'https://japi-uat.company.com/judex/api/',
    },
    production: {
      iamPrefix: 'https://saas.company.com/',
      prefix: 'https://channels.company.com/judex/api/',
    },
  },
};
export default configs;
