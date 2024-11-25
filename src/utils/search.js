import {ref} from 'vue'
import { useSupportingStore } from "@/stores"
const supportingStore = useSupportingStore()
export const nameNotFound = ref('')
export const systemid = ref('')
    export const setSystemFilter = (item) => {
        supportingStore.searchMaterialsByName('', item != undefined ? systemid.value = item.id
        : systemid.value = '')
        
    }

    export const cleanFilter = () => {
        systemid.value = ''
        supportingStore.searchMaterialsByName('', '')
    }

   export const searchByName = (name) => {
        supportingStore.searchMaterialsByName(name, systemid.value)
        nameNotFound.value = name
    }

  export const saveHistory = (name) => {
         supportingStore.state.nameHistory = name
     }

  