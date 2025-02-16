'use client'
import { supabase } from '@/app/lib/supabase/client'
import { useEffect, useState } from 'react'

const getData = async () => {
  const { data, error } = await supabase
    .from('coinrupiah')
    .select('*')  
  
  if (error) {
    console.error('Error:', error)
    return []
  }
  console.log('Raw data:', data) 
  return data
}

export default function TestPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const result = await getData()
      setItems(result) 
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Coin Data</h1>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  )
}