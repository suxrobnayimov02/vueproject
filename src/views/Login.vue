<template>
  <div class="login">
    <div class="login_items">
      <h4 class="pt-2 pb-3 text-center">
        Tizimga kirish uchun
        login va parolni kiriting
      </h4>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm login_form text-left"
        @submit.prevent="submitHandler"
      >
        <el-form-item
          prop="login"
          @keyup.enter="checkFieldsFilled()"
        >
          <label for="">Login</label>
          <el-input
            v-model="ruleForm.login"
            class=""
          />
        </el-form-item>
        <el-form-item
          prop="password"
        >
          <label for="">Password</label>
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            show-password
            @keyup.enter="checkFieldsFilled()"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="text-right w-100 mt-4"
            @click="submitForm('ruleForm')"
          >
            Submit
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import Swal from 'sweetalert2'
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Login',
	data() {
		let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('To\'ldirish majburiy maydon'));
			} else {
				if (this.ruleForm.login !== '') {
					this.$refs.ruleForm.validateField('login');
				}
				callback();
			}
		};
		let validateLogin = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('To\'ldirish majburiy maydon'));
			} else {
				callback();
			}
		};
   
		return {
			loading: true,
			ruleForm: {
				login: '',
				password: '',
			},
			rules: {
				pass: [
					{ validator: validatePass, trigger: 'blur' }
				],
				login: [
					{ validator: validateLogin, trigger: 'blur' }
				],
			}
		};
	},
  watch: {
    'ruleForm.login'(newVal, oldVal){
      if (oldVal == 'test') {
        this.loading = true
      }
    },
  },
	methods: {
    validateForm() {
      this.$refs['ruleForm'].validate((valid) => {
        this.validated = valid
      })
      return this.validated
    },
		submitForm() {
      // this.validateForm()
      // this.ruleForm.then(res => {
      //   if (res.success) {
      //    Swal.fire({
      //      title: 'Ma`lumotlar saqlandi!',
      //      type: 'success',
      //      timer: 3000,
      //      confirmButtonText: 'Davom etish'
      //    })
      //   } else {
      //     Swal.fire({
      //         title: 'Xatolik',
      //         type: 'error',
      //         timer: 3000,
      //         confirmButtonText: 'Davom etish'
      //       })
      //   }
      // })
			const h = this.$createElement;
        this.$msgbox({
          title: 'Diqqat!',
          message: h('p', null, [
            h('span', null, 'Tizimga kirmoqchimisiz?'),
            h('i', { style: 'color: teal' })
          ]),
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          beforeClose: (action, instance, done) => {
						// this.$router.push('/')
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = 'Loading...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 1000);
            } else {
              done();
            }
          }
        }).then(() => {
          this.$router.push('/')
          this.$message({
            type: 'success',
            message: 'Tizimga kirish muvafaqqiyatli amalga oshirildi '
          });
        }).catch(() => {
        window.location.href = 'login'
      })
			this.loading = true
			// this.$router.push('/')
			// .catch(err => {
			// 	this.showLoginError(err)
			// })
			.finally(() => {
				this.loading = false
			})
		},
		checkFieldsFilled() {
			if (this.validate()) {
				this.submitLogin()
			} else {
				this.showLoginError('empty')
			}
		},
		validate() {
			return !!((this.ruleForm.login.length > 0 && this.ruleForm.password.length > 0))
		},
		showLoginError($type) {

			var message
			if ($type === 'empty') {
				message = this.$t('Логин ёки парол киритилмади')
			} else {
				message = this.$t('Логин ёки парол хато')
			}
			this.$message({
				message: message,
				type: 'error',
				duration: 5 * 1000,
				offset: 80
			})
		},
	}
}
</script>

<style>
.login_form .el-form-item__label{
    text-align: left !important;
}
</style>