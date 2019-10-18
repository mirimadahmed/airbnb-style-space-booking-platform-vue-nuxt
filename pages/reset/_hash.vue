<template>
  <div>
    <div class="row mx-5">
      <div class="offset-md-4 col-md-4 mt-5">
        <b-card
          title="Forget Password"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
          v-if="!isLoading"
        >
          <b-card-body>
            <b-form>
              <b-form-group id="input-group-1" label="New Password" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="password"
                  required
                  placeholder="*******"
                  v-model="password"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Confirm Password" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="password"
                  required
                  placeholder="*******"
                  v-model="confirmPassword"
                ></b-form-input>
              </b-form-group>
              <a class="apply-button pull-right" @click="confirmPass">Confirm</a>
            </b-form>
          </b-card-body>
        </b-card>
        <div v-else>
          <a-skeleton active :paragraph="{rows: 4}" :title="false" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const UserRepository = RepositoryFactory.get("user");

export default {
  data() {
    return {
      isLoading: false,
      myHash: "",
      password: "",
      confirmPassword: ""
    };
  },
  mounted() {
    if (this.$route.params.hash) {
      this.myHash = this.$route.params.hash;
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    async confirmPass() {
      if (this.password !== this.confirmPassword) {
        this.$message.error("Both passwords should be same");
        return;
      }
      this.isLoading = true;
      const { data } = await UserRepository.reset(
        {
          new_password: this.password
        },
        this.myHash
      );
      this.isLoading = false;
      if (data.success) {
        this.$message.success("Password updated. Now you can login.");
      } else {
        this.$message.error("Something went wrong!");
      }
    }
  }
};
</script>

<style scoped>
.loading-more {
  font-weight: 600;
  font-size: 16px;
  color: rgb(151, 78, 65);
}
.main-outer {
}

.apply-button {
  background: linear-gradient(#ff4d78, #fa7649);
  border: 1px solid #ff4d78;
  font-size: 12px;
  padding: 10px 30px;
  color: white;
  font-weight: 600;
}
</style>

