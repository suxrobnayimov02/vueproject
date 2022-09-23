<template>
  <div class="main-table app-container mt-10">
    <el-row class="select-and-download">
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
            v-for="post in comments"
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
              v-for="(post, item) in comments" 
              :key="item"
            >
              <td class="border text-center">
                {{ item + 1 }}
              </td>
              <td class="border text-center">
                {{ post.name }}
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
                <template>
                  <el-tooltip 
                    content="Button center"
                    placement="top"
                  >
                    <el-tag 
                      class="el-tag" 
                      type="success"
                    >
                      Button
                    </el-tag>
                  </el-tooltip>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <el-dialog
          title="Tips"
          v-model='dialogVisible'
          width="30%"
          :before-close="handleClose"
        >
          
          <span>Text</span>
          <span 
            class="dialog-footer"
          >
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button 
              type="primary" 
              @click="dialogVisible = false"
            >Confirm</el-button>
          </span>
        </el-dialog> -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InlineEditTable',

  data() {
    return {
      dialogVisible: false,
      comments: [],
      selectValue: [],
      fullscreenLoading: false,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  async mounted() {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
    const comments = await res.json()
    this.comments = comments
  },

  methods: {
    getColor(completed) {
      if (completed === true) return 'success'
      else return 'danger'
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
        })
        // eslint-disable-next-line no-unused-vars
        .catch((_) => {})
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
