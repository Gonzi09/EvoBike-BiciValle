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
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            Contáctanos
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Completa el formulario o usa nuestros datos de contacto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-primary-surface rounded-lg p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-green-bright to-primary-green-dark rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-text-primary font-heading font-semibold text-lg mb-2">
                Teléfono
              </h3>
              <p className="text-text-secondary">+57 (1) 234-5678</p>
              <p className="text-text-secondary">Lun - Vie: 9:00 AM - 6:00 PM</p>
            </div>

            <div className="bg-primary-surface rounded-lg p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-green-bright to-primary-green-dark rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-text-primary font-heading font-semibold text-lg mb-2">
                Email
              </h3>
              <p className="text-text-secondary">info@evobike.com.co</p>
              <p className="text-text-secondary">ventas@evobike.com.co</p>
            </div>

            <div className="bg-primary-surface rounded-lg p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-green-bright to-primary-green-dark rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-text-primary font-heading font-semibold text-lg mb-2">
                Ubicación
              </h3>
              <p className="text-text-secondary">
                Calle 72 #10-51<br />
                Bogotá, Colombia<br />
                110221
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-primary-surface rounded-lg p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-green-bright to-primary-green-dark rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-text-secondary">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-text-secondary text-sm font-medium mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-text-secondary text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-text-secondary text-sm font-medium mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200"
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-text-secondary text-sm font-medium mb-2">
                        Asunto *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200"
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
                    <label className="block text-text-secondary text-sm font-medium mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200 resize-none"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent-fuchsia text-white py-4 rounded-lg font-semibold text-lg hover:bg-accent-fuchsia-hover transition-all duration-200 hover:shadow-glow-fuchsia flex items-center justify-center space-x-2"
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