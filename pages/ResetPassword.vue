<template>
  <div>
    <div class="row mx-5">
      <div class="offset-md-4 col-md-4 mt-5">
        <b-card title="Forget Password" img-alt="Image" img-top tag="article" class="mb-2">
          <b-card-body>
            <b-form>
              <b-form-group id="input-group-1" label="New Password" label-for="input-1">
                <b-form-input id="input-1" type="password" required placeholder="*******"></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Confirm Password" label-for="input-2">
                <b-form-input id="input-2" type="password" required placeholder="*******"></b-form-input>
              </b-form-group>
              <button class="apply-button pull-right">Confirm</button>
            </b-form>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const SearchRepository = RepositoryFactory.get("search");

export default {
  data() {
    return {
      isLoading: false
    };
  },
  mounted() {},
  methods: {}
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

