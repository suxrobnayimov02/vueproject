<template>
  <div class="notfound">
    <img
      src="@/assets/image/404.webp"
      alt="employee"
    >
    <h2 class="notfound-text">
      Page Not Found
    </h2>
    <router-link to="/">
      <el-button type="primary">
        Back to Home Page
      </el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>
<style scoped>
.notfound {
  width: 100%;
	text-align: center;
	margin: 100px 0;
 }
.notfound-text {
  font-size: 40px;
  text-align: center;
	padding: 20px 0;
 }
</style>
