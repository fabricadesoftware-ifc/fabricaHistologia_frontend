<script setup>
import { HeaderPortal, SelectCardsGlobal, OrganAdditionalInfo, FooterComp  } from '@/components';

const SistemaImportadoTest = {
    'name': 'Sistema Digestivo'
}

const dados = {
    title: 'Materiais de Apoio',
    description: 'Que tal estudar com um quiz interativo ou talvez com um mapa menta. Clique no botão e aproveite nossos materias adicionais',
    data: {
        aulas: {
            title: 'Aulas',
            refs: [
                {link: 'link 1 Nome da Aula', desc: 'breve descrição'},
                {link: 'link 2 Nome da Aula', desc: 'breve descrição'}
            ]
        },
        pdf: {
            title: 'PDFs',
            refs: [
                {link: 'link 1 Nome do mapa mental/documento', desc: 'breve descrição'},
                {link: 'link 2 Nome do mapa mental/documento', desc: 'breve descrição'}
            ]
        }  
    } 
}
</script>

<template>
    <HeaderPortal class="mt-10" :title="SistemaImportadoTest.name" size="text-3xl md:text-center"/>
    <SelectCardsGlobal />
    <OrganAdditionalInfo :dados="dados"/>
    <FooterComp />
</template>