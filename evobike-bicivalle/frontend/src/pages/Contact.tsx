import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B1220] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#2E9ED4] text-[11px] font-bold uppercase tracking-[0.4em] block mb-4">Soporte</span>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold text-[#F9FAFB] mb-6">
            Contáctanos
          </h1>
          <p className="text-[#9CA3AF] text-xl max-w-2xl mx-auto font-medium">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Completa el formulario o usa nuestros datos de contacto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2E9ED4] to-[#1a5f8f] rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#F9FAFB] font-heading font-semibold text-2xl mb-3">
                Teléfono
              </h3>
              <p className="text-[#9CA3AF] text-lg mb-1">+57 (1) 234-5678</p>
              <p className="text-[#9CA3AF] text-base font-medium">Lun - Vie: 9:00 AM - 6:00 PM</p>
            </div>

            <div className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2E9ED4] to-[#1a5f8f] rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#F9FAFB] font-heading font-semibold text-2xl mb-3">
                Email
              </h3>
              <p className="text-[#9CA3AF] text-lg mb-1">info@evobike.com.co</p>
              <p className="text-[#9CA3AF] text-base font-medium">ventas@evobike.com.co</p>
            </div>

            <div className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2E9ED4] to-[#1a5f8f] rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#F9FAFB] font-heading font-semibold text-2xl mb-3">
                Ubicación
              </h3>
              <p className="text-[#9CA3AF] text-base font-medium leading-relaxed">
                Calle 72 #10-51<br />
                Bogotá, Colombia<br />
                110221
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2E9ED4] to-[#00BFFF] rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-[#F9FAFB] mb-3">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-[#9CA3AF] text-lg font-medium">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#9CA3AF] text-base font-semibold mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-glass w-full"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9CA3AF] text-base font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-glass w-full"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#9CA3AF] text-base font-semibold mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-glass w-full"
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9CA3AF] text-base font-semibold mb-2">
                        Asunto *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="input-glass w-full appearance-none cursor-pointer"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="ventas">Consulta de Ventas</option>
                        <option value="soporte">Soporte Técnico</option>
                        <option value="garantia">Garantía</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#9CA3AF] text-base font-semibold mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input-glass w-full resize-none"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-premium w-full"
                  >
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;