<template>
<svg xmlns="http://www.w3.org/2000/svg" class="d-none">
  <symbol id="check-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="info-fill" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </symbol>
  <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>
  <div class="container mt-5">
    <h1 class="text-center">Bienvenue, {{ userName }}</h1>

  <div class="alert alert-primary d-flex align-items-center p-2" role="alert" style="font-size: 0.875rem;">
  <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Info:" style="width: 16px; height: 16px;">
    <use xlink:href="#info-fill"/>
  </svg>
  <div>
    Cette section permet de consulter vos notes :
    <ul class="mb-0">
      <li class="text-danger">Rouge : Non validé</li>
      <li class="text-success">Vert : Validé</li>
    </ul>
    Si votre vote n'est pas validé, vous devrez la rattraper à la date indiquée.
    Si votre vote est validé, aucun rattrapage n'est nécessaire.
    <br>
    📄 <strong>Vous avez la possibilité de le télécharger en PDF.</strong>
  </div>
</div>




    <h2 class="text-center mt-3">Vos Notes</h2>

    <div v-if="userNotes.length > 0">
      <table class="table table-striped mt-3">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Module</th>
            <th scope="col">Devoir(40%)</th>
            <th scope="col">Examen(60%)</th>
            <th scope="col">Moyenne/20</th>
            <th scope="col">Crédit</th>
            <th scope="col">Résultat</th>
            <th scope="col">Semestre</th>
            <th scope="col">Niveau</th>
            <th scope="col">Année</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(note, index) in userNotes" :key="note.id">
            <td>{{ index + 1 }}</td>
            <td>{{ note.module }}</td>
            <td>{{ note.devoir }}</td>
            <td>{{ note.examen }}</td>
            <td>{{ note.moyenne }}</td>
            <td>{{ note.credit }}</td>
            <td :style="note.resultat === 'Admis' ? { backgroundColor: '#C3E6CB' } : note.resultat === 'Refusé' ? { backgroundColor: '#dc3545' } : {}">
              {{ note.resultat }}
            </td>

            <td>{{ note.semestre }}</td>
            <td>{{ note.niveau }}</td>
            <td>{{ note.annee }}</td>
          </tr>

        </tbody>
      </table>
    </div>

    <div v-else>
      <p class="text-center text-muted">Aucune note disponible.</p>
    </div>

    <div class="text-center">
      <button @click="logout" class="btn btn-danger mt-3">Déconnexion</button>
    </div>
    <div class="text-center">
      <button @click="generatePDF" class="btn btn-warning mt-3">Télécharger PDF</button>
    </div>
  </div>



</template>

<style scoped>

</style>




<script>
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  data() {
    return {
      userName: localStorage.getItem('userName') || 'Utilisateur inconnu',
      userNotes: JSON.parse(localStorage.getItem('userNotes')) || []
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userNotes');
      this.$router.push('/');
    },
    generatePDF() {
      const doc = new jsPDF();

      // Titre
      doc.text(`Notes de ${this.userName}`, 20, 10);

      // Préparer les données pour le tableau
      const tableData = this.userNotes.map((note, index) => [
        index + 1,
        note.module,
        note.devoir,
        note.examen,
        note.moyenne,
        note.credit,
        note.resultat,
        note.semestre,
        note.niveau,
        note.annee,
      ]);

      // Ajouter le tableau
      doc.autoTable({
        head: [["#", "Module", "Devoir(40%)", "Examen(60%)", "Moyenne/20" ,"Crédit" ,"Résultat" ,"Semestre" ,"Niveau" ,"Annee"]],
        body: tableData,
        startY: 20
      });

      // Télécharger le PDF//
      doc.save(`Notes_${this.userName}.pdf`);
    }
  }
};
</script>

