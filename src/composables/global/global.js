import { ref, isRef } from 'vue'

export function useGlobalComposable(store, store_method) {
  const countItems = ref([])

  const listAnalysis = async () => {
    countItems.value = []

    const dataList = isRef(store) ? store.value : store

    if (!Array.isArray(dataList)) {
      console.warn('Lista de órgãos não é um array:', dataList)
      return
    }

    for (const item of dataList) {
      try {
        const data = await store_method(item.id)
        countItems.value.push({ id: item.id, data })
        console.log('item analisado', item.id, data)
      } catch (e) {
        console.error('Erro ao obter dados para', item.id, e)
      }
    }
  }

  return {
    listAnalysis,
    countItems
  }
}
