<template>
  <div class="hello report_table p-5">
    <el-row class="d-flex mt-2">
      <el-col :span="14">
        <h2 class="mt-0">{{ date }} - yildagi Hisobotlar ro'yhati</h2>
      </el-col>
      <el-col>
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
    <table id="reportTable" class="table table-auto table-main mt-3">
      <thead>
        <tr class="text-gray-700 text-center font-bold bg-gray-200">
          <th class="bg-gray-200 border">№</th>
          <th class="bg-gray-200 border">
            FIO
            <!-- <el-input
              v-model="citizen_name"
              placeholder="Type something"
              class="mt-1"
              clearable
            >
              <i
                slot="prefix"
                class="el-input__icon el-icon-search"
              />
            </el-input> -->
            <el-autocomplete
              class="inline-input"
              v-model="name"
              :fetch-suggestions="querySearch"
              placeholder="Please Input"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </th>
          <th class="bg-gray-200 border">
            Telefon raqami
            <el-input
              v-model="phone_number"
              placeholder="Type something"
              class="mt-1"
              clearable
            >
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </th>
          <th class="bg-gray-200 border" prop="rev_citizen_region_id">
            Yashash manzili
            <el-input
              v-model="region_id"
              placeholder="Type something"
              class="mt-1"
              clearable
            >
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </th>
          <th class="bg-gray-200 border">
            Tuman nomi
            <el-input
              v-model="citizen_street"
              placeholder="Type something"
              class="mt-1"
              clearable
              filterable
            >
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </th>
          <th class="bg-gray-200 border">
            Korxona nomi
            <el-input
              v-model="company_name"
              placeholder="Type something"
              class="mt-1"
              clearable
            >
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </th>
        </tr>
      </thead>

      <tbody class="tbody">
        <tr v-for="(user, index) in users" :key="'comp' + index">
          <td class="border text-center">
            {{ index + 1 }}
          </td>
          <td class="border text-center">
            {{ user.username + " " + user.name }}
          </td>
          <td class="border text-center">
            {{ user.phone }}
          </td>
          <td class="border text-center">
            {{ user.address.city }}
          </td>
          <td class="border text-center">
            {{ user.address.street }}
          </td>
          <td class="border text-center">
            {{ user.company.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import axios from "axios";
import isMixins from "@/mixins/index";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Form",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    isMixins,
  },
  data() {
    return {
      users: [],
      citizen_name: "",
      phone_number: "",
      company_name: "",
      isLoading: true,
      citizen_street: "",
      region_id: "",
      name: "",
      links: []
    };
  },
  computed: {
    currentYear() {
      return String(new Date().getFullYear());
    },
    date() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();

      return dd + "." + mm + "." + yyyy;
    },
  },
  async mounted() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    this.users = users;
    // this.isLoading = false
    this.links = this.loadAll();
  },
  methods: {
    querySearch(queryString, cb) {
      var links = this.links;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return (link) => {
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return [
        // value = user.name;
      ]
    },
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style scoped>
.report_table {
  width: 85% !important;
  margin-right: 30px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}
.hello {
  margin-top: 95px;
}
.report_table .tbody td {
  font-size: 14px !important;
  font-weight: 400;
  line-height: 23px;
  color: rgb(96, 98, 102);
}
</style>
