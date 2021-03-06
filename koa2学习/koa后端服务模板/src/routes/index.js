const router = require('koa-router')()

const { loginRedirect, loginCheck } = require('../middleware/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', loginCheck, async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

module.exports = router
