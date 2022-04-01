<template>
  <div class="form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row :gutter="10">
        <template v-for="item in FormItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              class="form-item"
              :style="ItemStyle"
              :rules="item.rules"
              v-if="!item.isHidden"
            >
              <template v-if="item.type == 'input' || item.type == 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type == 'password'"
                  v-bind="item.OtherOptions"
                  v-model="FormData[`${item.filed}`]"
                ></el-input>
              </template>
              <template v-if="item.type == 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="FormData[`${item.filed}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.label"
                    :label="option.label"
                    :value="option.value"
                    :disabled="option.disabled"
                    v-bind="item.OtherOptions"
                  ></el-option>
                </el-select>
              </template>
              <template v-if="item.type == 'datepicker'">
                <el-date-picker
                  v-bind="item.OtherOptions"
                  style="width: 100%"
                  v-model="FormData[`${item.filed}`]"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../type/type'

export default defineComponent({
  name: 'FForm',
  setup(props, { emit }) {
    const FormData = ref({ ...props.formData })
    watch(
      FormData,
      (newValue) => {
        emit('update:formData', newValue)
      },
      {
        deep: true
      }
    )
    return {
      FormData
    }
  },
  props: {
    FormItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => {
        return []
      }
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    ItemStyle: {
      type: Object,
      default: () => {
        return { padding: '0 40px' }
      }
    },
    colLayout: {
      type: Object,
      default: () => {
        return {
          xl: 6,
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24
        }
      }
    },
    formData: {
      type: Object,
      require: true
    }
  },
  emits: ['update:formData']
})
</script>

<style scoped lang="less">
.form {
  padding-top: 18px;
  .header {
    color: red;
    text-align: left;
    margin-left: 10px;
    margin-top: -10px;
  }
  .form-item {
    padding: 5px 20px;
  }
  .footer {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
