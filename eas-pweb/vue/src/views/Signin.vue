
<script>
import { ref } from "vue";

export default {
  name: "Signin",
  data() {
    return {
      email: ref(""),
      password: ref(""),
    };
  },
  methods: {
    async login() {
      try {
        const req = await fetch("http://localhost:3000/api/users/login", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });
        const data = await req.json();
        console.log(data);
        if (req.ok) this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<template>
  <div class="flex my-auto min-h-screen items-center">
    <div class="container">
      <form action="" v-on:submit.prevent="login">
        <div class="mx-auto flex w-full max-w-sm flex-col gap-6">
          <div class="flex flex-col items-center">
            <h1 class="text-3xl font-semibold">Sign In</h1>
          </div>
          <div class="form-group">
            <div class="form-field">
              <label class="form-label">Email address</label>

              <input
                placeholder="Type here"
                type="email"
                class="input max-w-full"
                v-model="email" />
            </div>
            <div class="form-field">
              <label class="form-label">Password</label>
              <div class="form-control">
                <input
                  placeholder="Type here"
                  type="password"
                  class="input max-w-full"
                  v-model="password" />
              </div>
            </div>

            <div class="form-field pt-5">
              <div class="form-control justify-between">
                <button type="submit" class="btn btn-primary w-full">
                  Sign in
                </button>
              </div>
            </div>

            <div class="form-field">
              <div class="form-control justify-center">
                <a
                  class="link link-underline-hover link-primary text-sm"
                  href="/signup"
                  >Don't have an account yet? Sign up in your
                    payload CMS.</a
                >
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>