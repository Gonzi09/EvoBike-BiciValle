import React from 'react';
import { Helmet } from 'react-helmet-async';

function ComprarBicicletaElectricaCali() {
  return (
    <article className="bg-[#F8FAFC] text-[#0F172A]">
      <Helmet>
        <title>Comprar Bicicleta Eléctrica en Cali | Movilibre</title>
        <meta
          name="description"
          content="¿Listo para comprar bicicleta eléctrica en Cali? En Movilibre te asesoramos para elegir el modelo ideal con respaldo local y atención personalizada."
        />
        <meta
          name="keywords"
          content="comprar bicicleta eléctrica en Cali, bicicleta eléctrica Cali, Movilibre"
        />
      </Helmet>

      <section className="bg-[#0B1220] text-[#F8FAFC] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Comprar bicicleta eléctrica en Cali es más fácil con Movilibre
          </h1>
          <p className="mt-5 text-lg text-[#D1D5DB] max-w-3xl">
            Si estás buscando comprar bicicleta eléctrica en Cali, aquí encuentras modelos
            confiables, asesoría honesta y acompañamiento antes y después de la compra.
          </p>
          <a
            href="https://wa.me/573000000000?text=Hola%20Movilibre%2C%20quiero%20comprar%20bicicleta%20el%C3%A9ctrica%20en%20Cali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-8 rounded-xl bg-[#2E9ED4] px-6 py-3 font-semibold text-white hover:bg-[#1f8abe] transition-colors"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="text-3xl font-bold">Compra con intención y seguridad</h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Comprar bicicleta eléctrica en Cali no se trata solo del precio: también
              importa la autonomía, el tipo de motor y el uso real que tendrás cada día.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Por qué elegir Movilibre</h2>
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Asesoría experta</h3>
                <p className="mt-2 text-[#475569]">
                  Te ayudamos a comparar modelos según distancia, terreno y presupuesto.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Modelos seleccionados</h3>
                <p className="mt-2 text-[#475569]">
                  Catálogo pensado para movilidad urbana y desempeño confiable.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Soporte local</h3>
                <p className="mt-2 text-[#475569]">
                  Atención posventa y respaldo en Cali para mayor tranquilidad.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Tipos de bicicletas según tu objetivo</h2>
            <ul className="mt-4 space-y-3 text-[#334155] list-disc pl-6">
              <li>Urbanas para transporte diario.</li>
              <li>Plegables para practicidad y espacio.</li>
              <li>Potentes para recorridos largos o inclinaciones.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-[#0B1220] text-white p-8">
            <h2 className="text-2xl font-bold">Haz tu compra con confianza</h2>
            <p className="mt-3 text-[#CBD5E1]">
              Escríbenos si quieres comprar bicicleta eléctrica en Cali con asesoría clara,
              rápida y enfocada en lo que realmente necesitas.
            </p>
            <a
              href="https://wa.me/573000000000?text=Hola%20Movilibre%2C%20quiero%20asesor%C3%ADa%20para%20comprar%20una%20bicicleta%20el%C3%A9ctrica"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6 rounded-xl bg-[#2E9ED4] px-6 py-3 font-semibold text-white hover:bg-[#1f8abe] transition-colors"
            >
              Comprar con asesoría por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

export default ComprarBicicletaElectricaCali;
