import model from '@/assets/models/office.glb';
import { useGLTF } from '@react-three/drei';

const PhoneScreen = () => {
  const { nodes } = useGLTF(model);

  return (
    <mesh
      position={nodes.phone_emissive.position}
      geometry={nodes.phone_emissive.geometry}
    >
      <meshBasicMaterial color={'black'} />
    </mesh>
  );
};

export default PhoneScreen;
