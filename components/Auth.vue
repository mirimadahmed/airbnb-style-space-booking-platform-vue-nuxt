<template>
  <div>
    <b-modal id="modal" size="sm" :hide-header="true" :hide-footer="true" @hidden="$emit('closed')">
      <div v-if="type === 'login'" class="p-3 text-center">
        <div class="row">
          <div class="col-md-12">
            <p class="heading">Login to Spacesly.com</p>
          </div>
          <div class="col-md-12">
            <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="login.email"
                type="email"
                required
                placeholder="Enter email"
                :disabled="isLoading"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-12">
            <b-form-group label="Password:">
              <b-form-input
                v-model="login.password"
                type="password"
                required
                placeholder="Enter password"
                :disabled="isLoading"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-12" v-if="!isLoading">
            <button class="apply-button" @click="loginAction">Login</button>
          </div>
          <div class="col-md-12" v-else>
            <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
          </div>
          <div class="col-md-12 py-4">
            New here?
            <a class="link" @click.prevent="type='signup'">Register</a>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <div class="row">
          <div class="col-md-12">
            <p class="heading">Signup at Spacesly.com</p>
          </div>
          <div class="col-md-12">
            <b-form-group label="Name:">
              <b-form-input
                v-model="signup.name"
                type="text"
                required
                placeholder="Enter name"
                :disabled="isLoading"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-12">
            <b-form-group label="Email address:">
              <b-form-input
                v-model="signup.email"
                type="email"
                required
                placeholder="Enter email"
                :disabled="isLoading"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-12">
            <b-form-group label="Password:">
              <b-form-input
                v-model="signup.password"
                type="password"
                required
                placeholder="Enter password"
                :disabled="isLoading"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-12" v-if="!isLoading">
            <button class="apply-button" @click="signupAction">Create Account</button>
          </div>
          <div class="col-md-12" v-else>
            <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
          </div>
          <div class="col-md-12 py-4">
            Have an account?
            <a class="link" @click.prevent="type='login'">Login</a>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { RepositoryFactory } from "~/repository/RepositoryFactory";
const UserRepository = RepositoryFactory.get("user");
export default {
  props: {
    viewType: {
      type: String,
      required: true
    },
    view: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      type: "login",
      login: {
        email: "",
        password: ""
      },
      signup: {
        name: "",
        email: "",
        password: ""
      },
      isLoading: false
    };
  },
  watch: {
    viewType() {
      this.type = this.viewType;
    },
    view() {
      if (this.view) {
        this.$bvModal.show("modal");
      }
    }
  },
  methods: {
    async loginAction() {
      this.isLoading = true;
      const { data } = await UserRepository.login({
        email: this.login.email,
        password: this.login.password
      });
      this.isLoading = false;
      if (data.success) {
        this.$bvModal.hide("modal");
        this.$store.dispatch("login", data);
      } else {
        this.openNotificationWithIcon('error',data.user_message)
      }
    },
    async signupAction() {
      this.isLoading = true;
      const { data } = await UserRepository.register(this.signup);
      this.isLoading = false;
      if (data.success) {
        this.openNotificationWithIcon('success',data.user_message)
        this.$bvModal.hide("modal");
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

<style scoped>
.heading {
  font-weight: 500;
  font-size: 20px;
}
.button {
  background: white;
  color: black;
  border-radius: 0px;
  border: 1px solid white;
}
.apply-button {
  background: linear-gradient(#ff4d78, #fa7649);
  border: 1px solid #ff4d78;
  font-size: 12px;
  padding: 10px 30px;
  color: white;
  font-weight: 600;
}
.link {
  font-weight: 500;
  color: gray;
  cursor: pointer;
}
</style>
