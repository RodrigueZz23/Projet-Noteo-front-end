<template>
  <div class="simple-container">
    <div class="simple-card">
      <h2 class="simple-title">Ajouter une note</h2>

      <form @submit.prevent="createNote" class="simple-form">
        <!-- Étudiant -->
        <div class="form-group">
          <label>Étudiant</label>
          <select v-model="selectedUserId" class="simple-select" required>
            <option value="" disabled>Choisir un étudiant</option>
            <option v-for="user in userIds" :key="user.id" :value="user.id">
              {{ user.id }} - {{ user.name }}
            </option>
          </select>
        </div>

        <!-- Module -->
        <div class="form-group">
          <label>Module</label>
          <select v-model="module" class="simple-select" required>
            <option value="" disabled>Choisir un module</option>
            <option value="Math-sup">Math-sup</option>
            <option value="Anglais">Anglais</option>
            <option value="Physique">Physique</option>
            <option value="Théorie des signaux">Théorie des signaux</option>
            <option value="Introduction au management">Introduction au management</option>
            <option value="Initialisation au marketing">Initialisation au marketing</option>
            <option value="Finance">Finance</option>
            <option value="Transport-logistique">Transport-logistique</option>
            <option value="Initialisation à git">Initialisation à git</option>
            <option value="Développement web et mobile 1">Développement web et mobile 1</option>
            <option value="Développement web et mobile 2">Développement web et mobile 2</option>
            <option value="Programmation orientée objet java">Programmation orientée objet java</option>
            <option value="Programmation orientée objet python">Programmation orientée objet python</option>
            <option value="Algorithme avancé">Algorithme avancé</option>
            <option value="Sql server">Sql server</option>
          </select>
        </div>

        <!-- Notes -->
        <div class="notes-row">
          <div class="form-group">
            <label>Devoir (40%)</label>
            <input
              type="number"
              v-model="devoir"
              placeholder="Note /20"
              min="0"
              max="20"
              step="0.01"
              class="simple-input"
              required
            >
          </div>

          <div class="form-group">
            <label>Examen (60%)</label>
            <input
              type="number"
              v-model="examen"
              placeholder="Note /20"
              min="0"
              max="20"
              step="0.01"
              class="simple-input"
              required
            >
          </div>

          <div class="form-group">
            <label>Moyenne</label>
            <input
              type="text"
              v-model="moyenne"
              placeholder="Calcul automatique"
              class="simple-input calculated"
              readonly
            >
          </div>
        </div>

        <!-- Informations académiques -->
        <div class="form-row">
          <div class="form-group">
            <label>Crédit</label>
            <select v-model="credit" class="simple-select" required>
              <option value="" disabled>Crédit</option>
              <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Semestre</label>
            <select v-model="semestre" class="simple-select" required>
              <option value="" disabled>Semestre</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>

          <div class="form-group">
            <label>Niveau</label>
            <select v-model="niveau" class="simple-select" required>
              <option value="" disabled>Niveau</option>
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
        </div>

        <!-- Résultat et Année -->
        <div class="form-row">
          <div class="form-group">
            <label>Résultat</label>
            <select v-model="resultat" class="simple-select" required>
              <option value="" disabled>Résultat</option>
              <option value="Admis">Admis</option>
              <option value="Refusé">Refusé</option>
            </select>
          </div>

          <div class="form-group">
            <label>Année scolaire</label>
            <select v-model="annee" class="simple-select" required>
              <option value="" disabled>Année</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>
        </div>

        <!-- Boutons -->
        <div class="form-actions">
          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Ajouter la note</span>
            <span v-else class="loading">Ajout en cours...</span>
          </button>

          <button type="button" @click="resetForm" class="btn-reset">
            Réinitialiser
          </button>
        </div>

        <!-- Message d'erreur -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const selectedUserId = ref('');
    const devoir = ref('');
    const module = ref('');
    const resultat = ref('');
    const niveau = ref('');
    const semestre = ref('');
    const examen = ref('');
    const moyenne = ref('');
    const credit = ref('');
    const annee = ref('');
    const userIds = ref([]);
    const errorMessage = ref('');
    const isSubmitting = ref(false);

    // Calcul automatique de la moyenne
    watch([devoir, examen], () => {
      const d = parseFloat(devoir.value) || 0;
      const e = parseFloat(examen.value) || 0;
      moyenne.value = ((d * 0.4) + (e * 0.6)).toFixed(2);
    });

    // Récupérer les user_id depuis l'API
    const fetchUserIds = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users-ids');
        userIds.value = response.data.user_ids;
      } catch (error) {
        console.error('Erreur lors de la récupération des user_ids:', error);
        errorMessage.value = "Impossible de récupérer les utilisateurs.";
      }
    };

    // Réinitialiser le formulaire
    const resetForm = () => {
      selectedUserId.value = '';
      devoir.value = '';
      module.value = '';
      resultat.value = '';
      niveau.value = '';
      semestre.value = '';
      examen.value = '';
      moyenne.value = '';
      credit.value = '';
      annee.value = '';
      errorMessage.value = '';
    };

    // Enregistrer une nouvelle note
    const createNote = async () => {
      if (!selectedUserId.value || !devoir.value || !module.value || !resultat.value ||
          !niveau.value || !semestre.value || !examen.value || !moyenne.value ||
          !credit.value || !annee.value) {
        errorMessage.value = "Tous les champs sont requis";
        return;
      }

      isSubmitting.value = true;
      errorMessage.value = '';

      try {
        await axios.post('http://127.0.0.1:8000/api/notes', {
          user_id: selectedUserId.value,
          devoir: devoir.value,
          module: module.value,
          resultat: resultat.value,
          niveau: niveau.value,
          semestre: semestre.value,
          credit: credit.value,
          examen: examen.value,
          moyenne: moyenne.value,
          annee: annee.value,
        });

        alert('Note ajoutée avec succès');
        resetForm();

      } catch (error) {
        errorMessage.value = "Erreur lors de l'ajout de la note";
        console.error('Erreur:', error);
      } finally {
        isSubmitting.value = false;
      }
    };

    onMounted(fetchUserIds);

    return {
      selectedUserId,
      devoir,
      module,
      resultat,
      niveau,
      userIds,
      createNote,
      semestre,
      examen,
      moyenne,
      annee,
      credit,
      errorMessage,
      isSubmitting,
      resetForm
    };
  }
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

*{
   font-family: "Outfit", sans-serif;;
}
.simple-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.simple-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.simple-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}

.simple-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
  font-size: 14px;
}

.simple-input,
.simple-select {
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  background: white;
}

.simple-input:focus,
.simple-select:focus {
  outline: none;
  border-color: #3498db;
}

.simple-input.calculated {
  background-color: #f8f9fa;
  color: #666;
  font-weight: 500;
}

/* Layout pour les champs groupés */
.notes-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

/* Boutons */
.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.btn-submit {
  flex: 2;
  background: #27ae60;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover:not(:disabled) {
  background: #219a52;
}

.btn-submit:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.btn-reset {
  flex: 1;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-reset:hover {
  background: #c0392b;
}

.loading {
  display: inline-block;
}

/* Message d'erreur */
.error-message {
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #fcc;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .simple-card {
    padding: 20px;
    margin: 10px;
  }

  .notes-row {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
