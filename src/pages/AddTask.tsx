import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, 
  IonInput, IonItem, IonLabel, IonButtons, IonBackButton, 
  IonDatetime, IonModal, IonToast, IonIcon, IonTextarea, IonSelect, IonSelectOption 
} from '@ionic/react';
import { camera } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';

// IMPORT TIPE DATA DARI SINI
import { Task } from '../type,Task';

interface AddTaskProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AddTask: React.FC<AddTaskProps> = ({ tasks, setTasks }) => {
  // ... kode lainnya sama seperti yang kamu tulis ...
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<string>(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Pribadi');
  const [priority, setPriority] = useState('Normal');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [showToast, setShowToast] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });
      if (photo.dataUrl) setImage(photo.dataUrl);
    } catch (e) { console.error("Gagal ambil foto", e); }
  };

  const handleSave = () => {
    if (!taskTitle.trim()) { alert("Judul tugas wajib diisi!"); return; }
    const newTask: Task = { 
        id: Date.now(), title: taskTitle, description, deadline, 
        category, priority, image, isCompleted: false 
    };
    setTasks([...tasks, newTask]);
    setShowToast(true);
    setTimeout(() => history.push('/home'), 1000);
  };

  // ... kembalikan (return) komponennya seperti semula ...
  return (
    <IonPage>
      {/* ... bagian JSX ... */}
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Tambah Tugas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem className="ion-margin-bottom">
          <IonLabel position="stacked">Judul Tugas</IonLabel>
          <IonInput value={taskTitle} onIonChange={e => setTaskTitle(e.detail.value!)} />
        </IonItem>
        
        <IonItem className="ion-margin-bottom">
          <IonLabel position="stacked">Deskripsi</IonLabel>
          <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value!)} />
        </IonItem>

        <IonItem className="ion-margin-bottom">
          <IonLabel>Kategori</IonLabel>
          <IonSelect value={category} onIonChange={e => setCategory(e.detail.value)}>
            <IonSelectOption value="Pribadi">Pribadi</IonSelectOption>
            <IonSelectOption value="Kuliah">Kuliah</IonSelectOption>
            <IonSelectOption value="Kerja">Kerja</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem className="ion-margin-bottom">
          <IonLabel>Prioritas</IonLabel>
          <IonSelect value={priority} onIonChange={e => setPriority(e.detail.value)}>
            <IonSelectOption value="Rendah">Rendah</IonSelectOption>
            <IonSelectOption value="Normal">Normal</IonSelectOption>
            <IonSelectOption value="Tinggi">Tinggi</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem className="ion-margin-bottom" button id="open-date-modal">
          <IonLabel>Deadline: {new Date(deadline).toLocaleDateString('id-ID')}</IonLabel>
        </IonItem>

        <IonModal ref={modal} trigger="open-date-modal">
          <IonContent className="ion-padding">
            <IonDatetime 
              presentation="date" 
              value={deadline} 
              onIonChange={e => setDeadline(e.detail.value!.toString().split('T')[0])} 
            />
            <IonButton expand="block" onClick={() => modal.current?.dismiss()}>Tutup</IonButton>
          </IonContent>
        </IonModal>

        <IonItem className="ion-margin-bottom" button onClick={takePhoto}>
          <IonLabel>Ambil Foto Tugas</IonLabel>
          <IonIcon slot="end" icon={camera} />
          {image && <img src={image} style={{ width: '40px', height: '40px', marginLeft: '10px' }} />}
        </IonItem>

        <IonButton expand="block" onClick={handleSave} className="ion-margin-top">Simpan Tugas</IonButton>
        <IonToast isOpen={showToast} message="Tugas berhasil disimpan!" duration={1000} />
      </IonContent>
    </IonPage>
  );
};

export default AddTask;