<template>
  <div class="content">
    <div class="pb-5">
      <h2>Login Test</h2>
      <p class="lead">Fill in the form and submit to get the response from the server.</p>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4">
        <h4 class="mb-3 text-muted">Request Form</h4>
        <form class="needs-validation" novalidate @submit.prevent="onSubmit">

          <div class="mb-3">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" v-model="usernameInput" placeholder="Username"
                   required>
            <div class="invalid-feedback" style="width: 100%;">
              Your username is required.
            </div>
          </div>

          <div class="mb-3">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="passwordInput" placeholder="Password"
                   required>
            <div class="invalid-feedback" style="width: 100%;">
              Your password is required.
            </div>
          </div>
          <button class="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
        </form>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-xl-6">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Request</span>
            </h4>
            <div class="form-group">
              <textarea class="form-control text-request bg-white" rows="15" readonly v-model="request"></textarea>
            </div>
          </div>
          <div class="col-xl-6">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Response {{ status }}</span>
            </h4>
            <div class="form-group">
              <textarea class="form-control text-response bg-white" rows="15" readonly v-model="response"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import DataSource from "../data/datasource"

  export default {
    computed: {
      request() {
        return JSON.stringify(this.usernameInput, null, "  ")
      },
    },
    methods:  {
      async onSubmit() {
        this.response = "<< Requesting.. >>"
        const response = await DataSource.shared.login(this.usernameInput, this.passwordInput)
        console.log(response)

        this.response = JSON.stringify(response.json, null, "  ")
      },
    },
    data() {
      return {
        usernameInput: "",
        passwordInput: "",
        response: "",
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
