import React, { useState } from 'react';
import { Mail, Phone, User, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailSubject = "Formular de contact - apartamentdelux.ro";
    const emailBody = `
Detalii contact:
Nume: ${formData.name}
Email: ${formData.email}
Telefon: ${formData.phone}

Mesaj:
${formData.message}
    `;

    window.location.href = `mailto:reddomainrent@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    setStatus({
      type: 'success',
      message: 'Se deschide clientul tău de email pentru a trimite mesajul...'
    });

    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setStatus({ type: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const inputClasses = "mt-1 block w-full rounded-md border-brand-orange/30 px-4 py-3 focus:border-brand-orange focus:ring focus:ring-brand-orange/20 bg-white/50 backdrop-blur-sm transition-colors";
  const labelClasses = "flex items-center gap-2 text-sm font-medium text-brand-gray-dark";

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-brand-gray-light to-white">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto"> {/* Changed from max-w-3xl to max-w-5xl */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Contactează-ne
            </h2>
            <p className="text-brand-gray-dark/80">
              Trimite-ne un mesaj și o să îți răspundem cât mai curând posibil.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 lg:p-12 border border-brand-orange/10"> {/* Added lg:p-12 for more padding on larger screens */}
            {status.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                status.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {status.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    <User size={18} className="text-brand-orange" />
                    Nume complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className={inputClasses}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ioan Popescu"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    <Mail size={18} className="text-brand-orange" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className={inputClasses}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ioan.popescu@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className={labelClasses}>
                  <Phone size={18} className="text-brand-orange" />
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={inputClasses}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+40 700 000 000"
                />
              </div>
              
              <div>
                <label htmlFor="message" className={labelClasses}>
                  <MessageCircle size={18} className="text-brand-orange" />
                  Mesaj
                </label>
                <textarea
                  id="message"
                  rows="5"
                  required
                  className={inputClasses}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Scrie mesajul tău aici..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-4 bg-brand-orange text-white rounded-lg hover:bg-brand-orange-dark transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-brand-orange/20 font-medium flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Trimite mesajul
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
