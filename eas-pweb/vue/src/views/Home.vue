<script>
import Navbar from "../components/Navbar.vue";
import CardUser from "../components/CardUser.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {},
  components: {
    Navbar,
    CardUser,
  },
};
</script>

<template>
  <div>
    <Navbar />
    <CardUser />
  </div>
</template>