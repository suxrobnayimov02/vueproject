<template>
  <div class="sidebar">
    <el-row class="sidebar_items">
      <el-col>
        <!-- <div class="offMobile">
          <el-radio-group
            v-model="isCollapse"
            style="margin-bottom: 20px;"
            size="sm"
          >
            <el-radio-button :label="false">
              <i
                class="el-icon-s-fold"
              />
            </el-radio-button>
            <el-radio-button :label="true">
              <i
                class="el-icon-s-unfold"
              />
            </el-radio-button>
          </el-radio-group>
        </div> -->
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <!-- <el-menu-item class="sidebar-logo ">
            <router-link
              to="/"
            >
              <img
                src="@/assets/image/logo/logotip.svg"
                alt="employee"
                style="width: 150px;"
              >
            </router-link>
          </el-menu-item> -->
          <!-- <el-menu-item index="1">
            <router-link
              :to="{ name: 'dashboard' }"
              class="sidebar_link"
            >
              <i class="el-icon-s-home" />
              <span>Bosh sahifa</span>
            </router-link>
          </el-menu-item> -->
          <el-menu-item index="1">
            <router-link
              :to="{ name: 'Posts' }"
              class="sidebar_link"
            >
              <i class="el-icon-notebook-2" />
              <span>Postlar</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link
              :to="{ name: 'Photos' }"
              class="sidebar_link"
            >
              <i class="el-icon-picture-outline" />
              <span>Rasmlar</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link
              :to="{ name: 'Tasks' }"
              class="sidebar_link"
            >
              <i class="el-icon-notebook-1" />
              <span>Vazifalar</span>
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
      isCollapse: false
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