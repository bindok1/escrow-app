import { supabase } from '@/app/lib/supabase/client'

export const uploadImage = async (file: File): Promise<string> => {
  if (!file) throw new Error('No file provided')
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('products')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(filePath)

  return publicUrl
}