<template>
    <div>
        <div class="container">
            <p>单页管理</p>
            <p>单页创建</p>
            <p>单页编辑</p>
            <p>单页删除</p>
        </div>

        <el-table
    ref="multipleTable"
    :data="listData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      sortable
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>

<div style="margin-top: 20px">
    <el-button @click="toggleSelection([listData[1], listData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>

    </div>
</template>

<script>
    export default {
        name: 'singleList',
        data: function(){
            return {
                listData: [],
                multipleSelection: []
            }
        },
        created() {
            // this.getListData();
        },
        methods: {
           getListData(){
               this.$axios.get('static/base/pagelist.json').then((res) => {
                  this.listData = res.data;
                })
           },
           onSubmit(){

           },
           toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            formatter(row, column) {
                return row.address;
            }
        }
    }
</script>

<style scoped="">

</style>