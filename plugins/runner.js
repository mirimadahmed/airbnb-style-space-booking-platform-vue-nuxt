export default (store) => { // <- not { store }, but store
        var isremember=localStorage.getItem('isremember')
        if(isremember=="true"){
            var user=localStorage.getItem('spacesly-user')
            // var user=Session.get("spacesly-user")
            if(user!=null) {
                store.store.commit("login",JSON.parse(user))
            }        
        }
        else{
            localStorage.removeItem('isremember',"false")
        }
}