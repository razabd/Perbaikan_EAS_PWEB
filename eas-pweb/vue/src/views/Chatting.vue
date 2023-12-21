<script>
import { ref } from "vue";

export default {
  name: "Chatting",
  data() {
    return {
      message: ref(""),
      dataMessage: ref([]),
      userNow: ref({
        id: ref(""),
        username: ref(""),
      }),
      reciver: ref({
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

    async getReciver(reciverId) {
      try {
        console.log(reciverId);
        const req = await fetch(
          `http://localhost:3000/api/users/${reciverId}`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await req.json();
        console.log("penerima");
        this.reciver = {
          id: data.id,
          username: data.username,
        };
        console.log(this.reciver);
        // if (data.user == null) this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },

    async sendMessage() {
      try {
        const req = await fetch("http://localhost:3000/api/messages", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner: this.userNow.id,
            content: this.message,
            reciver: this.reciver.id,
          }),
        });
        const data = await req.json();
        console.log(data);
        if (req.ok) window.location.reload(true);

        // this.message = "";
        // this.dataMessage.push(data);
      } catch (err) {
        console.log(err);
      }
    },

    async getAllMessage(reciverId) {
      try {
        const req = await fetch("http://localhost:3000/api/messages", {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await req.json();
        // console.log(data);
        this.dataMessage = [];
        data.docs.forEach((msg) => {
          console.log(msg);
          if (
            (reciverId == msg.reciver.id && msg.owner.id == this.userNow.id) ||
            (reciverId == msg.owner.id && msg.reciver.id == this.userNow.id)
          ) {
            this.dataMessage.push({
              id: msg.id,
              message: msg.content,
              senderName: msg.owner.username,
              senderId: msg.owner.id,
            });
          }
        });
        // console.log(this.dataMessage);
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },

  mounted() {
    this.itsme();
    this.getReciver(this.$route.params.id);
    this.getAllMessage(this.$route.params.id);
  },
};
</script>

<template>
  <div class="flex w-full h-screen">
    <div class="m-3 ms-0 flex w-full flex-col h-auto">
      <!-- CHANNEL NAME -->
      <div
        class="bg-gray-300 dark:bg-gray-400 rounded p-3 sticky m-3 mt-0 flex justify-between items-center">
        <div class="">
          <h1 class="font-bold text-black">
            <!-- {{ channelNow.name || "Channel Name" }} -->
            {{ reciver.username }}
          </h1>
        </div>
        <div class="">
          <a href="/">
            <i class="fa-regular fa-circle-xmark text-3xl text-black"></i>
          </a>
        </div>
      </div>
      <!-- DISPLAY -->
      <div
        class="overflow-y-auto h-full breadcrumbs max-w-full flex flex-col m-3 p-3 mt-0 bg-gray-300 dark:bg-gray-400 rounded">
        <!-- CHATTING -->
        <div class="" v-for="msg in dataMessage" :key="msg.id">
          <div class="flex justify-end" v-if="msg.senderId === userNow.id">
            <div class="card">
              <div class="card-body p-3 py-2">
                <!-- SENDER -->
                <div class="font-bold">
                  <h1>{{ msg.senderName }}</h1>
                </div>
                <!-- MESSAGE -->
                <div class="">
                  <h1>{{ msg.message }}</h1>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-start" v-else>
            <div class="card">
              <div class="card-body p-3 py-2">
                <!-- SENDER -->
                <div class="font-bold">
                  <h1>{{ msg.senderName }}</h1>
                </div>
                <!-- MESSAGE -->
                <div class="">
                  <h1>{{ msg.message }}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FORM MESSAGE -->
      <form class="space-y-4 m-3 mt-1" v-on:submit.prevent="sendMessage()">
        <div class="flex">
          <div class="w-full">
            <label class="sr-only" for="message">Message</label>
            <input
              class="input input-solid max-w-full"
              placeholder="Type a message"
              type="text"
              id="message"
              v-model="message" />
          </div>
          <div class="w-auto ml-3">
            <button type="submit" class="rounded-lg btn btn-primary btn-block">
              <i class="fa-regular fa-circle-right"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>