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
      height="600"
      no-data-text="暂无数据"
      :row-class-name="rowClassName"
      :columns="columns4"
      :data="data1"
      highlight-row
    ></Table>
    <div style="height:5px"></div>
    <Page
      :total="this.total"
      :current="this.page_num"
      :page-size="this.page_size"
      :page-size-opts="this.page_size_opts"
      @on-change="changePage"
      @on-page-size-change="changePageSize"
      show-total
      show-elevator
      show-sizer
    />
    
  </div>
</template>

<script>
import store from "../../store/index.js";
import moment from "../../../node_modules/moment/moment.js";

export default {
  data() {
    return {
      selecteds: [],
      columns4: [],
      to_url: "", //跳转路径
      data_url: "", //获取参数的路径
      _if: {}, //查询的条件
      data1: [], //加载表格的数据
      page_num: 1, //当前页
      page_size: 10, //一页多少条
      total: 0, //数据总数
      show_total: 0,
      page_size_opts: [5, 10, 15, 20],
      del_by_id: [],
      del_url:'',
    };
  },
  store,
  created: function() {
    this.getTableHeadJson(); //获取表头数据
    this.createGetTableInfo(); //获取表格数据
  },
  methods: {
    handleSelectAll(status) {
      // this.$refs.selection.selectAll(status);
      // console.log(this.$refs.selection.$children)
      this.$refs.selection.selectAll(status);
      console.log(this.selection);
    },
    rowClassName: function(row, index) {
      //单双行更改class
      if (index % 2 == 0) {
        return "ivu-table-stripe-even";
      } else return "ivu-table-stripe-odd";
    },
    onSelect(selection, index) {
      //选择框返回整行数据
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
    getTableHeadJson() {
      //路由查询表头
      //路由中获取url查询表头
      this.to_url = this.$route.path; //从路由中获取参数url
      //当路径改变根据path查询出来表头的内容
      this.$http
        .get("header/toData", { params: { info: this.to_url } }) //
        .then(res => {
          if (res.body.code == 200) {
            // console.log("字段：" + JSON.stringify(res.body.data));
            this.columns4 = res.body.data; //赋值
            if (res.body.data.length > 0) {
              var selection = {
                type: "selection",
                width: 60,
                align: "center"
              };
              var btn = this.getbtn(); //获取后面两个按钮
              this.columns4.unshift(selection);
              this.columns4.push(btn);
              if(this.to_url=='/admin/power'){
                var act = this.getAct();
                this.columns4.push(act);
              }
              if(this.to_url=='/time/shop'){//获取详情按钮
                var detil = this.getDetil();
                this.columns4.push(detil);
              }
            }
          } else {
            alert("字段数据加载失败");
          }
        });
    },
    getbtn() {
      //表格后面的按钮
      var btn = {
        title: "Action",
        key: "action",
        width: 150,
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.updateRow(params);
                  }
                }
              },
              "更改"
            ),
            h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.remove(params);
                  }
                }
              },
              "删除"
            )
          ]);
        }
      };
      return btn;
    },
    getAct() {
      //表格后面的按钮
      var btn = {
        title: "授权",
        key: "action",
        width: 150,
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.power(params);
                  }
                }
              },
              "授权"
            )
          ]);
        }
      };
      return btn;
    },
     getDetil() {
      //表格后面的按钮
      var btn = {
        title: "详情",
        key: "action",
        width: 150,
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.detil(params);
                  }
                }
              },
              "详情"
            )
          ]);
        }
      };
      return btn;
    },
    getTableInfo(_if) {
      //获取表格数据
      //获取需要请求的url
      this.data_url = this.$store.state.data_url;
      this.$http
        .post(this.data_url, _if) //
        .then(res => {
          if (res.status == 200) {
            var json = res.body.data;
            json.forEach(item => {
              item.create_time = moment(item.create_time).format("YYYY-MM-DD");
            });
            this.data1 = json; //赋值
            this.page_num = res.body.page_num;
            this.page_size = res.body.page_size;
            this.total = res.body.total_count;
          } else {
            alert("字段数据加载失败");
          }
        });
    },
    createGetTableInfo() {
      //当页面初始化时候的调用
      var _if = {
        page_num: this.page_num,
        page_size: this.page_size
      };
      // alert('当页面初始化时候调用'+this.page_num+this.page_size)
      this.getTableInfo(_if);
    },
    changePage(page_num) {
      //页码改变的回调
      var _if = {
        page_num: page_num,
        page_size: this.page_size
      };
      this.getTableInfo(_if);
    },
    changePageSize(page_size) {
      //每页展示数量改变的回调
      var _if = {
        page_num: 1,
        page_size: page_size
      };
      this.getTableInfo(_if);
    },
    searchForm(_if) {
      //表单查询事件
      _if.page_num = 1;
      _if.page_size = this.page_size;
      this.getTableInfo(_if);
    },
    delByid(id) {
      if (id==null&&this.selecteds.length == 0) {
        this.$Message.warning("请选择至少一行删除!");
        return;
      }
      this.del_url = this.$store.state.del_url;//全部删除的按钮url

      var temp = "";
      // var names = [];
      for (var i = 0; i < this.selecteds.length; i++) {
        temp += this.selecteds[i].id + ",";
        // names.push(this.selecteds[i].user_name);
      }
      // alert(temp);
      temp = temp.substr(0, temp.length - 1);
      if(id!=null){
        temp = id;
        this.del_url = this.$parent.del_url;
        alert('父组件url：'+this.del_url);
      }
      this.$http
        .get(this.del_url, { params: { ids: temp } }) //
        .then(res => {
          if (res.status == "200" && res.body.code == "200") {
            this.$Message.success("删除成功!");
            this.createGetTableInfo(); //删除成功刷新页面
          } else {
            this.$Message.error("删除失败!");
          }
        });
    },
    updateRow(el) {
      this.$parent.add(true,el.row);//打开对话框并赋值
    },
    remove(el) {
      // alert(JSON.stringify(el.row.id))
      this.delByid(el.row.id);
    },
    power(el){
      // alert(el.row.id)
      this.$parent.power(true,el.row);
    },
    detil(el){
      alert('详情')
    }
  }
};
</script>

