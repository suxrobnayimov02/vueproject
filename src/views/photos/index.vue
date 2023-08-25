<!-- eslint-disable vue/no-deprecated-slot-scope-attribute -->
<template>
  <div 
    class="app" 
    style="width: 100%; margin-right: 37px; margin-top: 100px;"
  >
    <el-row>
      <el-col :span="21">
        <h2>Rasmlar ro'yxati</h2>
      </el-col>
      <el-col :span="3">
        <el-button 
          type="primary" 
          @click="create"
        >
          <i class="el-icon-circle-plus-outline" />
          Rasm qo'shish
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
          placeholder="Please input"
          clearable
          @keyup.enter="Search"
        />
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
          clearable=""
          @change="getItem"
        >
          <el-option
            v-for="index in getWishlist"
            :key="index.id"
            :label="index.name"
            :value="index.id"
          />
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-button 
          type="primary" 
          @click="Search"
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        width="55"
        align="center"
        label="ID"
        prop="id"
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
        prop="image" 
        label="Image" 
        min-width="400px"
        align="center"
      >
        <template slot-scope="{row}">
          <img
            style="width: 100px; height: 120px"
            class="thumbnail ml-auto mr-auto"
            :src="
              row.thumbnailUrl"
          >
        </template> 
      </el-table-column>
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
            v-if="!scope.row.is_wishlisted_photo"
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
      :current-page="filter.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="filter.page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.length"
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
          label="Image"
        >
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/photos"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture">
            <el-button size="small" type="primary">Click to upload</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'view'">
          <custom-label 
            label="Title"
            :content="form.title" 
          />
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'view'">
          <img
            style="width: 100px; height: 120px"
            class="thumbnail ml-auto mr-auto"
            :src="form.thumbnailUrl"
          >
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
      checked: true,
      multipleSelection: [],
      itemId: null,
      is_wishlisted_photo: false,
      filterIds: [],
      radio: '1',
      search: '',
      filter: {
        title: '',
        userId: '',
        currentPage: 1,
        page: 10,
        per_page: null,
        total: 0,
      },

			form: {
        id: '',
				title: '',
				thumbnailUrl: ''
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
		}
	},
	
	computed: {
    dataComputed() {
      return this.data.filter(data => !this.search || data.title.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
	mounted() {
    this.currentPage = 1
		this.getItem()
	},
	methods: {
    handleSizeChange() {

    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
      this.page = page
      this.getItem()
    },
		getItem() {
      this.isLoading = true
			axios.get('https://jsonplaceholder.typicode.com/photos')
        .then((response) => {
        this.data = response.data.splice(1, 100).map(el => {
          return {
            ...el,
            is_wishlisted_photo : false,
          }
        });
        var dataIds = this.data.map(el => el.id)
        if(getItem('WishListPhoto')){
          this.filterIds = JSON.parse(getItem('WishListPhoto'))
          if(this.filterIds.length > 0){
            this.filterIds.forEach(el => {
              if(dataIds.includes(el)){
                this.data[dataIds.indexOf(el)].is_wishlisted_photo = true
              }
            })
          }
        }
        this.ChangeWishListPhoto()
			})
       .finally(()=>{
         this.isLoading = false
       })
		},
		saveCreate() {
      axios.post(`https://jsonplaceholder.typicode.com/photos`, this.form)
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
      axios.put(`https://jsonplaceholder.typicode.com/photos/${id}`, this.form)
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
      if(getItem('WishListPhoto')){
        items = JSON.parse(getItem('WishListPhoto'))
      }
      if(!items.includes(row.id)){
        items.push(row.id)
      }
      setItem('WishListPhoto', JSON.stringify(items))
      row.is_wishlisted_photo = true
    },
    unAddToWishlist(row) {
      var items = []
      if(getItem('WishListPhoto')){
        items = JSON.parse(getItem('WishListPhoto'))
      }
      if(items.includes(row.id)){
        items.splice(items.indexOf(row.id), 1)
      }
      setItem('WishListPhoto', JSON.stringify(items))
      row.is_wishlisted_photo = false
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
        thumbnailUrl: ''
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
      axios.delete(`https://jsonplaceholder.typicode.com/photos/${item}`)
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
    Search(row) {
      this.form.name = row.comments.filter((el) => el.value === row)[0].name;
    },
    ChangeWishListPhoto() {
     if (this.filter.title == 2) {
        const filteredData = this.data.filter(item => this.filterIds.includes(item.id));
        this.data = filteredData
      } else if (this.filter.title == 3) {
        const filteredData = this.data.filter(item => !this.filterIds.includes(item.id));
        this.data = filteredData 
      }
    }
	},
};
</script>

<style>
.main-filter {
  display: flex;
  align-items: end;
  width: 100%; 
  margin-bottom: 20px; 
  margin-top: 30px;
}
</style>