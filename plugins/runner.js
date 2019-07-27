export default (store) => { // <- not { store }, but store
        var user=Session.get("spacesly-user")
        if(user!=null) {
            store.store.commit("login",user)
        }
}