<script setup>
import { useNavBarAdminStore } from '@/stores/admin/navbar_admin'

const store = useNavBarAdminStore()

function handleClick(to) {
  store.navigateTo(to)
}
</script>

<template>
  <nav class="flex flex-col gap-8 text-sm w-full">
    <div v-for="section in store.menuSections" :key="section.title" class="flex flex-col gap-3">
      <p class="text-gray-500 uppercase text-xs tracking-wide">
        {{ section.title }}
      </p>
      <ul class="flex flex-col gap-3">
        <li v-for="item in section.items" :key="item.to">
          <a
            href="#"
            @click.prevent="handleClick(item.to)"
            :class="[
              store.isCurrent(item.to)
                ? 'text-blue-600 font-semibold'
                : 'text-gray-700 hover:text-black',
              'flex items-center gap-2'
            ]"
          >
            <img :src="item.icon" alt="Icone de {{ item.label }}" class="w-4 h-4 object-contain" />
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
