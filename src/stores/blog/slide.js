import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { SlideService } from "@/services";

/**
 * Store for managing slides data.
 * @typedef {Object} SlideStore
 * @property {Object} state - The state object containing slides data.
 * @property {Array} state.slides - The array of slides.
 * @property {Object|null} state.selectedSlide - The currently selected slide.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} slidesCount - Computed property indicating the number of slides.
 * @property {Function} getSlides - Function to fetch slides data.
 * @property {Function} createSlide - Function to create a new slide.
 * @property {Function} updateSlide - Function to update an existing slide.
 * @property {Function} deleteSlide - Function to delete a slide.
 */

/**
 * Creates a new instance of the SlideStore
 * @function useSlideStore
 * @returns {SlideStore} the SlideStore instance
 */

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

        /**
         * Fetches slides data
         * @async
         * @function getSlides
         */

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

        /**
         * Creates a new slide
         * @async
         * @function createSlide
         * @param {Object} newSlide - the new slide object to create 
         */

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

        /**
         * Update an existing slide
         * @async
         * @function updateSlideSlide
         * @param {Object} slide - the updated slide object.
         */

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

        /**
         * Delete a slide
         * @async
         * @function createSlide
         * @param {number} id - The id of the slide will be deleted
         */

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