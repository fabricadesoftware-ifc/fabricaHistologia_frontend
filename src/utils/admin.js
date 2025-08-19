export const eraseWords = (baseword, link) => {
    return `/${baseword}/` + link;
  };

  import { ref } from 'vue'

export function useAdmin() {
  const generalFilterData = ref([
    { key: 'posts', nome: 'Posts', image: '/icons/posts.svg', active: true },
    { key: 'organs', nome: 'Órgãos', image: '/icons/organs.svg', active: false },
    { key: 'systems', nome: 'Sistemas', image: '/icons/systems.svg', active: false },
    { key: 'species', nome: 'Espécies', image: '/icons/species.svg', active: false },
    { key: 'quiz', nome: 'Quizzes', image: '/icons/quiz.svg', active: false },
    { key: 'supporting-materials', nome: 'Materiais', image: '/icons/materials.svg', active: false }
  ])

  function changeActive(index, arr) {
    arr.forEach((item, i) => {
      item.active = i === index
    })
  }

  return {
    generalFilterData,
    changeActive
  }
}
