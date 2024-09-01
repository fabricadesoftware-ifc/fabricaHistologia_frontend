<script setup>
import { useRoute } from 'vue-router'
import { HeaderPortal, ContainerGlobal, CheckList, AddInfoGlobal } from '@/components/index'

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
        <ContainerGlobal>
          <section class="w-full flex gap-8 relative">
            <div class="w-1/2">
              <div class="rounded-xl overflow-hidden">
                <img
                  src="https://th.bing.com/th/id/OIP.s_vGI_uIYXbmNE6f35HSmgHaHa?rs=1&pid=ImgDetMain"
                  class="w-full"
                />
              </div>
            </div>
            <div class="w-1/2 pb-1000 pr-8 relative">
              <CheckList />
              <div class="absolute bottom-0 left-0">
                <h2 class="pt-4 font-semibold text-lg">Dados da Lâmina {{ id }}</h2>
                <ul class="text-gray-400 pt-4 pb-4">
                  <li>
                    <p>Órgão: Órgão</p>
                  </li>
                  <li>
                    <p>Espécie: Espécie</p>
                  </li>
                  <li>
                    <p>Coloração: Coloração</p>
                  </li>
                  <li>
                    <p>Aumento: Aumento</p>
                  </li>
                  <li>
                    <p>Tipo de corte: Tipo de corte</p>
                  </li>
                  <li>
                    <p>Função do órgão: 2</p>
                  </li>
                  <li>
                    <p>Estruturas analisadas: 4</p>
                  </li>
                  <li>
                    <p>Função das estruturas: 3</p>
                  </li>
                </ul>
                <p class="font-light italic">Lâmina postada por Mateus Lopes Albano</p>
                <p class="font-medium">Postado em 12/12/2021</p>
              </div>
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
        </ContainerGlobal>
    </main>
</template>

<style scoped>
.pb-1000 {
  padding-bottom: 400px;
}
</style>
