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
            2022-yildagi statistikalar ro'yxati
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
    <!-- <el-button 
      :plain="true" 
      @click="open2"
    >
      success
    </el-button> -->
    <div class="mb-3">
      <el-row>
        <el-col :span="8">
          <el-input 
            v-model="listQuery.name" 
            placeholder="Name" 
            style="margin-right: 20px;" 
            class="filter-item" 
            @keyup.enter.native="handleFilter" 
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
            @click="handleFilter"
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
          v-for="(item, index) in comments" 
          :key="index.id"
          class="border"
        >
          <td class="border">
            {{ item.id }} 
          </td>
          <td class="border">
            <span 
              v-b-modal.modal-center
              class="link-type" 
              @click="handleUpdate(item)"
            >{{ item.name }}</span>
          </td>
          <td class="border">
            {{ item.email }}
          </td>
          <td class="border">
            {{ item.body }}
          </td>
        </tr>
      </tbody>
    </table>
    <el-pagination 
      :current-page="filter.page"
      :total="comments.total" 
      layout="prev, pager, next" 
      :page-size="comments.per_page" 
      @current-change="handleCurrentChange" 
    />
    <b-modal 
      id="modal-center" 
      centered
    >
      <template #modal-title>
        Id si <span class="id-numm">{{ temp.id }}</span> bo'lgan ma'lumot
      </template>
      <el-form 
        ref="dataForm"
        :model="temp"
      >
        <el-form-item prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item prop="body">
          <el-input 
            v-model="temp.body" 
            :rows="4"
            type="textarea"
          />
        </el-form-item>
      </el-form>
    </b-modal>
  </div>
</template>

<script>
// import { Message } from 'element-ui';
import { fetchList } from '@/api/article'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Statistic",
  
  data() {
    return {
      comments: [],
      tableKey: 0,
      isLoading: true,
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
        importance: undefined,
        title: undefined,
        name: undefined,
        type: undefined,
        sort: '+id'
      },
      temp: {
        id: undefined,
        importance: 1,
        name: '',
        timestamp: new Date(),
        email: '',
        body: ''
      },
    };               
  },
  computed: {
    
  },
  watch: {
    'filter.comment_id'(newVal) {
      if (newVal) this.comment_id = newVal
    }
  },
  mounted() {
    this.fetchComments()
    this.fetchVacancies(this.filter)
  },
  created() {
    this.getList()
  },
  methods: {
    fetchComments() {
      fetch("https://jsonplaceholder.typicode.com/comments/")
        .then((response) => {
          return response.json();
        })
        .then((comments) => {
          this.comments = comments;
        });
    },
    
    getList() {
      this.isLoading = false
      fetchList(this.listQuery).then(response => {
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
      this.temp = Object.assign({}, row)
      this.temp.timestamp = new Date(this.temp.timestamp)
      
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
    handleCurrentChange(page) {
      this.filter.page = page
      this.getVacancies()
    },
    async getVacancies() {
      this.isLoading = true
      await this.fetchVacancies(this.filter)
      this.isLoading = false
    },
    open2() {
      this.$message({
        message: 'Congrats, this is a success message.',
        type: 'success'
      });
    }
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
