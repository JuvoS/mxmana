module.exports = {
	'/api':{
      target:'http://127.0.0.1:3322/api/menu/show/1',
      changeOrigin:true,
      pathRewrite:{
          '/api':''
      }
  },
  '/apicc':{
      target:'http://jsonplaceholder.typicode.com',
      changeOrigin:true,
      pathRewrite:{
          '/api':''
      }
  },
  '/ms':{
      target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
      changeOrigin: true
  },
  '/menu/show/':{
      target: 'http://localhost:3322/api/',
      changeOrigin: true,
      pathRewrite: {
      '^/api': ''
      }
  },
  '/show/':{
      target: 'http://localhost:3322/api/menu',
      changeOrigin: true
  }
}