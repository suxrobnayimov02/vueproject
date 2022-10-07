<template>
  <div class="main-table app-container mt-10">
    <el-row class="select-and-download">
      <h2>Postlar ro'yxati</h2>
      <el-col 
        :span="18" 
        label="Tanlang"
      >
        <el-select
          v-model="selectValue"
          filterable
          placeholder="Tanlang ..."
          class="w-100"
          @keyup.enter="openFullScreen"
        >
          <el-option
            v-for="post in posts"
            :key="post.title"
            :label="post.title"
            :value="post.title"
            :loading="false"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button
          style="float: right; margin-right: 0px"
          class=""
          type="primary"
          icon="el-icon-download"
          @click="exportTable('Hisobot ')"
        >
          Yuklab olish
        </el-button>
      </el-col>
    </el-row>

    <div class="report_table mt-2">
      <div class="hello">
        <table
          id="reportTable"
          class="table table-auto table-main mt-1"
          element-loading-text="Yuklanmoqda..."
          element-loading-spinner="el-icon-loading"
        >
          <thead>
            <tr class="text-gray-700 text-center font-bold bg-gray-200">
              <th 
                class="bg-gray-200 border" 
                rowspan="3"
              >
                №
              </th>
              <th 
                class="bg-gray-200 border" 
                rowspan="3"
              > 
                Sarlavha
              </th>
              <th 
                class="bg-gray-200 border" 
                rowspan="3"
              >
                Text
              </th>
              <th 
                class="bg-gray-200 border" 
                rowspan="3"
              >
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            <tr 
              v-for="(post, item) in posts" 
              :key="item"
            >
              <td class="border text-center">
                {{ item + 1 }}
              </td>
              <td class="border text-center">
                {{ post.title }}
              </td>
              <td 
                class="border text-center" 
                filterable
              >
                {{ post.body }}
              </td>
              <td 
                class="border text-center" 
                filter-placement="bottom-end"
              >
                <el-button
                  type="primary"
                  size="small"
                  @click="dialogTableVisible = true"
                >
                  <i class="el-icon-edit" />
                </el-button>
              </td>
            </tr>
          </tbody>
        </table>
        <el-dialog
          :visible="dialogTableVisible"
          title="Tahrirlash"
          width="30%"
          :before-close="handleClose"
        >
          <span>
            <el-form
              ref="dataForm"
              :model="form"
              :rules="rules"
            >
              <el-form-item 
                label="Title" 
                prop="title"
              >
                <el-input v-model="form.title" />
              </el-form-item>
              <el-form-item 
                label="Body"
                prop="body"
              >
                <el-input v-model="form.body" />
              </el-form-item>
            </el-form>
          </span>
          <span 
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogTableVisible = false">Bekor qilish</el-button>
            <el-button 
              type="primary" 
              @submit.prevent="save"
            >Saqlash</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUpdate } from '@/api/article'
export default {
  name: 'InlineEditTable',

  data() {
    return {
      selectValue: '',
      dialogTableVisible: false,
      posts: [],
      fullscreenLoading: false,
      list: null,
      listLoading: true, 
      filter: {
        user_id: null,
        per_page: 5,
        page: 1,
        filter: 'interested',
        salary: null,
      },
      form: {
        id: undefined,
        importance: 1,
        title: '',
        body: '',
        timestamp: new Date()
      },
      rules: {
        title: [
          { required: true, message: `Iltimos, ushbu maydonni to'ldiring`, trigger: 'change' }
        ],
        body: [
          { required: true, message: `Iltimos, ushbu maydonni to'ldiring`, trigger: 'change' }
        ]
      },
      listQuery: {
        limit: 20,
        importance: undefined,
        name: undefined,
        type: undefined,
        sort: '+id'
      },
    }
  },

  mounted() {
    this.fetchPosts()
  },
  created(){
    this.getList()
  },
  methods: {
    fetchPosts() {
      fetch('https://jsonplaceholder.typicode.com/posts/')
      .then((response) => {
        return response.json();
      })
      .then((posts) => {
        this.posts = posts;
      })
    },
    getList() {
      this.isLoading = false
      fetchUpdate(this.listQuery).then(response => {
        this.list = response.name
        this.total = response.total

        setTimeout(() => {
          this.isLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.form.timestamp = new Date(this.form.timestamp)
      
    },  
    sendFilter() {
      this.filter.page = 1
      this.getVacancies()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: 'Yuklanmoqda',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        // eslint-disable-next-line no-unused-vars
        .then((_) => {
          done()
          this.dialogTableVisible = false
        })
        // eslint-disable-next-line no-unused-vars
        .catch((_) => {})
    },
    save() {
      // eslint-disable-next-line no-undef
      if (this.form.title !== '' && this.form.body !== '') {
        this.$notify({
          title: 'Success',
          message: 'This is a success message',
          type: 'success'
        })
        this.dialogTableVisible = false
      }else {
        this.$notify({
          title: 'Error',
          message: 'This is a error message',
          type: 'error'
        });
      }
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.mt-10 {
  margin-top: 90px;
}
.select-and-download {
  width: 97%;
}
.el-tag {
  cursor: pointer;
}
</style>
