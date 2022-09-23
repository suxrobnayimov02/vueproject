<template>
  <div 
    class="profile container"
  >
    <el-row :gutter="40">
      <el-col 
        :span="6"
        class="profile-list"
      >
        <div class="profile__info">
          <h5>Biz haqimizda</h5>
          <div class="avatar">
            <img 
              class="main-avatar"
              src="@/assets/image/logo/man.png" 
            >
          </div>
        </div>
      </el-col>
      <el-col 
        :span="18"
        class="profile-list"
      >
        <div>345</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Profile",
  components: {

  },
  mounted() {
    this.$store.dispatch('getProducts');
  }
};
</script>

<style lang="scss">
.profile {
  margin-top: 95px;
  &-list {
    background-color: #fff;
  }
  
}

</style>
