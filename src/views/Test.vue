<script setup>
import { computed, ref } from 'vue';
import {ContainerGlobal, QuizQuestion} from '@/components/';


const question = ref([
    {position: 1, question: 'A mitocôndria é o que?', title: 'Sobre as mitocondrias afirme'},
    {position: 2, question: 'Qual é a função dos ribossomos?', title: 'Sobre as mitocondrias afirme'},
    {position: 3, question: 'Qual é a principal função do núcleo celular?', title: 'Sobre as mitocondrias afirme'},
    {position: 4, question: 'O que é a membrana plasmática?', title: 'Sobre as mitocondrias afirme'},
    {position: 5, question: 'O que é o retículo endoplasmático rugoso?', title: 'Sobre as mitocondrias afirme'},
    {position: 6, question: 'Qual é a função do complexo de Golgi?', title: 'Sobre as mitocondrias afirme'}
]);

const answer = ref([
    {position: 1, corrected: true, option: 'A mitocôndria é a organela que cupositiona da respiração da célulaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', comment_answer: 'pois ela respira porra', question: 1},
    {position: 2, corrected: false, option: 'A mitocôndria é responsável pela fotossíntese', comment_answer: 'não, isso é função dos cloroplastos', question: 1},
    {position: 3, corrected: false, option: 'A mitocôndria armazena informações genéticas', comment_answer: 'isso é papel do núcleo', question: 1},
    {position: 4, corrected: false, option: 'A mitocôndria produz proteínas', comment_answer: 'isso é função dos ribossomos', question: 1},

    {position: 5, corrected: true, option: 'Os ribossomos são responsáveis pela síntese de proteínas', comment_answer: 'essa é a função principal', question: 2},
    {position: 6, corrected: false, option: 'Os ribossomos participam da digestão celular', comment_answer: 'isso é papel dos lisossomos', question: 2},
    {position: 7, corrected: false, option: 'Os ribossomos armazenam energia para a célula', comment_answer: 'não, essa é função da mitocôndria', question: 2},
    {position: 8, corrected: false, option: 'Os ribossomos realizam a respiração celular', comment_answer: 'isso é função da mitocôndria', question: 2},

    {position: 9, corrected: true, option: 'O núcleo armazena o material genético e controla as funções celulares', comment_answer: 'correto!', question: 3},
    {position: 10, corrected: false, option: 'O núcleo é responsável pela produção de energia na célula', comment_answer: 'essa é a função da mitocôndria', question: 3},
    {position: 11, corrected: false, option: 'O núcleo realiza a digestão celular', comment_answer: 'isso é função dos lisossomos', question: 3},
    {position: 12, corrected: false, option: 'O núcleo armazena enzimas digestivas', comment_answer: 'não, esse é o papel dos lisossomos', question: 3},

    {position: 13, corrected: true, option: 'A membrana plasmática controla o que entra e sai da célula', comment_answer: 'função correta da membrana', question: 4},
    {position: 14, corrected: false, option: 'A membrana plasmática armazena o material genético da célula', comment_answer: 'isso é papel do núcleo', question: 4},
    {position: 15, corrected: false, option: 'A membrana plasmática realiza a fotossíntese', comment_answer: 'não, isso é feito pelos cloroplastos', question: 4},
    {position: 16, corrected: false, option: 'A membrana plasmática produz proteínas', comment_answer: 'não, quem faz isso são os ribossomos', question: 4},

    {position: 17, corrected: true, option: 'O retículo endoplasmático rugoso é responsável pela síntese de proteínas', comment_answer: 'correto, ele possui ribossomos aderpositionos', question: 5},
    {position: 18, corrected: false, option: 'O retículo endoplasmático rugoso armazena lipídios', comment_answer: 'não, isso é função do retículo endoplasmático liso', question: 5},
    {position: 19, corrected: false, option: 'O retículo endoplasmático rugoso realiza a digestão celular', comment_answer: 'não, isso é papel dos lisossomos', question: 5},
    {position: 20, corrected: false, option: 'O retículo endoplasmático rugoso realiza a respiração celular', comment_answer: 'essa função é da mitocôndria', question: 5},

    {position: 21, corrected: true, option: 'O complexo de Golgi modifica, armazena e transporta proteínas', comment_answer: 'essa é a principal função', question: 6},
    {position: 22, corrected: false, option: 'O complexo de Golgi armazena energia para a célula', comment_answer: 'não, essa é a função da mitocôndria', question: 6},
    {position: 23, corrected: false, option: 'O complexo de Golgi realiza a síntese de proteínas', comment_answer: 'não, quem faz isso são os ribossomos', question: 6},
    {position: 24, corrected: false, option: 'O complexo de Golgi realiza a fotossíntese', comment_answer: 'não, isso é feito pelos cloroplastos', question: 6}
]);

const currentQuestion = ref(1)

const nextSection = () => {
    if (currentQuestion.value < question.value.length)
    currentQuestion.value += 1
}

const previousSection = () => {
    if (currentQuestion.value > 1) {
        currentQuestion.value -= 1
    }
}

const watchCorrect = ref(false)

const selectAnswer = (answer) => {
    if (answer.corrected) {
        return true
    } else {
        return false
    }
}

</script>
<template>
    <ContainerGlobal>
        <QuizQuestion :data_answer="answer.filter(s => s.question == 1)" :data_question="question" :index="question.position" />
    </ContainerGlobal>
</template>