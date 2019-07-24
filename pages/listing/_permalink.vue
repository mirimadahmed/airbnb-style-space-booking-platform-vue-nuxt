<template>
  <div class="m-5 p-4">
    <div class="row">
      <div class="col-md-12">
        <div class="col-md-10 shadow p-4 mx-auto">
          <div class="row">
            <div class="col-md-12 py-4">
              <h1 class="heading">Create new listing</h1>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <b-form-input v-model="text" placeholder="Title here" class="input-element" />
            </div>
            <div class="col-md-12 text-center">
              <h1 class="second-heading py-3">Lets start by giving your listing a title</h1>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <button class="button">Next</button>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-12">
              <b-form-input list="my-list-id" class="input-element" placeholder="Listing Type" />
              <datalist id="my-list-id">
                <option>Manual Option</option>
                <option>Manual Option</option>
                <option>Manual Option</option>
              </datalist>
            </div>
            <div class="col-md-12 text-center">
              <h1 class="second-heading py-3">Select your listing type</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.heading {
  font-weight: 600;
  font-size: 24px;
}
.second-heading {
  font-weight: 500;
  font-size: 14px;
}
.form-control:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.input-element {
  font-weight: 500;
  font-size: 18px;
  background: none;
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 0px;
  text-align: center;
}
</style>
