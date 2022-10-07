<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<!-- eslint-disable vue/no-deprecated-slot-scope-attribute -->
<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div
    class="statistic report_table"
    style="padding-right: 20px"
  >
    <div class="section_body pb-3">
      <el-row>
        <el-col :span="20">
          <h4
            class=""
            style="text-transform: uppercase; padding"
          >
            Postlar ro'yxati
          </h4>
        </el-col>
        <el-col :span="4">
          <el-button
            
            class="mb-5"
            type="primary"
            icon="el-icon-download"
            :loading="isLoading"
            @click="exportTable('Statistika')"
          >
            Yuklab olish
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="mb-3">
      <el-row>
        <el-col :span="8">
          <el-input 
            v-model="listQuery.name" 
            placeholder="Name" 
            style="margin-right: 20px;" 
            class="filter-item" 
          />
        </el-col>
        <el-col 
          :span="6" 
          style="margin-left: 20px;"
        >
          <el-button
            class="filter-item" 
            type="primary" 
            icon="el-icon-search" 
          >
            Search
          </el-button>
        </el-col>
      </el-row>
    </div>
    <table 
      id="reportTable" 
      :key="tableKey"
      v-loading="isLoading"
      class="w-100 table"
      :data="list"
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
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
            Name
          </th>
          <th 
            class="bg-gray-200 border" 
            rowspan="3"
          >
            Email
          </th>
          <th 
            class="bg-gray-200 border" 
            rowspan="3"
          >
            Body
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(item, index) in posts" 
          :key="index.id"
          class="border"
        >
          <td class="border">
            {{ item.id }} 
          </td>
          <td class="border">
            <router-link 
              :to="'/posts/show/'+item.id"
              class="link-type"
            >
              <span>{{ item.title }}</span>
            </router-link>
          </td>
          <td class="border">
            {{ item.body }}
          </td>
          <td class="border">
            <el-button
              type="primary"
              size="small"
              @click="handleUpdate(item)"
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
      width="45%"
      :before-close="handleClose"
    >
      <el-form 
        ref="dataForm"
        :model="temp"
        :rules="rules"
      >
        <el-form-item 
          prop="title" 
          label="Title"
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
        <el-button @click="dialogTableVisible = false">Bekor qilish</el-button>
        <el-button 
          type="primary" 
          @click="updateData()"
        >Saqlash</el-button>
      </div>
    </el-dialog>
    <!-- <pagination 
      v-show="total>0" 
      :total="total" 
      :page.sync="listQuery.page" 
      :limit.sync="listQuery.limit" 
      @pagination="getList" 
    /> -->
  </div>
</template>

<script>
  import {  updateArticle } from '@/api/article'
  // import Pagination from '@/components/Pagination'
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Statistic",
    // components: { Pagination },
    
    data() {
      return {
        posts: [],
        dialogTableVisible: false,
        tableKey: 0,
        isLoading: false,
        list: null,
        total: 0,
        filter: {
          user_id: null,
          per_page: 5,
          page: 1,
          filter: 'interested',
          salary: null,
        },
        listQuery: {
          limit: 20,
          title: undefined,
          body: undefined,
          sort: '+id'
        },
        temp: {
          id: undefined,
          title: '',
          timestamp: new Date(),
          body: ''
        },
        rules: {
          title: [{ required: true, message: 'title is required', trigger: 'change' }],
          body: [{ required: true, message: 'body is required', trigger: 'change' }]
        }
      };               
    },
    computed: {
      
    },
    mounted() {
      this.fetchComments()
    },
    created() {
      // this.getList()
    },
    methods: {
      fetchComments() {
        fetch("https://jsonplaceholder.typicode.com/posts/")
          .then((response) => {
            return response.json();
          })
          .then((posts) => {
            this.posts = posts;
          });
      },
      
      // getList() {
      //   fetchList(this.listQuery).then(response => {
      //     this.list = response.data.items
      //     this.total = response.data.total

      //     setTimeout(() => {
      //     }, 1.5 * 1000)
      //   })
      // },
      handleFilter() {
        this.listQuery.page = 1
        // this.getList()
      },
      handleUpdate(item) {
        this.temp = Object.assign({}, item) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogTableVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp)
            updateArticle(tempData).then(() => {
              // const index = this.list.findIndex(v => v.id === this.temp.id)
              // this.list.splice(index, 1, this.temp)
              this.dialogTableVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
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
      
    }
  };
  </script>
    
<style lang="scss" scoped>
.statistic {
  margin-top: 95px; 
}
.section_body {
  width: 100%;
}
.link-type,
.link-type:focus {
  color: #337ab7;
  cursor: pointer;

  &:hover {
    color: rgb(32, 160, 255);
  }
}
.id-numm {
  color: #337ab7;
  font-size: 22px;
}
</style>
