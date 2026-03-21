import React from 'react';
import { Helmet } from 'react-helmet-async';

function TiendaBicicletasElectricasCali() {
  return (
    <article className="bg-[#F8FAFC] text-[#0F172A]">
      <Helmet>
        <title>Tienda de Bicicletas Eléctricas en Cali | Movilibre</title>
        <meta
          name="description"
          content="Visita la tienda de bicicletas eléctricas en Cali de Movilibre. Atención presencial, confianza local y servicio técnico para tu compra."
        />
        <meta
          name="keywords"
          content="tienda de bicicletas eléctricas en Cali, tienda bicicletas eléctricas Cali, Movilibre tienda"
        />
      </Helmet>

      <section className="bg-[#0B1220] text-[#F8FAFC] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Tu tienda de bicicletas eléctricas en Cali con respaldo local
          </h1>
          <p className="mt-5 text-lg text-[#D1D5DB] max-w-3xl">
            Movilibre es una tienda de bicicletas eléctricas en Cali donde puedes recibir
            asesoría presencial, comparar modelos y comprar con confianza.
          </p>
          <a
            href="https://wa.me/573000000000?text=Hola%20Movilibre%2C%20quiero%20visitar%20la%20tienda%20de%20bicicletas%20el%C3%A9ctricas%20en%20Cali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-8 rounded-xl bg-[#2E9ED4] px-6 py-3 font-semibold text-white hover:bg-[#1f8abe] transition-colors"
          >
            Agendar visita por WhatsApp
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="text-3xl font-bold">Presencia física en Cali</h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Nuestra tienda de bicicletas eléctricas en Cali está pensada para que pruebes,
              compares y tomes decisiones con acompañamiento real en Colombia.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Confianza y servicio local</h2>
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Atención cercana</h3>
                <p className="mt-2 text-[#475569]">
                  Te guiamos paso a paso para elegir la bicicleta ideal para ti.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Respaldo técnico</h3>
                <p className="mt-2 text-[#475569]">
                  Soporte y mantenimiento para cuidar tu inversión.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Compra segura</h3>
                <p className="mt-2 text-[#475569]">
                  Somos una marca local comprometida con la calidad y la confianza.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Por qué visitar Movilibre</h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Si buscas una tienda de bicicletas eléctricas en Cali, aquí puedes resolver
              dudas, conocer autonomía y recibir recomendaciones personalizadas según tu uso.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0B1220] text-white p-8">
            <h2 className="text-2xl font-bold">Te esperamos en nuestra tienda</h2>
            <p className="mt-3 text-[#CBD5E1]">
              Escríbenos para coordinar tu visita a la tienda de bicicletas eléctricas en Cali.
            </p>
            <a
              href="https://wa.me/573000000000?text=Hola%20Movilibre%2C%20quiero%20visitar%20la%20tienda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6 rounded-xl bg-[#2E9ED4] px-6 py-3 font-semibold text-white hover:bg-[#1f8abe] transition-colors"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

export default TiendaBicicletasElectricasCali;
