<script>
import { ref } from "vue";

export default {
  name: "CardUser",
  data() {
    return {
      users: ref([]),
      userNow: ref({
        id: ref(""),
        username: ref(""),
      }),
    };
  },
  methods: {
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
        this.userNow = {
          id: data.user.id,
          username: data.user.username,
        };
        console.log(this.userNow);
        if (data.user == null) this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },

    async getAllUser() {
      try {
        const req = await fetch("http://localhost:3000/api/users", {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await req.json();
        this.users = data.docs;
        console.log(this.users);
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.itsme();
    this.getAllUser();
  },
};
</script>

<template>
  <div
    class="absolute right-0 left-0 top-14 flex justify-center items-center flex-wrap">
    <div v-for="userr in users" :key="userr.id" class="card m-3">
      <div class="" v-if="userr.id != userNow.id">
        <div class="card-body p-3">
          <h2 class="card-header">{{ userr.username }}</h2>

          <div class="flex justify-end">
            <div class="card-footer">
              <span
                class="badge badge-outline-primary mr-2 cursor-pointer w-16 flex justify-center items-center">
                <a :href="'/chats/' + userr.id">Message</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="" v-else></div>
    </div>
  </div>
</template>