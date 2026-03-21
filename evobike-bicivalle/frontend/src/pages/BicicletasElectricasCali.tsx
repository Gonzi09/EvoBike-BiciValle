import React from 'react';
import { Helmet } from 'react-helmet-async';

function BicicletasElectricasCali() {
  return (
    <article className="bg-[#F8FAFC] text-[#0F172A]">
      <Helmet>
        <title>Bicicletas Eléctricas en Cali | Movilibre</title>
        <meta
          name="description"
          content="Descubre bicicletas eléctricas en Cali con Movilibre. Modelos urbanos y de aventura, asesoría local y servicio confiable en Cali, Colombia."
        />
        <meta
          name="keywords"
          content="bicicletas eléctricas en Cali, bicicletas eléctricas Cali, Movilibre Cali"
        />
      </Helmet>

      <section className="bg-[#0B1220] text-[#F8FAFC] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Bicicletas eléctricas en Cali para moverte mejor cada día
          </h1>
          <p className="mt-5 text-lg text-[#D1D5DB] max-w-3xl">
            En Movilibre encuentras bicicletas eléctricas en Cali con diseño moderno,
            tecnología eficiente y respaldo local para tu movilidad diaria.
          </p>
          <a
            href="https://wa.me/573000000000?text=Hola%20Movilibre%2C%20quiero%20informaci%C3%B3n%20sobre%20bicicletas%20el%C3%A9ctricas%20en%20Cali"
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
            <h2 className="text-3xl font-bold">Movilidad eléctrica en Cali, Colombia</h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Si buscas bicicletas eléctricas en Cali, Movilibre te ofrece opciones para
              recorridos urbanos, trayectos al trabajo y paseos de fin de semana. Nuestro
              equipo conoce la ciudad y te orienta para elegir la mejor alternativa.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Beneficios clave</h2>
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Ahorro real</h3>
                <p className="mt-2 text-[#475569]">
                  Reduce costos de transporte y mantenimiento frente a otras opciones.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Movilidad sostenible</h3>
                <p className="mt-2 text-[#475569]">
                  Disfruta una forma de transporte más limpia para la ciudad.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Facilidad diaria</h3>
                <p className="mt-2 text-[#475569]">
                  Llega más rápido, evita trancones y muévete con más comodidad.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Tipos de bicicletas eléctricas</h2>
            <ul className="mt-4 space-y-3 text-[#334155] list-disc pl-6">
              <li>Urbanas: ideales para desplazamientos diarios.</li>
              <li>Plegables: prácticas para espacios reducidos.</li>
              <li>Todoterreno: mayor potencia para rutas exigentes.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Por qué elegir Movilibre</h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Somos una marca local enfocada en bicicletas eléctricas en Cali, con
              acompañamiento antes y después de la compra, soporte técnico y atención
              cercana para que tomes una decisión segura.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0B1220] text-white p-8">
            <h2 className="text-2xl font-bold">¿Listo para estrenar?</h2>
            <p className="mt-3 text-[#CBD5E1]">
              Escríbenos y recibe asesoría personalizada sobre bicicletas eléctricas en Cali.
            </p>
            <a
              href="https://wa.me/573000000000?text=Hola%20Movilibre%2C%20quiero%20cotizar%20una%20bicicleta%20el%C3%A9ctrica"
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

export default BicicletasElectricasCali;
