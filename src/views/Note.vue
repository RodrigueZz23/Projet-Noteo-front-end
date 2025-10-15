<template>
  <div class="notes-container">
    <!-- SVG pour les icônes -->
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

    <!-- Header avec navigation -->
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <div class="brand">
            <div class="logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h1 class="app-title">Noteo</h1>
          </div>
          <div class="user-info">
            <span class="welcome-text">Bonjour, <strong>{{ userName }}</strong></span>
            <button @click="logout" class="logout-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2"/>
                <path d="M21 12H9" stroke="currentColor" stroke-width="2"/>
              </svg>
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="container main-content">
      <!-- En-tête de page -->
      <div class="page-header">
        <div class="header-text">
          <h2 class="page-title">Vos Résultats Académiques</h2>
          <p class="page-subtitle">Consultez vos notes et votre progression</p>
        </div>
        <div class="header-actions">
          <button @click="generatePDF" class="btn-pdf">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2"/>
              <path d="M14 2V8H20" stroke="currentColor" stroke-width="2"/>
              <path d="M16 13H8" stroke="currentColor" stroke-width="2"/>
              <path d="M16 17H8" stroke="currentColor" stroke-width="2"/>
              <path d="M10 9H9H8" stroke="currentColor" stroke-width="2"/>
            </svg>
            Télécharger PDF
          </button>
        </div>
      </div>

      <!-- Alert d'information -->
      <div class="info-card">
        <div class="info-header">
          <svg class="info-icon" role="img" aria-label="Info:">
            <use xlink:href="#info-fill"/>
          </svg>
          <h3>Informations importantes</h3>
        </div>
        <div class="info-content">
          <p>Cette section permet de consulter vos notes :</p>
          <div class="legend">
            <div class="legend-item">
              <div class="color-indicator valid"></div>
              <span>Vert : Module validé</span>
            </div>
            <div class="legend-item">
              <div class="color-indicator failed"></div>
              <span>Rouge : Module non validé</span>
            </div>
          </div>
          <ul class="info-list">
            <li>Si votre module est validé, aucun rattrapage n'est nécessaire.</li>
            <li>Vous avez la possibilité de télécharger votre relevé en PDF.</li>
          </ul>
        </div>
      </div>

      <!-- Statistiques rapides -->
      <div class="stats-grid" v-if="userNotes.length > 0">
        <div class="stat-card">
          <div class="stat-icon total">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>{{ stats.validated }}</h3>
            <p>Modules validés</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon failed">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2"/>
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>{{ stats.failed }}</h3>
            <p>Modules à rattraper</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon average">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8L8 16" stroke="currentColor" stroke-width="2"/>
              <path d="M16 16L8 8" stroke="currentColor" stroke-width="2"/>
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>{{ stats.average }}</h3>
            <p>Moyenne générale</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon credits">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>{{ stats.totalCredits }}</h3>
            <p>Crédits obtenus</p>
          </div>
        </div>
      </div>

      <!-- Tableau des notes -->
      <div class="table-container" v-if="userNotes.length > 0">
        <div class="table-responsive">
          <table class="notes-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Module</th>
                <th scope="col">Devoir (40%)</th>
                <th scope="col">Examen (60%)</th>
                <th scope="col">Moyenne/20</th>
                <th scope="col">Crédit</th>
                <th scope="col">Résultat</th>
                <th scope="col">Semestre</th>
                <th scope="col">Niveau</th>
                <th scope="col">Année</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(note, index) in userNotes" :key="note.id"
                  :class="getRowClass(note.resultat)">
                <td>{{ index + 1 }}</td>
                <td class="module-name">{{ note.module }}</td>
                <td>{{ note.devoir }}</td>
                <td>{{ note.examen }}</td>
                <td class="average-cell">{{ note.moyenne }}</td>
                <td class="credit-cell">{{ note.credit }}</td>
                <td>
                  <span class="result-badge" :class="getResultClass(note.resultat)">
                    {{ note.resultat }}
                  </span>
                </td>
                <td>{{ note.semestre }}</td>
                <td>{{ note.niveau }}</td>
                <td>{{ note.annee }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Message si aucune note -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2"/>
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2"/>
            <path d="M16 13H8" stroke="currentColor" stroke-width="2"/>
            <path d="M16 17H8" stroke="currentColor" stroke-width="2"/>
            <path d="M10 9H9H8" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3>Aucune note disponible</h3>
        <p>Vos notes n'ont pas encore été publiées.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

*{
   font-family: "Outfit", sans-serif;;
}
.notes-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Header */
.app-header {
 background: linear-gradient(135deg, #4F46E5, #7C3AED);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  color: white;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.welcome-text {
  font-size: 1rem;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Main Content */
.main-content {
  padding: 2rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

.btn-pdf {
 background: linear-gradient(135deg, #4F46E5, #7C3AED);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
}

.btn-pdf:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(37, 99, 235, 0.3);
}

/* Info Card */
.info-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.info-icon {
  width: 20px;
  height: 20px;
  color: #2563eb;
}

.info-header h3 {
  margin: 0;
  color: #1e293b;
  font-size: 1.25rem;
}

.legend {
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-indicator {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.color-indicator.valid {
  background: #10b981;
}

.color-indicator.failed {
  background: #ef4444;
}

.info-list {
  margin: 1rem 0 0 0;
  padding-left: 1.5rem;
  color: #64748b;
}

.info-list li {
  margin-bottom: 0.5rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.total {
  background: #d1fae5;
  color: #10b981;
}

.stat-icon.failed {
  background: #fee2e2;
  color: #ef4444;
}

.stat-icon.average {
  background: #dbeafe;
  color: #2563eb;
}

.stat-icon.credits {
  background: #f3e8ff;
  color: #8b5cf6;
}

.stat-content h3 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
}

.stat-content p {
  margin: 0.25rem 0 0 0;
  color: #64748b;
  font-size: 0.875rem;
}

/* Table */
.table-container {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  margin-bottom: 2rem;
}

.notes-table {
  width: 100%;
  border-collapse: collapse;
}

.notes-table thead {
 background: linear-gradient(135deg, #4F46E5, #7C3AED);
}

.notes-table th {
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.notes-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #374151;
}

.notes-table tbody tr:last-child td {
  border-bottom: none;
}

.notes-table tbody tr:hover {
  background: #f8fafc;
}

/* Row styling based on result */
.notes-table tbody tr.valid {
  background: #f0fdf4;
}

.notes-table tbody tr.failed {
  background: #fef2f2;
}

.module-name {
  font-weight: 600;
  color: #1e293b;
}

.average-cell {
  font-weight: 700;
  color: #1e293b;
}

.credit-cell {
  font-weight: 600;
  color: #7c3aed;
}

.result-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-badge.valid {
  background: #d1fae5;
  color: #065f46;
}

.result-badge.failed {
  background: #fee2e2;
  color: #991b1b;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  color: #cbd5e1;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #64748b;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .table-responsive {
    overflow-x: auto;
  }

  .notes-table {
    min-width: 800px;
  }

  .legend {
    flex-direction: column;
    gap: 1rem;
  }
}
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
  computed: {
    stats() {
      const validated = this.userNotes.filter(note => note.resultat === 'Admis').length;
      const failed = this.userNotes.filter(note => note.resultat === 'Refusé').length;
      const totalCredits = this.userNotes
        .filter(note => note.resultat === 'Admis')
        .reduce((sum, note) => sum + (parseFloat(note.credit) || 0), 0);

      const average = this.userNotes.length > 0
        ? (this.userNotes.reduce((sum, note) => sum + (parseFloat(note.moyenne) || 0), 0) / this.userNotes.length).toFixed(2)
        : '0.00';

      return {
        validated,
        failed,
        totalCredits,
        average
      };
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userNotes');
      this.$router.push('/');
    },
    getRowClass(resultat) {
      return resultat === 'Admis' ? 'valid' : resultat === 'Refusé' ? 'failed' : '';
    },
    getResultClass(resultat) {
      return resultat === 'Admis' ? 'valid' : resultat === 'Refusé' ? 'failed' : '';
    },
    generatePDF() {
      const doc = new jsPDF();

      // En-tête du PDF
      doc.setFillColor(30, 58, 138);
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('EduManager - Relevé de Notes', 105, 20, { align: 'center' });

      doc.setFontSize(12);
      doc.text(`Étudiant: ${this.userName}`, 20, 50);
      doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 60);

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
        head: [["#", "Module", "Devoir(40%)", "Examen(60%)", "Moyenne/20", "Crédit", "Résultat", "Semestre", "Niveau", "Année"]],
        body: tableData,
        startY: 70,
        styles: {
          fontSize: 8,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [30, 58, 138],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        didDrawCell: (data) => {
          if (data.section === 'body' && data.column.index === 6) {
            const result = data.cell.raw;
            if (result === 'Admis') {
              doc.setFillColor(209, 250, 229);
            } else if (result === 'Refusé') {
              doc.setFillColor(254, 226, 226);
            }
            doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
            doc.setTextColor(0);
            doc.text(result, data.cell.x + 2, data.cell.y + data.cell.height - 2);
          }
        }
      });

      // Pied de page avec statistiques
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Statistiques: ${this.stats.validated} modules validés, ${this.stats.failed} modules à rattraper, Moyenne: ${this.stats.average}/20, Crédits: ${this.stats.totalCredits}`, 20, finalY);

      // Télécharger le PDF
      doc.save(`Relevé_Notes_${this.userName}.pdf`);
    }
  }
};
</script>
