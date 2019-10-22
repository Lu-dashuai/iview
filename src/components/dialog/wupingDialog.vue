<template>
  <div>
    <Modal v-model="modal6" draggable :title="title" footer-hide >
      <div>
        <Form ref="formValidate" :model="formValidate"  :label-width="60" inline>
          <FormItem label="订单编号" prop="order_no">
            <Input v-model="formValidate.order_no" placeholder="请输入订单编号" readonly />
          </FormItem>
          <FormItem label="订单名称" prop="order_name">
            <Input v-model="formValidate.order_name" placeholder="请输入订单名称"/>
          </FormItem>
          <FormItem label="发起人" prop="user_name">
            <Input v-model="formValidate.user_name" placeholder="请输入发起人" readonly/>
          </FormItem>
          <FormItem label="金额(元)" prop="order_money">
            <Input type="number" v-model="formValidate.order_money" placeholder="请输入金额" />
          </FormItem>
          <FormItem label="订单状态" prop="order_status">
            <Input v-model="formValidate.order_status" placeholder="请输入订单状态" readonly/>
          </FormItem>
          <FormItem label="时间" prop="create_time">
            <DatePicker v-model="formValidate.create_time" type="datetime" placeholder="请选择时间" style="width: 200px" ></DatePicker>
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
        order_no:'',
        order_name:'',
        promoter_id:'',//发起人id
        user_name:'',
        order_status:'',
        create_time:'',
        info:''
      },
      add_updata_url:'',
      title:'订单添加'
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
      
      if(row!=null){//不等于null，是update
        // alert('订单更改');
        this.title = '订单更改'
        console.log(row);
        this.formValidate = row
        this.add_updata_url = 'order/updateOrder'
      }else{
        this.add_updata_url = 'order/addOrder'
        this.title = '订单添加'
        //订单添加初始化表单：时间，发起人，订单编号，订单状态
        var date = new Date();
        this.formValidate.order_no = date.getTime();//精确到毫秒，不会重复
        // alert(date.getTime());
        this.formValidate.create_time = date;
        this.formValidate.user_name = this.$store.state.user.user_name//从vuex中获取username
        this.formValidate.promoter_id = this.$store.state.user.id//发起人id
        this.formValidate.order_status = '新建'//从vuex中获取username
      }
    },
    handleSubmit(name) {//添加或者更改的方法
      // console.log(this.formValidate);
      this.$refs[name].validate(valid => {
          if (valid) {
            this.$http
            .post(this.add_updata_url,this.formValidate) //
            .then(res => {
              if (res.status == '200') {
                if(res.body.code=='201'){
                  this.$Message.error("失败！");
                  this.openDialog(false);
                  this.$parent.reLoading();
                  return;
                }
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
        order_no:'',
        order_name:'',
        promoter_id:'',//发起人id
        user_name:'',
        order_status:'',
        create_time:'',
        info:''
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
