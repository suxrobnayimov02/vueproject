<template>
  <div class="w-100">
    <div class="clearfix text-center mt-5">
      <img
        src="@/assets/image/403.jpg"
        alt="employee"
      >
      <h4 class="pt-4 ml-5">
        Ушбу саҳифага кириш учун рухсат йўқ.
      </h4>
      <router-link 
        to="/" 
        class="mt-3"
      >
        <el-button type="primary">
          Back to Home Page
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>
