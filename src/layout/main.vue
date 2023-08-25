<template>
  <div class="main">
    <div class="navbar_items d-flex">
      <Header />
      <Sidebar style="margin-top: 70px;" />
      <div class="sidebar__list w-100">
        <router-view class="router-view" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Sidebar from "./components/sidebar.vue";
import Footer from "./components/footer.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  // eslint-disable-next-line vue/no-unused-components
  components: { Header, Sidebar, Footer },
};
</script>

<style>
.router-view {
  margin-left: 170px;
  
}
</style>
