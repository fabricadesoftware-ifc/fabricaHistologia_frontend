import { defineStore } from "pinia";
import { computed } from "vue";
import { useStorage } from "@vueuse/core";
import { UploaderService } from "@/services";

/**
 * Store for managing uploads (images/documents).
 */
export const useUploadStore = defineStore('upload', () => {

  const state = useStorage('uploadStorage', {
    uploads: [],
    allUploads: [],
    selectedUpload: null,
    loading: false,
    error: null,
  });

  const uploads = computed(() => state.value.uploads);
  const selectedUpload = computed(() => state.value.selectedUpload);
  const allUploads = computed(() => state.value.allUploads);
  const isLoading = computed(() => state.value.loading);
  const uploadsCount = computed(() => state.value.uploads.length);

  /**
   * Fetches all uploads for a given type.
   * @param {'images'|'documents'} url
   */
  const getUploads = async (url) => {
    state.value.loading = true;
    try {
      const response = await UploaderService.getUploads(url);
      console.log('🟡 response recebido na store:', response)
      state.value.uploads = response;
    } catch (error) {
      state.value.error = error;
    } finally {
      state.value.loading = false;
    }
  };

  const getAllUploads = async (url) => {
    state.value.loading = true;
    try {
      const response = await UploaderService.getAllUploads(url);
      state.value.allUploads = response;
    } catch (error) {
      state.value.error = error;
    } finally {
      state.value.loading = false;
    }
  };

  /**
   * Creates a new upload.
   * @param {'images'|'documents'} url
   * @param {Object} newUpload
   */
  const createUpload = async (url, newUpload) => {
    state.value.loading = true;
    try {
      const response = await UploaderService.createUpload(url, newUpload);
      state.value.uploads.push(response);
      console.log('🟡 response recebido na store:', response)

      return response
    } catch (error) {
      state.value.error = error;
    } finally {
      state.value.loading = false;
    }
  };

  /**
   * Updates an existing upload.
   * @param {'images'|'documents'} url
   * @param {Object} upload
   */
  const updateUpload = async (url, upload) => {
    state.value.loading = true;
    try {
      const response = await UploaderService.updateUploads(url, upload);
      const index = state.value.uploads.findIndex((u) => u.id === upload.id);
      if (index !== -1) state.value.uploads[index] = response;
    } catch (error) {
      state.value.error = error;
    } finally {
      state.value.loading = false;
    }
  };

  /**
   * Deletes an upload by ID.
   * @param {'images'|'documents'} url
   * @param {number} id
   */
  const deleteUpload = async (url, id) => {
    state.value.loading = true;
    try {
      await UploaderService.deleteUpload(url, id);
      const index = state.value.uploads.findIndex((u) => u.id === id);
      if (index !== -1) state.value.uploads.splice(index, 1);
    } catch (error) {
      state.value.error = error;
    } finally {
      state.value.loading = false;
    }
  };

  return {
    state,
    uploads,
    selectedUpload,
    isLoading,
    uploadsCount,
    allUploads,
    getUploads,
    getAllUploads,
    createUpload,
    updateUpload,
    deleteUpload,
  };
});
