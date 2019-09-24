<template>
  <div class="row">
      <div v-if="isLoading==false" class="col-md-12">
      <h3>You have succesfully created your account</h3>        
      </div>
      <div v-else class="col-md-12" >
      <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
      </div>
  </div>
</template>
<script>
import { RepositoryFactory } from "~/repository/RepositoryFactory";
const UserRepository = RepositoryFactory.get("user");
export default {
  data(){
    return{
      isLoading:true
    }
  },
  mounted() {
    console.log(this.$route.query.hash);
    this.verifyUser()
  },
  methods:{
    async verifyUser(){
      this.isLoading=true
      const { data } = await UserRepository.authenticateUser(this.$route.query.hash);
      if (data.success) {
        this.openNotificationWithIcon('success',data.user_message)
        this.isLoading=false
// this.$bvModal.hide("modal");
      } else {
        this.openNotificationWithIcon('error',data.user_message)

      }
      
    },
    openNotificationWithIcon (type,message) {
      this.$notification[type]({
        message: 'Notification',
        description: message,
      });
    }
  }
  
};
</script>

