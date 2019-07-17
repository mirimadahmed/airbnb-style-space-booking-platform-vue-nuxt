export default function (ctx) {
  if (process.browser && !window.localStorage.getItem('spacesly-user')) {
    return ctx.redirect('/')
  }
}
