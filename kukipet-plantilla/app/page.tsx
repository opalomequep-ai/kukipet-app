// app/page.tsx (o pages/index.tsx)
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Home() {
  const supabase = createClient()
  
  // Obtener listados publicados
  const { data: listings, error } = await supabase
    .from('listings')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error cargando listados:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">🐾 Kukipet</h1>
          <span className="text-sm text-gray-500">Cuenca - Ecuador</span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Todo para tu mascota en un solo lugar</h2>
          <p className="text-lg opacity-90">Veterinarias • Pet shops • Grooming • Snacks Kukipet</p>
        </div>
      </section>

      {/* Listados */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings && listings.length > 0 ? (
            listings.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <p className="text-gray-500 text-xs mb-3">{item.location || item.address}</p>
                  <a
                    href={`https://wa.me/${item.phone?.replace(/\D/g, '') || '593999999999'}?text=Hola%2C%20vi%20tu%20servicio%20en%20Kukipet%20y%20me%20interesa`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition"
                  >
                    <span>📱</span> Contactar por WhatsApp
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p>No hay servicios disponibles aún.</p>
              <p className="text-sm mt-2">Agrega listados desde Supabase en la tabla `listings`.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6 text-center text-gray-500 text-sm">
        <p>Kukipet - Directorio de servicios para mascotas</p>
        <p className="mt-1">¿Eres veterinaria o pet shop? <a href="#" className="text-orange-500">Contáctanos</a></p>
      </footer>
    </div>
  )
}
