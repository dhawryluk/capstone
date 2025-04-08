<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="w-40 h-40 rounded-full object-cover mb-4 ring-2 ring-accent1 dark:ring-accent2"
    />
    <div
      v-else
      class="w-40 h-40 rounded-full bg-secondary flex items-center justify-center mb-4 ring-2 ring-accent1 dark:ring-accent2"
    ></div>
    <div class="relative w-40">
      <PrimaryButton
        class="block"
        for="single"
      >
        {{ uploading ? 'Uploading ...' : 'Upload' }}
      </PrimaryButton>
      <input
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['path'])
const { path } = toRefs(props)
const emit = defineEmits(['update:path', 'upload'])
const supabase = useSupabaseClient()
const uploading = ref(false)
const src = ref('')
const files = ref()
const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path.value)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}
const uploadAvatar = async (evt) => {
  files.value = evt.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`
    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
    if (uploadError) throw uploadError
    emit('update:path', filePath)
    emit('upload')
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}
downloadImage()
watch(path, () => {
  if (path.value) {
    downloadImage()
  }
})
</script>

