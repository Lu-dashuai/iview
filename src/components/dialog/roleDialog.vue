<template>
  <div>
    <Modal v-model="modal6" draggable :title="title" footer-hide >
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="60" inline>
          
          <FormItem label="角色" prop="role_name">
            <Input v-model="formValidate.role_name" placeholder="请输入角色名称" />
          </FormItem>
          <FormItem label="角色id" prop="id">
            <Input v-model="formValidate.id" placeholder="自动生成，不用填写" readonly />
          </FormItem>
          <FormItem label="备注" prop="info">
            <Input
              v-model="formValidate.info"
              type="textarea"
               
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
            />
          </FormItem>
          <div align="center">
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      modal6: false,
      loading: true,
      formValidate: {
        role_name:'',
        role_id:'',
        role_info:''
      },
      ruleValidate: null,//表单校验
      options:[],//角色下拉框
      add_updata_url:'',
      title:'用户添加'
    };
  },
  created:function(){
  },
  methods: {
    openDialog(bo,row) {
      // alert(JSON.stringify(row))
      //父组件调用打开/关闭对话框
      this.clearDialog();//清空对话框
      this.modal6 = bo;
      this.add_updata_url = 'role/addRole'
      this.title = '添加角色'
      if(row!=null){//不等于null，是update
        this.title = '更改角色'
        this.formValidate = row
        this.add_updata_url = 'role/updateRole'
      }
    },
    handleSubmit(name) {//添加或者更改的方法
      console.log(this.formValidate);
      this.$refs[name].validate(valid => {
          if (valid) {
            this.$http
            .post(this.add_updata_url,this.formValidate) //
            .then(res => {
              if (res.status == '200'&&res.body.code=='200') {
              // alert(res.status)
                this.$Message.success("成功!");
                this.openDialog(false);
                this.$parent.reLoading();
              } else {
                this.$Message.error("失败!");
              }
          });
        } else {
          this.$Message.error("失败!"); 
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    clearDialog(){
      this.formValidate= {
        role_name:'',
        role_id:'',
        role_info:''
      }
    }
  }
};
//表单校验
// var rule = {
//   name: [
//     { required: true, message: "The name cannot be empty", trigger: "blur" }
//   ],
//   email: [
//     { required: true, message: "Mailbox cannot be empty", trigger: "blur" },
//     { type: "email", message: "Incorrect email format", trigger: "blur" }
//   ],
//   city: [
//     { required: true, message: "Please select the city", trigger: "change" }
//   ],
//   gender: [
//     { required: true, message: "Please select gender", trigger: "change" }
//   ],
//   interest: [
//     {
//       required: true,
//       type: "array",
//       min: 1,
//       message: "Choose at least one hobby",
//       trigger: "change"
//     },
//     {
//       type: "array",
//       max: 2,
//       message: "Choose two hobbies at best",
//       trigger: "change"
//     }
//   ],
//   date: [
//     {
//       required: true,
//       type: "date",
//       message: "Please select the date",
//       trigger: "change"
//     }
//   ],
//   time: [
//     {
//       required: true,
//       type: "string",
//       message: "Please select time",
//       trigger: "change"
//     }
//   ],
//   desc: [
//     {
//       required: true,
//       message: "Please enter a personal introduction",
//       trigger: "blur"
//     },
//     {
//       type: "string",
//       min: 20,
//       message: "Introduce no less than 20 words",
//       trigger: "blur"
//     }
//   ]
// };
</script>
