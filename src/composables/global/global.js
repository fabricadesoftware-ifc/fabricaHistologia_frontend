import { ref } from "vue"

export function useGlobalComposable(store, store_method) {
    const countItems = ref([])

    const listAnalysis = async () => {

    for (const item of store) {
        const data = await store_method(item.id)
        countItems.value.push({id: item.id, data: data})
        console.log(data)

    }
}

return {
    listAnalysis,
    countItems
}

}