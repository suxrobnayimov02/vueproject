<!-- eslint-disable vue/no-deprecated-slot-scope-attribute -->
<template>
  <div 
    class="app" 
    style="width: 100%; margin-right: 37px;"
  >
    <el-row style="width: 100%; margin-top: 100px;">
      <el-col :span="21">
        <h2>Postlar ro'yxati</h2>
      </el-col>
      <el-col :span="3">
        <el-button 
          type="primary" 
          @click="create"
        >
          <i class="el-icon-circle-plus-outline" />
          Post qo'shish
        </el-button>
      </el-col>
    </el-row>
    <el-table 
      :data="data" 
      border
    >
      <el-table-column 
        label="ID"
        prop="id"
        width="60" 
        align="center"
      />
      <el-table-column 
        label="Title"
        min-width="300px" 
      >
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        prop="body" 
        label="Body" 
        min-width="400px"
      />
      <el-table-column 
        label="Status"
        min-width="200px"
        align="center"
      >
        <template slot-scope="scope">
          <el-button 
            size="medium"
            @click="show(scope.row)" 
          >
            <i class="el-icon-view" />
            Show
          </el-button>
          <el-button 
            type="primary" 
            size="medium"
            @click="update(scope.row)" 
          >
            Update
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible="dialogVisible"
      :title="textMap[dialogStatus]"
      width="45%"
    >
      <el-form 
        ref="dataForm"
        :model="temp"
        :rules="rules"
      >
        <el-form-item 
          label="Title"
          prop="title"
        >
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item 
          prop="body"
          label="Textarea"
        >
          <el-input 
            v-model="temp.body" 
            :rows="4"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div 
        slot="footer"
        class="dialog-footer"
      >
        <el-button 
          @click="dialogVisible = false"
        >
          Bekor qilish
        </el-button>
        <el-button
          type="primary" 
          @click="dialogStatus==='create'?saveCreate():saveUpdate()"
        >
					Saqlash
				</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Index',
	data() {
		return {
			data: [],
			dialogVisible: false,
			temp: {
				title: '',
				body: ''
			},
			rules: {
        title: [{ required: true, message: `Iltimos, ushbu maydonni to'ldiring`, trigger: 'change' }],
        body: [{ required: true, message: `Iltimos, ushbu maydonni to'ldiring`, trigger: 'change' }]
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
		}
	},
	
	created() {
		// this.getItem()
	},
	mounted() {
		this.getItem()
	},
	methods: {
		getItem() {
			axios.get('https://jsonplaceholder.typicode.com/posts')
			.then((response) => {
				this.data = response.data;
			})
		},
		saveCreate() {
      axios.post(`https://jsonplaceholder.typicode.com/posts`, this.temp)
			.then(() => {
        this.getItem(),
				this.dialogVisible = false
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
		},
    saveUpdate() {
      axios.put(`https://jsonplaceholder.typicode.com/posts/`, this.temp)
			.then(() => {
        this.getItem(),
				this.dialogVisible = false
				this.$notify({
          title: 'Success',
					message: 'Update Successfully',
					type: 'success',
					duration: 2000
				})
			})
			.catch(() => {
        this.$notify({
          title: 'Error',
					message: 'Update Error',
					type: 'error',
					duration: 2000
				})
			})
    },
		show(row) {
			this.$router.push({
				name: 'detail',
				params: { detail:row }
			})
		},
		create() {
			this.dialogVisible = true
      this.dialogStatus = 'create'
		},
    update(row) {
      this.dialogStatus = 'update'
      this.temp = Object.assign({}, row)
      this.dialogVisible = true
       
    },
	},
};
</script>

<style>
</style>