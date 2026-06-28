import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, 
  IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonRouterLink,
  IonItemSliding, IonItemOptions, IonItemOption, IonCheckbox,
  IonSearchbar
} from '@ionic/react';
import { add, trash, listOutline } from 'ionicons/icons';

// Interface diperbarui agar sinkron dengan AddTask.tsx dan TaskDetail.tsx
interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  category: string;
  priority: string;
  image?: string;
  isCompleted: boolean;
}

interface HomeProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const Home: React.FC<HomeProps> = ({ tasks, onDelete, onToggle }) => {
  const [searchText, setSearchText] = useState('');

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date(new Date().toDateString());
  };

  // Filter tugas berdasarkan judul
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Task Manager Arsyaf</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar 
            value={searchText} 
            onIonInput={(e) => setSearchText(e.detail.value!)} 
            placeholder="Cari tugas..."
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {filteredTasks.length === 0 ? (
          <div className="ion-text-center ion-padding" style={{ marginTop: '20vh' }}>
            <IonIcon icon={listOutline} style={{ fontSize: '64px', color: '#ccc' }} />
            <p style={{ color: '#888', marginTop: '10px' }}>
              {tasks.length === 0 ? "Belum ada tugas, yuk tambah!" : "Tugas tidak ditemukan."}
            </p>
          </div>
        ) : (
          <IonList>
            {filteredTasks
              .sort((a, b) => (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1))
              .map(task => (
              <IonItemSliding key={task.id}>
                {/* Ditambahkan routerLink agar item bisa diklik untuk melihat halaman Detail */}
                <IonItem routerLink={`/task/${task.id}`}>
                  <IonCheckbox 
                    slot="start" 
                    checked={task.isCompleted} 
                    onIonChange={(e) => {
                      e.stopPropagation(); // Mencegah halaman detail terbuka tidak sengaja saat klik checkbox
                      onToggle(task.id);
                    }} 
                  />
                  <IonLabel>
                    <h2 style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                      {task.title}
                    </h2>
                    {/* Menampilkan informasi Kategori dan Prioritas tambahan */}
                    <p style={{ fontSize: '0.85rem', color: '#666', margin: '4px 0' }}>
                      {task.category} • Prioritas: {task.priority}
                    </p>
                    <p style={{ color: isOverdue(task.deadline) ? 'var(--ion-color-danger)' : 'inherit' }}>
                      Deadline: {task.deadline}
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption color="danger" onClick={() => onDelete(task.id)}>
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonRouterLink routerLink="/add-task">
            <IonFabButton color="primary">
              <IonIcon icon={add} />
            </IonFabButton>
          </IonRouterLink>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;