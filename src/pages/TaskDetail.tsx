import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, 
  IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText
} from '@ionic/react';

// Import dari file pusat
import { Task } from '../types/Task';

interface DetailProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskDetail: React.FC<DetailProps> = ({ tasks, setTasks }) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const task = tasks.find(t => t.id === parseInt(id));

  const handleDelete = () => {
    setTasks(tasks.filter(t => t.id !== parseInt(id)));
    history.push('/home');
  };

  if (!task) return <IonPage><IonContent>Tugas tidak ditemukan</IonContent></IonPage>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Detail Tugas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          {task.image && <img src={task.image} alt="Tugas" />}
          <IonCardHeader>
            <IonCardTitle>{task.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Deskripsi:</strong> {task.description}</p>
            <p><strong>Deadline:</strong> {task.deadline}</p>
            <p><strong>Kategori:</strong> {task.category}</p>
            <p><strong>Prioritas:</strong> <IonText color={task.priority === 'Tinggi' ? 'danger' : 'medium'}>{task.priority}</IonText></p>
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" color="danger" onClick={handleDelete} className="ion-margin-top">
          Hapus Tugas
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TaskDetail;
