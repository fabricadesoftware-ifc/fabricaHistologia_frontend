<script setup>
import { useRoute } from 'vue-router'
import {
  HeaderPortal,
  ContainerGlobal,
  CheckList,
  PostInfo,
  AddInfoGlobal,
  FooterComp,
  BtnDefault
} from '@/components/index'

const route = useRoute()
const id = route.params.id

const datas_AdditionalInfo = [
  {
    title: 'Aulas',
    refs: [
      { link: 'link para a aula 1', desc: 'breve descricao' },
      { link: 'link para a aula 2', desc: 'breve descricao' }
    ]
  },
  {
    title: 'PDF"s',
    refs: [
      { link: 'link para o mapa mental/documento 1', desc: 'breve descricao' },
      { link: 'link para o mapa mental/documento 2', desc: 'breve descricao' }
    ]
  }
]
</script>

<template>
  <main>
    <HeaderPortal :title="`Dados da Lâmina ${id}`" />
    <ContainerGlobal class="mb-12">
      <section class="w-full md:block flex gap-8 relative">
        <div class="md:w-full w-1/2">
          <div class="rounded-xl overflow-hidden">
            <img
              src="https://th.bing.com/th/id/R.70f72e90f21fa0b9a884ba9b2a9e72c7?rik=5gT0EQaWi7iYew&riu=http%3a%2f%2fcv.udl.cat%2fcursos%2f100302%2fhistologia%2fbasicos%2f3.1.jpg&ehk=3Z8Bs%2f8b7ok3P2ODm7080hnW8Q5LgxSaPrVvQACAiKE%3d&risl=&pid=ImgRaw&r=0"
              class="w-full"
            />
          </div>
        </div>
        <div class="md:w-full w-1/2 pb-1000 pr-8 relative md:mt-8">
          <CheckList />
          <PostInfo />
        </div>
      </section>
      <section>
        <div class="mt-12">
          <AddInfoGlobal
            title="Materiais de Apoio"
            description="Que tal estudar com um quiz interativo ou talvez com um mapa menta. Clique no botão e aproveite nossos materias adicionais"
            :data="datas_AdditionalInfo"
          />
        </div>
      </section>
      <section class="mt-8">
        <BtnDefault text="Acessar Quiz deste Sistema" block />
      </section>
    </ContainerGlobal>
    <FooterComp />
  </main>
</template>

<style scoped>
.pb-1000 {
  padding-bottom: 400px;
}
@media screen and (max-width: 768px) {
  .pb-1000 {
    padding-bottom: 0;
  }
}
</style>
