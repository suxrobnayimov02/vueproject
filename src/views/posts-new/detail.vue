<template>
  <div class="app">
    <h2 style="width: 100%; margin-right: 57px; margin-top: 100px;">
      Show
    </h2>
    <h4> {{ detay.title }}</h4>
    <p style="padding-right: 30px;"> {{ detay.body }}</p>

    <el-table 
      :data="comments" 
      style="margin-top: 100px;"
      border	
    >
      <el-table-column 
        label="Post Id" 
        prop="postId" 
        width="50"
        align="center"
      />
      <el-table-column 
        label="Name" 
        prop="name"
        min-width="170px" 
      />
      <el-table-column 
        label="Email" 
        prop="email" 
        min-width="150px"
      />
      <el-table-column 
        label="Body" 
        prop="body" 
        min-width="200px"
      />
    </el-table>
    <el-form 
      ref="form"
      :model="form"
    >
      <el-row align="center">
        <el-form-item style="margin-top: 30px;">
          <h4>Comment qo'shish</h4>
        </el-form-item>
        <el-col :span="14">
          <el-form-item label="Name">
            <el-input 
              v-model="form.name" 
              clearable 
            />
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="Email">
            <el-input 
              v-model="form.email" 
              clearable 
            />
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="Body">
            <el-input 
              v-model="form.body" 
              type="textarea" 
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="save">Qo'shish</el-button>
    </el-form>
  </div>
</template>
  
<script>
	import Axios from "axios";
import axios from 'axios';
	export default {
		// eslint-disable-next-line vue/multi-word-component-names
		name: "ArticleShow",

		// eslint-disable-next-line vue/require-prop-types
		props: ['detail'],
		
		data() {
			return {
				detay: [],
				comments: [],
				postId:[],
				form: {
					name: '',
					email: '',
					body: ''
				}
			}
		},
		created() {
			this.getDetail(),
			this.getComments()
		},
		methods: {
			getDetail() {
				Axios.get(`https://jsonplaceholder.typicode.com/posts/${this.detail.id}`)
				.then((response) => {
					this.detay = response.data;
				})
			},
			getComments() {
				Axios.get(`https://jsonplaceholder.typicode.com/posts/${this.detail.id}/comments`)
				.then((response) => {
					this.comments = response.data;
				})
			},
			save() {
				if (this.validate()) {
					axios.post(`https://jsonplaceholder.typicode.com/posts/${this.detail.id}/comments`, this.form)
					.then(() => {
						this.getComments(),
						this.form.name = ''
						this.form.email = ''
						this.form.body = ''
						this.$notify({
							title: 'Success',
							message: 'Created Successfully',
							type: 'success',
							duration: 2000
						})
					})
					.catch(() => {
						this.$notify({
							title: 'Error',
							message: 'Created Error',
							type: 'error',
							duration: 2000
						})
					})
				}
			},
			validate() {
				let validated = false
					this.$refs.form.validate((valid) => {
					validated = valid
				})
				return validated
			},
		},
   
	};
</script>
	
  
<style>
</style>