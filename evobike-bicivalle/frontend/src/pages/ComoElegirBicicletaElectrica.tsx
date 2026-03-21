import React from 'react';
import { Helmet } from 'react-helmet-async';

function ComoElegirBicicletaElectrica() {
  return (
    <article className="bg-[#F8FAFC] text-[#0F172A]">
      <Helmet>
        <title>Cómo Elegir Bicicleta Eléctrica | Guía Movilibre</title>
        <meta
          name="description"
          content="Aprende cómo elegir bicicleta eléctrica con esta guía de Movilibre: tipos de bicicletas, batería, autonomía y recomendaciones prácticas."
        />
        <meta
          name="keywords"
          content="cómo elegir bicicleta eléctrica, guía bicicleta eléctrica, consejos bicicleta eléctrica"
        />
      </Helmet>

      <section className="bg-[#0B1220] text-[#F8FAFC] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Cómo elegir bicicleta eléctrica: guía práctica para comprar mejor
          </h1>
          <p className="mt-5 text-lg text-[#D1D5DB]">
            Si te preguntas cómo elegir bicicleta eléctrica, esta guía te ayudará a tomar
            una decisión informada según uso, autonomía y presupuesto.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <h2 className="text-3xl font-bold">1. Define para qué la vas a usar</h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Para entender cómo elegir bicicleta eléctrica, primero define si será para
              trayectos diarios, subidas frecuentes, paseos largos o trabajo.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold">2. Revisa los tipos de bicicleta</h2>
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Urbana</h3>
                <p className="mt-2 text-[#475569]">Cómoda para ciudad y desplazamientos cortos.</p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Plegable</h3>
                <p className="mt-2 text-[#475569]">Ideal si necesitas ahorrar espacio y portabilidad.</p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Todoterreno</h3>
                <p className="mt-2 text-[#475569]">Mejor respuesta para rutas exigentes y desniveles.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold">3. Entiende batería y autonomía</h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              La batería define cuánta distancia podrás recorrer. Al evaluar cómo elegir
              bicicleta eléctrica, revisa capacidad, tiempo de carga y garantía.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold">4. Consejos finales de compra</h2>
            <ul className="mt-4 space-y-3 text-[#334155] list-disc pl-6">
              <li>Prueba la bicicleta antes de comprar.</li>
              <li>Pregunta por soporte técnico y disponibilidad de repuestos.</li>
              <li>Compara autonomía real, no solo la ficha comercial.</li>
            </ul>
          </section>

          <div className="rounded-2xl bg-[#0B1220] text-white p-8">
            <h2 className="text-2xl font-bold">¿Necesitas ayuda personalizada?</h2>
            <p className="mt-3 text-[#CBD5E1]">
              En Movilibre te guiamos sobre cómo elegir bicicleta eléctrica según tu estilo de vida.
            </p>
            <a
              href="https://wa.me/573000000000?text=Hola%20Movilibre%2C%20necesito%20ayuda%20para%20elegir%20una%20bicicleta%20el%C3%A9ctrica"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6 rounded-xl bg-[#2E9ED4] px-6 py-3 font-semibold text-white hover:bg-[#1f8abe] transition-colors"
            >
              Asesoría por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

export default ComoElegirBicicletaElectrica;
