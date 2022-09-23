<template>
  <nav class="pagination-row">
    <ul class="pagination">
      <li class="disabled">
        <span 
          class="icon" 
          aria-hidden="true"
        >
          <img src="/img/image/arrow-left.svg">
        </span>
      </li>
      <li><a href="#">1</a></li>
      <li class="active">
        <a href="#">2</a>
      </li>
      <li><a href="#">3</a></li>
      <li class="dots">
        <span> ... </span>
      </li>
      <li><a href="#">98</a></li>
      <li>
        <a aria-label="Next">
          <span aria-hidden="true">
            <img src="/img/image/arrow-right.svg">
          </span>
          {{ pageCount }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    perPage: {
      required: true,
      type: Number,
    },
    currentPage: {
      required: true,
      type: Number,
    },
    lastPage: {
      required: true,
      type: Number,
    },
  },
  computed: {},
};
</script>

<style scoped>
.disabled span {
  background-color: #75aee8fc !important;
}
</style>
