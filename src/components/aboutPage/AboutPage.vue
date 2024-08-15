<script setup>
import AboutHeader from './AboutHeader.vue';
import AboutContent from './AboutContent.vue';
import AboutCollaborators from './AboutCollaborators.vue';
import AboutFooter from './AboutFooter.vue';

const content = {
    about: [
        {
            'title': 'Pesquisa',
            'description': 'Atualmente, mudanças constantes e significativas, especialmente na área de tecnologia e informação, estão refletindo importantes transformações comportamentais e, consequentemente na forma de aprender e de consolidar o conhecimento. O ensino atual requer a inserção de diferentes recursos, principalmente os que apresentem um acesso rápido, fácil, dinâmico e que estimulem a interatividade. A PUCRS, como uma das melhores universidades do país, tem um papel importante na promoção da inovação dessa nova Atualmente, mudanças constantes e significativas, especialmente na área de tecnologia e informação, estão refletindo importantes transformações comportamentais e, consequentemente na forma de aprender e de consolidar o conhecimento. O ensino atual requer a inserção de diferentes recurso.'
        },
        {
            'title': 'Desenvolvimento',
            'description': 'Atualmente, mudanças constantes e significativas, especialmente na área de tecnologia e informação, estão refletindo importantes transformações comportamentais e, consequentemente na forma de aprender e de consolidar o conhecimento. O ensino  atual requer a inserção de diferentes recurso, especialmente na área de tecnologia e informação, estão refletindo importantes transformações comportamentais e, consequentemente na forma de aprender e de consolidar o conhecimento. O ensino atual requer a inserção de diferentes recurso'
        },
        {
            'title': 'Equipe',
            'description': 'Atualmente, mudanças constantes e significativas, especialmente na área de tecnologia e informação, estão refletindo importantes transformações comportamentais e, consequentemente na forma de aprender e de consolidar o conhecimento. O ensino  atual requer a inserção.'
        }
    ],
    collaborators: [
        {
            'position': 'Professor Coordenador',
            'collaborators': ['Jayrson Araújo de Oliveira'],
        },
        {
            'position': 'Professores participantes',
            'collaborators': ['Gilson Herbert de Faria;', 'Mara Rubia Marques'],
        },
        {
            'position': 'Estagiário',
            'collaborators': ['Miller Caldas Barradas'],
        },
        {
            'position': 'Prestadores de serviços',
            'collaborators': ['Web-Master e Web-Designer:', 'Swami Luiz Monteiro Silva', 'Editoração de imagens:', 'Julia Cavasin Oliveira'],
        },
    ]
}
</script>

<template>
    <div class="bg-[#571480] py-8 text-white h-full over">
        <AboutHeader />
        <AboutContent v-for="(article, index) in content.about" :key="index" :title="article.title" :description="article.description"/>
        <AboutCollaborators v-for="(collaborator, index) in content.collaborators" :key="index" :position="collaborator.position" :collaborators="collaborator.collaborators" />
        <AboutFooter />
    </div>
</template>

