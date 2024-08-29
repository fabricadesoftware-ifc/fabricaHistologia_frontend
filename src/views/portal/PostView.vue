<script setup>
import { useRoute } from 'vue-router';
import { HeaderPortal, ContainerGlobal, CheckList } from '@/components/index';

const route = useRoute();
const id = route.params.id; 
</script>

<template>
    <HeaderPortal />
    <ContainerGlobal>
        <section class="w-full flex gap-8">
            <div class="w-1/2">
                <CheckList />
            </div>
            <div class="w-1/2">
                <div class="rounded-xl overflow-hidden">
                    <img src="https://th.bing.com/th/id/OIP.s_vGI_uIYXbmNE6f35HSmgHaHa?rs=1&pid=ImgDetMain" class="w-100 h-100" />
                    <div class=" border-b-2 border-x-2 rounded-b-xl">
                        <h2 class="pt-4 font-semibold text-lg px-4">Dados da Lâmina </h2>
                        <ul class="text-gray-400 pt-4 px-4 pb-4">
                            <li>
                                <p>
                                    Órgão:  Órgão
                                </p>
                            </li>
                            <li>
                                <p>
                                    Espécie: Espécie
                                </p>
                            </li>
                            <li>
                                <p>
                                    Coloração: Coloração
                                </p>
                            </li>
                            <li>
                                <p>
                                    Aumento: Aumento
                                </p>
                            </li>
                            <li>
                                <p>
                                    Tipo de corte: Tipo de corte
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </ContainerGlobal>
    <div>
        const prop {{ id }}
    </div>
</template>
