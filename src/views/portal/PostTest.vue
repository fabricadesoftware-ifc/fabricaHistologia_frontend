<script setup>
import { ref, onMounted } from 'vue'
import {
  HeaderPortal,
  ContainerGlobal,
  Footer,
} from '@/components/index'

const canvas = ref(null); // Referência ao canvas
const ctx = ref(null);
const isDrawing = ref(false);
const image = ref(null);
const title = ref('');
const description = ref('');
const labeledAreas = ref([]);

const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) * (canvas.width / rect.width),
        y: (evt.clientY - rect.top) * (canvas.height / rect.height)
    };
};

const handleImage = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        image.value = new Image();
        image.value.onload = () => {
            canvas.value.width = image.value.width;
            canvas.value.height = image.value.height;
            ctx.value.drawImage(image.value, 0, 0);
        };
        image.value.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};

const startDrawing = (e) => {
    if (title.value === '') return;
    isDrawing.value = true;
    labeledAreas.value.push({ path: [], label: '', visible: false });
    ctx.value.strokeStyle = 'red';
    ctx.value.lineWidth = 10;
    ctx.value.beginPath();
    const pos = getMousePos(canvas.value, e);
    ctx.value.moveTo(pos.x, pos.y);
};

const draw = (e) => {
    if (title.value === '') return;
    if (!isDrawing.value) return;
    const pos = getMousePos(canvas.value, e);
    ctx.value.lineTo(pos.x, pos.y);
    ctx.value.stroke();
    labeledAreas.value[labeledAreas.value.length - 1].path.push({
        id: labeledAreas.value.length - 1,
        x: pos.x,
        y: pos.y,
    });
};

const endDrawing = () => {
    if (!isDrawing.value) return;
    isDrawing.value = false;
    ctx.value.closePath();
    labeledAreas.value[labeledAreas.value.length - 1].title = title.value;
    labeledAreas.value[labeledAreas.value.length - 1].description = description.value;
    redrawCanvas();
};

const redrawCanvas = () => {
    if (title.value === '') return;
    console.log('redrawCanvas');
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.value.drawImage(image.value, 0, 0);
    labeledAreas.value.forEach((area) => {
        if (area.visible) {
            ctx.value.strokeStyle = 'yellow';
            ctx.value.lineWidth = 10;
            ctx.value.beginPath();
            area.path.forEach((point, index) => {
                if (index === 0) {
                    ctx.value.moveTo(point.x, point.y);
                } else {
                    ctx.value.lineTo(point.x, point.y);
                }
            });
            ctx.value.stroke();
            ctx.value.closePath();
            // Exibir rótulo
            if (area.title) {
                ctx.value.fillStyle = 'yellow';
                ctx.value.font = '64px Arial';
                ctx.value.fontWeight = '900'; // Ensure fontWeight is a string
                const midpoint = area.path[Math.floor(area.path.length / 2)];
                ctx.value.fillText(area.title, midpoint.x, midpoint.y - 10);
            }
        }
    });
};

const downloadImage = () => {
    redrawCanvas();
    const link = document.createElement('a');
    link.download = 'labeled-image.png';
    link.href = canvas.value.toDataURL();
    link.click();
};

const setDefaultImage = () => {
    image.value = new Image();
    image.value.src = 'https://th.bing.com/th/id/R.70f72e90f21fa0b9a884ba9b2a9e72c7?rik=5gT0EQaWi7iYew&riu=http%3a%2f%2fcv.udl.cat%2fcursos%2f100302%2fhistologia%2fbasicos%2f3.1.jpg&ehk=3Z8Bs%2f8b7ok3P2ODm7080hnW8Q5LgxSaPrVvQACAiKE%3d&risl=&pid=ImgRaw&r=0'; // Substitua pelo caminho da sua imagem padrão
    image.value.onload = () => {
        canvas.value.width = image.value.width;
        canvas.value.height = image.value.height;
        ctx.value.drawImage(image.value, 0, 0);
    };
};

onMounted(() => {
    ctx.value = canvas.value.getContext('2d'); // Inicializa o contexto do canvas corretamente
    setDefaultImage();
    redrawCanvas();
});

</script>

<template>
  <main>
    <HeaderPortal title="TESTE PARA ADICIONAR LAMINA" />
    <ContainerGlobal class="mb-12">
      <section class="w-full md:block flex gap-8 relative">
        <div class="md:w-full w-1/2">
          <div class="rounded-xl overflow-hidden">
            <input type="file" @change="handleImage" accept="image/*" />
            <canvas class="w-full" ref="canvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="endDrawing"></canvas>
            <div>
                <p class="text-center">Digite o texto do ponto</p>
                <input type="text" v-model="title" placeholder="TEXTO" />
                <textarea v-model="description" placeholder="DESCRIÇÃO"></textarea>
                <button @click="downloadImage">Download Image</button>
            </div>
        <div>
            <div v-for="(area, index) in labeledAreas" :key="index">
                <input type="checkbox" v-model="area.visible" @change="redrawCanvas()" />
                <span>{{ area.label }} {{ area.visible }}</span>
            </div>
        </div>
          </div>
        </div>
        <div class="md:w-full w-1/2 pb-16 pr-8 relative md:mt-8">
          {{ labeledAreas }}
            <label v-for="(area, index) in labeledAreas" :key="index">
              <input type="checkbox" v-model="area.visible" @change="redrawCanvas" /> 
              {{ area.label }}
            </label>
        </div>
      </section>
    </ContainerGlobal>
    <Footer />
  </main>
</template>

<style scoped>
.open-icon {
  animation: rotateRight 0.3s;
}

@keyframes rotateRight {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

canvas {
    border: 1px solid black;
    margin-top: 20px;
}

input, textarea {
    display: block;
    margin: 10px auto;
    border: 1px solid black;
}

button {
    margin-top: 10px;
}
</style>