<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="w-1/6 h-1/6 bg-cover max-w-[100%] rounded-full mb-8 ring-2 dark:ring-accent2 ring-accent1 overflow-hidden"
    />
    <div
      v-else
      class="mb-12 w-36 h-36 rounded-full bg-secondary overflow-hidden max-w-[100%] ring-2 dark:ring-accent2 ring-accent1"
    ></div>

    <div class="mb-8">
      <button for="single" @click="uploadAvatar">
        {{ uploading ? "Uploading ..." : "Upload" }}
      </button>
      <input
        type="file"
        id="single"
        accept="image/*"
        class="hidden"
        @change="uploadAvatar"
        :disabled="uploading"
        required
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

const uploadAvatar = async (e) => {
  console.log(e.target.files[0])
  files.value = e.target.files
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
