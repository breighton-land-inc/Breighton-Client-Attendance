import { useState, useEffect } from 'react';
import headerLogo from './assets/img/Breighton Flat Logo FC-8.png'; 
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    emailAddress: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const requiredFields = [formData.name, formData.contactNumber, formData.emailAddress];
    const filledFields = requiredFields.filter(field => field.trim() !== '').length;
    setProgress((filledFields / requiredFields.length) * 100);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      clientName: formData.name,
      contactNumber: formData.contactNumber,
      email: formData.emailAddress 
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyNI48cY1EhDSGMUqoATV6QscFnQP6gmxtuDthqjNnHvTM0548Q5fHgcVL1Af0HEtHjtA/exec', {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setTimeout(() => {
        setSubmitted(true);
      }, 500);

    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="browser-container">
      {/* Progress bar only shows if not submitted */}
      {!submitted && <div className="progress-bar" style={{ width: `${progress}%` }}></div>}
      
      <div className="viewport-content">
        {submitted ? (
          /* SUCCESS VIEW */
          <div className="form-card success-view">
            <div className="success-icon">✓</div>
            <h1 className="form-title">Success!</h1>
            <p>Your daily log has been submitted successfully.</p>
          </div>
        ) : (
          /* FORM VIEW */
          <div className="form-card">
            <div className="card-top-accent"></div>
            <div className="card-padding">
              <div className="internal-logo-wrapper">
                <img src={headerLogo} alt="Breighton Logo" className="logo-internal" />
              </div>

              <header className="form-intro">
                <h1 className="form-title">Client Attendance Form</h1>
                <p className="form-subtitle">Daily Log • Breighton Land Inc.</p>
              </header>

              <form onSubmit={handleSubmit} className="actual-form">
                <div className="input-block">
                  <label>Full Name <span className="req">*</span></label>
                  <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="input-block">
                  <label>Contact Number <span className="req">*</span></label>
                  <input type="tel" name="contactNumber" placeholder="09XX XXX XXXX" value={formData.contactNumber} onChange={handleChange} required />
                </div>

                <div className="input-block">
                  <label>Email Address <span className="req">*</span></label>
                  <input type="email" name="emailAddress" placeholder="Enter your email address" value={formData.emailAddress} onChange={handleChange} required />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <span className="clear-link" onClick={() => setFormData({name:'', contactNumber:'', emailAddress:''})}>
                    Clear form
                  </span>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      {/* Trademark footer is now outside viewport-content to sit at the absolute bottom */}
      <footer className="browser-footer">© 2026 Breighton Land Inc</footer>
    </div>
  );
}

export default App;