import { ref } from 'vue'
import imageMenu from '@/assets/images/admin/general.svg'
import imageBone from '@/assets/images/admin/bone-svgrepo-com.svg'
import ImageLamina from '@/assets/images/admin/microscope-svgrepo-com.svg'
import ImageDocument from '@/assets/images/admin/document-svgrepo-com.svg'
import ImageUser from '@/assets/images/admin/users-svgrepo-com.svg'
import ImageTest from '@/assets/images/admin/test-svgrepo-com.svg'
import ImagePet from '@/assets/images/admin/pet-svgrepo-com.svg'
import ImageSystem from '@/assets/images/admin/dog-svgrepo-com.svg'

export const generalFilterData = ref([
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

export const changeActive = (index, itens) => {
    itens.forEach(item => {
        item.active = false
    })

    itens[index].active = true 
}