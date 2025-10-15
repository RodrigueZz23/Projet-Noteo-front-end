<template>
  <div class="modern-register">
    <div class="register-wrapper">
      <!-- Left Side - Illustration -->
      <div class="illustration-section">
        <div class="illustration-content">
          <div class="illustration-graphic">
            <div class="graphic-circle primary"></div>
            <div class="graphic-circle secondary"></div>
            <div class="graphic-circle accent"></div>
            <div class="student-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2"/>
                <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <h1 class="illustration-title">Rejoignez Noteo</h1>
          <p class="illustration-text">
            Créez un compte étudiant/administrateur.
          </p>

        </div>
      </div>

      <!-- Right Side - Form -->
      <div class="form-section">
        <div class="form-container">
          <div class="form-header">
            <h2>Créer un compte</h2>
            <p>Commencez votre parcours académique</p>
          </div>

          <form @submit.prevent="register" class="register-form">
            <div class="input-group">
              <div class="input-field">
                <label>Nom complet</label>
                <div class="input-wrapper">
                  <span class="input-prefix"></span>
                  <input
                    type="text"
                    v-model="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div class="input-field">
                <label>Adresse email</label>
                <div class="input-wrapper">
                  <span class="input-prefix"></span>
                  <input
                    type="email"
                    v-model="email"
                    placeholder="john@exemple.com"
                    required
                  />
                </div>
              </div>

              <div class="input-field">
                <label>Mot de passe</label>
                <div class="input-wrapper">
                  <span class="input-prefix"></span>
                  <input
                    type="password"
                    v-model="password"
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" class="password-toggle"></button>
                </div>
              </div>
            </div>

            <div class="terms-agreement">

            </div>

            <button type="submit" class="submit-btn" :disabled="loading || !acceptTerms">
              <span v-if="!loading">Enrégistrer</span>
              <div v-else class="btn-loading">
                <div class="spinner"></div>
                <span>Création en cours...</span>
              </div>
            </button>

            <div class="divider">
              <span>Ou</span>
            </div>

            <div class="auth-redirect">
              <p>Déjà inscrit ? <router-link to="/" class="redirect-link">Se connecter</router-link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const acceptTerms = ref(false);
    const errorMessage = ref('');
    const router = useRouter();

    const register = async () => {
      loading.value = true;
      errorMessage.value = '';

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/create', {
          name: name.value,
          email: email.value,
          password: password.value
        });

        localStorage.setItem('token', response.data.token);
        router.push('/');

      } catch (error) {
        errorMessage.value = 'Erreur lors de la création du compte';
        alert('Erreur lors de la création du compte');
      } finally {
        loading.value = false;
      }
    };

    return { name, email, password, loading, acceptTerms, errorMessage, register };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

* {
  font-family: "Outfit", sans-serif;
}

.modern-register {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.register-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  width: 100%;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  min-height: 600px;
}

/* Illustration Section */
.illustration-section {
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  color: white;
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.illustration-content {
  text-align: center;
  z-index: 2;
  position: relative;
}

.illustration-graphic {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 40px;
}

.graphic-circle {
  position: absolute;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.graphic-circle.primary {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  top: 0;
  left: 0;
  animation-delay: 0s;
}

.graphic-circle.secondary {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.15);
  bottom: 0;
  right: 0;
  animation-delay: 2s;
}

.graphic-circle.accent {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
}

.student-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.illustration-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.3;
}

.illustration-text {
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 40px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 250px;
  margin: 0 auto;
}

.feature {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.feature-icon {
  font-size: 18px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Form Section */
.form-section {
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  width: 100%;
  max-width: 400px;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-header h2 {
  font-size: 32px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 8px;
}

.form-header p {
  color: #6B7280;
  font-size: 16px;
  margin: 0;
}

.register-form {
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}

.input-field label {
  display: block;
  color: #374151;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix {
  position: absolute;
  left: 16px;
  color: #6B7280;
  font-size: 18px;
  z-index: 2;
}

.input-wrapper input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #F9FAFB;
  color: #1F2937;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #4F46E5;
  background: white;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.input-wrapper input::placeholder {
  color: #9CA3AF;
}

.password-toggle {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #4F46E5;
}

.terms-agreement {
  margin-bottom: 24px;
}

.checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  line-height: 1.4;
}

.checkbox input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #D1D5DB;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  margin-top: 2px;
}

.checkbox input:checked + .checkmark {
  background: #4F46E5;
  border-color: #4F46E5;
}

.checkbox input:checked + .checkmark::after {
  content: '✓';
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.terms-link {
  color: #4F46E5;
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  color: #7C3AED;
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  color: white;
  border: none;
  padding: 18px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  background: #9CA3AF;
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.divider {
  text-align: center;
  position: relative;
  margin: 24px 0;
  color: #6B7280;
  font-size: 14px;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #E5E7EB;
  z-index: 1;
}

.divider span {
  background: white;
  padding: 0 16px;
  position: relative;
  z-index: 2;
}

.auth-redirect {
  text-align: center;
}

.auth-redirect p {
  color: #6B7280;
  margin: 0;
}

.redirect-link {
  color: #4F46E5;
  text-decoration: none;
  font-weight: 500;
}

.redirect-link:hover {
  color: #7C3AED;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .register-wrapper {
    grid-template-columns: 1fr;
    max-width: 400px;
  }

  .illustration-section {
    padding: 40px 20px;
    display: none;
  }

  .form-section {
    padding: 40px 20px;
  }

  .form-header h2 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .modern-register {
    padding: 10px;
  }

  .form-section {
    padding: 30px 20px;
  }

  .illustration-graphic {
    width: 150px;
    height: 150px;
  }

  .graphic-circle.primary {
    width: 90px;
    height: 90px;
  }

  .graphic-circle.secondary {
    width: 60px;
    height: 60px;
  }

  .graphic-circle.accent {
    width: 45px;
    height: 45px;
  }
}
</style>
