import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <span className="text-[#F9FAFB]">MOVIL</span><span className="text-[#2E9ED4]">LIBRE</span>
        </h1>
        <p className="text-[#9CA3AF] text-lg sm:text-xl font-medium mb-8">
          Estamos mejorando nuestro sitio. Muy pronto volvemos.
        </p>

        <a
          href="https://wa.me/573184128902"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#25D366] text-white px-8 py-3 rounded-xl font-semibold text-base shadow-card hover:brightness-110 transition-all duration-200 mb-8"
          aria-label="Contactar por WhatsApp"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>Escríbenos por WhatsApp</span>
        </a>

        <div className="bg-[#111827] border border-[#1e2d42] rounded-2xl p-6 text-left space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#2E9ED4] flex-shrink-0 mt-0.5" />
            <span className="text-[#F9FAFB] text-base">Av. Roosevelt #25-68 local 104, 3 de Julio, Cali, Valle del Cauca</span>
          </div>
          <a href="tel:+573184128902" className="flex items-center gap-3 text-[#F9FAFB] text-base hover:text-[#2E9ED4] transition-colors">
            <Phone className="w-5 h-5 text-[#2E9ED4] flex-shrink-0" />
            <span>+57 318 4128902</span>
          </a>
          <a href="mailto:contacto.movilidadlibre@gmail.com" className="flex items-center gap-3 text-[#F9FAFB] text-base hover:text-[#2E9ED4] transition-colors break-all">
            <Mail className="w-5 h-5 text-[#2E9ED4] flex-shrink-0" />
            <span>contacto.movilidadlibre@gmail.com</span>
          </a>
        </div>

        <a
          href="https://www.google.com/maps/place/Movilidad+Libre/@3.4339588,-76.5397332,18z/data=!4m6!3m5!1s0x8e30a71c5292bbe9:0x921144b53be8b4fe!8m2!3d3.4346753!4d-76.5389735!16s%2Fg%2F11n9gpyjky?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block rounded-2xl overflow-hidden border border-[#1e2d42] shadow-sm bg-[#0B1220] h-[300px] md:h-[360px]"
          aria-label="Abrir ubicación en Google Maps"
        >
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B1220]/75 text-[#F9FAFB] text-xs font-semibold tracking-wide border border-[#1e2d42]">
            Ver en Google Maps
          </span>
          <iframe
            title="Ubicación Movilidad Libre"
            src="https://www.google.com/maps?cid=10525269349326435582&hl=es&z=19&output=embed"
            className="w-full h-full pointer-events-none"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </a>
      </div>
    </div>
  );
};

export default Maintenance;
