<script setup>
const tests = [
  {
    name: 'Nome da lâmina',
    link: '/portal/post/1',
    date: ['10', 'agosto', '2028'],
    tags: [
      { color: 'text-white', background: 'bg-purple-700', content: '2x' },
      { color: 'text-white', background: 'bg-green-600', content: 'Boi' },
      { color: 'text-black', background: 'bg-gray-400', content: 'tag' }
    ]
  },

  {
    name: 'Pulmão',
    link: '/portal/post/2',
    date: ['10', 'junho', '2024'],
    tags: [
      { color: 'text-white', background: 'bg-purple-700', content: '2x' },
      { color: 'text-white', background: 'bg-green-600', content: 'Boi' },
      { color: 'text-black', background: 'bg-gray-400', content: 'tag' }
    ]
  },

  {
    name: 'Pulmão',
    link: '/portal/post/3',
    date: ['10', 'junho', '2024'],
    tags: [
      { color: 'text-white', background: 'bg-purple-700', content: '2x' },
      { color: 'text-white', background: 'bg-green-600', content: 'Boi' },
      { color: 'text-black', background: 'bg-gray-400', content: 'tag' }
    ]
  },

  {
    name: 'Pulmão',
    link: '/portal/post/4',
    date: ['10', 'junho', '2024'],
    tags: [
      { color: 'text-white', background: 'bg-purple-700', content: '2x' },
      { color: 'text-white', background: 'bg-green-600', content: 'Boi' },
      { color: 'text-black', background: 'bg-gray-400', content: 'tag' }
    ]
  },

  {
    name: 'Pulmão',
    link: '/portal/post/5',
    date: ['10', 'junho', '2024'],
    tags: [
      { color: 'text-white', background: 'bg-purple-700', content: '2x' },
      { color: 'text-white', background: 'bg-green-600', content: 'Boi' },
      { color: 'text-black', background: 'bg-gray-400', content: 'tag' }
    ]
  },

  {
    name: 'Pulmão',
    link: '/portal/post/1',
    date: ['10', 'junho', '2024'],
    tags: [
      { color: 'text-white', background: 'bg-purple-700', content: '2x' },
      { color: 'text-white', background: 'bg-green-600', content: 'Boi' },
      { color: 'text-black', background: 'bg-gray-400', content: 'tag' }
    ]
  },

  {
    name: 'Pulmão',
    link: '/portal/post/1',
    date: ['10', 'junho', '2024'],
    tags: [
      { color: 'text-white', background: 'bg-purple-700', content: '2x' },
      { color: 'text-white', background: 'bg-green-600', content: 'Boi' },
      { color: 'text-black', background: 'bg-gray-400', content: 'tag' }
    ]
  }
]
</script>
<template>
    <router-link :to="item.link" v-for="(item, index) in tests" :key="index">
      <div
        class="group/container mb-4 w-52 h-64 flex flex-col rounded-2xl shadow-lg duration-200 ease-out hover:cursor-pointer hover:shadow-xl cursor-default"
      >
        <div class="w-full h-3/6 rounded-t-xl">
          <img src="@/assets/images/cellImg.jpg" class="rounded-t-2xl" alt="" />
        </div>
        <div
          class="group/boxtext w-full h-3/6 flex flex-col rounded-b-xl bg-white p-3 group-hover/container:bg-zinc-100"
        >
          <div class="w-full h-2/6 flex items-center">
            <ul class="flex list-none w-full justify-around text-white font-poppins text-xs">
              <li
                v-for="(tag, index) in item.tags"
                :key="index"
                :class="`${tag.background} ${tag.color}  px-3 py-1 rounded-lg`"
              >
                <p>{{ tag.content }}</p>
              </li>
            </ul>
          </div>
          <div
            class="w-full h-4/6 flex flex-col items-center justify-evenly font-poppins text-center"
          >
            <div class="w-full overflow-x-hidden overflow-y-hidden">
              <p class="font-normal text-xl mb-2">{{ item.name }}</p>
            </div>
            <p class="text-sm italic text-slate-600">
              {{ item.date[0] }} de {{ item.date[1] }} de {{ item.date[2] }}
            </p>
          </div>
        </div>
      </div>
    </router-link>
</template>
