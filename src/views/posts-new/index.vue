<!-- eslint-disable vue/no-deprecated-slot-scope-attribute -->
<template>
  <div class="app" style="width: 100%; margin-right: 37px;">
    <el-table 
      :data="data" 
      border
      style="width: 100%; margin-top: 100px;"
    >
      <el-table-column 
        prop="id" 
        label="ID"
				width="60" 
				align="center"
      />
      <el-table-column 
        prop="title" 
        label="Title"
				min-width="300px" 
      />
      <el-table-column 
        prop="body" 
        label="Body" 
				min-width="400px"
      />
      <el-table-column 
				label="Status"
				min-width="100px"
				align="center"
				>
        <template slot-scope="scope">
          <el-button @click="show(scope.row)">Show</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
	import axios from "axios";
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Index',
	data() {
		return {
			data: []
		}
	},
	
	created() {
		this.getItem()
	},
	
	methods: {
		getItem() {
			axios.get('https://jsonplaceholder.typicode.com/posts')
			.then((response) => {
				this.data = response.data;
			})
		},
		show(row) {
			this.$router.push({
				name: 'detail',
				params: { detail:row }
			})
		}
	},
};
</script>

<style>
</style>