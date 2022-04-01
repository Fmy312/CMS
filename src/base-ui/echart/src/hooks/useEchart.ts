import * as echarts from 'echarts'
import China from '@/base-ui/echart/data/china.json'
echarts.registerMap('china', China)
import { EChartsOption } from 'echarts'
export default function (el: HTMLElement) {
  //创建echart实例对象
  const EchartsInstance = echarts.init(el)
  //用与给echart实例对象设置怕配置
  const setOptions = (options: EChartsOption) => {
    EchartsInstance.setOption(options)
  }
  const updateSize = () => {
    EchartsInstance.resize()
  }
  window.addEventListener('resize', () => {
    EchartsInstance.resize()
  })
  return { EchartsInstance, setOptions, updateSize }
}
