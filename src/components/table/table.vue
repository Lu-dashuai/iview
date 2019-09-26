<style>
/*外层table的border*/
.ivu-table-wrapper {
  border: none;
}
/*底色*/
.ivu-table td {
  background-color: #182328;
  color: #fff;
}
/*每行的基本样式*/
.ivu-table-row td {
  color: #182328;
  border: none;
}
/*头部th*/
.ivu-table-header th {
  color: blue;
  font-weight: bold;
  background-color: #212c31;
  border: none;
}

/*偶数行*/
.ivu-table-stripe-even td {
  background-color: #fafafa !important;
}
/*奇数行*/
.ivu-table-stripe-odd td {
  background-color: #f1f1f1 !important;
}
/*选中某一行高亮*/
.ivu-table-row-highlight td {
  background-color: #e6f7fe !important;
}
/*浮在某行*/
.ivu-table-row-hover td {
  background-color: #e6f7fe !important;
}
</style>
<template>
  <div>
    <Table
      ref="selection"
      @on-selection-change="onSelect"
      height="700"
      no-data-text="暂无数据"
      :row-class-name="rowClassName"
      :columns="columns4"
      :data="data1"
      highlight-row
    ></Table>
    <Button @click="handleSelectAll(true)">Set all selected</Button>
    <Button @click="handleSelectAll(false)">Cancel all selected</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selecteds: [],
      columns4: [],
      data1: [
        {
          apple: "John Brown",
          banana: "18",
          orange: 18,
          watermelon: "New York No. 1 Lake Park",
          milk: "2016-10-03",
          Bread: "New York No. 1 Lake Park",
          salt: "2016-10-03",
          wheat: "New York No. 1 Lake Park",
          rice: "2016-10-03",
          soy: "New York No. 1 Lake Park",
          else: "2016-10-03"
        },
        {
          apple: "John Brown",
          banana: "18",
          orange: 18,
          watermelon: "New York No. 1 Lake Park",
          milk: "2016-10-03",
          Bread: "New York No. 1 Lake Park",
          salt: "2016-10-03",
          wheat: "New York No. 1 Lake Park",
          rice: "2016-10-03",
          soy: "New York No. 1 Lake Park",
          else: "2016-10-03"
        },
        {
          apple: "John Brown",
          banana: "18",
          orange: 18,
          watermelon: "New York No. 1 Lake Park",
          milk: "2016-10-03",
          Bread: "New York No. 1 Lake Park",
          salt: "2016-10-03",
          wheat: "New York No. 1 Lake Park",
          rice: "2016-10-03",
          soy: "New York No. 1 Lake Park",
          else: "2016-10-03"
        },
        {
          apple: "John Brown",
          banana: "18",
          orange: 18,
          watermelon: "New York No. 1 Lake Park",
          milk: "2016-10-03",
          Bread: "New York No. 1 Lake Park",
          salt: "2016-10-03",
          wheat: "New York No. 1 Lake Park",
          rice: "2016-10-03",
          soy: "New York No. 1 Lake Park",
          else: "2016-10-03",
          _checked: true
        },
        {
          apple: "John Brown",
          banana: "18",
          orange: 18,
          watermelon: "New York No. 1 Lake Park",
          milk: "2016-10-03",
          Bread: "New York No. 1 Lake Park",
          salt: "2016-10-03",
          wheat: "New York No. 1 Lake Park",
          rice: "2016-10-03",
          soy: "New York No. 1 Lake Park",
          else: "2016-10-03"
        },
        {
          apple: "John Brown",
          banana: "18",
          orange: 18,
          watermelon: "New York No. 1 Lake Park",
          milk: "2016-10-03",
          Bread: "New York No. 1 Lake Park",
          salt: "2016-10-03",
          wheat: "New York No. 1 Lake Park",
          rice: "2016-10-03",
          soy: "New York No. 1 Lake Park",
          else: "2016-10-03"
        },
        {
          apple: "John Brown",
          banana: "18",
          orange: 18,
          watermelon: "New York No. 1 Lake Park",
          milk: "2016-10-03",
          Bread: "New York No. 1 Lake Park",
          salt: "2016-10-03",
          wheat: "New York No. 1 Lake Park",
          rice: "2016-10-03",
          soy: "New York No. 1 Lake Park",
          else: "2016-10-03"
        }
      ]
    };
  },
  created: function() {
    this.getTableHeadJson();
  },
  methods: {
    handleSelectAll(status) {
      // this.$refs.selection.selectAll(status);
      // console.log(this.$refs.selection.$children)
      this.$refs.selection.selectAll(status);
      console.log(this.selection);
    },
    rowClassName: function(row, index) {
      if (index % 2 == 0) {
        return "ivu-table-stripe-even";
      } else return "ivu-table-stripe-odd";
    },
    onSelect(selection, index) {
      // console.log(this.$refs.selection.data)
      this.selecteds = selection;
      console.log(this.selecteds);
    },
    /*
      onDoubleClick(row,index){
        console.log(row)
        //改变为勾选样式
        //将当前行加入到selection
        this.$refs.selection.data[index]._checked=!this.$refs.selection.data[index]._checked
      },*/
    getTableHeadJson() {//从vuex获取表头字段
      alert(111)
      this.columns4 = this.$store.state.table_head
    }
  }
};
// //创建表头字段
// var table_head = [
//         {
//           type: "selection",
//           width: 60,
//           align: "center"
//         },
//         {
//           title: "id",
//           key: "id"
//         },
//         {
//           title: "员工编号",
//           key: "user_no"
//         },
//         {
//           title: "用户名",
//           key: "user_name"
//         },
//         {
//           title: "密码",
//           key: "password"
//         },
//         {
//           title: "性别",
//           key: "sex"
//         },
//         {
//           title: "身份证号",
//           key: "card_id"
//         },
//         {
//           title: "邮箱",
//           key: "email"
//         },
//         {
//           title: "电话",
//           key: "tel"
//         },
//         {
//           title: "爱好",
//           key: "hobby"
//         },
//         {
//           title: "角色",
//           key: "role_name"
//         },
//         {
//           title: "创建时间",
//           key: "create_time"
//         },
//         {
//           title:"备注",
//           key:"info"
//         }
//       ]
</script>

