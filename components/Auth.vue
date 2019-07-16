<template>
  <div>
    <b-modal id="modal" size="sm" :hide-header="true" :hide-footer="true" @hidden="$emit('closed')">
      <div v-if="viewType === 'login'" class="p-3 text-center">
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
            <button class="apply-button">Login</button>
          </div>
          <div class="col-md-12" v-else>
            <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
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
                v-model="signup.email"
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
            <button class="apply-button">Create Account</button>
          </div>
          <div class="col-md-12" v-else>
            <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
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
      type: this.viewType,
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
    view() {
      if (this.view) {
        this.$bvModal.show("modal");
      }
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
</style>
