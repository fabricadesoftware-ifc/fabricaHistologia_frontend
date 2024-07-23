import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { SlideService } from "@/services";

export const useSlideStore = defineStore("slide",
    () => {
        const state = reactive({
            slides: [],
            selectedSlide: null,
            loading: false,
            error: null,
            connection: false,
        });
        const isLoading = computed(() => state.loading);
        const slidesCount = computed(() => state.slides.length);

        const getSlides = async () => {
            state.loading = true;
            try {
                state.slides = await SlideService.getSlides();
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
                state.connection = true;
            }
        };


        const createSlide = async (newSlide) => {
            state.loading = true;
            try {
                state.slides.push(await SlideService.createSlide(newSlide));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const updateSlide = async (slide) => {
            state.loading = true;
            try {
                const index = state.slides.findIndex((s) => s.id === slide.id);
                state.slides[index] = await SlideService.updateSlide(slide);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const deleteSlide = async (id) => {

            try {
            const index = state.slides.findIndex((s) => s.id === id.id);
            state.slides.splice(index, 1);
            await SlideService.deleteSlide(index)
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        return {
            state,
            isLoading,
            slidesCount,
            getSlides,
            createSlide,
            updateSlide,
            deleteSlide
        };
    }
)