<template>
  <div style="width: 100%; margin-right: 37px; margin-top: 100px; margin-bottom: 50px;">
    <el-row>
      <el-col :span="21">
        <h2>Vazifalar ro'yxati</h2>
      </el-col>
      <el-col :span="3">
        <el-button 
          type="primary" 
          @click="create"
        >
          <i class="el-icon-circle-plus-outline" />
          Vazifa qo'shish
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
        <label for="">Vazifa nomi</label>
        <el-input
          v-model="search"
          placeholder="Qidiruv"
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
          v-model="status.name"
          filterable
          placeholder="Tanlang"
          style="width: 100%;"
          @change="ChangeStatus"
        >
          <el-option
            v-for="item in status"
            :key="item.id"
            :label="item.name"
            :value="item.id"
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
      height="450"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="70"
        align="center"
      />
      <el-table-column
        prop="title"
        label="Vazifa"
        min-width="280"
      />
      <el-table-column
        label="Holati"
        align="center"
      >
        <template #default="{row}">
          <el-tag
            v-if="row.completed == true"
            type="success"
          >
            Tasdiqlangan
          </el-tag>
          <el-tag
            v-else
            type="danger"
          >
            Tasdiqlanmagan
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column 
        label="Status"
        min-width="200px"
        align="center"
      >
        <template #default="scope">
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
        :model="form"
        :rules="rules"
      >
        <el-form-item 
          v-if="dialogStatus != 'view'"
          label="Vazifa nomi"
          prop="title"
        >
          <el-input 
            v-model="form.title"
          />
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'view'">
          <custom-label 
            label="Title"
            :content="form.title" 
          />
        </el-form-item>
        <el-form-item v-if="dialogStatus != 'create' || dialogStatus != 'update'">
          <span>Holati</span>
          <div>
            <el-tag
              v-if="form.completed == true"
              type="success"
            >
              Tasdiqlangan
            </el-tag>
            <el-tag
              v-else
              type="danger"
            >
              Tasdiqlanmagan
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'create' || dialogStatus == 'update'">
          <el-switch
            v-model="form.completed"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="Tasdiqlangan"
            inactive-text="Tasdiqlanmagan" 
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
      :total="todos.length"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import axios from "axios";
import CustomLabel from '@/components/customLabel.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tasks",
  components: { CustomLabel },
  data() {
    return {
      todos: [],
      dialogVisible: false,
      dialogStatus: '',
      dialogDelete: false,
      isLoading: false,
      search: '',
      form: {
        id: '',
        title: '',
        completed: ''
      },
      status: [
        {
          id: 1,
          name: 'Barchasi'
        },
        {
          id: 2,
          name: 'Tasdiqlangan'
        },
        {
          id: 3,
          name: 'Tasdiqlanmagan'
        }
      ],
      textMap: {
        view: 'View',
        update: 'Edit',
        create: 'Create'
      },
      filter: {
        title: '',
        userId: '',
        currentPage: 1,
        page: 10,
        per_page: null,
        total: 0,
      },
      rules: {
        title: [{ required: true, message: `Iltimos, ushbu maydonni to'ldiring`, trigger: 'change' }],
        completed: [{ required: true, message: `Iltimos, ushbu maydonni to'ldiring`, trigger: 'change' }]
      },
    }

  },
  computed: {
    dataComputed() {
      return this.todos.filter(data => !this.search || data.title.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  created() {
    this.getItem()
  },
  methods: {
    getItem() {
      this.isLoading = true
			axios.get(`https://jsonplaceholder.typicode.com/todos`)
			.then((res) => {
       this.todos = res.data.splice(0, 50)
			})
       .finally(()=>{
         this.isLoading = false
       })
    },
    ChangeStatus(e) {
      // var datastatus = []

      if (e == 1) {
        this.getItem()
      } else if (e == 2) {
        this.getItem()
      }
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
    View(row) {
      this.dialogStatus = 'view'
      this.form = Object.assign({}, row)
      this.dialogVisible = true
		},
    Delete(item) {
      this.dialogDelete = true 
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${item}`)
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
    saveCreate() {
      axios.post(`https://jsonplaceholder.typicode.com/todos`, this.form)
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
      axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, this.form)
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
    handleSizeChange() {

    },
    handleCurrentChange(page) {
      this.filter.page = page
      this.getItem()
    },
  },
}
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