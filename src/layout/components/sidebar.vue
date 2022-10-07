<template>
  <div class="sidebar">
    <el-row class="sidebar_items">
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item class="sidebar-logo ">
            <router-link
              to="/"
            >
              <img
                src="@/assets/image/logo/logotip.svg"
                alt="employee"
                style="width: 150px;"
              >
            </router-link>
          </el-menu-item>
          <el-menu-item index="1">
            <router-link
              :to="{ name: 'dashboard' }"
              class="sidebar_link"
            >
              <i class="el-icon-s-home" />
              <span>Bosh sahifa</span>
            </router-link>
          </el-menu-item>
          <!-- <el-menu-item index="2">
            <router-link
              :to="{ name: 'about' }"
              class="sidebar_link"
            >
              <i class="el-icon-collection" />
              <span>Hisobot</span>
            </router-link>
          </el-menu-item> -->
          <el-menu-item
            index="3"
          >
            <router-link
              :to="{ name: 'comments' }"
              class="sidebar_link"
            >
              <i class="el-icon-s-data" />
              <span>Comments</span>
            </router-link>
          </el-menu-item>
          
          <el-menu-item index="5">
            <router-link
              :to="{ name: 'posts-id' }"
              class="sidebar_link"
            >
              <i class="el-icon-message" />
              <span>Ariza qoldirish</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="6">
            <router-link
              :to="{ name: 'ShowArticle' }"
              class="sidebar_link"
            >
              <i class="el-icon-notebook-2" />
              <span>Posts</span>
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar',
  data() {
    return {
      fullscreenLoading: false,
      isColapse: true
    }
  },
  methods: {
    openFullScreen() {
       const loading = this.$loading({
          lock: true,
          text: 'Yuklanmoqda...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>

</style>