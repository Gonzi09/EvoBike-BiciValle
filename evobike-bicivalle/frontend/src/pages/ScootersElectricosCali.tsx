import React from 'react';
import { Helmet } from 'react-helmet-async';

function ScootersElectricosCali() {
  return (
    <article className="bg-[#F8FAFC] text-[#0F172A]">
      <Helmet>
        <title>Scooters Eléctricos en Cali | Movilibre</title>
        <meta
          name="description"
          content="Conoce scooters eléctricos en Cali con Movilibre. Soluciones ágiles para ciudad, modelos confiables y respaldo local en Cali, Colombia."
        />
        <meta
          name="keywords"
          content="scooters eléctricos en Cali, scooter eléctrico Cali, Movilibre scooters"
        />
      </Helmet>

      <section className="bg-[#0B1220] text-[#F8FAFC] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Scooters eléctricos en Cali para una movilidad urbana más ágil
          </h1>
          <p className="mt-5 text-lg text-[#D1D5DB] max-w-3xl">
            En Movilibre encuentras scooters eléctricos en Cali ideales para moverte por
            la ciudad con estilo, eficiencia y respaldo técnico local.
          </p>
          <a
            href="https://wa.me/573000000000?text=Hola%20Movilibre%2C%20quiero%20informaci%C3%B3n%20sobre%20scooters%20el%C3%A9ctricos%20en%20Cali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-8 rounded-xl bg-[#2E9ED4] px-6 py-3 font-semibold text-white hover:bg-[#1f8abe] transition-colors"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="text-3xl font-bold">Cali y su nueva movilidad</h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Los scooters eléctricos en Cali son una alternativa inteligente para reducir
              tiempos de traslado y disfrutar recorridos más cómodos en Colombia.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Beneficios de usar scooter eléctrico</h2>
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Ahorro diario</h3>
                <p className="mt-2 text-[#475569]">
                  Menos gasto en transporte y una operación económica para la ciudad.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Sostenibilidad</h3>
                <p className="mt-2 text-[#475569]">
                  Una opción de movilidad eléctrica más limpia y moderna.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Facilidad</h3>
                <p className="mt-2 text-[#475569]">
                  Livianos, prácticos y perfectos para trayectos urbanos cortos.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Tipos de scooters eléctricos</h2>
            <ul className="mt-4 space-y-3 text-[#334155] list-disc pl-6">
              <li>Urbanos compactos para uso diario.</li>
              <li>De mayor autonomía para recorridos largos.</li>
              <li>Con doble suspensión para más confort.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Por qué comprar en Movilibre</h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Somos expertos en scooters eléctricos en Cali y te acompañamos con asesoría,
              respaldo y servicio local para que inviertas en el modelo ideal.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0B1220] text-white p-8">
            <h2 className="text-2xl font-bold">Empieza hoy tu cambio de movilidad</h2>
            <p className="mt-3 text-[#CBD5E1]">
              Cotiza scooters eléctricos en Cali y recibe una recomendación personalizada.
            </p>
            <a
              href="https://wa.me/573000000000?text=Hola%20Movilibre%2C%20quiero%20cotizar%20un%20scooter%20el%C3%A9ctrico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6 rounded-xl bg-[#2E9ED4] px-6 py-3 font-semibold text-white hover:bg-[#1f8abe] transition-colors"
            >
              Solicitar asesoría por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

export default ScootersElectricosCali;
