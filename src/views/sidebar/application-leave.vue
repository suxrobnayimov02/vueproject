<template>
  <div class="dashboard w-100">
    <div class="hello">
      <div class="el-card p-3 mt-5 citizen_information">
        <h3 class="p-3 text-center input_name">
          Shaxsiy ma'lumotlar
        </h3>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          class="demo-form"
          status-icon
        >
          <div v-loading="loading">
            <el-row>
              <el-col
                :span="8"
                :xs="24"
                :sm="12"
                :lg="8"
                :xl="8"
              >
                <el-form-item
                  label="Pasport seriya va raqamingiz"
                  prop="citizen_passport"
                >
                  <el-input
                    ref="pasportForm"
                    v-model="form.citizen_passport"
                    v-mask="'AA#######'"
                    v-eluppercase
                    size="large"
                    placeholder="AA0000000"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                :xs="24"
                :sm="12"
                :lg="8"
                :xl="8"
              >
                <el-form-item
                  prop="person_pin"
                  label="JShShIRni kiriting"
                >
                  <el-input
                    ref="bDateForm"
                    v-model="form.person_pin"
                    v-eluppercase
                    v-mask="'##############'"
                    class="phone-input"
                    placeholder="00000000000000"
                    size="large"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                :xs="24"
                :sm="12"
                :lg="8"
                :xl="8"
              >
                <el-form-item label="Bog‘lanish uchun qo‘shimcha telefon">
                  <el-input
                    v-model="form.additional_phone"
                    v-mask="'+############'"
                    class="phone-input"
                    placeholder="+998900000000"
                    size="large"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="16"
                :xs="24"
                :sm="12"
                :lg="16"
                :xl="16"
              >
                <el-form-item
                  label="F.I.O"
                  prop="citizen_name"
                >
                  <el-input
                    v-model="form.citizen_name"
                    :disabled="true"
                    placeholder="F.I.O"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <h3 class="text-center input_name mb-5 mt-3">
              Yashash manzilingiz
            </h3>
            <el-row
              :span="24"
              class="w-100"
            >
              <el-col
                :span="8"
                :xs="24"
                :sm="12"
                :lg="8"
                :xl="8"
              >
                <el-form-item
                  prop="rev_citizen_region_id"
                  label="Hudud"
                >
                  <el-select
                    v-model="form.rev_citizen_region_id"
                    placeholder="Tanlang"
                    size="large"
                    class="w-100"
                    @change="getDistrict(form.rev_citizen_region_id, 1)"
                  >
                    <el-option
                      v-for="item in regions"
                      :key="item.id"
                      :label="item.name_cyrl"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                :xs="24"
                :sm="12"
                :lg="8"
                :xl="8"
              >
                <el-form-item
                  prop="rev_citizen_city_id"
                  label="Tuman(shahar)"
                >
                  <el-select
                    v-model="form.rev_citizen_city_id"
                    placeholder="Tanlang"
                    class="w-100"
                    size="large"
                  >
                    <el-option
                      v-for="item in districts"
                      :key="item.id"
                      :label="item.name_cyrl"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                :xs="24"
                :sm="12"
                :lg="8"
                :xl="8"
              >
                <el-form-item
                  label="Mfy/ko‘cha/xonadan"
                  prop="citizen_address"
                >
                  <el-input v-model="form.citizen_address" />
                </el-form-item>
              </el-col>
            </el-row>
            <h3 class="text-center input_name mb-5 mt-3">
              Korxona ma'lumotlari
            </h3>
            <el-row>
              <el-col
                :span="16"
                :xs="24"
                :sm="12"
                :lg="16"
                :xl="16"
              >
                <el-form-item
                  label="Tashkilot nomi"
                  prop="company_name"
                >
                  <el-input
                    v-model="form.company_name"
                    disabled
                  />
                </el-form-item>
              </el-col>

              <el-col
                :span="6"
                :xs="24"
                :sm="12"
                :lg="8"
                :xl="8"
              >
                <el-form-item
                  label="Korxona INNsi"
                  prop="company_representative"
                >
                  <el-input
                    v-model="form.company_representative"
                    v-mask="'#########'"
                    placeholder="000000000"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="8"
                :xs="24"
                :sm="12"
                :lg="8"
                :xl="24"
              >
                <el-form-item
                  prop="citizen_image"
                  label="Qo'shimcha ma'lumot uchun rasm yuklang"
                >
                  <br>
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    :action="mediaUrl"
                    :data="{ phone: form.phone }"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :before-upload="beforeUpload"
                    :on-success="handleAvatarSuccess"
                    :limit="1"
                    accept=".jpg, .png, .jpeg, .svg"
                    list-type="picture"
                  >
                    <el-button type="primary">
                      Yuklash uchun bosing
                    </el-button>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >
                      Fayl kengaytmasi: jpg, png, svg va jpeg
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col
                :span="4"
                :xs="24"
                :sm="12"
                :lg="8"
                :xl="24"
              >
                <el-form-item />
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Contact",
  components: {},
  data() {
    return {
      fileList: [],
      loading: false,
      savLoading: false,
      districts: [],
      active_positions: [],
      validated: false,
      form: {
        fileList: [],
        step: 1,
        citizen_name: null,
        citizen_passport: null,
        additional_phone: null,
        rev_citizen_region_id: null,
        rev_citizen_city_id: null,
        citizen_address: "",
        active_positions: null,
        person_pin: null,
        region_id: null,
        //
        inn: null,
        //
        phone: null,
        delivery: false,
        pin: null,
        name: null,
      },
      code_complete: {
        id: null,
        status_code: null,
      },
    };
  },
  computed: {
    ...mapGetters({ regionsAxios: "region/GET_REGIONS" }),
    mediaUrl() {
      return "http://localhost:8080/contact";
    },
    rules() {
      return {
        citizen_passport: [
          { required: true, message: "Maydonni to'ldiring", trigger: "change" },
        ],
        person_pin: [
          { required: true, message: "Maydonni to'ldiring", trigger: "change" },
        ],
        citizen_name: [
          { required: true, message: "Maydonni to'ldiring", trigger: "change" },
        ],
        rev_citizen_region_id: [
          { required: true, message: "Maydonni to'ldiring", trigger: "change" },
        ],
        rev_citizen_city_id: [
          { required: true, message: "Maydonni to'ldiring", trigger: "change" },
        ],
        phone: [
          { required: true, message: "Maydonni to'ldiring", trigger: "change" },
        ],
        region_id: [
          { required: true, message: "Maydonni to'ldiring", trigger: "change" },
        ],
        city_id: [
          { required: true, message: "Maydonni to'ldiring", trigger: "change" },
        ],
        message: [
          { required: true, message: "Maydonni to'ldiring", trigger: "change" },
        ],
        fileList: [
          { required: true, message: "Maydonni to'ldiring", trigger: "change" },
        ],
        inn: [
          { required: true, message: "Maydonni to'ldiring", trigger: "change" },
        ],
      };
    },
    isBirthDateFull() {
      return this.form.person_pin && this.form.person_pin.length === 14;
    },
    isPassportFull() {
      return this.form.citizen_passport.length === 9;
    },
    isInnFull() {
      return this.form.inn && this.form.inn.length === 9;
    },
  },
  watch: {
    "form.citizen_passport"(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        if (this.isPassportFull) {
          if (this.isBirthDateFull) {
            this.getPassportInfo();
          } else {
            this.$refs.bDateForm.focus();
          }
        }
      }
    },
    "form.person_pin"(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        if (this.isBirthDateFull) {
          if (this.isPassportFull) {
            this.getPassportInfo();
          } else {
            this.$refs.pasportForm.focus();
          }
        }
      }
    },
    isInnFull(newVal) {
      if (newVal) {
        this.getCompInfo(this.form.inn);
      }
    },
  },
  mounted() {
    this.fetchRegions();
  },
  methods: {
    ...mapActions({
      fetchRegionsAxios: "region/regions",
      getCompanyInfo: "appointment/getCompanyInfo",
    }),
    validateForm() {
      this.$refs["formRef"].validate((valid) => {
        this.validated = valid;
      });
      return this.validated;
    },
    getCompInfo(inn) {
      this.getCompanyInfo({ inn: inn }).then((res) => {
        if (res.success) {
          this.form.region_id = res.data.details.region_id;
          this.getDistrict(this.form.region_id);
          this.form.city_id = res.data.details.city_id;
          this.form.rev_citizen_company_address = res.data.details.ADDR;
          this.form.company_name = res.data.details.ACRON_UZ;
          this.form.company_phone = res.data.details.PHONE;
          this.form.company_representative = res.data.details.HEAD_NM;
        }
      });
    },
    fetchRegions() {
      fetch("https://dmi.mehnat.uz/api/v1/citizen/getregions")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.regions = data.data;
        });
    },
    getDistrict(region_id, addres) {
      if (addres === 1) {
        this.form.rev_citizen_city_id = null;
      } else if (addres === 2) {
        this.form.city_id = null;
      }
      fetch(`https://dmi.mehnat.uz/api/v1/citizen/getcities/${region_id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.districts = data.data;
        });
    },
    getPassportInfo() {
      const data = {
        passport: this.form.citizen_passport,
        pin: this.form.person_pin,
      };

      this.loading = true;
      axios
        .post(`https://dmi.mehnat.uz/api/v1/appeals/check-passport-info`, data)
        .then((res) => {
          if (res.data.success) {
            this.form.citizen_name = [
              res.data.details.sname,
              res.data.details.fname,
              res.data.details.lname,
            ].join(" ");
            this.form.citizen_address = res.data.details.address;
            this.form.birth_date = res.data.details.date_birth;
            if (
              res.data.details.active_positions &&
              res.data.details.active_positions.length
            ) {
              this.form.region_id =
                res.data.details.active_positions[0].region_id;
              this.getDistrict(this.form.region_id);
              this.form.city_id = res.data.details.active_positions[0].city_id;
              this.form.rev_citizen_company_address =
                res.data.details.active_positions[0].street;
              this.form.company_name =
                res.data.details.active_positions[0].company_profile_name;
              this.form.company_phone =
                res.data.details.active_positions[0].company_phones;
              this.form.company_representative =
                res.data.details.active_positions[0].director;
            }
          } else {
            this.clearPassportInfo();
            this.$message({
              message: res.data.message || `Fuqaro topilmadi`,
              type: "error",
            });
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: `Fuqaro topilmadi`,
            type: "error",
          });
          this.clearPassportInfo();
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    clearPassportInfo() {
      this.form.citizen_name = null;
      this.form.citizen_address = null;
      this.form.birth_date = null;
      this.form.region_id = null;
      this.form.city_id = null;
      this.form.rev_citizen_company_address = null;
      this.form.company_name = null;
      this.form.company_phone = null;
      this.form.company_representative = null;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(res, file) {
      this.form.fileList = URL.createObjectURL(file.raw);
    },
    beforeUpload() {
      if (!this.form.phone) {
        this.$message({
          type: "error",
          message: `Fayl yuklash uchun avval telefonni to'ldiring`,
        });
      }
    },
  },
};
</script>
<style scoped>
.dashboard {
  margin-top: 95px;
}
</style>
