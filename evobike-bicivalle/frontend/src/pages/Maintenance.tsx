import React from 'react';

const links = [
  { label: 'WhatsApp', href: 'https://wa.me/573184128902', left: '5.78%', width: '7.25%' },
  {
    label: 'Cali',
    href: 'https://www.google.com/maps/place/Movilidad+Libre/@3.4339588,-76.5397332,18z/data=!4m6!3m5!1s0x8e30a71c5292bbe9:0x921144b53be8b4fe!8m2!3d3.4346753!4d-76.5389735!16s%2Fg%2F11n9gpyjky?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D',
    left: '13.76%',
    width: '5.2%',
  },
  {
    label: 'Candelaria',
    href: 'https://www.google.com/maps/search/?api=1&query=Movilidad+Libre+Candelaria+Valle+del+Cauca',
    left: '19.69%',
    width: '7.83%',
  },
];

const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="relative w-full max-w-[calc(100vh*1366/768)] aspect-[1366/768]">
        <img
          src="/imgs/mantenimiento.jpg"
          alt="Movilidad Libre. ¡Muévete más, gasta menos! Tu próxima eléctrica está aquí. Estamos renovando nuestra web. Te atendemos por WhatsApp y en nuestras sedes."
          className="w-full h-full object-contain"
        />
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="hidden md:block absolute rounded-lg"
            style={{ left: link.left, width: link.width, top: '82.42%', height: '4.69%' }}
          />
        ))}
      </div>
      <div className="md:hidden flex flex-wrap justify-center gap-1 p-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0B6CF5] text-white px-2 py-1 rounded-lg text-base font-medium"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;
