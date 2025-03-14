<template>
  <div class="row justify-content-center mt-5">
    <div class="col-sm-4">
      <h2 class="text-center">Register</h2>

      <form @submit.prevent="register">
        <div class="form-group">
          <label>Nom de l'étudiant</label>
          <input type="text" class="form-control" v-model="name" placeholder="nom" required />
        </div>

        <div class="form-group">
          <label>Email de l'étudiant</label>
          <input type="email" class="form-control" v-model="email" placeholder="email" required />
        </div>

        <div class="form-group">
          <label>Mot de passe de l'étudiant</label>
          <input type="password" class="form-control" v-model="password" placeholder="Mot de passe" required />
        </div>

        <button type="submit" class="btn btn-success btn-block mt-3">Enregistrer</button>

        <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
      </form>
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
    const errorMessage = ref('');
      const router = useRouter();


    const register = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/create', {
          name: name.value,
          email: email.value,
          password: password.value
        });

        // Stocker le token dans le localStorage
        localStorage.setItem('token', response.data.token);

        // Rediriger vers le Dashboard

           router.push('/');
          alert('Success register');

      } catch (error) {
          alert('Erreur données non enrégistrer');
      }
    };

    return { name, email, password,  register };
  }
};
</script>

<style scoped>
.row {
  display: flex;
  justify-content: center;
}
.col-sm-4 {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
