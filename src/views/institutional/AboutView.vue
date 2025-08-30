<script setup>
import {
  AboutHeader,
  AboutContent,
  AboutCollaborators,
  AboutFooter,
  ContainerGlobal
} from '@/components/index'

const content = {
  about: [
    {
      title: 'Pesquisa',
      description: `A criação do Atlas Digital de Histologia e Patologia Veterinária nasceu da percepção de que,
apesar da importância das lâminas histológicas e patológicas para o aprendizado de
Medicina Veterinária, muitas vezes os alunos enfrentam dificuldades no acesso e no estudo
dessas imagens devido a limitações de tempo e infraestrutura nos laboratórios.
Especialmente após a pandemia, ficou evidente a necessidade de recursos digitais que
permitissem o estudo remoto e a visualização detalhada desses conteúdos essenciais.
A ideia de desenvolver uma plataforma interativa e acessível para o ensino de histologia e
patologia veterinária foi motivada pela vontade de superar essas limitações e, ao mesmo
tempo, democratizar o acesso a materiais educativos de alta qualidade. Para transformar
essa ideia em realidade, uma equipe multidisciplinar se uniu, integrando conhecimentos da
área de Veterinária e Informática para criar um recurso educacional inovador e colaborativo.`
    },
    {
      title: 'Desenvolvimento',
      description: `O desenvolvimento do Atlas Digital de Histologia e Patologia Veterinária foi um processo
que envolveu a colaboração entre o Laboratório de Anatomia e Patologia Veterinária e a
Fábrica de Software, ambas do Instituto Federal Catarinense (IFC) campus Araquari. O
trabalho começou com a seleção e captura de imagens histológicas e patológicas de alta
qualidade, utilizando microscopia óptica. Além das imagens, a plataforma foi enriquecida
com resumos técnicos e questões interativas, elaborados com base no conteúdo
programático das disciplinas de Histologia e Patologia Veterinária.
A aplicação digital foi projetada e construída com o objetivo de ser intuitiva e interativa,
permitindo aos estudantes explorar as imagens de forma detalhada e acessar explicações
técnicas diretamente nas lâminas. Para isso, a equipe técnica utilizou as tecnologias VueJS
para o frontend e Django/Python para o backend, garantindo uma experiência de usuário
fluida e funcional.
A colaboração entre diferentes áreas do conhecimento, como Veterinária e Informática, foi
essencial para o sucesso do projeto. O trabalho conjunto de diferentes especialidades
resultou em uma plataforma digital altamente funcional, que oferece aos alunos um novo
meio de estudar Histologia e Patologia Veterinária de maneira interativa e acessível.`
    }
  ],
  collaborators: [
    {
      position: 'Professor Coordenador',
      collaborators: ['Jonas Cunha Espindola']
    },
    {
      position: 'Professores participantes',
      collaborators: [
        'Stelamaris Dezen',
        'Fabio Longo de Moura',
        'Matheus Folgearini Silveira',
        'Eduardo da Silva'
      ]
    },
    {
      position: 'Discentes Bolsistas',
      collaborators: [
        'Ana Luiza Lukazevitz Furquim(idealizadora do projeto)',
        'Joao Victor Silva de Souza'
      ]
    },
    {
      position: 'Discentes Voluntários',
      collaborators: [
        'Ingridy Valentina Prestes Coutinho',
        'Gabriel Lucas de Miranda',
        'Matheus Lopes Albano',
        'Lucas Gabriel Antonete'
      ]
    },
    {
      position: 'Colaboradores Adicionais',
      collaborators: [
        'Javier Adolfo Sarria Perea',
        'Jeferson da Silva Flores',
        `Laboratório de Anatomia e Patologia Veterinária e Fábrica de Software
Instituto Federal Catarinense – Araquari, SC`
      ]
    },
    {
      position: 'Financiamento',
      collaborators: [
        `Instituto Federal Catarinense (IFC) – Edital nº 57/2024 ASSEG/GABI –
Seleção de Projetos de Ensino.`
      ]
    }
  ]
}
</script>

<template>
  <div class="bg-[#571480] py-8 text-white h-full w-screen">
    <ContainerGlobal>
      <AboutHeader />
      <AboutContent
        v-for="(article, index) in content.about"
        :key="index"
        :title="article.title"
        :description="article.description"
      />
      <AboutCollaborators
        v-for="(collaborator, index) in content.collaborators"
        :key="index"
        :position="collaborator.position"
        :collaborators="collaborator.collaborators"
      />
      <AboutFooter />
    </ContainerGlobal>
  </div>
</template>
