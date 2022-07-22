import model from '@/assets/models/office.glb';
import { useGLTF } from '@react-three/drei';

const MonitorScreen = () => {
  const { nodes } = useGLTF(model);

  return (
    <mesh
      position={nodes.Monitor_Emissive.position}
      geometry={nodes.Monitor_Emissive.geometry}
    >
      <meshBasicMaterial color={'white'} />
    </mesh>
  );
};

export default MonitorScreen;
