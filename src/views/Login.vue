<template>
  <div class="login-container">
    <div class="login-card">
      <!-- En-tête avec icône -->
      <div class="login-header">
        <div class="icon-container">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#4F46E5"/>
            <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#4F46E5"/>
          </svg>
        </div>
        <h2 class="login-title">Bienvenue</h2>
        <p class="login-subtitle">Connectez-vous à votre compte</p>
      </div>

      <!-- Formulaire -->
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label class="form-label">Email</label>
          <div class="input-container">
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#6B7280" stroke-width="2"/>
              <path d="M22 6L12 13L2 6" stroke="#6B7280" stroke-width="2"/>
            </svg>
            <input
              type="email"
              class="form-input"
              v-model="email"
              placeholder="votre@email.com"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Mot de passe</label>
          <div class="input-container">
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="#6B7280" stroke-width="2"/>
              <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#6B7280" stroke-width="2"/>
            </svg>
            <input
              type="password"
              class="form-input"
              v-model="password"
              placeholder="Votre mot de passe"
              required
            />
          </div>
        </div>

        <button type="submit" class="login-button" :disabled="loading">
          <span v-if="!loading">Se connecter</span>
          <div v-else class="loading-spinner"></div>
        </button>

        <!-- Lien supplémentaire -->
        <div class="login-footer">
          <a href="#" class="forgot-password">Mot de passe oublié ?</a>
        </div>
      </form>
    </div>

    <!-- Background decoration -->
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const router = useRouter();

    const login = async () => {
      loading.value = true;

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: email.value,
          password: password.value
        });

        // Stocker le token et le rôle dans le localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('userNotes', JSON.stringify(response.data.notes));

        // Rediriger vers la page /pasacces
        router.push('/note');

      } catch (error) {
        alert('Email ou mot de passe incorrect');
      } finally {
        loading.value = false;
      }
    };

    return { email, password, loading, login };
  }
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

*{
   font-family: "Outfit", sans-serif;;
}
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 10;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.icon-container {

  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.login-title {
  color: #1F2937;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.login-subtitle {
  color: #6B7280;
  font-size: 16px;
  margin: 0;
}

.login-form {
  space-y: 24px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  color: #374151;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
}

.input-container {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.form-input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #F9FAFB;
}

.form-input:focus {
  outline: none;
  border-color: #4F46E5;
  background: white;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-input::placeholder {
  color: #9CA3AF;
}

.login-button {
  width: 100%;
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.login-footer {
  text-align: center;
  margin-top: 24px;
}

.forgot-password {
  color: #4F46E5;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #7C3AED;
}

.background-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -100px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -80px;
  left: -80px;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 20%;
}

/* Responsive */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
    margin: 20px;
  }

  .login-title {
    font-size: 24px;
  }
}
</style>
