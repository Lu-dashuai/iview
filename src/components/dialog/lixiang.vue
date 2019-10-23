<template>
  <div >
    <Modal v-model="modal6" draggable :title="title" footer-hide >
      <div>
        <Transfer
          :data="data1"
          :target-keys="targetKeys1"
          :render-format="render1"
          @on-change="handleChange1"
          :titles="titles"
        ></Transfer>
      </div>
      <Divider>请选择</Divider>
      <div align="right">
          <Button type="primary" @click="handleSubmit()">提交</Button>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Modal>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      modal6: false,
      loading: true,
      titles: ["待选人员", "参与人员"],
      data1: this.getMockData(),
      targetKeys1: this.getTargetKeys(),
      order:{},
      title:'立项',
      spinShow:false
    };
  },
  created: function() {},
  methods: {
    openDialog(bo, row) {
      this.modal6 = bo;
      // alert(JSON.stringify(row))
      this.order = row
    },
    getMockData() {
      //左边列表
      let mockData = [];
      //发送请求获取所有的人员
      var _if = {
        page_num: 1,
        page_size: 100
      };
      this.$http
        .post("user/getData", _if) //
        .then(res => {
          if (res.status == 200) {
            var json = [];
            json = res.body.data;
            json.forEach(item => {
              // alert(item.create_time);
              item.create_time = moment(item.create_time).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            });
            for (var i = 0; i < json.length; i++) {
              var user = json[i];
              mockData.push({
                key: user.id,
                label: user.user_name,
                disabled: false
              });
            }
            // alert(JSON.stringify(json))
          } else {
            alert("字段数据加载失败");
          }
        });

      return mockData;
    },
    getTargetKeys() {
      //右边列表
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map(item => item.key);
    },
    render1(item) {
      return item.label;
    },
    handleChange1(newTargetKeys, direction, moveKeys) {
      // alert(newTargetKeys);
      // console.log(direction);
      // console.log(moveKeys);
      this.targetKeys1 = newTargetKeys;
    },
    handleSubmit() {
      //添加或者更改的方法
      if (this.order.order_status=='新建'||this.order.order_status=='立项') {
        this.spinShow=true;//加载中
        //发送请求生成账单表
        var param = {
          joiner:this.targetKeys1,
          order:this.order
        }
        this.$http
        .post("bill/addBill",param) //
        .then(res => {
          // alert(JSON.stringify(res))
          this.spinShow=false;//关闭加载中
          if (res.status=='200'&&res.body.code=='200') {
            this.$Message.success("已发送邮件，生成账单成功!");
            this.modal6 = false;
            this.$parent.reLoading();

          } else{
            this.$Message.error("生成账单失败!");
          }
        });
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
