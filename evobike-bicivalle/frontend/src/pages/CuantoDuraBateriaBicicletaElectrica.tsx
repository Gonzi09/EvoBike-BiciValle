import React from 'react';
import { Helmet } from 'react-helmet-async';

function CuantoDuraBateriaBicicletaElectrica() {
  return (
    <article className="bg-[#F8FAFC] text-[#0F172A]">
      <Helmet>
        <title>Cuánto Dura la Batería de una Bicicleta Eléctrica | Movilibre</title>
        <meta
          name="description"
          content="Descubre cuánto dura la batería de una bicicleta eléctrica, qué factores afectan su autonomía y cómo extender su vida útil con buenos hábitos."
        />
        <meta
          name="keywords"
          content="cuánto dura la batería de una bicicleta eléctrica, autonomía batería bicicleta eléctrica, cuidado batería"
        />
      </Helmet>

      <section className="bg-[#0B1220] text-[#F8FAFC] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Cuánto dura la batería de una bicicleta eléctrica y cómo cuidarla
          </h1>
          <p className="mt-5 text-lg text-[#D1D5DB]">
            Una de las preguntas más comunes es cuánto dura la batería de una bicicleta
            eléctrica. Aquí te explicamos lo esencial de forma clara.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <h2 className="text-3xl font-bold">Duración aproximada de la batería</h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Cuando analizas cuánto dura la batería de una bicicleta eléctrica, debes ver
              dos cosas: la autonomía por carga y la vida útil total en ciclos.
            </p>
            <p className="mt-3 text-[#334155] leading-relaxed">
              En promedio, una batería bien cuidada puede durar entre 500 y 1.000 ciclos,
              con autonomías que varían según el modelo y el uso.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold">Factores que afectan la autonomía</h2>
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Terreno y pendientes</h3>
                <p className="mt-2 text-[#475569]">Las subidas fuertes consumen más energía.</p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Peso y carga</h3>
                <p className="mt-2 text-[#475569]">Mayor peso implica más demanda de batería.</p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-xl font-semibold">Estilo de manejo</h3>
                <p className="mt-2 text-[#475569]">Aceleraciones bruscas reducen la autonomía.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold">Tips para extender la vida útil</h2>
            <ul className="mt-4 space-y-3 text-[#334155] list-disc pl-6">
              <li>Evita descargas profundas frecuentes.</li>
              <li>Carga en ambientes frescos y ventilados.</li>
              <li>No dejes la batería al 0% por periodos largos.</li>
              <li>Realiza mantenimientos preventivos periódicos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold">Recomendación final</h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Si quieres saber con precisión cuánto dura la batería de una bicicleta
              eléctrica para tu caso, lo mejor es evaluar tu ruta diaria y tipo de uso.
            </p>
          </section>

          <div className="rounded-2xl bg-[#0B1220] text-white p-8">
            <h2 className="text-2xl font-bold">Resuelve tus dudas con expertos</h2>
            <p className="mt-3 text-[#CBD5E1]">
              En Movilibre te orientamos sobre autonomía, cuidado y reemplazo de batería.
            </p>
            <a
              href="https://wa.me/573000000000?text=Hola%20Movilibre%2C%20quiero%20asesor%C3%ADa%20sobre%20la%20bater%C3%ADa%20de%20mi%20bicicleta%20el%C3%A9ctrica"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6 rounded-xl bg-[#2E9ED4] px-6 py-3 font-semibold text-white hover:bg-[#1f8abe] transition-colors"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

export default CuantoDuraBateriaBicicletaElectrica;
