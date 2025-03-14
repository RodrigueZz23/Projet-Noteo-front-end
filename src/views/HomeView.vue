<template>
  <div class="row justify-content-center mt-5">
    <div class="col-sm-4">
      <h2 class="text-center">Login</h2>

      <form @submit.prevent="login">
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="Email" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password" required />
        </div>

        <button type="submit" class="btn btn-primary btn-block mt-3">Login</button>


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
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
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
        router.push('/pasacces');

        alert('Login success')
      } catch (error) {

         alert('Email ou mot de passe incorrect');
      }
    };

    return { email, password,  login };
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
