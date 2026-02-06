import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send data to a backend API
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with us for questions, collaborations, or feedback</p>
        </div>
      </div>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              <p className="form-intro">
                Have questions about the project, interested in contributing, or want to learn more? 
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-container">
              <h2>Contact Information</h2>
              
              <div className="contact-info-card">
                <div className="info-icon">
                  <Mail size={24} />
                </div>
                <div className="info-content">
                  <h3>Email</h3>
                  <p>info@nepaliinstruments.edu.np</p>
                  <p className="secondary">support@nepaliinstruments.edu.np</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <div className="info-content">
                  <h3>Phone</h3>
                  <p>+977-1-4123456</p>
                  <p className="secondary">+977-1-4123457 (Office)</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-icon">
                  <MapPin size={24} />
                </div>
                <div className="info-content">
                  <h3>Office Address</h3>
                  <p>Nepal Music Academy</p>
                  <p className="secondary">
                    Tripureshwor, Kathmandu<br />
                    P.O. Box 12345<br />
                    Nepal
                  </p>
                </div>
              </div>

              <div className="office-hours">
                <h3>Office Hours</h3>
                <p><strong>Sunday - Friday:</strong> 10:00 AM - 5:00 PM</p>
                <p><strong>Saturday:</strong> Closed</p>
                <p className="note">Public holidays: Closed</p>
              </div>

              <div className="map-placeholder">
                <p>📍 Map Integration</p>
                <small>Integrate Google Maps or OpenStreetMap here</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ or Additional Info */}
      <section className="section faq-section bg-secondary">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h4>How can I contribute to this project?</h4>
              <p>
                We welcome contributions from musicians, researchers, developers, and cultural 
                enthusiasts. Contact us to discuss collaboration opportunities.
              </p>
            </div>
            <div className="faq-item">
              <h4>Can I use the resources for educational purposes?</h4>
              <p>
                Yes! All resources on this platform are available for educational and research 
                purposes. Please provide proper attribution when using our materials.
              </p>
            </div>
            <div className="faq-item">
              <h4>How can I become an expert on this platform?</h4>
              <p>
                If you are a master musician, teacher, or scholar with expertise in traditional 
                Nepali instruments, please contact us with your credentials and experience.
              </p>
            </div>
            <div className="faq-item">
              <h4>Do you offer instrument lessons?</h4>
              <p>
                Currently, we provide educational resources and expert insights. For dedicated 
                lessons, we can connect you with master musicians in our network.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
