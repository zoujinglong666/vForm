
const responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
}
const labelWidthMap = {
  xs: '70px',
  sm: '80px',
  md: '90px',
  lg: '100px',
  xl: '110px',
  xxl: '120px',
}
export {
  responsiveMap,
  labelWidthMap
}
const cols = {xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6}
// const allSlotsName = computed(() => Object.keys(toRaw(slots)))
const colArr = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']

// 用来保存当前页面尺寸处于哪个尺寸区间
const screens = reactive ( {
  xs: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
  xxl: true,
} )
// const currentBreakpoint = ref ( '' )
// // 计算当前页面尺寸下一行中可以有几个元素
// const resultCol = computed ( () => {
//   let res = 1
//   for (let i = 0; i < colArr.length; i++) {
//     const breakpoint = colArr[i]
//     currentBreakpoint.value = breakpoint;
//     if ( screens[breakpoint] || breakpoint === 'xs' ) {
//       res = cols[breakpoint]
//       break
//     }
//   }
//   return res
// } )
// const matchHandlers = {}
// onMounted ( () => {
//   Object.keys ( responsiveMap ).forEach ( (screen) => {
//     const matchMediaQuery = responsiveMap[screen]
//     if ( !matchMediaQuery )
//       return
//     const listener = ({matches}) => {
//       screens[screen] = matches
//     }
//     const mql = window.matchMedia ( matchMediaQuery )
//     if ( mql.addEventListener )
//       mql.addEventListener ( 'change', listener )
//     else
//       mql.addListener ( listener )
//
//     matchHandlers[matchMediaQuery] = {
//       mql,
//       listener,
//     }
//     listener ( mql )
//   } )
// } )
// onUnmounted ( () => {
//   // 移除监听器
//   Object.keys ( responsiveMap ).forEach ( (screen) => {
//     const matchMediaQuery = responsiveMap[screen]
//     if ( !matchMediaQuery )
//       return
//     const handler = matchHandlers[matchMediaQuery]
//     if ( handler && handler.mql && handler.listener ) {
//       if ( handler.mql.removeEventListener )
//         handler.mql.removeEventListener ( 'change', handler.listener )
//       else
//         handler.mql.removeListener ( handler.listener )
//     }
//   } )
// } )
