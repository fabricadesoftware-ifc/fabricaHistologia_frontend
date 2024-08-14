<script setup>
import AboutHeader from './AboutHeader.vue';
import AboutContent from './AboutContent.vue';
import AboutCollaborators from './AboutCollaborators.vue';
import AboutFooter from './AboutFooter.vue';
</script>

<template>
    <div class="bg-[#571480] py-8">
        <AboutHeader />
        <AboutContent title="Pesquisa" description="Atualmente, mudanças constantes e significativas, especialmente na área de tecnologia e informação, estão refletindo importantes transformações comportamentais e, consequentemente na forma de aprender e de consolidar o conhecimento. O ensino atual requer a inserção de diferentes recursos, principalmente os que apresentem um acesso rápido, fácil, dinâmico e que estimulem a interatividade. A PUCRS, como uma das melhores universidades do país, tem um papel importante na promoção da inovação dessa nova Atualmente, mudanças constantes e significativas, especialmente na área de tecnologia e informação, estão refletindo importantes transformações comportamentais e, consequentemente na forma de aprender e de consolidar o conhecimento. O ensino atual requer a inserção de diferentes recurso."/>
        <AboutContent title="Desenvolvimento" description="Atualmente, mudanças constantes e significativas, especialmente na área de tecnologia e informação, estão refletindo importantes transformações comportamentais e, consequentemente na forma de aprender e de consolidar o conhecimento. O ensino  atual requer a inserção de diferentes recurso, especialmente na área de tecnologia e informação, estão refletindo importantes transformações comportamentais e, consequentemente na forma de aprender e de consolidar o conhecimento. O ensino atual requer a inserção de diferentes recurso" />
        <AboutContent title="Equipe" description="Atualmente, mudanças constantes e significativas, especialmente na área de tecnologia e informação, estão refletindo importantes transformações comportamentais e, consequentemente na forma de aprender e de consolidar o conhecimento. O ensino  atual requer a inserção." />
        <AboutCollaborators position="Professor Coordenador" :collaborators="['Jayrson Araújo de Oliveira']" />
        <AboutCollaborators position="Professores participantes" :collaborators="['Gilson Herbert de Faria;', 'Mara Rubia Marques']" />
        <AboutCollaborators position="Estagiário" :collaborators="['Miller Caldas Barradas']" />
        <AboutCollaborators position="Prestadores de serviços" :collaborators="['Web-Master e Web-Designer:', 'Swami Luiz Monteiro Silva', 'Editoração de imagens:', 'Julia Cavasin Oliveira']" />
        <AboutFooter />
    </div>
</template>

<style scoped>
* {
    color: white;
}
</style>