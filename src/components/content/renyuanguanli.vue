<template>
  <div>
    <h3 align="center">人员管理页面</h3>
    <br />
    <div class="outerbox">
      <div class="lf">
        <Button type="primary" shape="circle" @click="add()">添加</Button>&nbsp;&nbsp;&nbsp;
        <Button type="error" shape="circle" @click="del()">删除</Button>&nbsp;&nbsp;&nbsp;
      </div>
      <div class="rg">
        姓名：
        <Input size="large" placeholder="姓名" clearable style="width: 200px" v-model="user_name" />&nbsp;&nbsp;&nbsp;
        账号：
        <Input size="large" placeholder="账号" clearable style="width: 200px" v-model="user_no" />&nbsp;&nbsp;&nbsp;
        身份证号：
        <Input size="large" placeholder="身份证号" clearable style="width: 200px" :v-model="card_id" />&nbsp;&nbsp;&nbsp;
        <Button type="primary" shape="circle" @click="searchForm()">查询</Button>
      </div>
    </div>
    <br />
    <bdsTable ref="tableTab"></bdsTable>
  </div>
</template>
<script>
import bdsTable from "../table/table.vue";
import store from "../../store/index.js";
export default {
  data() {
    return {
      user_name: "",
      user_no: "",
      card_id: ""
    };
  },
  components: {
    bdsTable
  },
  created: function() {
    //获取全部员工信息
    this.getUserInfo();
  },
  store,
  methods: {
    getUserInfo() {//全部获取员工信息
      this.$store.state.data_url = "user/getData"; //赋值
      // this.$store.state._if = this._if
    },
    searchForm() {//表头搜索框
      var _if = {
        user_name: this.user_name,
        user_no: this.user_no,
        card_id: this.card_id
      };
      this.$refs.tableTab.searchForm(_if);
    },
    add(){//点击弹出对话框
      this.$refs.tableTab.add(true,null);//调用table组件的add方法
    },
    del(){//点击删除按钮
      this.$refs.tableTab.delByid(null);//调用table组件的delbyid方法
    }
  }
};
</script>
<style scoped>
.outerbox {
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: flex-start;
}
.outerbox div {
  height: auto;
}
</style>