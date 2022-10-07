<template>
  <div id="app">
    <el-menu class="headers">
      <div class="header_items">
        <div class="d-flex align-items-center">
          <el-col 
            v-model="isColapse"
            :span="1" 
            class="handleOpens" 
          >
            <i class="el-icon-s-fold" />
          </el-col>
          <div class="date">
            <i class="el-icon-date" />
            <span class="date_number">{{ date }}</span>
          </div>
          <div class="time">
            <i class="el-icon-time" />
            <span class="time_number">
              {{ timestamp }}
            </span>
          </div>
          <!-- <span>&nbsp; 52609025290022</span> -->
        </div>
        <div 
          class="d-flex align-items-center" 
          style="margin-right: 244px;"
        >
          <el-dropdown>
            <span class="el-dropdown-link header-link">
              <span style="color: #222;"><i class="el-icon-user" /></span>
              <i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="el-icon-user-solid" />
                <router-link 
                  :to="{ name: 'profile' }" 
                  class=""
                >
                  Shaxsiy kabinet
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <router-link
                  :to="{ name: 'login' }"
                  class="header_nav-link"
                  style="cursor: pointer"
                >
                  <img
                    alt="logo"
                    src="@/assets/image/logout.svg"
                    height="16px"
                  >
                  <span 
                    class="logout" 
                    @click="open"
                  >Tizimdan chiqish</span>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      selectedLanguage: "O'zbekcha",
      interval: null,
      time: null,
      timestamp: "",
      isColapse: true
    };
  },
  computed: {
    currentYear() {
      return String(new Date().getFullYear());
    },
    date() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
      var yyyy = today.getFullYear();

      return dd + "." + mm + "." + yyyy;
    },
  },
  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  // time created
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    getNow: function () {
      const today = new Date();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = time;
      this.timestamp = dateTime;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    changeLocale(lang) {
      this.changeLocaleAction(lang);
      this.selectedLang(lang);
    },
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: "Diqqat!",
        message: h("p", null, [
          h("span", null, "Tizimdan chiqmoqchimisiz !"),
          h("i", { style: "color: teal" }),
        ]),
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "Loading...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 1000);
          } else {
            done();
          }
        },
      })
        .then(() => {
          this.$router.push("Login");
          this.$message({
            type: "error",
            message: "Sizda tizim bilan uzilish yuzaga keldi! ",
          });
        })
        .catch(() => {
          window.location.href = "/";
        });
    },
  },
};
</script>
<style scoped>
a,
div {
  text-decoration: none;
  list-style: none;
  font-size: 17px;
}
.date {
  padding-left: 40px;
  padding-right: 40px;
}
.date_number,
.time_number {
  padding-left: 10px;
}
.header-link {
  color: #fff;
  font-size: 17px;
}
.profile_select {
  /* z-index: 99999 !important; */
  color: #111;
}
.handleOpens {
  cursor: pointer;
  color: #409eff !important;
  font-size: 19px;
  padding: 0 !important;
}
</style>
