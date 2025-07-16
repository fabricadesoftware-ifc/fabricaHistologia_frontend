import imageMenu from '@/assets/images/admin/general.svg'
import imageBone from '@/assets/images/admin/bone-svgrepo-com.svg'
import ImageLamina from '@/assets/images/admin/microscope-svgrepo-com.svg'
import ImageDocument from '@/assets/images/admin/document-svgrepo-com.svg'
import ImageUser from '@/assets/images/admin/users-svgrepo-com.svg'
import ImageTest from '@/assets/images/admin/test-svgrepo-com.svg'
import ImagePet from '@/assets/images/admin/pet-svgrepo-com.svg'
import ImageSystem from '@/assets/images/admin/dog-svgrepo-com.svg'

import { ref } from 'vue'

export function useAdmin() {
 
  const generalFilterData = ref([
  { nome: 'Geral', image: imageMenu, active: true},
  { nome: 'Sistemas', image: ImageSystem, active: false },
  { nome: 'Lâminas', image: ImageLamina, active: false },
  { nome: 'Espécies', image: ImagePet, active: false },
  { nome: 'Órgãos', image: imageBone, active: false },
  { nome: 'Usuários', image: ImageUser, active: false },
  { nome: 'Dados Pessoais', image: ImageUser, active: false },
  { nome: 'Perguntas', image: ImageTest, active: false },
  { nome: 'Respostas', image: ImageTest, active: false },
  { nome: 'Conteúdos', image: ImageDocument, active: false },
  { nome: 'Imagens', image: ImageDocument, active: false },
  { nome: 'Documentos', image: ImageDocument, active: false },

]);

const handleFilterAction = (item) => {
  
  switch (item.nome) {
    case 'Geral':
      // ação para Geral
      break;
    case 'Sistemas':
      // ação para Sistemas
      console.log('sistema')
      break;
    case 'Lâminas':
      // ação para Lâminas
      break;
    case 'Espécies':
      // ação para Espécies
      console.log('especie')
      break;
    case 'Órgãos':
      // ação para Órgãos
      break;
    case 'Usuários':
      // ação para Usuários
      break;
    case 'Dados Pessoais':
      // ação para Dados Pessoais
      break;
    case 'Perguntas':
      // ação para Perguntas
      break;
    case 'Respostas':
      // ação para Respostas
      break;
    case 'Conteúdos':
      // ação para Conteúdos
      break;
    case 'Imagens':
      // ação para Imagens
      break;
    case 'Documentos':
      // ação para Documentos
      break;
    default:
      console.log(`Filtro desconhecido: ${item.nome}`)
      break;
  }
}


const changeActive = (index, itens) => {
    itens.forEach(item => {
        item.active = false
    })

    itens[index].active = true 
    handleFilterAction(itens[index])
}


return {
  generalFilterData, changeActive, handleFilterAction
}
}

