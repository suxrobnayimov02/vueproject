<!-- eslint-disable vue/no-deprecated-slot-scope-attribute -->
<template>
  <div 
    class="app" 
    style="width: 100%; margin-right: 37px; margin-top: 100px;"
  >
    <el-row>
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
    <el-row
      class="main-filter"
      :gutter="20"
    >
      <el-col
        :span="7"
        :lg="7"
        :sm="12"
      >
        <label for="">Title</label>
        <el-input
          v-model="search"
          placeholder="Title"
          clearable
          @keyup.enter="Search"
        />
      </el-col>
      <el-col
        :span="7"
        :lg="7"
        :sm="12"
      >
        <label for="">Name</label>
        <el-select
          v-model="filter.name"
          filterable
          placeholder="Tanlang"
          style="width: 100%;"
        >
          <el-option
            v-for="item in data"
            :key="item.id"
            :label="item.title"
            :value="item.title"
          />
        </el-select>
      </el-col>
      <el-col
        :span="7"
        :lg="7"
        :sm="12"
      >
        <label for="">Sevimlilar</label>
        <el-select 
          v-model="filter.title" 
          placeholder="Tanlang"
          style="width: 100%;"
          :value="null"
          @change="getItem"
        >
          <el-option
            v-for="index in getWishlist"
            :key="index.id"
            :label="index.name"
            :value="index.name"
          />
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-button 
          type="primary" 
          @click="getItem"
        >
          <i class="el-icon-search" />
          Qidirish
        </el-button>
      </el-col>
    </el-row>
    <el-table 
      v-loading="isLoading"
      :data="dataComputed" 
      border
      height="500"
      :row-class-name="tableRowClassName"
      @expand-change="RowExpandChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column 
        type="expand"
        min-width="300px" 
      >
        <template slot-scope="{row}">
          <div
            v-loading="row.isExpandLoading"
            style="padding-left: 40px"
          >
            <el-descriptions
              v-for="(comment, index) in row.comments"
              :key="index"
            >
              <el-descriptions-item
                label="Name"
                style="width: 25% !important;"
              >
                <b>{{ comment.name }}</b>
              </el-descriptions-item>
              <el-descriptions-item
                label="Email"
                style="width: 25%;"
              >
                <b>{{ comment.email }}</b>
              </el-descriptions-item>
              <el-descriptions-item
                label="Body"
                style="width: 50%;"
              >
                <b>{{ comment.body }}</b>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="55"
        type="selection"
        align="center"
      >
        <!-- <el-button></el-button>
        <el-dropdown>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-delete"></i>
              <span>O'chirish</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <div style="display: flex; align-items: center;">
                <img
                  src="../../assets/image/love.svg"
                  width="15"
                >
                <span style="margin-left: 5px;">Sevimlilarga qo'shish</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </el-table-column>
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

    <el-row style="margin-bottom: 50px; margin-top: 30px;">
      <el-col :span="4">
        <el-select 
          v-model="filter.title" 
          placeholder="10/sahifa"
          :value="null"
          @change="changePageOptions"
          size="mini"
        >
          <el-option
            v-for="ids in pageOptions"
            :key="ids.id"
            :label="ids.label"
            :value="ids.id"
          />
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-pagination
          v-model:currentPage="filter.page"
          layout="total, prev, pager, next, jumper"
          :total="total"
          background
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>

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
	data() {
		return {
			data: [],
			dialogVisible: false,
      dialogStatus: '',
      dialogDelete: false,
      isLoading: true,
      multipleSelection: [],
      is_wishlisted: false,
      search: '',
      filter: {
        title: '',
        userId: '',
        currentPage: 1,
        page: 1,
        per_page: 10,
      },
      total: {},

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
      getWishlist:[ 
        {
          id: '1',
          name: 'Hamma postlar'
        },
        {
          id: '2',
          name: 'Sevimlilarga qo\'shilganlar'
        },
        {
          id: '3',
          name: 'Sevimlilarga qo\'shilmaganlar'
        }
      ],
      pageOptions: [
        {
          id: 1,
          label: '10/sahifa'
        },
        {
          id: 2,
          label: '20/sahifa'
        },
        {
          id: 3,
          label: '50/sahifa'
        },
        {
          id: 4,
          label: '100/sahifa'
        }
      ]
		}
	},
	
	computed: {
    dataComputed() {
      return this.data.filter(data => !this.search || data.title.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  created() {
    this.filter.PageLimit = this.$route.query.PageLimit
  },
	mounted() {
    this.currentPage = 1
		this.getItem()
	},
	methods: {
    changePageOptions(e) {
      if (e == 2) {
        this.filter.per_page = 20
        this.getItem()
      } else if (e == 3) {
        this.filter.per_page = 50
        this.getItem()
      } else if (e == 4) {
        this.filter.per_page = 100
        this.getItem()
      }
      this.filter.per_page = 10

    },
    handleSizeChange() {

    },
    handleSelectionChange(row) {
      this.multipleSelection = row;
      console.log('check');
      if (row.is_checked == true) {
        this.dialogCheckbox = true 
      } else {
        this.dialogCheckbox = false  
      }

    },
    handleCurrentChange(page) {
      this.filter.page = page
      this.getItem()
    },
    tableRowClassName(row) {
        if (row.is_wishlisted == true) {
          return 'success-row';
        } 
        return '';
      },
		getItem() {
      this.isLoading = true
			axios.get(`https://dummyjson.com/posts?skip=${this.filter.page}&limit=${this.filter.per_page}`)
			.then((response) => {
        this.total = response.data.total
        this.data = response.data.posts.map(el => {
          return {
            ...el,
            is_wishlisted : false,
            comments: [],
            isExpandLoading: false
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
			})
       .finally(()=>{
         this.isLoading = false
       })
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
    },
    RowExpandChange(row) {
      row.isExpandLoading = true
      axios.get(`https://jsonplaceholder.typicode.com/posts/${row.id}/comments`)
      .then((response) => {
        row.comments = response.data;
        row.isExpandLoading = false
      })
    },
    ChangeWishlistTrue(){
      var wishlists = []
      var dataIds = this.data.map(el => el.id)
      if(getItem('WishList')){
          wishlists = JSON.parse(getItem('WishList'))
          if(wishlists.length > 0){
            wishlists.forEach(el => {
              if(dataIds.includes(el)){
                this.data[dataIds.indexOf(el)].is_wishlisted = true
              }
            })
          }
        }
      
    },
    ChangeWishlistFalse() {

    },
    Search(row) {
      this.form.name = row.comments.filter((el) => el.value === row)[0].name;
    }
	},
};
</script>

<style>
.el-table .success-row {
    background: #f0f9eb;
  }
.main-filter {
  display: flex;
  align-items: end;
  width: 100%; 
  margin-bottom: 20px; 
  margin-top: 30px;
}
</style>