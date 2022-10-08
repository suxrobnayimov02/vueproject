<!-- eslint-disable vue/no-deprecated-slot-scope-attribute -->
<template>
  <div class="app" style="width: 100%; margin-right: 37px;">
    <el-row style="width: 100%; margin-top: 100px;">
      <el-col :span="21">
        <h2>Postlar ro'yxati</h2>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="create">
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
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
					<el-input v-if="edit" v-model="scope.row.title" />
        </template> -->
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
            Show
          </el-button>
          <el-button 
            type="primary" 
            size="medium"
            @click="edit(scope.row)" 
          >
            <i class="el-icon-edit" /> 
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible="dialogCreateVisible"
      title="Post qo'shish"
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
        <el-button @click="dialogCreateVisible = false">Bekor qilish</el-button>
        <el-button 
          type="primary" 
          @click="save"
        >Saqlash</el-button>
      </div>
    </el-dialog>
    <!-- <table border>
			<thead>
				<tr>
					<th class="border">ID</th>
					<th class="border">Title</th>
					<th class="border">Body</th>
					<th class="border">Status</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="data in data" :key="data.id">
					<td class="border">{{ data.id }}</td>
					<td class="border">{{ data.title }}</td>
					<td class="border">{{ data.body }}</td>
					<td class="border">
							<el-button @click="show(row)">Show</el-button>
					</td>
				</tr>
			</tbody>
		</table> -->
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
			dialogCreateVisible: false,
			temp: {
				title: '',
				body: ''
			},
			rules: {
					title: [{ required: true, message: `Iltimos, ushbu maydonni to'ldiring`, trigger: 'change' }],
					body: [{ required: true, message: `Iltimos, ushbu maydonni to'ldiring`, trigger: 'change' }]
				},
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
		save() {
			axios.post(`https://jsonplaceholder.typicode.com/posts`, this.temp)
			.then(() => {
				this.getItem(),
				this.temp.title = ''
				this.temp.body = ''
				this.dialogCreateVisible = false
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
		show(row) {
			this.$router.push({
				name: 'detail',
				params: { detail:row }
			})
		},
		edit(row) {
			this.temp = Object.assign({}, row)
        this.temp.timestamp = new Date(this.temp.timestamp)
				this.dialogCreateVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
		},
		create() {
			this.dialogCreateVisible = true
		}
	},
};
</script>

<style>
</style>