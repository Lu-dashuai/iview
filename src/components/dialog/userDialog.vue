<template>
  <div>
    <Modal v-model="modal6" draggable title="用户添加" footer-hide >
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="60" inline>
          <FormItem label="用户名" prop="user_no">
            <Input v-model="formValidate.user_no" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="姓名" prop="user_name">
            <Input v-model="formValidate.user_name" placeholder="请输入姓名"></Input>
          </FormItem>
          <FormItem label="密码" prop="pass_word">
            <Input v-model="formValidate.pass_word" type="password" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formValidate.sex">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="身份证号" prop="card_id">
            <Input v-model="formValidate.card_id" placeholder="请输入身份证号"></Input>
          </FormItem>
          <FormItem label="E-mail" prop="email">
            <Input v-model="formValidate.email" placeholder="请输入身份e-mail"></Input>
          </FormItem>
          <FormItem label="电话" prop="tel">
            <Input v-model="formValidate.tel" placeholder="请输入电话"></Input>
          </FormItem>
          <FormItem label="爱好" prop="hobby">
            <CheckboxGroup v-model="formValidate.hobby">
              <Checkbox label="笑"></Checkbox>
              <Checkbox label="还在那笑"></Checkbox>
              <Checkbox label="嘿嘿"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="角色" prop="role">
            <Select v-model="formValidate.city" placeholder="请选择角色">
              <Option value="">请选择</Option>
              <Option value="1">管理员</Option>
              <Option value="2">采购员</Option>
              <Option value="3">清洁员</Option>
            </Select>
          </FormItem>
          <FormItem label="备注" prop="info">
            <Input
              v-model="formValidate.info"
              type="textarea"
               
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
            ></Input>
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
export default {
  data() {
    return {
      modal6: false,
      loading: true,
      formValidate: {
        user_no:'',
        user_name:'',
        password:'',
        sex:'',
        card_id:'',
        email:'',
        tel:'',
        hobby:'',
        role_id:'',
        info:''
      },
      ruleValidate: null,//表单校验
    };
  },
  methods: {
    openDialog(bo) {
      //父组件调用打开/关闭对话框
      this.modal6 = bo;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("添加成功!");
        } else {
          this.$Message.error("添加失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
