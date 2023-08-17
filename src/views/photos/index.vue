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
      v-loading="isLoading"
      :data="data" 
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column 
        type="expand"
        min-width="300px" 
      >
        <template slot-scope="{row}">
          <span style="padding-left: 50px;">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <!-- <el-table-column 
        label="ID"
        prop="id"
        width="60" 
        align="center"
      /> -->
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
            circle
            @click="View(scope.row)" 
          >
            <i class="el-icon-view" />
          </el-button>
          <el-button 
            type="primary" 
            size="medium"
            icon="el-icon-edit" 
            circle
            @click="Edit(scope.row)" 
          />
          <el-button 
            type="danger" 
            size="medium"
            icon="el-icon-delete" 
            circle
            @click="() => {form = scope.row, dialogDelete = true}" 
          />
          <el-button 
            v-if="!scope.row.is_wishlisted"
            size="medium"
            circle
            @click="addToWishlist(scope.row)" 
          >
            <img
              src="../../assets/image/love.svg"
              width="15"
            >
          </el-button>
          <el-button
            v-else
            size="medium"
            circle
            @click="unAddToWishlist(scope.row)" 
          >
            <img
              src="../../assets/image/loved.svg"
              width="15"
            >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Warning"
      :visible="dialogDelete"
      width="30%"
    >
      <span>It should be noted that the content will not be aligned in center by default</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogDelete = false"
        >Orqaga</el-button>
        <el-button
          type="danger"
          @click="Delete(form.id)"
        >O'chirish</el-button>
      </span>
    </el-dialog>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="120"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      :visible="dialogVisible"
      :title="textMap[dialogStatus]"
      width="45%"
    >
      <el-form 
        ref="dataForm"
        :model="form"
        :rules="rules"
      >
        <el-form-item 
          v-if="dialogStatus != 'view'"
          label="Title"
          prop="title"
        >
          <el-input 
            v-model="form.title"
          />
        </el-form-item>
        <el-form-item 
          v-if="dialogStatus != 'view'"
          prop="body"
          label="Textarea"
        >
          <el-input 
            v-model="form.body" 
            :rows="4"
            type="textarea"
          />
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'view'">
          <custom-label 
            label="Title"
            :content="form.title" 
          />
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'view'">
          <custom-label 
            label="Body"
            :content="form.body"
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
          v-if="dialogStatus == 'create' || dialogStatus == 'update'"
          type="primary" 
          @click="dialogStatus === 'create' ? saveCreate(form.id) : saveUpdate(form.id)"
        >
          Saqlash
        </el-button>
        <el-button
          v-else
          type="primary" 
          @click="getItem"
        >
          Saqlash
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { setItem, getItem } from "@/utils/storage";
import CustomLabel from '@/components/customLabel.vue';
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Index',
  components: { CustomLabel },
  // eslint-disable-next-line vue/require-prop-types
  props: ["detail"],
	data() {
		return {
			data: [],
			dialogVisible: false,
      dialogStatus: '',
      isLoading: true,
      checked: true,
      currentPage: 1,
      perPage: 10,
      total: 0,
      multipleSelection: [],
      dialogDelete: false,
      itemId: null,
      addWishlist: {
        id: '',
        title: '',
        body: ''
      },
      is_wishlisted: false,

			form: {
        id: '',
				title: '',
				body: ''
			},
			rules: {
        title: [{ required: true, message: `Iltimos, ushbu maydonni to'ldiring`, trigger: 'change' }],
        body: [{ required: true, message: `Iltimos, ushbu maydonni to'ldiring`, trigger: 'change' }]
      },
      textMap: {
        view: 'View',
        update: 'Edit',
        create: 'Create'
      },
		}
	},
	
	created() {
    
  },
	mounted() {
    this.currentPage = 1
		this.getItem()
    this.itemId = this.$route.params.id;
    if (this.$store.state.WishList != undefined) {
      this.form = this.$store.state.WishList
    }
	},
	methods: {
    handleSizeChange() {

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(page) {
      this.page = page
      setItem('resumePage', page)
      this.getItem()
    },
		getItem() {
      this.isLoading = true
			axios.get('https://jsonplaceholder.typicode.com/posts')
			.then((response) => {
        this.data = response.data.map(el => {
          return {
            ...el,
            is_wishlisted : false
          }
        });
        var items = []
        var dataIds = this.data.map(el => el.id)
        if(getItem('WishList')){
          items = JSON.parse(getItem('WishList'))
          if(items.length > 0){
            items.forEach(el => {
              if(dataIds.includes(el)){
                this.data[dataIds.indexOf(el)].is_wishlisted = true
              }
            })
          }
        }
        this.total = response.data.limit
			})
        this.isLoading = false
		},
		saveCreate() {
      axios.post(`https://jsonplaceholder.typicode.com/posts`, this.form)
			.then(() => {
        this.getItem(),
				this.dialogVisible = false
				this.$notify({
          title: 'Success',
					message: 'Created Successfully',
					type: 'success',
					duration: 1000
				})
			})
			.catch(() => {
        this.$notify({
          title: 'Error',
					message: 'Created Error',
					type: 'error',
					duration: 1000
				})
			})
		},
    saveUpdate(id) {
      axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, this.form)
			.then(() => {
        this.getItem(),
				this.dialogVisible = false
				this.$notify({
          title: 'Success',
					message: 'Update Successfully',
					type: 'success',
					duration: 1000
				})
			})
			.catch(() => {
        this.$notify({
          title: 'Error',
					message: 'Update Error',
					type: 'error',
					duration: 1000
				})
			})
    },
    addToWishlist(row) {
      var items = []
      if(getItem('WishList')){
        items = JSON.parse(getItem('WishList'))
      }
      if(!items.includes(row.id)){
        items.push(row.id)
      }
      setItem('WishList', JSON.stringify(items))
      row.is_wishlisted = true
    },
    unAddToWishlist(row) {
      var items = []
      if(getItem('WishList')){
        items = JSON.parse(getItem('WishList'))
      }
      if(items.includes(row.id)){
        items.splice(items.indexOf(row.id), 1)
      }
      setItem('WishList', JSON.stringify(items))
      row.is_wishlisted = false
    },
		View(row) {
      this.dialogStatus = 'view'
      this.form = Object.assign({}, row)
      this.dialogVisible = true
			// this.$router.push({
			// 	name: 'detail',
			// 	params: { detail:row }
			// })
		},
		create() {
      this.form = {
        title: '',
        body: ''
      }
			this.dialogVisible = true
      this.dialogStatus = 'create'
		},
    Edit(row) {
      this.dialogStatus = 'update'
      this.form = Object.assign({}, row)
      this.dialogVisible = true
       
    },
    Delete(item) {
      this.dialogDelete = true 
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${item}`)
      .then((response) => {
        this.items = response.data;
        this.dialogDelete = false
				this.$notify({
          title: 'Success',
					message: 'Delete Successfully',
					type: 'success',
					duration: 1000
				})
      })
      .catch(() => {
        this.$notify({
          title: 'Error',
					message: 'Delete Error',
					type: 'error',
					duration: 1000
				})
			})
    }
	},
};
</script>

<style>
</style>