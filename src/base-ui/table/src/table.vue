<template>
  <div id="showcontent">
    <!-- 制定表头(不是table上的表头 而是这个表格页面所要的表头) -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"> 无 </slot>
        </div>
      </slot>
    </div>
    <!-- 制定表格 -->
    <el-table
      :data="ListDate"
      border
      style="width: 100%"
      v-bind="childrenProps"
      class="table"
    >
      <template v-if="showSelect">
        <el-table-column
          type="selection"
          align="center"
          width="60"
        ></el-table-column>
      </template>
      <template v-if="showIndex">
        <el-table-column
          type="index"
          align="center"
          width="80"
          label="序号"
        ></el-table-column>
      </template>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column
          v-bind="item"
          align="center"
          show-overflow-tooltip
          class="cell"
        >
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 制定footer -->
    <div class="footer" v-if="showFooter">
      <div class="Footer">
        <slot name="footer">
          <el-pagination
            :currentPage="Page.currentPage"
            :page-size="Page.pageSize"
            :page-sizes="[10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="ListCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TaBle',
  setup(props, { emit }) {
    //这个方法也可以修改size和当前页面的偏移量
    /* const pageSize4 = ref(props.Page.pageSize)
    watch(pageSize4, (newValue) => {
      console.log(666)
      emit('update:Page', { ...props.Page, ['pageSize']: newValue })
    }) */
    const handleCurrentChange = (currentPage: any) => {
      emit('update:Page', { ...props.Page, currentPage })
    }
    const handleSizeChange = (pageSize: any) => {
      emit('update:Page', { ...props.Page, pageSize })
    }
    return {
      handleCurrentChange,
      handleSizeChange
    }
  },
  props: {
    ListDate: {
      type: Array,
      required: true
    },
    childrenProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    Page: {
      type: Object,
      default: () => {
        return { currentPage: 1, pageSize: 10 }
      }
    },
    ListCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style scoped lang="less">
#showcontent {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.el-table {
  &:deep(.el-table__cell) {
    z-index: auto !important;
  }
}
.title {
  float: left;
  font-weight: 700;
}
.header {
  overflow: hidden;
}
.handler {
  float: right;
  margin-bottom: 5px;
}
.footer {
  padding: 10px;
  overflow: hidden;
  padding-bottom: 0;
  margin-bottom: -5px;
  .Footer {
    float: right;
  }
}
</style>
