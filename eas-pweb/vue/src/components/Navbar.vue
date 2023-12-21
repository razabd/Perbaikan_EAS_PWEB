<script>
import { ref } from "vue";

export default {
  name: "Navbar",
  data() {
    return {
      username: ref("User"),
    };
  },
  methods: {
    async logout() {
      try {
        const req = await fetch("http://localhost:3000/api/users/logout", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await req.json();
        console.log(data);
        if (req.ok) this.$router.push("/signin");
        this.username = "User";
      } catch (err) {
        console.log(err);
      }
    },
    async itsme() {
      try {
        const req = await fetch("http://localhost:3000/api/users/me", {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await req.json();
        if (data.user == null) this.$router.push("/");
        if (req.ok) this.username = data.user.username;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.itsme();
  },
};
</script>

<template>
  <div class="navbar fixed top-0 z-50">
    <div class="navbar-start">
      <a href="">
        <h1 class="card-header">ChatApp</h1>
      </a>
      <!-- <a class="navbar-item">Ripple UI</a> -->
    </div>

    <div class="navbar-end">
      <div class="btn btn-gray flex cursor-pointer" v-if="username === 'User'">
        <a
          v-if="username === 'User'"
          href="/signin"
          tabindex="-1"
          class="font-bold text-sm text-blue-500"
          >Login</a
        >
      </div>

      <div class="dropdown-container" v-else>
        <div class="dropdown">
          <div class="btn btn-gray flex cursor-pointer" tabindex="0">
            <h1>{{ username }}</h1>
            <i class="fa-regular fa-user ms-3"></i>
          </div>

          <div class="dropdown-menu dropdown-menu-bottom-left mt-3">
            <a class="dropdown-item text-sm">Profile</a>
            <a tabindex="-1" class="dropdown-item text-sm">Account settings</a>
            <a
              v-if="username === 'User'"
              href="/signin"
              tabindex="-1"
              class="font-bold dropdown-item text-sm text-blue-500"
              >Login</a
            >

            <button
              v-else
              tabindex="-1"
              class="font-bold dropdown-item text-sm text-red-500"
              @click="logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>