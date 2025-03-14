<template>
  <div class="row justify-content-center mt-5">
    <div class="col-sm-4">
      <h2 class="text-center">Ajouter une note</h2>

      <form @submit.prevent="createNote">
        <!-- Sélection de l'utilisateur -->
        <div class="form-group">
          <label>Etudiants</label>
          <select class="form-control" v-model="selectedUserId" >
            <option value="" disabled>Choisir un étudiant</option>
            <option v-for="user in userIds" :key="user.id" :value="user.id">
              {{ user.id }} - {{ user.name }}
            </option>
          </select>
        </div>

        <!-- Champ Note -->
        <div class="form-group">
          <label>Note</label>
          <input type="text" class="form-control" v-model="note" placeholder="Entrez la note"  />
        </div>

        <!-- Champ Module -->
        <div class="form-group">
          <label>Modules</label>
          <select class="form-control" v-model="module" >
            <option value="" disabled>Choisir un module</option>
            <option value="Math-sup">Math-sup</option>
            <option value="Anglais">Anglais</option>
            <option value="Physique">Physique</option>
            <option value="Théorie des signaux">Théorie des signaux</option>
            <option value="Introduction au management">Introduction au management</option>
            <option value="Initialisation au marketing">Initialisation au marketing</option>
            <option value="Finance">Finance</option>
            <option value="Transport-logistique">Transport-logistique</option>
          </select>
        </div>

        <!-- Sélection du Résultat -->
        <div class="form-group">
          <label>Résultat</label>
          <select class="form-control" v-model="resultat" >
            <option value="" disabled>Choisir un résultat</option>
            <option value="Admis">Admis</option>
            <option value="Refusé">Refusé</option>
          </select>
        </div>


        <div class="form-group">
          <label>Niveau</label>
          <select class="form-control" v-model="niveau" >
            <option value="" disabled>Choisir le niveau</option>
            <option value="B1SI">B1SI</option>
            <option value="B2SI">B2SI</option>
            <option value="B3SI">B3SI</option>
            <option value="B1M">B1M</option>
            <option value="B2M">B2M</option>
            <option value="B3M">B3M</option>
            <option value="M1SI">M1SI</option>
            <option value="M2SI">M2SI</option>
            <option value="M1M">M1M</option>
            <option value="M2M">M2M</option>
          </select>
        </div>





        <!-- Bouton de soumission -->
        <button type="submit" class="btn btn-success btn-block mt-3">Ajouter</button>

        <!-- Affichage des erreurs -->
        <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
      </form>
    </div>
  </div>




</template>

<script>


import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const selectedUserId = ref('');
    const note = ref('');
    const module = ref('');
    const resultat = ref('');
    const niveau = ref('');
    const userIds = ref([]);
    const errorMessage = ref('');

    // Récupérer les user_id depuis l'API
    const fetchUserIds = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users-ids');

        if (response.data.user_ids.length === 0) {
          errorMessage.value = "Aucun utilisateur trouvé.";
        } else {
          userIds.value = response.data.user_ids;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des user_ids:', error);
        errorMessage.value = "Impossible de récupérer les utilisateurs.";
      }
    };

    // Enregistrer une nouvelle note
    const createNote = async () => {
      if (!selectedUserId.value || !note.value || !module.value || !resultat.value || !niveau.value) {
        alert('Tous les champs sont requis');
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/notes', {
          user_id: selectedUserId.value,
          note: note.value,
          module: module.value,
          resultat: resultat.value,
          niveau: niveau.value
        });

        alert('Note ajoutée avec succès');

        // Réinitialisation des champs après ajout
        selectedUserId.value = '';
        note.value = '';
        module.value = '';
        resultat.value = '';
        niveau.value = '';
        errorMessage.value = ''; // Effacer les erreurs après succès
      } catch (error) {
         alert('Erreur');
      }
    };

    onMounted(fetchUserIds);

    return { selectedUserId, note, module, resultat, niveau, userIds, createNote, errorMessage };
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
