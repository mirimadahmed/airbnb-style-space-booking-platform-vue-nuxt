export default function (ctx) {
    if(ctx.store.getters.isLoggedIn==false) {
      return ctx.redirect('/')
    }
  }
